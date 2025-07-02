import React from 'react'
import AssistantAvatar from '../AssistantAvatar'

type Props = {}

// for learning path that has no units
export default function LearningPathGetStarted({ }: Props) {
    return (
        <div>
            <AssistantAvatar size={100}/>
            <h2 className="text-lg font-semibold mb-2">Get Started with Your Learning Path</h2>
            <p className="text-muted-foreground mb-4">Follow these steps to begin:</p>
        </div>
    )
}