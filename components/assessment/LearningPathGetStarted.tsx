import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useSet } from '@/context/set.context'
import { learningPathApi } from '@/lib/api/learning-path'
import { toast } from 'sonner'
import AssistantMessage from '@/components/AssistantMessage'

type Props = {
  onStart?: () => void
}

export default function LearningPathGetStarted({ onStart }: Props) {
  const { state, setState } = useSet();
  const [isLoading, setIsLoading] = useState(false);

  if (state.learningPath) {
    return null;
  }

  const handleCreateLearningPath = async () => {
    if (!state.set) return;
    
    if (!state.modules || state.modules.length === 0) {
      toast.error('Cannot create learning path: Set has no modules');
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await learningPathApi.createLearningPath(state.set.id as number);
      
      setState({
        ...state,
        learningPath: response.data
      });
      
      toast.success('Learning path created successfully!');
      if (onStart) onStart();
    } catch (error) {
      console.error('Failed to create learning path:', error);
      toast.error('Failed to create learning path. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-8 flex justify-center">
      <center className='md:w-[600px] w-full mx-auto text-start'>
        <AssistantMessage
          flow='horizontal'
          markdownText={
            `Welcome to the **${state.set?.name}** learning path
            \n\nThis is your personalized journey to mastering the subject. Click the button below to begin your learning journey.
            `
          }
        >
          <div className='flex justify-start'>
            <Button 
              className="mt-4 self-start" 
              variant="secondary" 
              onClick={handleCreateLearningPath} 
              disabled={isLoading}
            >
              {isLoading ? 'Starting Learning Path...' : 'Start Learning Path'}
            </Button>
          </div>
        </AssistantMessage>
      </center>
    </div>
  )
}