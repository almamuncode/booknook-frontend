import { getAuth } from '@/lib/auth';
export const runtime='nodejs';
export async function POST(request:Request) {
 try {
  const session=await getAuth().api.getSession({headers:request.headers});
  if(!session)return Response.json({message:'Sign in before uploading a cover.'},{status:401});
  if(request.headers.get('origin')!==new URL(process.env.BETTER_AUTH_URL || request.url).origin)return Response.json({message:'Invalid upload origin.'},{status:403});
  if(!process.env.IMGBB_API_KEY)return Response.json({message:'Cover uploads have not been configured.'},{status:503});
  if(Number(request.headers.get('content-length') || 0)>3*1024*1024)return Response.json({message:'Choose an image under 2 MB.'},{status:413});
  const data=await request.formData();const file=data.get('image');
  if(!(file instanceof File)||file.size>2*1024*1024||!['image/jpeg','image/png','image/webp'].includes(file.type))return Response.json({message:'Choose a JPG, PNG, or WebP image under 2 MB.'},{status:400});
  const payload=new FormData();payload.set('image',file);
  const uploaded=await fetch(`https://api.imgbb.com/1/upload?key=${encodeURIComponent(process.env.IMGBB_API_KEY)}`,{method:'POST',body:payload,signal:AbortSignal.timeout(30000)});
  const result=await uploaded.json();
  if(!uploaded.ok||!result.success||typeof result.data?.url!=='string')return Response.json({message:'Could not upload this cover. Please try again.'},{status:502});
  return Response.json({url:result.data.url});
 }catch{return Response.json({message:'Cover upload is unavailable. Please try again.'},{status:503});}
}
