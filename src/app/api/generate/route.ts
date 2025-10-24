import { NextRequest, NextResponse } from 'next/server';
import { RunwareAPI, ImageGenerationRequest } from '@/lib/runware';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.positivePrompt) {
      return NextResponse.json(
        { error: 'Positive prompt is required' },
        { status: 400 }
      );
    }

    // Check if API key is configured
    const apiKey = process.env.RUNWARE_API_KEY;
    if (!apiKey || apiKey === 'your_runware_api_key_here') {
      return NextResponse.json(
        { 
          error: 'Runware API key not configured. Please set RUNWARE_API_KEY in your environment variables.',
          details: 'Check your .env.local file and ensure the API key is properly set.'
        },
        { status: 500 }
      );
    }

    // Initialize Runware API
    const runware = new RunwareAPI();

    // Prepare request parameters
    const params: ImageGenerationRequest = {
      taskType: 'imageInference',
      positivePrompt: body.positivePrompt,
      negativePrompt: body.negativePrompt,
      height: body.height || 1024,
      width: body.width || 1024,
      model: body.model || 'civitai:4384@9942',
      steps: body.steps || 25,
      CFGScale: body.CFGScale || 7.0,
      seed: body.seed,
      numberResults: body.numberResults || 1,
      outputFormat: body.outputFormat || 'PNG',
    };

    // Generate image
    const result = await runware.generateImage(params);
    
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Image generation error:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to generate image';
    let statusCode = 500;
    
    if (error.message?.includes('API key')) {
      errorMessage = 'Invalid or missing Runware API key. Please check your API key configuration.';
      statusCode = 401;
    } else if (error.message?.includes('Network Error') || error.message?.includes('timeout')) {
      errorMessage = 'Network error connecting to Runware API. Please try again.';
      statusCode = 503;
    } else if (error.response?.status === 401) {
      errorMessage = 'Authentication failed. Please verify your Runware API key.';
      statusCode = 401;
    } else if (error.response?.status === 429) {
      errorMessage = 'Rate limit exceeded. Please try again later.';
      statusCode = 429;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: error.response?.data || error.message || 'Unknown error occurred'
      },
      { status: statusCode }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}