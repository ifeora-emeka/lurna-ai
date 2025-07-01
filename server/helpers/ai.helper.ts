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
        const jsonPrompt = `${prompt}
CRITICAL: You must respond with ONLY a valid JSON object. No explanations, no markdown, no code blocks, just pure JSON.
The response MUST start with { and end with } and be fully valid JSON parseable by JSON.parse().

Respond with valid JSON only:`;
        const message = new HumanMessage(jsonPrompt);
        console.log('[DEBUG] Sending AI prompt for structured data:', jsonPrompt);
        
        const response = await model.invoke([message]);
        console.log('[DEBUG] Received raw AI response:', response.content);
        
        let rawContent = response.content as string;
        let data;
        
        try {
            // Try to extract JSON if it's wrapped in markdown code blocks or other text
            const jsonRegex = /{[\s\S]*}/;
            const match = rawContent.match(jsonRegex);
            
            if (match) {
                console.log('[DEBUG] Extracted JSON from response:', match[0]);
                data = JSON.parse(match[0]);
            } else {
                // If no JSON object found, try the raw response
                data = JSON.parse(rawContent);
            }
        } catch (e) {
            console.error('[DEBUG] JSON parse error:', e);
            console.error('[DEBUG] Failed content:', rawContent);
            throw new Error('Failed to parse JSON from Gemini response');
        }
        
        try {
            const parsed = zodSchema.parse(data);
            console.log('[DEBUG] Successfully parsed structured data:', parsed);
            return parsed;
        } catch (zodError) {
            console.error('[DEBUG] Zod validation error:', zodError);
            throw new Error('AI response did not match expected schema');
        }
    }
}
