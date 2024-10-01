import { NextRequest, NextResponse } from "next/server";
import { toSeed } from "@utils/crypto.util";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";

const AUTH_SEED = process.env.SEED;

if (!AUTH_SEED) {
  throw new Error("SEED environment variable is not set");
}

export async function POST(request: NextRequest) {
  try {
    const { mnemonic } = await request.json();

    if (!mnemonic) {
      return NextResponse.json(
        { error: "Mnemonic is required" },
        { status: 400 },
      );
    }

    const seed = toSeed(mnemonic);

    if (seed === AUTH_SEED) {
      // Generate a JWT token
      const token = await new SignJWT({ "urn:example:claim": true })
        .setProtectedHeader({ alg: "HS256" })
        .setJti(nanoid())
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(new TextEncoder().encode(AUTH_SEED));

      // Return the token in the response body
      return NextResponse.json(
        { success: true, message: "Authentication successful", token },
        { status: 200 },
      );
    } else {
      return NextResponse.json({ error: "Invalid mnemonic" }, { status: 401 });
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// path: src/app/api/auth/route.ts
