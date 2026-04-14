import Anthropic from '@anthropic-ai/sdk';

if (!process.env.ANTHROPIC_API_KEY) {
  console.warn('⚠ Missing ANTHROPIC_API_KEY — AI features will be unavailable');
}

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY ?? 'missing',
});

export const MODEL = 'claude-sonnet-4-20250514';
export const MAX_TOKENS = 4096;
