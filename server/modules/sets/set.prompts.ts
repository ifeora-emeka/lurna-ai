
export const setCreationPrompt = (prompt: string): string => {
    return `Create a learning set for: "${prompt}"

IMPORTANT: Your response must be VALID JSON ONLY - no explanations, markdown, or other text.

Generate a JSON object with these fields:
- name: Clear, engaging title (20-80 chars)
- description: What learners will achieve (100-300 chars)  
- keywords: 5-12 relevant search terms (array of strings, use lowercase with hyphens)
- iconClass: FontAwesome icon (fa-code, fa-book, fa-chart-line, fa-lightbulb, etc.)

Available FontAwesome icons:
Business: fa-chart-line, fa-briefcase, fa-dollar-sign
Tech: fa-code, fa-laptop, fa-database, fa-mobile
Creative: fa-paint-brush, fa-camera, fa-music
Academic: fa-book, fa-graduation-cap, fa-microscope
General: fa-lightbulb, fa-rocket, fa-globe

The response must be valid JSON that can be parsed with JSON.parse() and match this structure:
{
  "name": "Learning Set Name",
  "description": "Brief description of what you'll learn",
  "keywords": ["keyword-1", "keyword-2", "keyword-3"],
  "iconClass": "fa-code"
}

Do not include any explanations or text outside the JSON object.`;
};
