import { NextRequest, NextResponse } from 'next/server';
import { githubAPI } from '@/lib/github';

export async function POST(request: NextRequest) {
  try {
    // Get access token from cookie
    const accessToken = request.cookies.get('github_token')?.value;
    
    if (!accessToken) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Validate required fields
    if (!body.owner || !body.repo) {
      return NextResponse.json(
        { error: 'Owner and repo are required' },
        { status: 400 }
      );
    }

    // Trigger Vercel deployment
    const result = await githubAPI.triggerVercelDeployment(
      accessToken,
      body.owner,
      body.repo
    );
    
    return NextResponse.json({
      message: 'Deployment triggered successfully',
      result
    });
  } catch (error: any) {
    console.error('Deployment trigger error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to trigger deployment' },
      { status: 500 }
    );
  }
}