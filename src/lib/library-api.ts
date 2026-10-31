"use client";
import {authClient} from './auth-client';
import type {Entry,Borrow} from '@/components/library-context';
const baseURL=(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/,'');
export async function apiRequest<T>(path:string,options:RequestInit={},protectedRequest=false):Promise<T> {
 const headers=new Headers(options.headers);
 if(options.body)headers.set('Content-Type','application/json');
 if(protectedRequest) {
  const {data,error}=await authClient.token();
  if(error||!data?.token)throw new Error('Please sign in again to continue.');
  headers.set('Authorization',`Bearer ${data.token}`);
 }
 const response=await fetch(`${baseURL}${path}`,{...options,headers,cache:'no-store',signal:AbortSignal.timeout(15000)});
 const payload=await response.json().catch(()=>({message:'The library API returned an invalid response.'}));
 if(!response.ok)throw new Error(payload.message || 'The library could not complete this request.');
 return payload as T;
}
type BookRecord={_id:string;title:string;author:string;category:string;description:string;image:string;ownerEmail?:string;ownerName:string;ownerId:string;availableCopies:number;totalCopies:number;createdAt:string;coverSource?:string;publishedYear?:number};
export function toEntry(book:BookRecord):Entry {return {id:book._id,coverSource:book.coverSource,publishedYear:book.publishedYear,title:book.title,author:book.author,category:book.category,description:book.description,image:book.image,owner:book.ownerEmail || '',ownerName:book.ownerName,ownerId:book.ownerId,copies:book.availableCopies,totalCopies:book.totalCopies,createdAt:book.createdAt,color:'#f6f5ef',ink:'#181a1b',subtitle:''};}
export async function fetchBooks(query='') {return (await apiRequest<BookRecord[]>(`/books${query}`)).map(toEntry);}
export async function fetchBorrows():Promise<Borrow[]> {const records=await apiRequest<Array<{_id:string;bookId:string;title:string;image:string;borrowedAt:string;dueAt:string}>>('/borrows',{},true);return records.map(({_id,...record})=>({...record,id:_id}));}
export async function saveBook(book:Entry,exists:boolean) {
 const payload={title:book.title,author:book.author,category:book.category,description:book.description,image:book.image||book.coverUrl,totalCopies:book.totalCopies};
 return apiRequest(`/books${exists?`/${book.id}`:''}`,{method:exists?'PATCH':'POST',body:JSON.stringify(payload)},true);
}

export async function fetchBook(id:string) {return toEntry(await apiRequest<BookRecord>(`/books/${id}`,{},true));}

export type CatalogPage={books:Entry[];total:number;page:number;pageSize:number;totalPages:number};
export async function fetchCatalogPage({page,query,category}:{page:number;query:string;category:string}):Promise<CatalogPage> {
 const params=new URLSearchParams({page:String(page),limit:'12'});
 if(query.trim())params.set('q',query.trim());
 if(category!=='All books')params.set('category',category);
 const result=await apiRequest<{books:BookRecord[];total:number;page:number;pageSize:number;totalPages:number}>(`/books?${params}`);
 return {...result,books:result.books.map(toEntry)};
}
