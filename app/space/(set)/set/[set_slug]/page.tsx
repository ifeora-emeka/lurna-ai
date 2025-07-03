'use client'
import AppBody from '@/components/app-layout/AppBody'
import React, { useState, useEffect } from 'react'
import { useSet } from '@/context/set.context'
import LearningPathGetStarted from '@/components/assessment/LearningPathGetStarted';
import LearningPathNext from '@/components/assessment/LearningPathNext';
import Assessment from '@/components/assessment/Assessment';
import AssessmentResult from '@/components/assessment/AssessmentResult';

type AppState = {
  currentView: 'get-started' | 'learning-path-next' | 'assessment' | 'result';
  assessmentData: any;
  assessmentResult: any;
  nextSteps: any;
}

export default function SetPage() {
  const { state } = useSet();
  const [appState, setAppState] = useState<AppState>({
    currentView: 'get-started',
    assessmentData: null,
    assessmentResult: null,
    nextSteps: null
  });

  useEffect(() => {
    if (state.learningPath) {
      setAppState(prev => ({ ...prev, currentView: 'learning-path-next' }));
    }
  }, [state.learningPath]);

  const handleLearningPathStarted = () => {
    setAppState(prev => ({ ...prev, currentView: 'learning-path-next' }));
  };

  const handleAssessmentStart = (assessmentData: any, nextSteps: any) => {
    setAppState(prev => ({ 
      ...prev, 
      currentView: 'assessment',
      assessmentData,
      nextSteps
    }));
  };

  const handleAssessmentComplete = (result: any) => {
    setAppState(prev => ({ 
      ...prev, 
      currentView: 'result',
      assessmentResult: result
    }));
  };

  const handleNextAssessment = () => {
    setAppState(prev => ({ 
      ...prev, 
      currentView: 'learning-path-next',
      assessmentData: null,
      assessmentResult: null
    }));
  };

  const renderCurrentView = () => {
    switch (appState.currentView) {
      case 'get-started':
        return <LearningPathGetStarted onStart={handleLearningPathStarted} />;
      case 'learning-path-next':
        return <LearningPathNext onAssessmentStart={handleAssessmentStart} />;
      case 'assessment':
        return (
          <Assessment 
            assessmentData={appState.assessmentData}
            nextSteps={appState.nextSteps}
            onComplete={handleAssessmentComplete}
          />
        );
      case 'result':
        return (
          <AssessmentResult 
            result={appState.assessmentResult}
            onNext={handleNextAssessment}
          />
        );
      default:
        return <LearningPathGetStarted onStart={handleLearningPathStarted} />;
    }
  };
  
  return (
    <AppBody
      heading={state.set?.name || 'Set Details'}
      subHeading={state.set?.description || 'Explore your set details and statistics.'}
    >
      {renderCurrentView()}
    </AppBody>
  )
}
