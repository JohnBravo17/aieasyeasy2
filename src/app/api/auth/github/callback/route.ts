import { NextRequest, NextResponse } from 'next/server';
import { githubAPI } from '@/lib/github';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/auth/error?error=${error}`);
    }

    if (!code) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/auth/error?error=no_code`);
    }

    // Exchange code for access token
    const accessToken = await githubAPI.getAccessToken(code);
    
    // Get user information
    const user = await githubAPI.getUser(accessToken);

    // Create response and set cookies
    const response = NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard`);
    
    // Store user data in cookies (in production, use proper session management)
    response.cookies.set('github_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      sameSite: 'lax',
    });

    response.cookies.set('github_user', JSON.stringify(user), {
      httpOnly: false, // Allow client-side access for UI
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      sameSite: 'lax',
    });

    return response;
  } catch (error) {
    console.error('GitHub callback error:', error);
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/auth/error?error=callback_failed`);
  }
}