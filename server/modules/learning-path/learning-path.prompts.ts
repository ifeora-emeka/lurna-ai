export const evaluateNextStepsPrompt = (unitName: string, unitDescription: string, assessmentHistory: any[]): string => {
  const hasHistory = assessmentHistory && assessmentHistory.length > 0;
  
  if (!hasHistory) {
    return `Welcome message for new unit: "${unitName}"

IMPORTANT: Your response must be VALID JSON ONLY - no explanations, markdown, or other text.

Create a welcome message for a student starting this unit:
- Unit: ${unitName}
- Description: ${unitDescription}

Generate a JSON object with these exact fields:
{
  "messageForStudent": "Welcome message introducing the unit and what they'll learn",
  "difficultyLevel": "easy",
  "canMoveForward": false,
  "isTimed": false,
  "areasToTackle": [],
  "totalUnitAssessment": 0
}

The response must be valid JSON that can be parsed with JSON.parse().`;
  }

  const assessmentSummary = assessmentHistory.map(item => {
    const correctAnswers = item.assessmentResult.result.filter((r: any) => r.isCorrect).length;
    const totalQuestions = item.assessmentResult.result.length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    
    return {
      assessmentTitle: item.assessment.title,
      score: score,
      correctAnswers,
      totalQuestions,
      difficultyLevel: item.assessment.difficultyLevel,
      passed: score >= 80,
      questions: item.questions.map((q: any) => ({
        id: q.id,
        content: q.content,
        type: q.type,
        options: q.options
      })),
      evaluatedResults: item.assessmentResult.result.map((r: any) => ({
        questionId: r.question,
        isCorrect: r.isCorrect,
        isUnanswered: r.isUnanswered,
        correctAnswerText: r.correctAnswerText,
        userAnswers: r.userAnswers,
        userSelectedOptions: r.userSelectedOptions
      })),
      weakAreas: item.assessmentResult.result
        .filter((r: any) => !r.isCorrect)
        .map((r: any) => r.correctAnswerText)
    };
  }).slice(-3);

  return `You are an AI learning advisor responsible for making progression decisions based on student performance. Analyze the assessment history and determine the next steps.

**LEARNING UNIT DETAILS:**
- Unit Name: "${unitName}"
- Unit Description: ${unitDescription}

**STUDENT'S ASSESSMENT HISTORY (Most Recent First):**
${JSON.stringify(assessmentSummary, null, 2)}

**CRITICAL PROGRESSION RULES - FOLLOW EXACTLY:**

**SCORING CRITERIA:**
- PASSING SCORE: 80% or higher (≥80%)
- FAILING SCORE: Below 80% (<80%)

**MANDATORY PROGRESSION LOGIC:**
You MUST follow this exact progression logic based on the MOST RECENT assessment:

**MOST RECENT ASSESSMENT ANALYSIS:**
- Last Assessment Score: ${assessmentSummary[0]?.score}%
- Last Assessment Difficulty: ${assessmentSummary[0]?.difficultyLevel}
- Last Assessment Passed: ${assessmentSummary[0]?.passed ? 'YES' : 'NO'}

**DECISION MATRIX - FOLLOW EXACTLY:**

1. **If MOST RECENT assessment was EASY and PASSED (≥80%):**
   - difficultyLevel: "medium"
   - canMoveForward: false
   - Message: Congratulate and explain moving to medium difficulty

2. **If MOST RECENT assessment was EASY and FAILED (<80%):**
   - difficultyLevel: "easy" 
   - canMoveForward: false
   - Message: Encourage and explain staying at easy level

3. **If MOST RECENT assessment was MEDIUM and PASSED (≥80%):**
   - difficultyLevel: "hard"
   - canMoveForward: false
   - Message: Congratulate and explain moving to hard difficulty

4. **If MOST RECENT assessment was MEDIUM and FAILED (<80%):**
   - difficultyLevel: "medium"
   - canMoveForward: false
   - Message: Encourage and explain staying at medium level

5. **If MOST RECENT assessment was HARD and PASSED (≥80%):**
   - difficultyLevel: "hard"
   - canMoveForward: true
   - Message: Celebrate mastery and explain advancing to next unit

6. **If MOST RECENT assessment was HARD and FAILED (<80%):**
   - difficultyLevel: "hard"
   - canMoveForward: false
   - Message: Encourage and explain staying at hard level

**MESSAGE REQUIREMENTS:**
- Write a personalized, motivational message for the student.
- Do NOT use generic phrases like "Congratulations on scoring X%" or "You'll now move on to medium difficulty assessments".
- Instead, reference the specific topics or skills the student demonstrated understanding of in previous assessments.
- Use language that guides and encourages the student, such as "You showed great understanding of [topics], now let's take things a bit further."
- Clearly state what the next assessment will focus on, e.g., "For this next assessment, we're going to focus on [areas to tackle]."
- Use phrases like "Let's take things a step further" or "Now let's build on what you've learned" instead of referencing difficulty levels directly.
- The message should help the student understand their progress and what to expect next, in a supportive tone.
- Mention the next focus areas or skills, not just the difficulty level.
- Keep it concise, positive, and actionable.

**AREAS TO TACKLE:**
- Only include areas where the student got questions wrong
- Be specific based on the incorrect answers from the most recent assessment
- If they passed with 100%, leave this array empty or include advanced topics

**TIMING DECISIONS:**
- Use isTimed: false for easy difficulty (reduce anxiety)
- Use isTimed: true for medium and hard difficulty (simulate real conditions)

**VALIDATION CHECK:**
Before responding, verify:
1. You have correctly identified the most recent assessment score and difficulty
2. You are following the exact progression logic based on pass/fail and difficulty
3. Your message is personalized, references specific topics, and guides the student on what comes next
4. Your difficulty level follows the progression rules
5. canMoveForward is only true if they passed a hard assessment

IMPORTANT: Your response must be VALID JSON ONLY - no explanations, markdown, or other text.

Generate a JSON object with these exact fields:
{
  "messageForStudent": "Your personalized message acknowledging their progress, referencing specific topics, and explaining what the next assessment will focus on",
  "difficultyLevel": "easy" | "medium" | "hard",
  "canMoveForward": true | false,
  "isTimed": true | false,
  "areasToTackle": ["specific area 1", "specific area 2"],
  "totalUnitAssessment": ${assessmentHistory.length}
}

The response must be valid JSON that can be parsed with JSON.parse().`;
};

