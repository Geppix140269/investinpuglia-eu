// Netlify Function: trullo-chat.js
exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { messages, systemPrompt, language } = JSON.parse(event.body);

    // Validate required fields
    if (!messages || !Array.isArray(messages)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Messages array is required' })
      };
    }

    // Check for OpenAI API key
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('OPENAI_API_KEY is not set in environment variables');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'OpenAI API key is not configured' })
      };
    }

    // Prepare messages for OpenAI
    const openAIMessages = [
      {
        role: 'system',
        content: systemPrompt || 'You are Trullo, a helpful investment advisor for InvestInPuglia.eu'
      },
      ...messages.map((msg) => ({
        role: msg.role,
        content: msg.content
      }))
    ];

    // Make request to OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: openAIMessages,
        temperature: 0.7,
        max_tokens: 500,
        stream: false
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI API error:', error);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Failed to get response from AI' })
      };
    }

    const data = await response.json();
    const assistantMessage = data.choices[0]?.message?.content || 'I apologize, but I encountered an error processing your request.';

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        message: assistantMessage
      })
    };

  } catch (error) {
    console.error('Chat API error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
