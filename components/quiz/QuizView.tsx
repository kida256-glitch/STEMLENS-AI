'use client';

import { useState } from 'react';
import { QuizQuestion, QuizResult } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle, Trophy } from 'lucide-react';

interface QuizViewProps {
  questions: QuizQuestion[];
  onComplete: (result: QuizResult) => void;
}

export function QuizView({ questions, onComplete }: QuizViewProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<QuizResult['answers']>([]);
  const [completed, setCompleted] = useState(false);

  const handleAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    const newAnswers = [
      ...answers,
      {
        questionIndex: currentQuestion,
        selectedAnswer,
        isCorrect,
      },
    ];
    setAnswers(newAnswers);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      const score = answers.reduce((sum, ans) => sum + (ans.isCorrect ? 1 : 0), 0) + 
                    (selectedAnswer === questions[currentQuestion].correctAnswer ? 1 : 0);
      const result: QuizResult = {
        score,
        totalQuestions: questions.length,
        answers: newAnswers,
        completedAt: new Date(),
      };
      setCompleted(true);
      onComplete(result);
    }
  };

  const newAnswers = [
    ...answers,
    {
      questionIndex: currentQuestion,
      selectedAnswer: selectedAnswer!,
      isCorrect: selectedAnswer === questions[currentQuestion].correctAnswer,
    },
  ];

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (completed) {
    const score = answers.reduce((sum, ans) => sum + (ans.isCorrect ? 1 : 0), 0);
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
              <Trophy className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
              <p className="text-xl text-muted-foreground">
                You scored {score} out of {questions.length}
              </p>
            </div>
            <div className="max-w-xs mx-auto">
              <Progress value={percentage} className="h-4" />
              <p className="text-sm text-muted-foreground mt-2">{percentage}% Correct</p>
            </div>
            <div className="pt-4">
              <Button onClick={() => window.location.reload()}>Take Another Quiz</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{question.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correctAnswer;
              const showResult = showExplanation;

              let buttonClass = 'w-full text-left justify-start h-auto py-4 px-6';
              if (showResult) {
                if (isCorrect) {
                  buttonClass += ' border-green-500 bg-green-500/10';
                } else if (isSelected && !isCorrect) {
                  buttonClass += ' border-red-500 bg-red-500/10';
                }
              } else if (isSelected) {
                buttonClass += ' border-primary bg-primary/10';
              }

              return (
                <Button
                  key={index}
                  variant="outline"
                  className={buttonClass}
                  onClick={() => !showExplanation && setSelectedAnswer(index)}
                  disabled={showExplanation}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{option}</span>
                    {showResult && isCorrect && (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                </Button>
              );
            })}
          </div>

          {showExplanation && (
            <div className="rounded-lg border bg-muted/50 p-4">
              <h4 className="font-semibold mb-2">Explanation</h4>
              <p className="text-sm text-muted-foreground">{question.explanation}</p>
            </div>
          )}

          <div className="flex justify-end gap-4 pt-4">
            {!showExplanation ? (
              <Button onClick={handleAnswer} disabled={selectedAnswer === null}>
                Submit Answer
              </Button>
            ) : (
              <Button onClick={handleNext}>
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
