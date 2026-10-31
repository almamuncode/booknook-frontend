import { toNextJsHandler } from 'better-auth/next-js';
import { getAuth } from '@/lib/auth';
export const runtime='nodejs';
async function handle(request:Request) {
 try {
  const handlers=toNextJsHandler(getAuth());
  return await (request.method==='GET'?handlers.GET(request):handlers.POST(request));
 } catch {
  return Response.json({message:'Authentication is unavailable. Check the server configuration.'},{status:503});
 }
}
export const GET=handle;
export const POST=handle;
