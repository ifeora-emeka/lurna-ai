import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useSet } from '@/context/set.context'
import { learningPathApi } from '@/lib/api/learning-path'
import { toast } from 'sonner'
import AssistantMessage from '@/components/AssistantMessage'
import LearningPathLoading from './LearningPathLoading'

type Props = {
  onAssessmentStart: (assessmentData: any, nextSteps: any) => void
}

export default function LearningPathNext({ onAssessmentStart }: Props) {
  const { state } = useSet();
  const [loading, setLoading] = useState(false);
  const [nextSteps, setNextSteps] = useState<any>(null);
  const [pendingAssessment, setPendingAssessment] = useState<any>(null);

  useEffect(() => {
    if (state.set?.id) {
      fetchNextSteps();
    }
  }, [state.set?.id]);

  const fetchNextSteps = async () => {
    if (!state.set?.id) return;
    
    setLoading(true);
    try {
      const response = await learningPathApi.getNextSteps(state.set.id);
      setNextSteps(response.data.nextSteps);
      setPendingAssessment(response.data.pendingAssessment);
    } catch (error) {
      console.error('Failed to fetch next steps:', error);
      toast.error('Failed to fetch learning path');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateAssessment = async () => {
    if (!state.set?.id || !nextSteps) return;
    
    setLoading(true);
    try {
      if(!state.learningPath?.currentUnitId) return toast.error('Error, please try again');
      const response = await learningPathApi.generateAssessment(state.learningPath?.currentUnitId, nextSteps);
      onAssessmentStart(response.data, nextSteps);
    } catch (error) {
      console.error('Failed to generate assessment:', error);
      toast.error('Failed to generate assessment');
    } finally {
      setLoading(false);
    }
  };

  if (pendingAssessment) {
    
    return (
      <div className="py-8 flex justify-center">
        <center className='md:w-[500px] w-full mx-auto'>
          <AssistantMessage
            flow='vertical'
            markdownText="You have a pending assessment. Complete it to continue your learning journey."
          >
            <center>
              <div className="flex flex-col items-center gap-4">
                <Button 
                  className="mt-4" 
                  onClick={() => onAssessmentStart(pendingAssessment, nextSteps)}
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

  if (loading || !nextSteps) {
    return <LearningPathLoading />;
  }

  return (
    <div className="py-8 flex justify-center">
      <center className='md:w-[500px] w-full mx-auto'>
        <AssistantMessage
          flow='vertical'
          markdownText={nextSteps.messageForStudent}
        >
          <center>
            <div className="flex flex-col items-center gap-4">
              {nextSteps.difficultyLevel && (
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  nextSteps.difficultyLevel === 'easy' 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                    : nextSteps.difficultyLevel === 'medium'
                      ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {nextSteps.difficultyLevel.charAt(0).toUpperCase() + nextSteps.difficultyLevel.slice(1)} Difficulty Assessment
                </div>
              )}
              <Button 
                className="mt-4" 
                onClick={handleGenerateAssessment}
                disabled={loading}
              >
                {loading ? 'Generating Assessment...' : 'Start Assessment'}
              </Button>
            </div>
          </center>
        </AssistantMessage>
      </center>
    </div>
  )
}