export const unitGenerationPrompt = (moduleName: string, moduleDescription: string, moduleTags: string[]): string => {
  console.log('[DEBUG] Generating units prompt for:', moduleName);
  console.log('[DEBUG] Module description:', moduleDescription);
  console.log('[DEBUG] Module tags:', moduleTags);

  if (!moduleTags || moduleTags.length === 0) {
    console.log('[DEBUG] No tags provided, using default tags');
    moduleTags = ['learning', 'unit', 'lesson'];
  }

  const isDevelopment = process.env.NODE_ENV === 'development';
  const unitCount = isDevelopment ? '3-5' : '8-12';

  return `Create learning units for the module: "${moduleName}"

Module Description: ${moduleDescription}
Module Tags: ${moduleTags.join(', ')}

IMPORTANT: Your response must be VALID JSON ARRAY ONLY - no explanations, markdown, or other text.

Generate an array of ${unitCount} learning units. Each unit should be a JSON object with these fields:
- name: Clear, descriptive unit title (15-60 chars)
- description: What learners will learn in this specific unit (40-150 chars)
- tags: 2-8 relevant tags for the unit content (array of strings, use lowercase with hyphens)
- index: Sequential number starting from 0

The units should:
- Break down the module content into manageable learning chunks
- Build progressively from basic to advanced concepts within the module
- Be logically ordered for effective step-by-step learning
- Have unique and specific names that clearly indicate what will be learned
- Be focused and specific enough to be completed in a single learning session

The response must be valid JSON ARRAY that can be parsed with JSON.parse() and MUST start with [ and end with ]. It should match this structure:
[
  {
    "name": "Unit Name",
    "description": "Brief description of unit content",
    "tags": ["tag-1", "tag-2", "tag-3"],
    "index": 0
  }
]

Do not include any explanations or text outside the JSON array.`;
};
