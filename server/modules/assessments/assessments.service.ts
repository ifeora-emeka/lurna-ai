import { LLMNextSteps } from '../../../types/llm.types';

export default class AssessmentsService {

    static async generateAssessment({}:{userId:string; nextSteps: LLMNextSteps}) {
        /**
         * This method will use the LLM to generate a new assessment and questions.
         * Then we also create an assessment result with isComplete set to false for the user and assessment that was created.
         * Then we return everything as {assessment, assessment_result, questions, more...}
         * 
         * if the nextSteps 
         */
    }

}
