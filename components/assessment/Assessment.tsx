import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Clock, ChevronLeft, ChevronRight, Check } from 'lucide-react'
import { assessmentResultApi } from '@/lib/api/assessment-result'
import { toast } from 'sonner'
import { Markdown } from '@/components/ui/markdown'
import { useLearningPath } from '@/context/learning-path.context'

type Props = {
  assessmentData: any;
  nextSteps: any;
  onComplete: (result: any) => void;
}

export default function Assessment({ assessmentData, nextSteps, onComplete }: Props) {
  const { state, dispatch, handleAnswerChange, handleNext, handlePrevious, isCurrentQuestionAnswered, getAnsweredQuestionsCount } = useLearningPath();

  const questions = assessmentData?.questions || [];
  const assessment = assessmentData?.assessment;
  const assessmentResult = assessmentData?.assessmentResult || assessmentData?.assessment_result;

  console.log('ASSESSMENT DATA:', assessmentData);    
  console.log('ASSESSMENT RESULT:', assessmentResult);
  console.log('QUESTIONS DATA:', questions.length > 0 ? questions[0] : 'No questions');

  const handleSubmit = async (forceSubmit = false) => {
    const formattedAnswers = questions.map((question: any) => {
      const answer = state.answers[question.id];
      return {
        questionId: question.id,
        selectedOptions: Array.isArray(answer) ? answer : (answer ? [answer] : []),
        textAnswer: typeof answer === 'string' ? answer : undefined
      };
    });

    if (!assessmentResult?.id) {
      console.error('Assessment not properly initialized:', {
        assessmentData,
        assessmentResult: assessmentResult || 'missing',
        assessment: assessment || 'missing',
        questions: questions.length
      });
      toast.error('Assessment not properly initialized. Please refresh and try again.');
      return false;
    }

    dispatch({ type: 'SET_SUBMITTING', payload: true });
    try {
      const result = await assessmentResultApi.submitAssessment(
        assessmentResult.id,
        formattedAnswers
      );
      toast.success('Assessment submitted successfully!');
      onComplete(result.data);
      return true;
    } catch (error) {
      console.error('Failed to submit assessment:', error);
      toast.error('Failed to submit assessment');
      return false;
    } finally {
      dispatch({ type: 'SET_SUBMITTING', payload: false });
    }
  };

  const renderQuestion = (question: any) => {
    console.log('RENDERING QUESTION:', question.type, 'OPTIONS:', question.options);
    const questionAnswer = state.answers[question.id];

    if (question.type === 'multiple_choice' || question.type === 'true_false') {
      return (
        <div className="space-y-4">
          {question.options && question.options.length > 0 ? (
            <div className="space-y-3">
              {question.options.map((option: any) => {
                const optionContent = option.content || option.text || '';
                const isSelected = questionAnswer === option.id;
                
                if (!optionContent.trim()) {
                  console.warn('Empty option content detected:', option);
                  return null;
                }
                
                return (
                  <div 
                    key={option.id} 
                    className={`flex items-start space-x-4 p-4 border rounded-xl cursor-pointer transition-all duration-200 group ${
                      isSelected 
                        ? 'border-green-300 bg-green-50 dark:border-green-600 dark:bg-green-950/30' 
                        : 'border-border hover:bg-accent/50 hover:border-accent-foreground/20'
                    }`}
                    onClick={() => handleAnswerChange(question.id, option.id)}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 transition-all ${
                      isSelected 
                        ? 'border-green-500 bg-green-500' 
                        : 'border-muted-foreground group-hover:border-primary'
                    }`}>
                      {isSelected && <Check className="w-4 h-4 text-white" />}
                    </div>
                    <div className="flex-1 cursor-pointer">
                      <div className="text-foreground">
                        {optionContent}
                      </div>
                    </div>
                  </div>
                );
              }).filter(Boolean)}
            </div>
          ) : (
            <div className="text-muted-foreground p-6 bg-destructive/5 border border-destructive/20 rounded-xl">
              <p className="font-medium text-destructive mb-2">⚠️ Missing Options</p>
              <p>No options available for this question. Please contact support.</p>
            </div>
          )}
        </div>
      );
    }
    
    else if (question.type === 'multiple_select') {
      console.log('RENDERING MULTIPLE SELECT OPTIONS:', question.options);
      return (
        <div className="space-y-4">
          {question.options && question.options.length > 0 ? (
            <div className="space-y-3">
              {question.options.map((option: any) => {
                console.log('RENDERING MULTIPLE SELECT OPTION:', option);
                const optionContent = option.content || option.text || '';
                const isSelected = Array.isArray(questionAnswer) && questionAnswer.includes(option.id);
                
                if (!optionContent.trim()) {
                  console.warn('Empty option content detected:', option);
                  return null;
                }
                
                return (
                  <div 
                    key={option.id} 
                    className={`flex items-start space-x-4 p-4 border rounded-xl cursor-pointer transition-all duration-200 group ${
                      isSelected 
                        ? 'border-green-300 bg-green-50 dark:border-green-600 dark:bg-green-950/30' 
                        : 'border-border hover:bg-accent/50 hover:border-accent-foreground/20'
                    }`}
                    onClick={() => {
                      const currentAnswers = Array.isArray(questionAnswer) ? questionAnswer : [];
                      if (isSelected) {
                        handleAnswerChange(question.id, currentAnswers.filter((id: string) => id !== option.id));
                      } else {
                        handleAnswerChange(question.id, [...currentAnswers, option.id]);
                      }
                    }}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 transition-all ${
                      isSelected 
                        ? 'border-green-500 bg-green-500' 
                        : 'border-muted-foreground group-hover:border-primary'
                    }`}>
                      {isSelected && <Check className="w-4 h-4 text-white" />}
                    </div>
                    <div className="flex-1 cursor-pointer">
                      <div className="text-foreground">
                        {optionContent}
                      </div>
                    </div>
                  </div>
                );
              }).filter(Boolean)}
            </div>
          ) : (
            <div className="text-muted-foreground p-6 bg-destructive/5 border border-destructive/20 rounded-xl">
              <p className="font-medium text-destructive mb-2">⚠️ Missing Options</p>
              <p>No options available for this question. Please contact support.</p>
            </div>
          )}
        </div>
      );
    }
    
    else if (question.type === 'short_answer' || question.type === 'text') {
      return (
        <div className="space-y-4">
          <Textarea
            value={questionAnswer || ''}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            placeholder="Enter your answer here..."
            className="min-h-[140px] resize-none"
            rows={6}
          />
          <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg border border-border">
            💡 <strong>Tip:</strong> Provide a clear and concise answer. Your response will be evaluated for accuracy and understanding.
          </p>
        </div>
      );
    }

    return (
      <div className="text-center text-muted-foreground py-12 bg-destructive/5 border border-destructive/20 rounded-xl">
        <div className="max-w-md mx-auto space-y-3">
          <p className="font-semibold text-destructive text-lg">❌ Unsupported Question Type</p>
          <p className="text-destructive/80">Question type: <code className="bg-destructive/10 px-2 py-1 rounded">{question.type}</code></p>
          <div className="text-sm space-y-1">
            <p className="font-medium">Supported types:</p>
            <ul className="text-left">
              <li>• multiple_choice</li>
              <li>• true_false</li>
              <li>• multiple_select</li>
              <li>• short_answer</li>
            </ul>
          </div>
          <p className="text-xs text-destructive/60 mt-4">Please contact support if you continue to see this error.</p>
        </div>
      </div>
    );
  };

  if (!assessmentData || questions.length === 0) {
    return (
      <div className="py-12 flex justify-center">
        <Card className="w-full max-w-md border-border">
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Clock className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">No Assessment Available</h3>
                <p className="text-muted-foreground text-sm">
                  No assessment data could be loaded. Please try refreshing or contact support.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestionData = questions[state.currentQuestion];
  const progress = ((state.currentQuestion + 1) / questions.length) * 100;

  console.log('CURRENT QUESTION:', currentQuestionData);

  if (!currentQuestionData) {
    return (
      <div className="py-12 flex justify-center">
        <Card className="w-full max-w-md border-border">
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">❌</span>
              </div>
              <div>
                <h3 className="font-semibold text-destructive mb-2">Question Not Found</h3>
                <p className="text-muted-foreground text-sm">
                  The current question could not be loaded. Please try going back or refreshing.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Card className="shadow-none bg-card/50 border-border">
        <CardHeader className="space-y-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-foreground">{assessment?.title}</CardTitle>
            <div className="flex items-center gap-2">
              {assessment?.difficultyLevel && (
                <div className={`flex items-center px-4 py-1 rounded-full text-xs font-medium ${
                  assessment.difficultyLevel === 'easy' 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                    : assessment.difficultyLevel === 'medium'
                      ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {assessment.difficultyLevel.charAt(0).toUpperCase() + assessment.difficultyLevel.slice(1)}
                </div>
              )}
              {(assessment?.timeLimit || nextSteps?.isTimed) && (
                <div className="flex items-center text-primary bg-primary/10 px-3 py-1.5 rounded-full">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">
                    {assessment?.timeLimit ? `${assessment.timeLimit} min` : 'Timed Assessment'}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-primary to-primary/80 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-sm text-muted-foreground flex justify-between items-center">
              <span className="font-medium">Question {state.currentQuestion + 1} of {questions.length}</span>
              <span className="text-primary font-medium">
                {getAnsweredQuestionsCount()} of {questions.length} completed
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          <div>
            <div className="mb-8">
              <div className="prose prose-lg max-w-none text-foreground">
                <Markdown content={currentQuestionData.content || currentQuestionData.text || 'Question content not available'} />
              </div>
            </div>
            <div className="mt-6">
              {renderQuestion(currentQuestionData)}
            </div>
            {currentQuestionData.hint && (
              <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/30 rounded-xl">
                <p className="text-sm text-blue-700 dark:text-blue-300 font-semibold mb-3 flex items-center">
                  💡 <span className="ml-2">Hint</span>
                </p>
                <div className="prose prose-sm max-w-none text-blue-700 dark:text-blue-300">
                  <Markdown content={currentQuestionData.hint} />
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center space-x-2 py-6">
            {questions.map((_: any, index: number) => {
              const questionId = questions[index].id;
              const isAnswered = state.answers[questionId] && state.answers[questionId] !== '' && 
                (Array.isArray(state.answers[questionId]) ? state.answers[questionId].length > 0 : true);
              const isCurrent = index === state.currentQuestion;
              
              return (
                <button
                  key={index}
                  onClick={() => dispatch({ type: 'SET_CURRENT_QUESTION', payload: index })}
                  className={`w-10 h-10 rounded-full text-sm font-semibold transition-all duration-200 ${
                    isCurrent 
                      ? 'bg-primary text-primary-foreground shadow-lg ring-2 ring-primary/20' 
                      : isAnswered 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-700/30 hover:bg-green-200 dark:hover:bg-green-900/50' 
                        : 'bg-muted text-muted-foreground border border-border hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={state.currentQuestion === 0}
              className="flex items-center px-6"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {state.currentQuestion === questions.length - 1 ? (
              (() => {
                const unansweredQuestions = questions.filter((question: any) => {
                  const answer = state.answers[question.id];
                  return !answer || (Array.isArray(answer) && answer.length === 0) || answer === '';
                });
                
                const hasUnanswered = unansweredQuestions.length > 0;
                
                if (hasUnanswered) {
                  return (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          disabled={state.submitting}
                          className="bg-green-300 hover:bg-green-500 text-green-800 hover:text-white px-8 py-2.5 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                          {state.submitting ? 'Submitting...' : 'Submit Assessment'}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Incomplete Assessment</AlertDialogTitle>
                          <AlertDialogDescription>
                            You have {unansweredQuestions.length} unanswered question{unansweredQuestions.length !== 1 ? 's' : ''}. 
                            Are you sure you want to submit your assessment? 
                            Unanswered questions will be marked as incorrect.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Review Questions</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleSubmit(true)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Submit Anyway
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  );
                } else {
                  return (
                    <Button
                      onClick={() => handleSubmit(false)}
                      disabled={state.submitting}
                      className="bg-green-300 hover:bg-green-500 text-green-800 hover:text-white px-8 py-2.5 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      {state.submitting ? 'Submitting...' : 'Submit Assessment'}
                    </Button>
                  );
                }
              })()
            ) : (
              <Button
                onClick={handleNext}
                disabled={!isCurrentQuestionAnswered()}
                className="flex items-center px-8 py-2.5 font-semibold shadow-md hover:shadow-lg transition-all duration-200"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
