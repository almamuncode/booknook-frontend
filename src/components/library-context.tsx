"use client";
import { createContext,useContext } from 'react';
import type {Book} from '@/lib/books';
export type Reader={id:string;name:string;email:string;image?:string|null};
export type Entry=Book & {owner:string;ownerName?:string;ownerId?:string;image?:string;totalCopies:number};
export type Borrow={id:string;bookId:string;title:string;image?:string;borrowedAt:string;dueAt:string};
export type State={books:Entry[];borrows:Borrow[]};
export type Library=State & {ready:boolean;demo:boolean;mode:'demo'|'live';user:Reader|null;newArrivals?:Entry[];enter:()=>void;leave:()=>void|Promise<void>;save:(book:Entry)=>void|Promise<void>;remove:(id:string)=>void|Promise<void>;borrow:(id:string)=>void|Promise<void>;returnBook:(id:string)=>void|Promise<void>;notify:(message:string)=>void};
export const LibraryContext=createContext<Library|null>(null);
export const demoUser:Reader={id:'demo-reader',name:'Alex Morgan',email:'reader@booknook.example'};
export function useLibrary() {const value=useContext(LibraryContext);if(!value)throw new Error('LibraryProvider missing');return value;}
