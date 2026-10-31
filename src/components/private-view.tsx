"use client";
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLibrary } from './library-provider';
export function PrivateView({ children }: { children: React.ReactNode }) { const {ready,demo}=useLibrary();const router=useRouter();const path=usePathname();useEffect(()=>{if(ready && !demo) router.replace(`/login?callbackURL=${encodeURIComponent(path)}`);},[ready,demo,path,router]);if(!ready || !demo) return <div className="empty-state" role="status">Opening your library…</div>;return children; }
