import { Eye, Brain, Target, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: Eye,
    title: 'AI Vision Recognition',
    description: 'Advanced computer vision powered by Google Gemini to identify objects and their properties instantly.',
  },
  {
    icon: Brain,
    title: 'STEM Concept Detection',
    description: 'Automatically discover physics, mathematics, engineering, and technology concepts in everyday objects.',
  },
  {
    icon: Target,
    title: 'Interactive Quizzes',
    description: 'Test your knowledge with AI-generated quizzes tailored to the object you uploaded.',
  },
  {
    icon: Sparkles,
    title: 'Personalized Learning',
    description: 'Track your progress, revisit past lessons, and build your STEM knowledge systematically.',
  },
];

export function Features() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to transform everyday objects into engaging STEM learning experiences
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
