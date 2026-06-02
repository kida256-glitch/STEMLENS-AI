import { GoogleGenerativeAI } from '@google/generative-ai';
import { ObjectRecognition, LessonContent, QuizQuestion } from '@/types';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export async function analyzeImage(imageBase64: string): Promise<ObjectRecognition> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });

  const prompt = `Analyze this image and identify the main object. Return ONLY valid JSON with this exact structure:
{
  "object_name": "name of the main object",
  "category": "category like Transportation, Electronics, Nature, etc",
  "stem_concepts": ["concept1", "concept2", "concept3", "concept4"]
}

The stem_concepts should be relevant physics, mathematics, engineering, or technology concepts related to this object.`;

  const imagePart = {
    inlineData: {
      data: imageBase64,
      mimeType: 'image/jpeg',
    },
  };

  const result = await model.generateContent([prompt, imagePart]);
  const response = await result.response;
  const text = response.text();
  
  // Clean the response to extract only JSON
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Failed to parse AI response');
  }
  
  return JSON.parse(jsonMatch[0]);
}

export async function generateLesson(objectRecognition: ObjectRecognition): Promise<LessonContent> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `Generate a comprehensive STEM lesson about "${objectRecognition.object_name}". 
Return ONLY valid JSON with this exact structure:
{
  "objectDescription": "detailed description of the object",
  "physics": [
    {
      "title": "concept name",
      "explanation": "clear explanation",
      "example": "practical example",
      "difficulty": "beginner"
    }
  ],
  "mathematics": [similar structure with 2-3 concepts],
  "engineering": [similar structure with 2-3 concepts],
  "technology": [similar structure with 2-3 concepts],
  "realWorldApplications": ["application1", "application2", "application3"]
}

Focus on these concepts: ${objectRecognition.stem_concepts.join(', ')}
Make explanations clear for secondary school students.
Difficulty levels: beginner, intermediate, or advanced.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Failed to parse lesson content');
  }
  
  return JSON.parse(jsonMatch[0]);
}

export async function generateQuiz(
  objectName: string,
  stemConcepts: string[]
): Promise<QuizQuestion[]> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `Generate 10 multiple choice questions about "${objectName}" covering these STEM concepts: ${stemConcepts.join(', ')}.
Return ONLY valid JSON array with this exact structure:
[
  {
    "question": "question text",
    "options": ["option A", "option B", "option C", "option D"],
    "correctAnswer": 0,
    "explanation": "why this answer is correct"
  }
]

Rules:
- Each question must have exactly 4 options
- correctAnswer is the index (0-3) of the correct option
- Questions should test understanding, not just memorization
- Mix difficulty levels
- Make questions engaging for students`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) {
    throw new Error('Failed to parse quiz questions');
  }
  
  return JSON.parse(jsonMatch[0]);
}
