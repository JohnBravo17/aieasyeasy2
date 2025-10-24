import { NextRequest, NextResponse } from 'next/server';
import { githubAPI } from '@/lib/github';

export async function GET() {
  try {
    const authURL = githubAPI.getAuthURL();
    return NextResponse.redirect(authURL);
  } catch (error) {
    console.error('GitHub auth error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate GitHub authentication' },
      { status: 500 }
    );
  }
}