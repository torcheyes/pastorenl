import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const AUTH_SEED = process.env.SEED;

if (!AUTH_SEED) {
  throw new Error('SEED environment variable is not set');
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ valid: false, error: 'No token found' }, { status: 401 });
    }

    try {
      await jwtVerify(token, new TextEncoder().encode(AUTH_SEED));
      return NextResponse.json({ valid: true }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ valid: false, error: 'Invalid token' }, { status: 401 });
    }
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json({ valid: false, error: 'Internal server error' }, { status: 500 });
  }
}

// path: src/app/api/verify-token/route.ts