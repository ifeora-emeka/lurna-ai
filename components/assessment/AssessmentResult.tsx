import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, ArrowRight, Trophy, Target, Award, TrendingUp } from 'lucide-react'
import { Markdown } from '@/components/ui/markdown'
import AssistantMessage from '@/components/AssistantMessage'
import { EvaluatedAnswer } from '@/types/assessment-answer.types'
import { QuestionAttributes } from '@/types/question.types'

type AssessmentResultData = {
  assessment_result?: any;
  assessmentResult?: any;
  assessment?: any;
  score?: number;
  totalQuestions?: number;
  percentage?: number;
  advice?: string;
  evaluatedAnswers?: EvaluatedAnswer[];
  questions?: QuestionAttributes[];
  result?: EvaluatedAnswer[];
}

type Props = {
  result: AssessmentResultData;
  onNext: () => void;
}

const CircularProgress = ({ percentage, size = 200, strokeWidth = 12 }: { percentage: number; size?: number; strokeWidth?: number }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const getColor = (percentage: number) => {
    if (percentage >= 80) return 'hsl(var(--success))';
    if (percentage >= 60) return 'hsl(var(--warning))';
    return 'hsl(var(--destructive))';
  };

  const getGradientId = (percentage: number) => {
    if (percentage >= 80) return 'success-gradient';
    if (percentage >= 60) return 'warning-gradient';
    return 'destructive-gradient';
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        className="transform -rotate-90 drop-shadow-lg"
        width={size}
        height={size}
      >
        <defs>
          <linearGradient id="success-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--success))" />
            <stop offset="100%" stopColor="hsl(var(--success))" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="warning-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--warning))" />
            <stop offset="100%" stopColor="hsl(var(--warning))" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="destructive-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--destructive))" />
            <stop offset="100%" stopColor="hsl(var(--destructive))" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-muted-foreground"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#${getGradientId(percentage)})`}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-2000 ease-out"
          style={{
            filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.1))'
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl font-bold text-foreground">
            {percentage}%
          </div>
          <div className="text-sm font-medium text-muted-foreground mt-1">Score</div>
        </div>
      </div>
    </div>
  );
};

