import React, { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { useSet } from '@/context/set.context'
import { useLearningPath } from '@/context/learning-path.context'
import { toast } from 'sonner'
import AssistantMessage from '@/components/AssistantMessage'
import LearningPathLoading from './LearningPathLoading'

type Props = {
  onAssessmentStart: (assessmentData: any, nextSteps: any) => void
}

export default function LearningPathNext({ onAssessmentStart }: Props) {
  const { state } = useSet();
  const { state: learningPathState, fetchNextSteps, generateAssessment } = useLearningPath();
  const setIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (state.set?.id && state.set.id !== setIdRef.current) {
      setIdRef.current = state.set.id;
      fetchNextSteps(state.set.id);
    }
  }, [state.set?.id, fetchNextSteps]);

  const handleGenerateAssessment = async () => {
    if (!state.set?.id || !learningPathState.nextSteps || !state.learningPath?.id) return;
    
    try {
      if(!state.learningPath?.currentUnitId) return toast.error('Error, please try again');
      const response = await generateAssessment(state.learningPath.currentUnitId, learningPathState.nextSteps, state.learningPath.id);
      onAssessmentStart(response, learningPathState.nextSteps);
    } catch (error) {
      console.error('Failed to generate assessment:', error);
    }
  };

  if (learningPathState.pendingAssessment) {
    
    return (
      <div className="py-8 flex justify-center">
        <center className='md:w-[600px] w-full mx-auto'>
          <AssistantMessage
            flow='vertical'
            markdownText="You have a pending assessment. Complete it to continue your learning journey."
          >
            <center>
              <div className="flex flex-col items-center gap-4">
                <Button 
                  className="mt-4" 
                  onClick={() => onAssessmentStart(learningPathState.pendingAssessment, learningPathState.nextSteps)}
                >
                  Continue Assessment
                </Button>
              </div>
            </center>
          </AssistantMessage>
        </center>
      </div>
    );
  }

  if (learningPathState.loading || !learningPathState.nextSteps) {
    return <LearningPathLoading />;
  }

  return (
    <div className="py-8 flex justify-center">
      <center className='md:w-[600px]- w-full mx-auto text-start'>
        <AssistantMessage
          flow='horizontal'
          markdownText={learningPathState.nextSteps.messageForStudent}
        >
          <div className='flex justify-start'>
            <div className="flex flex-col items-start justify-start gap-4">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                learningPathState.nextSteps.difficultyLevel === 'easy' 
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                  : learningPathState.nextSteps.difficultyLevel === 'medium'
                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
              }`}>
                {learningPathState.nextSteps.difficultyLevel.charAt(0).toUpperCase() + learningPathState.nextSteps.difficultyLevel.slice(1)} Difficulty Assessment
              </div>
              <Button 
                className="mt-4" 
                onClick={handleGenerateAssessment}
                disabled={learningPathState.loading}
              >
                {learningPathState.loading ? 'Generating Assessment...' : 'Start Assessment'}
              </Button>
            </div>
          </div>
        </AssistantMessage>
      </center>
    </div>
  )
}