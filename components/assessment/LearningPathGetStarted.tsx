import React, { useState } from 'react'
import AssistantMessage from '../AssistantMessage'
import { Button } from '../ui/button'
import { useSet } from '@/context/set.context'
import { learningPathApi } from '@/lib/api/learning-path'
import { toast } from 'sonner'

type Props = {}

export default function LearningPathGetStarted({ }: Props) {
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
            const response = await learningPathApi.createLearningPath({
                setId: state.set.id as number
            });
            
            setState({
                ...state,
                learningPath: response.data
            });
            
            toast.success('Learning path created successfully!');
        } catch (error) {
            console.error('Failed to create learning path:', error);
            toast.error('Failed to create learning path. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="py-8 flex justify-center">
            <center className='md:w-[500px] w-full mx-auto'>
                <AssistantMessage
                    flow='vertical'
                    markdownText={
                        `Welcome to the **${state.set?.name}** learning path
                    \n\nThis is your personalized journey to mastering the subject. Click the button below to begin your learning journey.
                    `
                    }
                >
                    <center>
                        <Button 
                            className="mt-4 self-start" 
                            variant="secondary" 
                            onClick={handleCreateLearningPath} 
                            loading={isLoading}
                        >
                            Start Learning Path
                        </Button>
                    </center>
                </AssistantMessage>
            </center>

        </div>
    )
}