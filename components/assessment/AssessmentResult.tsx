import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, ArrowRight, Trophy, Target } from 'lucide-react'
import { Markdown } from '@/components/ui/markdown'

type Props = {
  result: any;
  onNext: () => void;
}

export default function AssessmentResult({ result, onNext }: Props) {
  if (!result) {
    return (
      <div className="py-12 flex justify-center">
        <Card className="w-full max-w-md border-border">
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Target className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">No Results Available</h3>
                <p className="text-muted-foreground text-sm">
                  Assessment results could not be loaded. Please try again.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { score, totalQuestions, percentage, evaluatedAnswers, assessmentResult } = result;

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600 dark:text-green-400';
    if (percentage >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreBadgeVariant = (percentage: number) => {
    if (percentage >= 80) return 'default';
    if (percentage >= 60) return 'secondary';
    return 'destructive';
  };

  const getPerformanceMessage = (percentage: number) => {
    if (percentage >= 90) return { icon: "🎉", message: "Excellent work!" };
    if (percentage >= 80) return { icon: "🎯", message: "Great job!" };
    if (percentage >= 70) return { icon: "👍", message: "Good effort!" };
    if (percentage >= 60) return { icon: "📚", message: "Keep studying!" };
    return { icon: "💪", message: "More practice needed!" };
  };

  const performance = getPerformanceMessage(percentage);

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-6">
      <Card className="shadow-lg border-border">
        <CardHeader className="text-center space-y-6 bg-gradient-to-br from-background to-muted/30">
          <div className="space-y-4">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Trophy className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold text-foreground">Assessment Complete!</CardTitle>
            <div className="space-y-3">
              <div className={`text-5xl font-bold ${getScoreColor(percentage)}`}>
                {score}/{totalQuestions}
              </div>
              <Badge 
                variant={getScoreBadgeVariant(percentage)}
                className="text-xl px-6 py-2 font-bold"
              >
                {percentage}%
              </Badge>
              <p className="text-lg font-medium text-foreground">
                {performance.icon} {performance.message}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-8 p-8">
          {assessmentResult.advice && (
            <div className="p-6 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-xl">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center">
                💡 <span className="ml-2">Personalized Feedback</span>
              </h4>
              <div className="prose prose-sm max-w-none text-blue-800 dark:text-blue-200">
                <Markdown content={assessmentResult.advice} />
              </div>
            </div>
          )}

          <div>
            <h4 className="font-semibold text-xl mb-6 text-foreground">Question Review</h4>
            <div className="space-y-4">
              {evaluatedAnswers.map((answer: any, index: number) => (
                <Card 
                  key={answer.questionId} 
                  className={`border-l-4 transition-all duration-200 hover:shadow-md ${
                    answer.isCorrect 
                      ? 'border-l-green-500 bg-green-50/50 dark:bg-green-950/10' 
                      : 'border-l-red-500 bg-red-50/50 dark:bg-red-950/10'
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h5 className="font-semibold text-base text-foreground">Question {index + 1}</h5>
                      {answer.isCorrect ? (
                        <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                          <CheckCircle className="w-5 h-5" />
                          <span className="text-sm font-medium">Correct</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
                          <XCircle className="w-5 h-5" />
                          <span className="text-sm font-medium">Incorrect</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="prose prose-sm max-w-none text-foreground mb-4">
                      <Markdown content={answer.question} />
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <div className="p-3 bg-muted/50 rounded-lg border border-border">
                        <span className="font-semibold text-foreground">Your answer: </span>
                        <span className={`font-medium ${answer.isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {Array.isArray(answer.userAnswer) ? answer.userAnswer.join(', ') : answer.userAnswer}
                        </span>
                      </div>
                      
                      {!answer.isCorrect && (
                        <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                          <span className="font-semibold text-foreground">Correct answer: </span>
                          <span className="font-medium text-green-600 dark:text-green-400">{answer.correctAnswer}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center pt-8 border-t border-border">
            <Button 
              onClick={onNext}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              size="lg"
            >
              Continue Learning Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}