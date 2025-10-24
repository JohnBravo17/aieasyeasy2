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

    // Initialize Runware API
    const runware = new RunwareAPI();
    
    // Validate API key
    const isValidKey = await runware.validateApiKey();
    if (!isValidKey) {
      return NextResponse.json(
        { error: 'Invalid or missing Runware API key' },
        { status: 401 }
      );
    }

    // Prepare request parameters
    const params: ImageGenerationRequest = {
      taskType: 'imageInference',
      positivePrompt: body.positivePrompt,
      negativePrompt: body.negativePrompt,
      height: body.height || 1024,
      width: body.width || 1024,
      model: body.model || 'runware:100@1',
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
    return NextResponse.json(
      { error: error.message || 'Failed to generate image' },
      { status: 500 }
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