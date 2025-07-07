'use client'

import React, { createContext, useContext, useReducer, ReactNode, useCallback, useMemo } from 'react';

type AppState = {
  currentView: 'get-started' | 'learning-path-next' | 'assessment' | 'result';
  assessmentData: any;
  assessmentResult: any;
  nextSteps: any;
  currentQuestion: number;
  answers: { [key: number]: any };
  submitting: boolean;
  loading: boolean;
  pendingAssessment: any;
}

type AppAction = 
  | { type: 'SET_CURRENT_VIEW'; payload: AppState['currentView'] }
  | { type: 'SET_ASSESSMENT_DATA'; payload: any }
  | { type: 'SET_ASSESSMENT_RESULT'; payload: any }
  | { type: 'SET_NEXT_STEPS'; payload: any }
  | { type: 'SET_CURRENT_QUESTION'; payload: number }
  | { type: 'SET_ANSWERS'; payload: { [key: number]: any } }
  | { type: 'SET_ANSWER'; payload: { questionId: number; answer: any } }
  | { type: 'SET_SUBMITTING'; payload: boolean }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_PENDING_ASSESSMENT'; payload: any }
  | { type: 'RESET_ASSESSMENT_STATE' }
  | { type: 'START_ASSESSMENT'; payload: { assessmentData: any; nextSteps: any } }
  | { type: 'COMPLETE_ASSESSMENT'; payload: any }
  | { type: 'NEXT_ASSESSMENT' };

const initialState: AppState = {
  currentView: 'get-started',
  assessmentData: null,
  assessmentResult: null,
  nextSteps: null,
  currentQuestion: 0,
  answers: {},
  submitting: false,
  loading: false,
  pendingAssessment: null
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_CURRENT_VIEW':
      return { ...state, currentView: action.payload };
    case 'SET_ASSESSMENT_DATA':
      return { ...state, assessmentData: action.payload };
    case 'SET_ASSESSMENT_RESULT':
      return { ...state, assessmentResult: action.payload };
    case 'SET_NEXT_STEPS':
      return { ...state, nextSteps: action.payload };
    case 'SET_CURRENT_QUESTION':
      return { ...state, currentQuestion: action.payload };
    case 'SET_ANSWERS':
      return { ...state, answers: action.payload };
    case 'SET_ANSWER':
      return { 
        ...state, 
        answers: { 
          ...state.answers, 
          [action.payload.questionId]: action.payload.answer 
        } 
      };
    case 'SET_SUBMITTING':
      return { ...state, submitting: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_PENDING_ASSESSMENT':
      return { ...state, pendingAssessment: action.payload };
    case 'RESET_ASSESSMENT_STATE':
      return {
        ...state,
        assessmentData: null,
        assessmentResult: null,
        currentQuestion: 0,
        answers: {},
        submitting: false
      };
    case 'START_ASSESSMENT':
      return {
        ...state,
        currentView: 'assessment',
        assessmentData: action.payload.assessmentData,
        nextSteps: action.payload.nextSteps,
        currentQuestion: 0,
        answers: {},
        submitting: false
      };
    case 'COMPLETE_ASSESSMENT':
      return {
        ...state,
        currentView: 'result',
        assessmentResult: action.payload,
        submitting: false
      };
    case 'NEXT_ASSESSMENT':
      return {
        ...state,
        currentView: 'learning-path-next',
        assessmentData: null,
        assessmentResult: null,
        currentQuestion: 0,
        answers: {},
        submitting: false
      };
    default:
      return state;
  }
}

type LearningPathContextType = {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  handleLearningPathStarted: () => void;
  handleAssessmentStart: (assessmentData: any, nextSteps: any) => void;
  handleAssessmentComplete: (result: any) => void;
  handleNextAssessment: () => void;
  handleAnswerChange: (questionId: number, answer: any) => void;
  handleNext: () => void;
  handlePrevious: () => void;
  isCurrentQuestionAnswered: () => boolean;
  getAnsweredQuestionsCount: () => number;
  fetchNextSteps: (setId: number) => Promise<void>;
  generateAssessment: (unitId: number, nextSteps: any) => Promise<any>;
};

const LearningPathContext = createContext<LearningPathContextType | undefined>(undefined);

