import { NextRequest, NextResponse } from 'next/server';
import { githubAPI } from '@/lib/github';

export async function GET(request: NextRequest) {
  try {
    // Get access token from cookie
    const accessToken = request.cookies.get('github_token')?.value;
    
    if (!accessToken) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Get user repositories
    const repos = await githubAPI.getUserRepos(accessToken);
    
    return NextResponse.json(repos);
  } catch (error: any) {
    console.error('Repos fetch error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch repositories' },
      { status: 500 }
    );
  }
}

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
    if (!body.name) {
      return NextResponse.json(
        { error: 'Repository name is required' },
        { status: 400 }
      );
    }

    // Create repository
    const repo = await githubAPI.createRepo(accessToken, {
      name: body.name,
      description: body.description,
      private: body.private || false,
    });
    
    return NextResponse.json(repo);
  } catch (error: any) {
    console.error('Repo creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create repository' },
      { status: 500 }
    );
  }
}