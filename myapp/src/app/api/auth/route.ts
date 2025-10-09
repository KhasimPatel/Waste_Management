// src/app/api/auth/route.ts
import { NextResponse } from 'next/server';

type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
interface JsonObject { [key: string]: JsonValue }
interface JsonArray extends Array<JsonValue> {}

interface LoginRequestBody {
  action: 'login';
  username?: string;
  password?: string;
}

interface RequestOtpBody {
  action: 'request-otp';
  empId?: string;
}

interface VerifyOtpBody {
  action: 'verify-otp';
  empId?: string;
  otp?: string;
}

interface ResetPasswordBody {
  action: 'reset-password';
  empId?: string;
  newPassword?: string;
}

type AuthRequestBody = LoginRequestBody | RequestOtpBody | VerifyOtpBody | ResetPasswordBody;

const ALLOWED_USERNAMES = (process.env.AUTH_ALLOWED_USERNAMES || '').split(',').map(s => s.trim()).filter(Boolean);
const ADMIN_PASSWORD = process.env.AUTH_ADMIN_PASSWORD || '';
const OTP_EXPIRY_MINUTES = Number(process.env.OTP_EXPIRY_MINUTES || '10');

// In-memory OTP store for demo purposes only. Not suitable for production or serverless.
const otpStore: Map<string, { code: string; expiresAt: number }> = new Map();

function badRequest(message: string, details?: JsonObject) {
  return NextResponse.json({ ok: false, error: message, details }, { status: 400 });
}

function unauthorized(message: string) {
  return NextResponse.json({ ok: false, error: message }, { status: 401 });
}

export async function GET() {
  return NextResponse.json({ ok: true, service: 'auth', time: new Date().toISOString() });
}

export async function POST(request: Request) {
  let body: Partial<AuthRequestBody> | null = null;
  try {
    body = await request.json();
  } catch {
    return badRequest('Invalid JSON body');
  }

  if (!body || typeof body !== 'object' || !('action' in body) || typeof body.action !== 'string') {
    return badRequest("Body must include an 'action' field");
  }

  switch (body.action) {
    case 'login': {
      const username = (body as LoginRequestBody).username || '';
      const password = (body as LoginRequestBody).password || '';

      if (!username || !password) return badRequest('username and password are required');
      if (!ALLOWED_USERNAMES.length || !ADMIN_PASSWORD) {
        return NextResponse.json({ ok: false, error: 'Server auth not configured' }, { status: 500 });
      }

      const isAllowedUser = ALLOWED_USERNAMES.includes(username);
      const isPasswordValid = password === ADMIN_PASSWORD;
      if (!isAllowedUser || !isPasswordValid) return unauthorized('Invalid credentials');

      // Minimal token for demo purposes only
      const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');
      return NextResponse.json({ ok: true, token, user: { username } });
    }

    case 'request-otp': {
      const empId = (body as RequestOtpBody).empId || '';
      if (!empId) return badRequest('empId is required');
      const code = String(Math.floor(100000 + Math.random() * 900000));
      const expiresAt = Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000;
      otpStore.set(empId, { code, expiresAt });
      // Do not expose OTP in production. Returned here only for local testing.
      return NextResponse.json({ ok: true, empId, expiresInMinutes: OTP_EXPIRY_MINUTES, demoOtp: code });
    }

    case 'verify-otp': {
      const empId = (body as VerifyOtpBody).empId || '';
      const otp = (body as VerifyOtpBody).otp || '';
      if (!empId || !otp) return badRequest('empId and otp are required');
      const record = otpStore.get(empId);
      if (!record) return unauthorized('OTP not found');
      if (Date.now() > record.expiresAt) {
        otpStore.delete(empId);
        return unauthorized('OTP expired');
      }
      if (record.code !== otp) return unauthorized('Invalid OTP');
      return NextResponse.json({ ok: true, empId, verified: true });
    }

    case 'reset-password': {
      const empId = (body as ResetPasswordBody).empId || '';
      const newPassword = (body as ResetPasswordBody).newPassword || '';
      if (!empId || !newPassword) return badRequest('empId and newPassword are required');
      if (newPassword.length < 8) return badRequest('newPassword must be at least 8 characters');
      // In a real system, update the password in the database here
      return NextResponse.json({ ok: true, empId, reset: true });
    }

    default:
      return badRequest('Unsupported action', { action: body.action as JsonValue });
  }
}


