'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { ImageUpload } from '@/components/analysis/ImageUpload';
import { LessonView } from '@/components/analysis/LessonView';
import { QuizView } from '@/components/quiz/QuizView';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { analyzeImage, generateLesson, generateQuiz } from '@/services/gemini';
import { saveAnalysis, saveQuizResult } from '@/services/firestore';
import { ObjectRecognition, LessonContent, QuizQuestion, QuizResult } from '@/types';
import { toast } from 'sonner';
import { Brain, Loader2, BookOpen, Trophy } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AnalyzePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [objectRecognition, setObjectRecognition] = useState<ObjectRecognition | null>(null);
  const [lesson, setLesson] = useState<LessonContent | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[] | null>(null);
  const [analysisId, setAnalysisId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('lesson');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, authLoading, router]);

  const handleImageSelect = (file: File, preview: string) => {
    setImageFile(file);
    setImagePreview(preview);
    setObjectRecognition(null);
    setLesson(null);
    setQuizQuestions(null);
    setAnalysisId(null);
  };

  const handleAnalyze = async () => {
    if (!imageFile || !imagePreview || !user) return;

    setAnalyzing(true);
    toast.info('Analyzing image...');

    try {
      // Get base64 data
      const base64Data = imagePreview.split(',')[1];

      // Step 1: Analyze image
      const recognition = await analyzeImage(base64Data);
      setObjectRecognition(recognition);
      toast.success(`Detected: ${recognition.object_name}`);

      // Step 2: Generate lesson
      toast.info('Generating STEM lesson...');
      const lessonData = await generateLesson(recognition);
      setLesson(lessonData);

      // Step 3: Generate quiz
      toast.info('Creating quiz questions...');
      const questions = await generateQuiz(recognition.object_name, recognition.stem_concepts);
      setQuizQuestions(questions);

      // Step 4: Save to Firestore
      const id = await saveAnalysis(user.uid, imageFile, {
        objectRecognition: recognition,
        lessonContent: lessonData,
        quizQuestions: questions,
      });
      setAnalysisId(id);

      toast.success('Analysis complete! 🎉');
    } catch (error: any) {
      console.error('Analysis error:', error);
      toast.error(error.message || 'Failed to analyze image');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleQuizComplete = async (result: QuizResult) => {
    if (!analysisId) return;

    try {
      await saveQuizResult(analysisId, result);
      toast.success('Quiz results saved!');
    } catch (error) {
      console.error('Error saving quiz result:', error);
      toast.error('Failed to save quiz results');
    }
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin">
          <Brain className="h-12 w-12 text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Analyze Object</h1>
            <p className="text-muted-foreground">
              Upload or capture an image to discover STEM concepts
            </p>
          </div>

          <div className="space-y-6">
            <ImageUpload onImageSelect={handleImageSelect} />

            {imagePreview && !objectRecognition && (
              <div className="flex justify-center">
                <Button
                  size="lg"
                  onClick={handleAnalyze}
                  disabled={analyzing}
                  className="w-full sm:w-auto"
                >
                  {analyzing ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="h-5 w-5 mr-2" />
                      Analyze with AI
                    </>
                  )}
                </Button>
              </div>
            )}

            {objectRecognition && lesson && quizQuestions && (
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-2">{objectRecognition.object_name}</h2>
                    <p className="text-muted-foreground">{objectRecognition.category}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {objectRecognition.stem_concepts.map((concept, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                        >
                          {concept}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="lesson">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Lesson
                      </TabsTrigger>
                      <TabsTrigger value="quiz">
                        <Trophy className="h-4 w-4 mr-2" />
                        Quiz
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="lesson" className="mt-6">
                      <LessonView lesson={lesson} objectName={objectRecognition.object_name} />
                    </TabsContent>

                    <TabsContent value="quiz" className="mt-6">
                      <QuizView questions={quizQuestions} onComplete={handleQuizComplete} />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
