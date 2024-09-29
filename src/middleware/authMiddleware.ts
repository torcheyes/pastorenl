import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const AUTH_SEED = process.env.SEED;

if (!AUTH_SEED) {
  throw new Error('SEED environment variable is not set');
}

export async function authMiddleware(req: NextRequest) {
  const authHeader = req.headers.get('Authorization');
  console.log('Authorization header:', authHeader);
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.error('No token provided in Authorization header');
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  console.log('Token extracted from header:', token);

  try {
    await jwtVerify(token, new TextEncoder().encode(AUTH_SEED));
    console.log('Token verified successfully');
    return NextResponse.next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}

// path: src/middleware/authMiddleware.ts