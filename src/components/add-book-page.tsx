"use client";
import Link from 'next/link';
import { MemberPage } from './member-pages';
import { useLibrary } from './library-provider';

export function AddBookPage() {
 const library=useLibrary();
 if(!library.ready)return <div className="empty-state" role="status">Opening your library…</div>;
 if(library.mode==='demo')return <section className="container section"><div className="empty-state"><h1>Create an account to add a book.</h1><p>Only registered members can add books. Create an account or log in to share a book with the library.</p><div className="modal-actions"><Link className="button" href="/register?callbackURL=%2Fadd-book">Create account</Link><Link className="outline-button" href="/login?callbackURL=%2Fadd-book">Log in</Link></div></div></section>;
 return <MemberPage view="add"/>;
}
