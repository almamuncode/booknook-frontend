"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import { books as seed, type Book } from '@/lib/books';
type Entry = Book & { owner: string; image?: string; totalCopies: number };
type Borrow = { id: string; bookId: string; title: string; borrowedAt: string; dueAt: string };
type State = { books: Entry[]; borrows: Borrow[] };
const initial: State = { books: seed.map((b,i) => ({ ...b, owner: i < 2 ? 'reader@booknook.example' : 'community@booknook.example', totalCopies: b.copies })), borrows: [] };
type Library = State & { ready: boolean; demo: boolean; enter: () => void; leave: () => void; save: (book: Entry) => void; remove: (id: string) => void; borrow: (id: string) => void; returnBook: (id: string) => void; notify: (message: string) => void };
const Context = createContext<Library | null>(null);
export const demoUser = { name: 'Alex Morgan', email: 'reader@booknook.example' };
export type { Entry };
export function LibraryProvider({ children }: { children: React.ReactNode }) {
 const [state,setState] = useState<State>(initial); const [demo,setDemo] = useState(false); const [ready,setReady] = useState(false); const [message,setMessage] = useState('');
 useEffect(() => { try { const raw = localStorage.getItem('booknook-preview-v1'); if(raw) { const saved = JSON.parse(raw); if(Array.isArray(saved.books) && Array.isArray(saved.borrows)) setState({ ...saved, books: saved.books.map((book: Entry) => {
 const original = seed.find(item => item.id === book.id && item.title === book.title && item.author === book.author);
 return original ? { ...book, coverUrl: original.coverUrl, coverSource: original.coverSource, createdAt: book.createdAt || original.createdAt } : book;
 }) }); } setDemo(sessionStorage.getItem('booknook-demo') === 'true'); } catch {} setReady(true); }, []);
 useEffect(() => { if(ready) { try { localStorage.setItem('booknook-preview-v1',JSON.stringify(state)); } catch { setMessage('Browser storage is full. Recent changes will last only until this page is reloaded.'); } } }, [state,ready]);
 useEffect(() => { if(!message) return; const timer=setTimeout(()=>setMessage(''),5000);return ()=>clearTimeout(timer); },[message]);
 const requireDemo = () => { if(!demo) throw new Error('Open the frontend demo to continue.'); };
 function save(book: Entry) { requireDemo(); const old=state.books.find(b=>b.id===book.id); if(!book.title.trim() || !book.author.trim() || !book.description.trim()) throw new Error('Complete the title, author, and description.'); if(!book.image && !book.coverUrl) throw new Error('Choose a cover image before saving the book.'); if(old && old.owner!==demoUser.email) throw new Error('You can only edit your own books.'); const borrowed=old ? old.totalCopies-old.copies : 0; if(!Number.isInteger(book.totalCopies)||book.totalCopies<Math.max(1,borrowed)) throw new Error(`Provide at least ${Math.max(1,borrowed)} total copies.`); setState(s=>({...s,books:old?s.books.map(b=>b.id===book.id?{...book,copies:book.totalCopies-borrowed}:b):[{...book,copies:book.totalCopies,owner:demoUser.email},...s.books]}));setMessage(old?'Book updated.':'Book added to your shelf.'); }
 function remove(id:string) { requireDemo(); const book=state.books.find(b=>b.id===id); if(!book || book.owner!==demoUser.email) throw new Error('You can only delete your own books.');if(book.totalCopies>book.copies) throw new Error('Return all borrowed copies before deleting this book.');setState(s=>({...s,books:s.books.filter(b=>b.id!==id)}));setMessage('Book removed.'); }
 function borrow(id:string) { requireDemo();const book=state.books.find(b=>b.id===id);if(!book || book.copies<1) throw new Error('This book is currently unavailable.');if(state.borrows.some(b=>b.bookId===id)) throw new Error('You already have an active borrow for this book.');const now=new Date();const due=new Date(now.getTime()+7*86400000);setState(s=>({...s,books:s.books.map(b=>b.id===id?{...b,copies:b.copies-1}:b),borrows:[...s.borrows,{id:crypto.randomUUID(),bookId:id,title:book.title,borrowedAt:now.toISOString(),dueAt:due.toISOString()}]}));setMessage('Book borrowed. Enjoy your next chapter!'); }
 function returnBook(id:string) { requireDemo();const record=state.borrows.find(b=>b.id===id);if(!record) return;setState(s=>({...s,books:s.books.map(b=>b.id===record.bookId?{...b,copies:b.copies+1}:b),borrows:s.borrows.filter(b=>b.id!==id)}));setMessage('Book returned. Thank you!'); }
 return <Context.Provider value={{...state,ready,demo,enter:()=>{sessionStorage.setItem('booknook-demo','true');setDemo(true);},leave:()=>{sessionStorage.removeItem('booknook-demo');setDemo(false);},save,remove,borrow,returnBook,notify:setMessage}}>{demo && <div className="preview-banner">Frontend demo · Changes are saved in this browser only. <button onClick={()=>{localStorage.removeItem('booknook-preview-v1');setState(initial);setMessage('Demo collection reset.');}}>Reset sample data</button></div>}{children}{message && <div className="toast" role="status">{message}<button onClick={()=>setMessage('')} aria-label="Dismiss notification">✕</button></div>}</Context.Provider>;
}
export function useLibrary() { const value=useContext(Context);if(!value) throw new Error('LibraryProvider missing');return value; }
