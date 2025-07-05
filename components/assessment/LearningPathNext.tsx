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
      const response = await learningPathApi.generateAssessment(1, nextSteps);
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
              <Button 
                className="mt-4" 
                onClick={() => onAssessmentStart(pendingAssessment, nextSteps)}
              >
                Continue Assessment
              </Button>
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
            <Button 
              className="mt-4" 
              onClick={handleGenerateAssessment}
              disabled={loading}
            >
              {loading ? 'Generating Assessment...' : 'Start Assessment'}
            </Button>
          </center>
        </AssistantMessage>
      </center>
    </div>
  )
}