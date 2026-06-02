'use client';

import { LessonContent } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Atom, Calculator, Cog, Cpu, Lightbulb } from 'lucide-react';

interface LessonViewProps {
  lesson: LessonContent;
  objectName: string;
}

export function LessonView({ lesson, objectName }: LessonViewProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-500';
      case 'intermediate':
        return 'bg-yellow-500';
      case 'advanced':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>About {objectName}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{lesson.objectDescription}</p>
        </CardContent>
      </Card>

      <Tabs defaultValue="physics" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="physics">
            <Atom className="h-4 w-4 mr-2" />
            Physics
          </TabsTrigger>
          <TabsTrigger value="mathematics">
            <Calculator className="h-4 w-4 mr-2" />
            Math
          </TabsTrigger>
          <TabsTrigger value="engineering">
            <Cog className="h-4 w-4 mr-2" />
            Engineering
          </TabsTrigger>
          <TabsTrigger value="technology">
            <Cpu className="h-4 w-4 mr-2" />
            Technology
          </TabsTrigger>
        </TabsList>

        <TabsContent value="physics" className="space-y-4">
          {lesson.physics.map((concept, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{concept.title}</CardTitle>
                  <Badge className={getDifficultyColor(concept.difficulty)}>
                    {concept.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Explanation</h4>
                  <p className="text-muted-foreground">{concept.explanation}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Example</h4>
                  <p className="text-muted-foreground">{concept.example}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="mathematics" className="space-y-4">
          {lesson.mathematics.map((concept, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{concept.title}</CardTitle>
                  <Badge className={getDifficultyColor(concept.difficulty)}>
                    {concept.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Explanation</h4>
                  <p className="text-muted-foreground">{concept.explanation}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Example</h4>
                  <p className="text-muted-foreground">{concept.example}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="engineering" className="space-y-4">
          {lesson.engineering.map((concept, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{concept.title}</CardTitle>
                  <Badge className={getDifficultyColor(concept.difficulty)}>
                    {concept.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Explanation</h4>
                  <p className="text-muted-foreground">{concept.explanation}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Example</h4>
                  <p className="text-muted-foreground">{concept.example}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="technology" className="space-y-4">
          {lesson.technology.map((concept, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{concept.title}</CardTitle>
                  <Badge className={getDifficultyColor(concept.difficulty)}>
                    {concept.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Explanation</h4>
                  <p className="text-muted-foreground">{concept.explanation}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Example</h4>
                  <p className="text-muted-foreground">{concept.example}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="h-5 w-5 mr-2" />
            Real-World Applications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {lesson.realWorldApplications.map((app, index) => (
              <li key={index} className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span className="text-muted-foreground">{app}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