export const generateAssessmentPrompt = (unitName: string, unitDescription: string, difficultyLevel: string, areasToTackle: string[], isTimed: boolean): string => {
  const focusAreas = areasToTackle.length > 0 ? 
    `Focus particularly on these areas where the student needs improvement: ${areasToTackle.join(', ')}` :
    `Cover the core concepts of this unit comprehensively`;

  const isDevelopment = process.env.NODE_ENV === 'development';
  const questionCount = isDevelopment ? 5 : (difficultyLevel === 'easy' ? '15-18' : difficultyLevel === 'medium' ? '20-25' : '25-30');

  const getQuestionTypeGuidance = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return `
QUESTION TYPE DISTRIBUTION FOR EASY LEVEL:
- 60% multiple_choice questions (focus on recognition and understanding)
- 40% true_false questions (simple concept verification)
- 0% short_answer or text questions
- Questions should test basic recall, recognition, and fundamental understanding
- Use simple, clear language with straightforward concepts
- Avoid complex scenarios or multi-step reasoning`;
      case 'medium':
        return `
QUESTION TYPE DISTRIBUTION FOR MEDIUM LEVEL:
- 30% multiple_choice questions (understanding and basic application)
- 20% multiple_select questions (select all that apply - testing comprehensive understanding)
- 30% true_false questions (concept verification with nuance)
- 20% short_answer or text questions (brief explanations, 1-2 sentence responses)
- Questions should test understanding, application, and basic analysis
- Include some scenarios and practical applications
- Require students to apply concepts in familiar contexts`;
      case 'hard':
        return `
QUESTION TYPE DISTRIBUTION FOR HARD LEVEL:
- 15% multiple_choice questions (complex application scenarios, edge cases)
- 10% multiple_select questions (complex multi-concept questions)
- 10% true_false questions (nuanced concepts, advanced principles)
- 65% short_answer or text questions (detailed explanations, analysis, synthesis, examples)
- Questions should test deep understanding, complex application, evaluation, and synthesis
- Include challenging scenarios, edge cases, and real-world applications
- Require students to explain reasoning, provide examples, compare/contrast, or solve problems
- Short answer and text questions should expect 2-4 sentence responses with detailed reasoning`;
      default:
        return `
QUESTION TYPE DISTRIBUTION:
- Mix of multiple_choice, true_false, and short_answer questions
- Adjust complexity based on difficulty level`;
    }
  };

  return `Generate an assessment for unit: "${unitName}"

Unit Description: ${unitDescription}
Difficulty Level: ${difficultyLevel}
${focusAreas}
Time Limit: ${isTimed ? 'Yes (15-20 minutes)' : 'No time limit'}

Create an assessment with:
- ${questionCount} questions total
${getQuestionTypeGuidance(difficultyLevel)}
- Each multiple choice question should have 3-4 answer options
- Mark correct answers clearly

CRITICAL FORMATTING REQUIREMENTS:
1. ALL question content MUST be valid markdown format
2. ALL option content MUST be valid markdown format  
3. For single-line questions, use markdown header 2 format (## Question text)
4. For multi-line questions or questions with context, use regular markdown paragraphs
5. Use markdown for code blocks (\`\`\`), inline code (\`code\`), emphasis (**bold**, *italic*), lists, etc.
6. Never leave option content empty or null
7. For true/false questions, options should be "True" and "False" (simple text)
8. For multiple choice, each option must have meaningful, non-empty content
9. Ensure markdown is properly formatted for rendering (no broken syntax)
10. Use proper spacing and line breaks in markdown content

IMPORTANT HEADER 2 RULE:
- If your question is a single line (one sentence), it MUST start with "## " 
- Multi-line questions or those with context should use regular paragraph format
- Examples: "## What is the correct syntax for a Python function?" vs multi-line explanations

QUESTION TYPE EXAMPLES:

**Easy Level - Single-line True/False Question (Header 2):**
{
  "content": "## Variables in Python must be declared with a specific type before use.",
  "type": "true_false",
  "options": [
    {"id": "true", "content": "True", "isCorrect": false},
    {"id": "false", "content": "False", "isCorrect": true}
  ]
}

**Easy Level - Simple Multiple Choice:**
{
  "content": "## Which symbol is used to start a comment in Python?",
  "type": "multiple_choice",
  "options": [
    {"id": "a", "content": "//", "isCorrect": false},
    {"id": "b", "content": "#", "isCorrect": true},
    {"id": "c", "content": "/*", "isCorrect": false},
    {"id": "d", "content": "--", "isCorrect": false}
  ]
}

**Medium Level - Application Multiple Choice:**
{
  "content": "You need to store user information including name, age, and email. Which Python data structure would be **most appropriate**?\\n\\nConsider that you need to access information by meaningful identifiers rather than numeric indices.",
  "type": "multiple_choice",
  "options": [
    {"id": "a", "content": "A list with nested tuples", "isCorrect": false},
    {"id": "b", "content": "A dictionary with key-value pairs", "isCorrect": true},
    {"id": "c", "content": "A set with unique values", "isCorrect": false},
    {"id": "d", "content": "A string with concatenated values", "isCorrect": false}
  ]
}

**Medium Level - Multiple Select (Select All That Apply):**
{
  "content": "## Which of the following are **valid ways** to create a list in Python?\\n\\nSelect all that apply.",
  "type": "multiple_select",
  "options": [
    {"id": "a", "content": "my_list = []", "isCorrect": true},
    {"id": "b", "content": "my_list = list()", "isCorrect": true},
    {"id": "c", "content": "my_list = [1, 2, 3]", "isCorrect": true},
    {"id": "d", "content": "my_list = (1, 2, 3)", "isCorrect": false}
  ]
}

**Medium Level - Short Answer:**
{
  "content": "## Explain the difference between a list and a tuple in Python.\\n\\nBriefly describe when you would use each one.",
  "type": "short_answer",
  "options": []
}

**Hard Level - Complex Analysis:**
{
  "content": "Consider this Python code and analyze it step by step:\\n\\nCode Example:\\nlist1 = [1, 2, 3, 4, 5]\\nresult = [x*2 for x in list1 if x > 2]\\n\\nExplain:\\n1. What will be the final value of result?\\n2. How does the list comprehension work?\\n3. What are the benefits of this approach?",
  "type": "short_answer",
  "options": []
}

**Hard Level - Complex True/False:**
{
  "content": "## In Python, the expression [] == False evaluates to True because empty lists are considered falsy values.",
  "type": "true_false",
  "options": [
    {"id": "true", "content": "True", "isCorrect": false},
    {"id": "false", "content": "False", "isCorrect": true}
  ]
}

VALIDATION CHECKLIST - VERIFY BEFORE SENDING:
- ✅ All question content is in valid markdown format with proper syntax
- ✅ All option content is in valid markdown format and non-empty
- ✅ True/false questions have exactly 2 options: "True" and "False"
- ✅ Multiple choice questions have 3-4 meaningful options with unique content
- ✅ Short answer questions have empty options array
- ✅ correctAnswers array matches the correct option IDs exactly
- ✅ Questions are clear, unambiguous, and appropriately difficult for the level
- ✅ No broken markdown syntax (unmatched backticks, bold/italic markers, etc.)
- ✅ Question types match the specified distribution for difficulty level
- ✅ Content is educational and relevant to the unit topic
- ✅ No placeholder text like "Option A", "Option B" - all content is meaningful

IMPORTANT: Your response must be VALID JSON ONLY - no explanations, markdown, or other text.

Generate a JSON object with this exact structure:
{
  "assessment": {
    "title": "Assessment title",
    "description": "Brief description of what this assessment covers",
    "type": "quiz",
    "timeLimit": ${isTimed ? 15 : null},
    "difficultyLevel": "${difficultyLevel}"
  },
  "questions": [
    {
      "content": "Question text in markdown format",
      "type": "multiple_choice" | "multiple_select" | "true_false" | "short_answer" | "text",
      "environment": "default",
      "options": [
        {"id": "a", "content": "Option A in markdown format", "isCorrect": false},
        {"id": "b", "content": "Option B in markdown format", "isCorrect": true},
        {"id": "c", "content": "Option C in markdown format", "isCorrect": false}
      ],
      "correctAnswers": ["b"],
      "explanation": "Explanation of why this is the correct answer in markdown",
      "hint": "Optional hint for the question in markdown"
    }
  ]
}

The response must be valid JSON that can be parsed with JSON.parse().`;
};
