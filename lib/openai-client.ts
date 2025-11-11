import OpenAI from 'openai'

let openaiInstance: OpenAI | null = null

export function getOpenAIClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured')
  }

  if (!openaiInstance) {
    openaiInstance = new OpenAI({
      apiKey
    })
  }

  return openaiInstance
}
