
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export class AI {
    private static readonly API_KEY = process.env.AI_API_KEY;
    private static readonly API_URL = 'https://openrouter.ai/api/v1/chat/completions';
    private static readonly MODEL = process.env.AI_MODEL || 'deepseek/deepseek-v3-base:free';

    private static validateApiKey() {
        if (!this.API_KEY) {
            throw new Error('AI_API_KEY environment variable is missing or empty');
        }
    }

    static async generateText(prompt: string): Promise<string> {
        console.log('[DEBUG] Starting generateText with prompt:', prompt);
        
        this.validateApiKey();
        
        try {
            console.log('[DEBUG] Making API request to OpenRouter...');
            
            const response = await axios.post(this.API_URL, {
                model: this.MODEL,
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ]
            }, {
                headers: {
                    'Authorization': `Bearer ${this.API_KEY}`,
                    'Content-Type': 'application/json',
                },
                timeout: 30000
            });

            console.log('[DEBUG] API response received');
            console.log('[DEBUG] Response status:', response.status);
            
            const content = response.data.choices[0].message.content;
            console.log('[DEBUG] Generated text:', content);
            
            return content;
        } catch (error) {
            console.error('[DEBUG] Error in generateText:', error);
            if (axios.isAxiosError(error)) {
                console.error('[DEBUG] Axios error details:', {
                    status: error.response?.status,
                    statusText: error.response?.statusText,
                    data: error.response?.data
                });
            }
            throw error;
        }
    }

    static async generateStructuredData({ prompt, zodSchema }: { prompt: string, zodSchema: any }) {
        console.log('[DEBUG] Starting generateStructuredData with prompt:', prompt);
        
        this.validateApiKey();
        
        try {
            const enhancedPrompt = `Create educational modules for the topic: ${prompt}

Return a JSON object with this structure:
{
  "modules": [
    {
      "name": "Module Name",
      "description": "Module description"
    }
  ]
}

Create 5-8 modules that progress from beginner to advanced. Each module needs a name and description. Return only valid JSON.`;

            console.log('[DEBUG] Enhanced prompt created, length:', enhancedPrompt.length);
            console.log('[DEBUG] Making API request to OpenRouter...');
            
            const response = await axios.post(this.API_URL, {
                model: this.MODEL,
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful assistant that returns only valid JSON responses for educational content creation.'
                    },
                    {
                        role: 'user',
                        content: enhancedPrompt
                    }
                ],
                temperature: 0.1,
                max_tokens: 1500
            }, {
                headers: {
                    'Authorization': `Bearer ${this.API_KEY}`,
                    'Content-Type': 'application/json',
                },
                timeout: 30000
            });

            console.log('[DEBUG] API response received');
            console.log('[DEBUG] Response status:', response.status);
            console.log('[DEBUG] Response data:', response.data);
            
            let responseText = response.data.choices[0].message.content;
            console.log('[DEBUG] Raw response text:', responseText);
            
            
            responseText = responseText.trim();
    
            if (responseText.startsWith('```json')) {
                console.log('[DEBUG] Removing json markdown formatting');
                responseText = responseText.replace(/```json\n?/, '').replace(/\n?```$/, '');
            } else if (responseText.startsWith('```')) {
                console.log('[DEBUG] Removing generic markdown formatting');
                responseText = responseText.replace(/```\n?/, '').replace(/\n?```$/, '');
            }
            
            const jsonMatch = responseText.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                console.log('[DEBUG] Found JSON match, extracting...');
                responseText = jsonMatch[0];
            } else {
                const startIndex = responseText.indexOf('{');
                const lastIndex = responseText.lastIndexOf('}');
                if (startIndex !== -1 && lastIndex !== -1 && lastIndex > startIndex) {
                    console.log('[DEBUG] Found JSON boundaries, extracting...');
                    responseText = responseText.substring(startIndex, lastIndex + 1);
                } else {
                    console.log('[DEBUG] No valid JSON boundaries found');
                    throw new Error('AI response does not contain valid JSON structure');
                }
            }
            
            responseText = responseText.trim();
            console.log('[DEBUG] Final response text for parsing:', responseText);
            
            if (!responseText || responseText === '{}' || responseText === '{') {
                console.log('[DEBUG] Invalid or incomplete JSON response');
                throw new Error('AI response is empty or incomplete');
            }
            
            try {
                console.log('[DEBUG] Attempting to parse JSON...');
                const parsedJson = JSON.parse(responseText);
                console.log('[DEBUG] JSON parsed successfully:', parsedJson);
                
                console.log('[DEBUG] Validating with zodSchema...');
                const validated = zodSchema.parse(parsedJson);
                console.log('[DEBUG] Validation successful');
                
                return validated;
            } catch (parseError) {
                console.error('[DEBUG] Failed to parse or validate JSON:', parseError);
                console.error('[DEBUG] Raw response that failed:', responseText);
                throw new Error('Failed to parse AI response as valid JSON or validation failed');
            }
        } catch (error) {
            console.error('[DEBUG] Error in generateStructuredData:', error);
            if (axios.isAxiosError(error)) {
                console.error('[DEBUG] Axios error details:', {
                    status: error.response?.status,
                    statusText: error.response?.statusText,
                    data: error.response?.data
                });
            }
            
            throw new Error('Failed to generate structured data from AI service');
        }
    }

}
