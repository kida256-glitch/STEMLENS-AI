'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { getAnalysis } from '@/services/firestore';
import { LessonView } from '@/components/analysis/LessonView';
import { QuizView } from '@/components/quiz/QuizView';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnalysisRecord, QuizResult } from '@/types';
import { Brain, BookOpen, Trophy, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { saveQuizResult } from '@/services/firestore';
import { toast } from 'sonner';

export default function AnalysisDetailPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const analysisId = params.id as string;

  const [analysis, setAnalysis] = useState<AnalysisRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('lesson');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (analysisId) {
      loadAnalysis();
    }
  }, [analysisId]);

  const loadAnalysis = async () => {
    setLoading(true);
    try {
      const data = await getAnalysis(analysisId);
      if (data) {
        setAnalysis(data);
      } else {
        toast.error('Analysis not found');
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error loading analysis:', error);
      toast.error('Failed to load analysis');
    } finally {
      setLoading(false);
    }
  };

  const handleQuizComplete = async (result: QuizResult) => {
    try {
      await saveQuizResult(analysisId, result);
      toast.success('Quiz results saved!');
      loadAnalysis(); // Reload to show updated quiz result
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

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-10 w-64 mb-6" />
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  if (!analysis) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/dashboard">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>

          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={analysis.imageUrl}
                      alt={analysis.objectRecognition.object_name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold mb-2">
                      {analysis.objectRecognition.object_name}
                    </h1>
                    <p className="text-muted-foreground mb-4">
                      {analysis.objectRecognition.category}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {analysis.objectRecognition.stem_concepts.map((concept, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                        >
                          {concept}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Analyzed on {new Date(analysis.createdAt).toLocaleDateString()}
                    </p>
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
                      Quiz {analysis.quizResult && '✓'}
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="lesson" className="mt-6">
                    <LessonView
                      lesson={analysis.lessonContent}
                      objectName={analysis.objectRecognition.object_name}
                    />
                  </TabsContent>

                  <TabsContent value="quiz" className="mt-6">
                    {analysis.quizResult ? (
                      <div className="text-center py-12">
                        <Trophy className="h-16 w-16 mx-auto text-primary mb-4" />
                        <h2 className="text-2xl font-bold mb-2">Quiz Completed!</h2>
                        <p className="text-muted-foreground mb-4">
                          You scored {analysis.quizResult.score} out of{' '}
                          {analysis.quizResult.totalQuestions}
                        </p>
                        <p className="text-4xl font-bold text-primary">
                          {Math.round(
                            (analysis.quizResult.score / analysis.quizResult.totalQuestions) * 100
                          )}
                          %
                        </p>
                      </div>
                    ) : (
                      <QuizView
                        questions={analysis.quizQuestions}
                        onComplete={handleQuizComplete}
                      />
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
