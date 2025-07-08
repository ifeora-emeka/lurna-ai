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

Generate an array of learning units. Each unit should be a JSON object with these fields:
- name: Clear, descriptive unit title (15-60 chars)
- description: What learners will achieve in this unit (30-150 chars)
- tags: 2-8 relevant tags for the unit content (array of strings, use lowercase with hyphens)
- index: Sequential number starting from 0

If the module is a comprehensive "Final Assessment" module (e.g., named "Final Assessment"), generate exactly 3 units named "Final Test 1", "Final Test 2", "Final Test 3", and a fourth unit named "Final Exam". Each should have a brief description and appropriate tags. Otherwise, generate ${unitCount} units that build progressively and cover the module content.

The response must be a valid JSON ARRAY that can be parsed with JSON.parse() and MUST start with [ and end with ]. It should match this structure:
[
  {
    "name": "Unit Name",
    "description": "Brief description of unit content",
    "tags": ["tag-1", "tag-2", "tag-3"],
    "index": 0
  }
]`;
};
