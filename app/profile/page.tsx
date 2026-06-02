'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { getUserStatistics } from '@/services/firestore';
import { UserStatistics } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Brain, Mail, Calendar, Trophy, Target, BookOpen } from 'lucide-react';

export default function ProfilePage() {
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

  const getLevel = (totalAnalyses: number) => {
    if (totalAnalyses < 5) return { name: 'Beginner', color: 'bg-green-500' };
    if (totalAnalyses < 15) return { name: 'Intermediate', color: 'bg-yellow-500' };
    if (totalAnalyses < 30) return { name: 'Advanced', color: 'bg-orange-500' };
    return { name: 'Expert', color: 'bg-red-500' };
  };

  const level = stats ? getLevel(stats.totalAnalyses) : { name: 'Beginner', color: 'bg-green-500' };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Profile</h1>

          <div className="grid gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                    <AvatarFallback className="text-3xl">
                      {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="text-2xl font-bold mb-2">{user.displayName || 'User'}</h2>
                    <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        {user.email}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Joined {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <Badge className={level.color}>{level.name} Learner</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{stats?.totalAnalyses || 0}</div>
                      <p className="text-xs text-muted-foreground mt-1">Objects explored</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Quizzes Completed</CardTitle>
                      <Trophy className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{stats?.totalQuizzes || 0}</div>
                      <p className="text-xs text-muted-foreground mt-1">Tests passed</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                      <Target className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{stats?.averageScore || 0}%</div>
                      <p className="text-xs text-muted-foreground mt-1">Overall performance</p>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Analyses to Next Level</span>
                    <span className="font-semibold">
                      {stats ? Math.max(0, (stats.totalAnalyses < 5 ? 5 : stats.totalAnalyses < 15 ? 15 : stats.totalAnalyses < 30 ? 30 : 50) - stats.totalAnalyses) : 0}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{
                        width: `${stats ? (stats.totalAnalyses / (stats.totalAnalyses < 5 ? 5 : stats.totalAnalyses < 15 ? 15 : stats.totalAnalyses < 30 ? 30 : 50)) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {stats?.totalAnalyses || 0}
                    </div>
                    <div className="text-xs text-muted-foreground">Analyses</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {stats?.totalQuizzes || 0}
                    </div>
                    <div className="text-xs text-muted-foreground">Quizzes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {stats ? stats.recentAnalyses.filter(a => a.quizResult && a.quizResult.score === a.quizResult.totalQuestions).length : 0}
                    </div>
                    <div className="text-xs text-muted-foreground">Perfect Scores</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {stats ? new Set(stats.recentAnalyses.map(a => a.objectRecognition.category)).size : 0}
                    </div>
                    <div className="text-xs text-muted-foreground">Categories</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