export const useLearningPath = () => {
  const context = useContext(LearningPathContext);
  if (!context) {
    throw new Error('useLearningPath must be used within a LearningPathProvider');
  }
  return context;
};

export const LearningPathProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const handleLearningPathStarted = useCallback(() => {
    dispatch({ type: 'SET_CURRENT_VIEW', payload: 'learning-path-next' });
  }, []);

  const handleAssessmentStart = useCallback((assessmentData: any, nextSteps: any) => {
    dispatch({ type: 'START_ASSESSMENT', payload: { assessmentData, nextSteps } });
  }, []);

  const handleAssessmentComplete = useCallback((result: any) => {
    dispatch({ type: 'COMPLETE_ASSESSMENT', payload: result });
  }, []);

  const handleNextAssessment = useCallback(() => {
    dispatch({ type: 'NEXT_ASSESSMENT' });
  }, []);

  const handleAnswerChange = useCallback((questionId: number, answer: any) => {
    dispatch({ type: 'SET_ANSWER', payload: { questionId, answer } });
  }, []);

  const handleNext = useCallback(() => {
    const questions = state.assessmentData?.questions || [];
    if (state.currentQuestion < questions.length - 1) {
      dispatch({ type: 'SET_CURRENT_QUESTION', payload: state.currentQuestion + 1 });
    }
  }, [state.currentQuestion, state.assessmentData?.questions]);

  const handlePrevious = useCallback(() => {
    if (state.currentQuestion > 0) {
      dispatch({ type: 'SET_CURRENT_QUESTION', payload: state.currentQuestion - 1 });
    }
  }, [state.currentQuestion]);

  const isCurrentQuestionAnswered = useCallback(() => {
    const questions = state.assessmentData?.questions || [];
    const currentQuestionId = questions[state.currentQuestion]?.id;
    const answer = state.answers[currentQuestionId];
    return answer && answer !== '' && (Array.isArray(answer) ? answer.length > 0 : true);
  }, [state.assessmentData?.questions, state.currentQuestion, state.answers]);

  const getAnsweredQuestionsCount = useCallback(() => {
    const questions = state.assessmentData?.questions || [];
    return questions.filter((question: any) => {
      const answer = state.answers[question.id];
      return answer && answer !== '' && (Array.isArray(answer) ? answer.length > 0 : true);
    }).length;
  }, [state.assessmentData?.questions, state.answers]);

  const fetchNextSteps = useCallback(async (setId: number) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const { learningPathApi } = await import('@/lib/api/learning-path');
      const response = await learningPathApi.getNextSteps(setId);
      dispatch({ type: 'SET_NEXT_STEPS', payload: response.data.nextSteps });
      dispatch({ type: 'SET_PENDING_ASSESSMENT', payload: response.data.pendingAssessment });
    } catch (error) {
      console.error('Failed to fetch next steps:', error);
      const { toast } = await import('sonner');
      toast.error('Failed to fetch learning path');
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const generateAssessment = useCallback(async (unitId: number, nextSteps: any) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const { assessmentApi } = await import('@/lib/api/assessment');
      const response = await assessmentApi.generateAssessment(unitId, nextSteps);
      return response.data;
    } catch (error) {
      console.error('Failed to generate assessment:', error);
      const { toast } = await import('sonner');
      toast.error('Failed to generate assessment');
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const contextValue = useMemo(() => ({
    state,
    dispatch,
    handleLearningPathStarted,
    handleAssessmentStart,
    handleAssessmentComplete,
    handleNextAssessment,
    handleAnswerChange,
    handleNext,
    handlePrevious,
    isCurrentQuestionAnswered,
    getAnsweredQuestionsCount,
    fetchNextSteps,
    generateAssessment
  }), [
    state,
    handleLearningPathStarted,
    handleAssessmentStart,
    handleAssessmentComplete,
    handleNextAssessment,
    handleAnswerChange,
    handleNext,
    handlePrevious,
    isCurrentQuestionAnswered,
    getAnsweredQuestionsCount,
    fetchNextSteps,
    generateAssessment
  ]);

  return (
    <LearningPathContext.Provider value={contextValue}>
      {children}
    </LearningPathContext.Provider>
  );
};
