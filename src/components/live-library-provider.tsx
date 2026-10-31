"use client";
import {useCallback,useEffect,useRef,useState} from 'react';
import {authClient} from '@/lib/auth-client';
import {apiRequest,fetchBooks,fetchBorrows,saveBook} from '@/lib/library-api';
import {LibraryContext,type Entry,type State} from './library-context';
export function LiveLibraryProvider({children}:{children:React.ReactNode}) {
 const {data:session,isPending}=authClient.useSession();
 const user=session?.user || null;
 const revision=useRef(0);
 const [state,setState]=useState<State>({books:[],borrows:[]});const [recent,setRecent]=useState<Entry[]>([]);const [message,setMessage]=useState('');const [loading,setLoading]=useState(true);
 const refresh=useCallback(async()=>{
  const ticket=++revision.current;
  const [books,newArrivals,borrows]=await Promise.all([fetchBooks(),fetchBooks('?limit=6'),user?fetchBorrows():Promise.resolve([])]);
  if(ticket===revision.current){setState({books,borrows});setRecent(newArrivals);}
 },[user?.id]);
 useEffect(()=>{if(isPending)return;let cancelled=false;setLoading(true);refresh().catch(()=>{if(!cancelled)setMessage('The library API is unavailable. Please try again shortly.');}).finally(()=>{if(!cancelled)setLoading(false);});return ()=>{cancelled=true;revision.current+=1;};},[isPending,refresh]);
 useEffect(()=>{if(!message)return;const timer=setTimeout(()=>setMessage(''),6000);return ()=>clearTimeout(timer);},[message]);
 async function mutate(work:()=>Promise<unknown>,success:string) {if(!user)throw new Error('Sign in to continue.');await work();try{await refresh();setMessage(success);}catch{setMessage(`${success} Refresh the page to see the latest collection.`);}}
 return <LibraryContext.Provider value={{...state,ready:!isPending&&!loading,demo:!!user,mode:'live',user,newArrivals:recent,enter:()=>{},leave:async()=>{await authClient.signOut();setState(s=>({...s,borrows:[]}));},save:book=>mutate(()=>saveBook(book,state.books.some(b=>b.id===book.id)),'Book saved.'),remove:id=>mutate(()=>apiRequest(`/books/${id}`,{method:'DELETE'},true),'Book deleted.'),borrow:id=>mutate(()=>apiRequest('/borrows',{method:'POST',body:JSON.stringify({bookId:id})},true),'Book borrowed. Enjoy your next chapter!'),returnBook:id=>mutate(()=>apiRequest(`/borrows/${id}`,{method:'DELETE'},true),'Book returned.'),notify:setMessage}}>{children}{message&&<div className="toast" role="status">{message}<button onClick={()=>setMessage('')} aria-label="Dismiss notification">✕</button></div>}</LibraryContext.Provider>;
}
