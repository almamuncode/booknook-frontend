import { betterAuth } from 'better-auth';
import { mongodbAdapter } from '@better-auth/mongo-adapter';
import { createAuthMiddleware, APIError } from 'better-auth/api';
import { jwt } from 'better-auth/plugins';
import { nextCookies } from 'better-auth/next-js';
import { MongoClient } from 'mongodb';
let configuredAuth: ReturnType<typeof createConfiguredAuth> | undefined;
class AuthConfigurationError extends Error {
 readonly name='AuthConfigurationError';
}
function required(name: string) {
 const value=process.env[name];
 if(!value) throw new AuthConfigurationError(`Authentication configuration is missing ${name}.`);
 return value;
}
function createConfiguredAuth() {
 const baseURL=required('BETTER_AUTH_URL');
 const secret=required('BETTER_AUTH_SECRET');
 if(secret.length<32) throw new AuthConfigurationError('BETTER_AUTH_SECRET must contain at least 32 characters.');
 const client=new MongoClient(required('MONGODB_URI'),{serverSelectionTimeoutMS:10000});
 const google=process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET;
 return betterAuth({
  appName:'BookNook',baseURL,secret,
  database:mongodbAdapter(client.db(process.env.MONGODB_DB || 'booknook'),{client}),
  trustedOrigins:[baseURL],
  emailAndPassword:{enabled:true,requireEmailVerification:false,minPasswordLength:6,maxPasswordLength:128,autoSignIn:false},
  socialProviders:google?{google:{clientId:process.env.GOOGLE_CLIENT_ID!,clientSecret:process.env.GOOGLE_CLIENT_SECRET!}}:{},
  hooks:{before:createAuthMiddleware(async ctx=>{
   if(ctx.path==='/sign-up/email') {
    const password=ctx.body?.password;
    if(typeof password!=='string'||password.length<6||!/[A-Z]/.test(password)||!/[a-z]/.test(password)) throw new APIError('BAD_REQUEST',{message:'Use at least 6 characters, including uppercase and lowercase letters.'});
   }
  })},
  plugins:[jwt({jwt:{issuer:baseURL,audience:process.env.AUTH_AUDIENCE || 'http://localhost:5000',expirationTime:'15m',definePayload:({user})=>({email:user.email,name:user.name})}}),nextCookies()],
 });
}
export function getAuth() { return configuredAuth ??= createConfiguredAuth(); }
