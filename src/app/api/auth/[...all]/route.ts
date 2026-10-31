import { toNextJsHandler } from 'better-auth/next-js';
import { getAuth } from '@/lib/auth';
export const runtime='nodejs';
async function handle(request:Request) {
 try {
  const handlers=toNextJsHandler(getAuth());
  return await (request.method==='GET'?handlers.GET(request):handlers.POST(request));
 } catch(error) {
  // Only our own configuration messages are safe to log; driver errors may contain connection details.
  const diagnostic=error instanceof Error ? (error.name==='AuthConfigurationError'?error.message:error.name) : 'UnknownError';
  console.error('BookNook authentication failed:',diagnostic);
  return Response.json({message:'Authentication is unavailable. Check the server configuration.'},{status:503});
 }
}
export const GET=handle;
export const POST=handle;
