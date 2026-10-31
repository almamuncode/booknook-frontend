"use client";
import { createAuthClient } from 'better-auth/react';
import { jwtClient } from 'better-auth/client/plugins';
export const authClient=createAuthClient({plugins:[jwtClient()]});
export const liveMode=process.env.NEXT_PUBLIC_ENABLE_LIVE_API==='true';
export function safeDestination(target:string|null) {
 if(!target || !target.startsWith('/') || target.startsWith('//') || target.includes('\\') || /[\u0000-\u001f]/.test(target))return '/';
 return target;
}
