import { NextRequest, NextResponse } from 'next/server';
import { RunwareAPI } from '@/lib/runware';

export async function GET() {
  try {
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

    // Get models
    const models = await runware.getModels();
    
    return NextResponse.json(models);
  } catch (error: any) {
    console.error('Models fetch error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch models' },
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
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}