export default function AssessmentResult({ result, onNext }: Props) {
  console.log('ASSESSMENT RESULT DATA:', JSON.stringify(result, null, 2));
  
  // Normalize the result object to ensure consistent property names
  const normalizedResult = React.useMemo(() => {
    if (!result) return null;
    
    const normalized = { ...result };
    
    // Ensure we have both property names for assessment_result/assessmentResult
    if (normalized.assessmentResult && !normalized.assessment_result) {
      normalized.assessment_result = normalized.assessmentResult;
    } else if (normalized.assessment_result && !normalized.assessmentResult) {
      normalized.assessmentResult = normalized.assessment_result;
    }
    
    // Ensure we have both property names for evaluatedAnswers/result
    if (normalized.evaluatedAnswers && !normalized.result) {
      normalized.result = normalized.evaluatedAnswers;
    } else if (normalized.result && !normalized.evaluatedAnswers) {
      normalized.evaluatedAnswers = normalized.result;
    }
    
    return normalized;
  }, [result]);
  
  // Add additional debug info for troubleshooting
  if (normalizedResult) {
    console.log('NORMALIZED RESULT STRUCTURE CHECK:', {
      hasAssessmentResult: Boolean(normalizedResult.assessment_result),
      hasAssessment: Boolean(normalizedResult.assessment),
      hasEvaluatedAnswers: Boolean(normalizedResult.evaluatedAnswers),
      hasQuestions: Boolean(normalizedResult.questions),
      hasScore: Boolean(normalizedResult.score),
      hasPercentage: Boolean(normalizedResult.percentage),
      hasDifficultyLevel: Boolean(normalizedResult.assessment?.difficultyLevel || 
                                 normalizedResult.assessment_result?.difficultyLevel)
    });
  }
  
  if (!normalizedResult) {
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

  // Validate that we have necessary data to render the assessment
  const assessment_result = normalizedResult.assessment_result;
  const assessment = normalizedResult.assessment || assessment_result?.assessment || {};
  
  // Extract all key data with proper validation
  const evaluatedAnswers = normalizedResult.evaluatedAnswers || [];
  const questions = normalizedResult.questions || [];
  const score = result.score || assessment_result.score || 0;
  const totalQuestions = result.totalQuestions || assessment_result.totalQuestions || questions.length || 0;
  const percentage = result.percentage || assessment_result.percentage || 0;
  const advice = result.advice || assessment_result.advice || '';
  const difficultyLevel = assessment?.difficultyLevel || assessment_result?.difficultyLevel || 'medium';

  // Check if we have the minimum required data - more extensive validation
  if (!assessment_result || 
      !evaluatedAnswers || 
      evaluatedAnswers.length === 0 || 
      !questions || 
      questions.length === 0 ||
      evaluatedAnswers.length !== questions.length ||
      !difficultyLevel) {
    
    console.error('Assessment initialization failed with the following data:', {
      hasAssessmentResult: Boolean(assessment_result),
      hasEvaluatedAnswers: Boolean(evaluatedAnswers),
      evaluatedAnswersLength: evaluatedAnswers?.length || 0,
      hasQuestions: Boolean(questions),
      questionsLength: questions?.length || 0,
      lengthMismatch: evaluatedAnswers?.length !== questions?.length,
      difficultyLevel: difficultyLevel || 'missing'
    });
    
    return (
      <div className="py-12 flex justify-center">
        <Card className="w-full max-w-md border-border">
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto">
                <XCircle className="w-8 h-8 text-red-500" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Assessment not properly initialized</h3>
                <p className="text-muted-foreground text-sm">
                  Required assessment data is missing. Please refresh and try again.
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {!difficultyLevel ? 'Missing difficulty level. ' : ''}
                  {!evaluatedAnswers || evaluatedAnswers.length === 0 ? 'Missing evaluated answers. ' : ''}
                  {!questions || questions.length === 0 ? 'Missing questions. ' : ''}
                  {evaluatedAnswers?.length !== questions?.length ? 'Mismatch between questions and answers. ' : ''}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Detailed logging for debugging
  console.log('ASSESSMENT DATA VALIDATED:', {
    score,
    totalQuestions,
    percentage,
    difficultyLevel,
    evaluatedAnswersCount: evaluatedAnswers.length,
    questionsCount: questions.length
  });
  
  console.log('EVALUATED ANSWERS:', evaluatedAnswers);
  console.log('QUESTIONS WITH OPTIONS:', questions);
  
  // Log structured information about questions and answers to help debug
  if (evaluatedAnswers.length > 0 && questions.length > 0) {
    console.log('FIRST QUESTION DATA:', questions[0]);
    console.log('FIRST ANSWER DATA:', evaluatedAnswers[0]);
    console.log('USER SELECTED OPTIONS:', evaluatedAnswers[0]?.userSelectedOptions || 'None');
    console.log('QUESTION OPTIONS:', questions[0]?.options || 'None');
  }

  const getPerformanceData = (percentage: number) => {
    if (percentage >= 90) return {
      title: "Excellent",
      titleClass: "text-green-600 dark:text-green-400",
      description: "Outstanding performance! You've mastered this topic."
    };
    if (percentage >= 80) return {
      title: "Excellent",
      titleClass: "text-green-600 dark:text-green-400",
      description: "Great job! You have a strong understanding."
    };
    if (percentage >= 70) return {
      title: "Good",
      titleClass: "text-yellow-600 dark:text-yellow-400",
      description: "Well done! You're on the right track."
    };
    if (percentage >= 60) return {
      title: "Good",
      titleClass: "text-yellow-600 dark:text-yellow-400",
      description: "Good effort! Keep practicing to improve."
    };
    return {
      title: "Poor",
      titleClass: "text-red-600 dark:text-red-400",
      description: "Don't worry! Review the material and try again."
    };
  };

  const performance = getPerformanceData(percentage);

  return (
    <div className="max-w-6xl mx-auto py-8 space-y-12">
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          <AssistantMessage
            markdownText={advice}
            flow="horizontal"
          />
        </div>
      </div>

      <div className=" py-8">
        <div className="text-center space-y-8">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <CircularProgress percentage={percentage} size={240} strokeWidth={16} />
            </div>

            <div className="space-y-4">
              <h1 className={`text-6xl font-bold ${performance.titleClass}`}>
                {performance.title}
              </h1>
              <div className="flex items-center justify-center gap-3">
                <p className="text-2xl text-muted-foreground font-medium">
                  Assessment Complete
                </p>
              </div>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                {performance.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mx-auto mb-3">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary">{score}</div>
                <div className="text-sm text-muted-foreground font-medium">Correct Answers</div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-secondary/20 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-full mx-auto mb-3">
                  <Target className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div className="text-3xl font-bold text-secondary-foreground">{totalQuestions}</div>
                <div className="text-sm text-muted-foreground font-medium">Total Questions</div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-accent/20 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-accent-foreground" />
                </div>
                <div className="text-3xl font-bold text-accent-foreground">{percentage}%</div>
                <div className="text-sm text-muted-foreground font-medium">Accuracy</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>



      {evaluatedAnswers && evaluatedAnswers.length > 0 && (
        <div>
          <div className="space-y-4">
            {evaluatedAnswers.map((answer: any, index: number) => {
              const questionId = answer.questionId || answer.question || index + 1;
              const isCorrect = answer.isCorrect || false;
              const questionContent = answer.questionContent || '';

              const questionData = questions.find((q: any) => 
                q.id === questionId || q.id === answer.question
              ) || (questions[index] || null);

              const questionType = questionData?.type || 'unknown';
              const isTextQuestion = questionType === 'short_answer' || questionType === 'text';

              const displayedQuestionContent = questionData?.content || questionContent || `Question ${index + 1}`;

              const userAnswers = answer.userAnswers || [];
              const userSelectedOptions = answer.userSelectedOptions || [];
              const correctOptionIds = answer.correctOptionsIDs || [];
              const userAnswerText = isTextQuestion && userAnswers.length > 0 ? userAnswers[0] : '';
              const correctAnswerText = answer.correctAnswerText || 'Not available';

              return (
                <Card
                  key={questionId}
                  className={`border-l-4 transition-all duration-200 hover:shadow-md ${isCorrect
                      ? 'border-l-green-500 bg-green-50/30 dark:bg-green-950/10'
                      : 'border-l-red-500 bg-red-50/30 dark:bg-red-950/10'
                    }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <h5 className="font-semibold text-base text-foreground">Question {index + 1}</h5>
                      </div>
                      {isCorrect ? (
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
                      <Markdown content={displayedQuestionContent} />
                    </div>

                    {isTextQuestion ? (
                      <div className="space-y-4">
                        <div className="p-4 bg-muted/30 rounded-lg border">
                          <div className="font-semibold text-foreground mb-2">Your answer:</div>
                          <div className={`font-medium ${isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            {userAnswerText || 'No answer provided'}
                          </div>
                        </div>

                        {!isCorrect && (
                          <div className="mt-4">
                            <AssistantMessage
                              markdownText={`${correctAnswerText}`}
                              flow="horizontal"
                            />
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {/* Always render options section for non-text questions */}
                        <div>
                          <div className="font-semibold text-foreground mb-2">All options:</div>
                          <div className="space-y-2">
                            {/* Check if we have options from questionData */}
                            {questionData?.options && Array.isArray(questionData.options) && questionData.options.length > 0 ? (
                              // Map through options from questionData
                              questionData.options.map((option: any) => {
                                // Safely extract option ID with fallback
                                const optionId = option.id || option._id || '';
                                // Handle various formats of userSelectedOptions
                                const isSelected = Array.isArray(userSelectedOptions) 
                                  ? userSelectedOptions.includes(optionId) 
                                  : (typeof userSelectedOptions === 'string' && userSelectedOptions === optionId);
                                const isCorrectOption = Array.isArray(correctOptionIds) 
                                  ? correctOptionIds.includes(optionId)
                                  : (typeof correctOptionIds === 'string' && correctOptionIds === optionId);

                                // Determine the display state for this option
                                let displayState = 'neutral';
                                if (isSelected && isCorrectOption) displayState = 'correct-selected';
                                else if (isSelected && !isCorrectOption) displayState = 'incorrect-selected';
                                else if (!isSelected && isCorrectOption) displayState = 'correct-missed';

                                return (
                                  <div
                                    key={optionId}
                                    className={`flex items-start p-3 rounded-lg border ${displayState === 'correct-selected'
                                        ? 'bg-green-50 dark:bg-green-950/20 border-green-300 dark:border-green-800'
                                        : displayState === 'incorrect-selected'
                                          ? 'bg-red-50 dark:bg-red-950/20 border-red-300 dark:border-red-800'
                                          : displayState === 'correct-missed'
                                            ? 'bg-yellow-50 dark:bg-yellow-950/10 border-yellow-300 dark:border-yellow-800 border-dashed'
                                            : 'bg-muted/30 border-muted-foreground/20'
                                      }`}
                                  >
                                    <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 ${displayState === 'correct-selected'
                                        ? 'bg-green-500 text-white'
                                        : displayState === 'incorrect-selected'
                                          ? 'bg-red-500 text-white'
                                          : displayState === 'correct-missed'
                                            ? 'bg-yellow-500/20 border border-yellow-500 text-yellow-600 dark:text-yellow-400'
                                            : 'bg-muted-foreground/20 text-muted-foreground'
                                      }`}>
                                      {displayState === 'correct-selected' && <CheckCircle className="w-4 h-4" />}
                                      {displayState === 'incorrect-selected' && <XCircle className="w-4 h-4" />}
                                      {displayState === 'correct-missed' && <CheckCircle className="w-4 h-4 opacity-70" />}
                                    </div>
                                    <div className="prose prose-sm max-w-none">
                                      <Markdown content={option.content || ''} />
                                    </div>
                                  </div>
                                );
                              })
                            ) : (
                              // Fallback if we don't have options in questionData
                              <div className="p-3 rounded-lg border bg-muted/30 border-muted-foreground/20">
                                <p className="text-muted-foreground">Options data not available</p>
                              </div>
                            )}
                          </div>
                        </div>

                        {!isCorrect && (
                          <div className="mt-6 pt-4 border-t border-border">
                            <AssistantMessage
                              markdownText={`${correctAnswerText}`}
                              flow="horizontal"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      <div className="text-center pt-8">
        {(percentage < 80 || difficultyLevel !== 'hard') && (
          <div className="mb-6 p-4 bg-amber-100 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 rounded-lg max-w-xl mx-auto">
            <div className="flex items-center space-x-3">
              <Target className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
              <p className="text-amber-800 dark:text-amber-300 font-medium">
                {difficultyLevel !== 'hard' 
                  ? `This was a ${difficultyLevel} assessment. You need to complete a hard assessment with at least 80% score to advance to the next unit.`
                  : `You need to score at least 80% on this hard assessment to advance to the next unit.`
                }
              </p>
            </div>
          </div>
        )}
        <Button
          onClick={onNext}
          className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground px-10 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl"
          size="lg"
        >
          <Award className="w-6 h-6 mr-3" />
          Continue Learning Journey
          <ArrowRight className="w-6 h-6 ml-3" />
        </Button>
      </div>
    </div>
  )
}