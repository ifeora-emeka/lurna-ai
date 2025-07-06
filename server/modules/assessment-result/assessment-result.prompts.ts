export const assessmentEvaluationPrompt = (
  assessment: any,
  questions: any[],
  answers: any[],
  set: any,
  module: any,
  unit: any
): string => {
  const questionsWithAnswers = questions.map(question => {
    const answer = answers.find(a => a.questionId === question.id) || { selectedOptions: [], textAnswer: '' };
    const userAnswers = answer.textAnswer 
      ? [answer.textAnswer]
      : (Array.isArray(answer.selectedOptions) ? answer.selectedOptions : []);
    
    return {
      id: question.id,
      content: question.content,
      type: question.type,
      options: question.options,
      userSelectedOptions: answer.selectedOptions || [],
      userTextAnswer: answer.textAnswer || '',
      userAnswers
    };
  });

  return `
You are an expert assessment evaluator. Please evaluate this ${assessment.title} assessment for a learner.

# Learning Context
- Set: "${set.name}" - ${set.description}
- Module: "${module.name}" - ${module.description}
- Unit: "${unit.name}" - ${unit.description}
- Assessment: "${assessment.title}" - ${assessment.description}
- Difficulty Level: ${assessment.difficultyLevel}

# Assessment Questions and Answers
${questionsWithAnswers.map((q, i) => `
## Question ${i + 1}: ${q.content}
Type: ${q.type}
Options: ${q.options.map((opt:any) => `
- ID: ${opt.id}, Content: "${opt.content}"`).join('')}

User's answer: ${q.userAnswers.length > 0 
    ? (q.type.includes('text') 
        ? `"${q.userTextAnswer}"` 
        : `Selected options: [${q.userSelectedOptions.map((id:any) => {
            const option = q.options.find((o:any) => o.id === id);
            return option ? `"${option.content}"` : id;
        }).join(', ')}]`)
    : 'No answer provided'}
`).join('\n')}

# Evaluation Instructions
1. For each question, determine:
   - Whether the answer is correct
   - The correct answer(s) with detailed explanations using markdown
   - Appropriate feedback for the learner

2. Provide an overall assessment including:
   - Total score (number of correct answers)
   - Percentage score
   - Constructive advice for improvement

3. In your advice, include specific information about the learning path progression:
   - Mention that students need to score at least 80% on a hard assessment to move to the next unit
   - If this was a hard assessment and they scored ≥80%, congratulate them on unlocking the next unit
   - If this was a hard assessment and they scored <80%, encourage them to try another hard assessment
   - If this was a medium assessment and they scored ≥80%, tell them they'll now get a hard assessment
   - If this was a medium assessment and they scored <80%, suggest trying another medium assessment
   - If this was an easy assessment and they scored ≥80%, tell them they'll now get a medium assessment
   - If this was an easy assessment and they scored <80%, encourage them to try another easy assessment

# Response Format
Respond with a valid JSON object matching the following schema:

{
  "evaluatedAnswers": [
    {
      "question": questionId,
      "correctAnswerText": "Detailed explanation of the correct answer using markdown",
      "correctOptionsIDs": ["id1", "id2"],  // IDs of correct options
      "userAnswers": ["user's answers"],
      "userSelectedOptions": ["id1", "id2"], // IDs of options the user selected
      "isCorrect": boolean,
      "isUnanswered": boolean
    }
  ],
  "advice": "Detailed constructive feedback",
  "score": number,  // Number of correct answers
  "totalQuestions": number,
  "percentage": number  // Score percentage
}

IMPORTANT: Make sure to include userSelectedOptions in each evaluatedAnswer, which is an array of the IDs of options the user selected. This is essential for properly displaying the assessment results.
`;
};
