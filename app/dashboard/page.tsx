'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { getUserStatistics } from '@/services/firestore';
import { UserStatistics } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Upload, Brain, Trophy, Target, Plus } from 'lucide-react';
import Image from 'next/image';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<UserStatistics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      loadStatistics();
    }
  }, [user]);

  const loadStatistics = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const statistics = await getUserStatistics(user.uid);
      setStats(statistics);
    } catch (error) {
      console.error('Error loading statistics:', error);
    } finally {
      setLoading(false);
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user.displayName || 'Student'}!
          </h1>
          <p className="text-muted-foreground">
            Ready to discover more STEM concepts today?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {loading ? (
            <>
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
            </>
          ) : (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Analyses</CardTitle>
                  <Brain className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.totalAnalyses || 0}</div>
                  <p className="text-xs text-muted-foreground">Objects analyzed</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Quizzes Completed</CardTitle>
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.totalQuizzes || 0}</div>
                  <p className="text-xs text-muted-foreground">Tests taken</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.averageScore || 0}%</div>
                  <p className="text-xs text-muted-foreground">Quiz performance</p>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        <div className="mb-8">
          <Link href="/analyze">
            <Button size="lg" className="w-full sm:w-auto">
              <Upload className="h-5 w-5 mr-2" />
              Analyze New Object
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Analyses</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-20" />
                <Skeleton className="h-20" />
                <Skeleton className="h-20" />
              </div>
            ) : stats?.recentAnalyses.length === 0 ? (
              <div className="text-center py-12">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No analyses yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start by uploading your first image to analyze
                </p>
                <Link href="/analyze">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Get Started
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {stats?.recentAnalyses.map((analysis) => (
                  <Link
                    key={analysis.id}
                    href={`/analysis/${analysis.id}`}
                    className="block"
                  >
                    <div className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                      <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={analysis.imageUrl}
                          alt={analysis.objectRecognition.object_name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">
                          {analysis.objectRecognition.object_name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {analysis.objectRecognition.category}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(analysis.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      {analysis.quizResult && (
                        <div className="text-right">
                          <div className="text-sm font-semibold">
                            {Math.round(
                              (analysis.quizResult.score /
                                analysis.quizResult.totalQuestions) *
                                100
                            )}
                            %
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Quiz Score
                          </div>
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
