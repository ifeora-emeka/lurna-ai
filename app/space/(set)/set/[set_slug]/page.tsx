'use client'
import AppBody from '@/components/app-layout/AppBody'
import React, { useEffect, useRef } from 'react'
import { useSet } from '@/context/set.context'
import { useLearningPath, LearningPathProvider } from '@/context/learning-path.context'
import LearningPathGetStarted from '@/components/assessment/LearningPathGetStarted';
import LearningPathNext from '@/components/assessment/LearningPathNext';
import Assessment from '@/components/assessment/Assessment';
import AssessmentResult from '@/components/assessment/AssessmentResult';

function SetPageContent() {
  const { state: setState } = useSet();
  const { state, handleLearningPathStarted, handleAssessmentStart, handleAssessmentComplete, handleNextAssessment } = useLearningPath();
  const learningPathStartedRef = useRef(false);

  useEffect(() => {
    if (setState.learningPath && state.currentView === 'get-started' && !learningPathStartedRef.current) {
      learningPathStartedRef.current = true;
      handleLearningPathStarted();
    }
  }, [setState.learningPath, state.currentView, handleLearningPathStarted]);

  const renderCurrentView = () => {
    switch (state.currentView) {
      case 'get-started':
        return <LearningPathGetStarted onStart={handleLearningPathStarted} />;
      case 'learning-path-next':
        return <LearningPathNext onAssessmentStart={handleAssessmentStart} />;
      case 'assessment':
        return (
          <Assessment 
            assessmentData={state.assessmentData}
            nextSteps={state.nextSteps}
            onComplete={handleAssessmentComplete}
          />
        );
      case 'result':
        return (
          <AssessmentResult 
            result={state.assessmentResult}
            onNext={handleNextAssessment}
          />
        );
      default:
        return <LearningPathGetStarted onStart={handleLearningPathStarted} />;
    }
  };
  
  return (
    <AppBody
      heading={setState.set?.name || 'Set Details'}
      subHeading={setState.set?.description || 'Explore your set details and statistics.'}
    >
      {renderCurrentView()}
    </AppBody>
  )
}

export default function SetPage() {
  return (
    <LearningPathProvider>
      <SetPageContent />
    </LearningPathProvider>
  )
}
