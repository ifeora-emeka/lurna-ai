
export const setCreationPrompt = (prompt: string): string => {
    return `Create a learning set for: "${prompt}"

IMPORTANT: Your response must be VALID JSON ONLY - no explanations, markdown, or other text.

Generate a JSON object with these fields:
- name: Clear, engaging title (20-80 chars)
- description: What learners will achieve (100-300 chars)
- keywords: 5-12 relevant search terms (array of strings, use lowercase with hyphens)
- iconClass: FontAwesome icon (fa-code, fa-book, fa-chart-line, fa-lightbulb, etc.)
- categorySlug: General or global full name representation of the study set (slugified, lowercase with hyphens)
- subCategorySlug: Specific subject within the category (slugified, lowercase with hyphens)

Category Guidelines:
The category should be a general, global representation of the subject area. For example:
- If learning about Algebra, the category would be "mathematics" (not "math" or "algebra")
- If learning about JavaScript, the category would be "programming" (not "javascript" or "web-development")
- If learning about Criminal Law, the category would be "law" (not "criminal-law")

Common categories include: mathematics, programming, law, art, economics, biology, chemistry, physics, language, history, business, psychology, medicine

Sub-category Guidelines:
The sub-category should be a specific subject within the category. For example:
- If category is "mathematics", sub-categories could be "algebra", "calculus", "geometry", etc.
- If category is "programming", sub-categories could be "javascript", "python", "rust", etc.
- If category is "law", sub-categories could be "criminal-law", "constitutional-law", "contract-law", etc.

The response must be valid JSON that can be parsed with JSON.parse() and match this structure:
{
  "name": "Learning Set Name",
  "description": "Brief description of what you'll learn",
  "keywords": ["keyword-1", "keyword-2", "keyword-3"],
  "iconClass": "fa-solid fa-code",
  "categorySlug": "programming",
  "subCategorySlug": "javascript"
}

Do not include any explanations or text outside the JSON object.`;
};
