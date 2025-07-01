export const moduleGenerationPrompt = (setName: string, setDescription: string, keywords: string[]): string => {
    console.log('[DEBUG] Generating modules prompt for:', setName);
    console.log('[DEBUG] Set description:', setDescription);
    console.log('[DEBUG] Keywords:', keywords);
    
    if (!keywords || keywords.length === 0) {
        console.log('[DEBUG] No keywords provided, using default keywords');
        keywords = ['learning', 'education', 'knowledge'];
    }

    return `Create learning modules for the set: "${setName}"

Set Description: ${setDescription}
Keywords: ${keywords.join(', ')}

IMPORTANT: Your response must be VALID JSON ARRAY ONLY - no explanations, markdown, or other text.

Generate an array of 3-8 learning modules. Each module should be a JSON object with these fields:
- name: Clear, descriptive module title (20-80 chars)
- description: What learners will achieve in this module (50-200 chars)
- tags: 2-5 relevant tags for the module content (array of strings, use lowercase with hyphens)
- index: Sequential number starting from 0

The modules should:
- Build progressively from basic to advanced concepts
- Cover different aspects of the subject
- Be logically ordered for effective learning
- Have unique and specific names
- Include practical, hands-on elements where possible

The response must be valid JSON ARRAY that can be parsed with JSON.parse() and MUST start with [ and end with ]. It should match this structure:
[
  {
    "name": "Module Name",
    "description": "Brief description of module content",
    "tags": ["tag-1", "tag-2", "tag-3"],
    "index": 0
  }
]

Do not include any explanations or text outside the JSON array.`;
};
