import axios from 'axios';
import dotenv from 'dotenv';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HumanMessage } from '@langchain/core/messages';
import z from 'zod';

dotenv.config();

export class AI {
    private static readonly API_KEY = process.env.AI_API_KEY;
    private static readonly MODEL = process.env.AI_MODEL;
    private static mode: ChatGoogleGenerativeAI;

    private static validateApiKey() {
        if (!this.API_KEY) {
            throw new Error('AI_API_KEY environment variable is missing or empty');
        }
        if (!this.MODEL) {
            throw new Error('AI_MODEL environment variable is missing or empty');
        }
    }

    private static getModel() {
        if (!this.mode) {
            this.mode = new ChatGoogleGenerativeAI({
                apiKey: this.API_KEY,
                model: String(this.MODEL),
                temperature: 0,
                maxOutputTokens: 2048,
            });
        }
        return this.mode;
    }

    static async generateText(prompt: string): Promise<string> {
        this.validateApiKey();
        const model = this.getModel();
        const message = new HumanMessage(prompt);
        const response = await model.invoke([message]);
        return response.content as string;
    }

    static async generateStructuredData({ prompt, zodSchema }: { prompt: string, zodSchema: any }) {
        this.validateApiKey();
        const model = this.getModel();
        
        const isArraySchema = zodSchema.element ? true : false;
        
        const jsonPrompt = `${prompt}
CRITICAL: You must respond with ONLY valid JSON. No explanations, no markdown, no code blocks, just pure JSON.
The response MUST be fully valid JSON parseable by JSON.parse().
${isArraySchema ? 'The response should be a JSON array starting with [ and ending with ].' : 'The response should be a JSON object starting with { and ending with }.'}

Respond with valid JSON only:`;
        const message = new HumanMessage(jsonPrompt);
        
        const response = await model.invoke([message]);
        
        let rawContent = response.content as string;
        let data;
        
        try {
            let jsonRegex;
            if (isArraySchema) {
                jsonRegex = /\[[\s\S]*\]/;
            } else {
                jsonRegex = /{[\s\S]*}/;
            }
            
            const match = rawContent.match(jsonRegex);
            
            if (match) {
                data = JSON.parse(match[0]);
            } else {
                data = JSON.parse(rawContent);
            }
        } catch (e) {
            console.error('[DEBUG] JSON parse error:', e);
            console.error('[DEBUG] Failed content:', rawContent);
            throw new Error('Failed to parse JSON from Gemini response');
        }
        
        try {
            const parsed = zodSchema.parse(data);
            return parsed;
        } catch (zodError) {
            console.error('[DEBUG] Zod validation error:', zodError);
            console.error('[DEBUG] Data that failed validation:', JSON.stringify(data, null, 2));
            
            let errorMessage = 'AI response did not match expected schema';
            if (zodError instanceof z.ZodError) {
                errorMessage += ': ' + zodError.errors.map(e => `${e.path.join('.')}: ${e.message}`).join('; ');
            }
            throw new Error(errorMessage);
        }
    }
}
