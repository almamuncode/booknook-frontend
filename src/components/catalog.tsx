"use client";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLibrary } from './library-provider';
import { BookCard } from './ui';
import { latestBooks } from '@/lib/books';
import { fetchCatalogPage, type CatalogPage } from '@/lib/library-api';
const pageSize=12;
export function Catalog() {
 const { books,mode } = useLibrary();
 const params=useSearchParams();
 const initialCategory=params.get('category') || 'All books';
 const initialQuery=params.get('q') || '';
 const [category,setCategory]=useState(initialCategory);
 const [query,setQuery]=useState(initialQuery);
 const [page,setPage]=useState(1);
 const [remote,setRemote]=useState<CatalogPage|null>(null);
 const [pending,setPending]=useState(mode==='live');
 const [error,setError]=useState('');
 const [retry,setRetry]=useState(0);
 useEffect(()=>{setCategory(initialCategory);setQuery(initialQuery);setPage(1);},[initialCategory,initialQuery]);
 useEffect(()=>{
  if(mode!=='live')return;
  let cancelled=false;setPending(true);setError('');
  const timer=setTimeout(()=>{
   fetchCatalogPage({page,query,category}).then(result=>{if(!cancelled)setRemote(result);}).catch(()=>{if(!cancelled)setError('We couldn’t load these books. Please try again.');}).finally(()=>{if(!cancelled)setPending(false);});
  },250);
  return ()=>{cancelled=true;clearTimeout(timer);};
 },[mode,page,query,category,retry]);
 const filtered=latestBooks(books,books.length).filter(book=>(category==='All books'||book.category===category)&&`${book.title} ${book.author}`.toLowerCase().includes(query.trim().toLowerCase()));
 const total=mode==='live'?(remote?.total || 0):filtered.length;
 const totalPages=Math.ceil(total/pageSize);
 const currentPage=Math.min(page,Math.max(1,totalPages));
 const items=mode==='live'?(remote?.books || []):filtered.slice((currentPage-1)*pageSize,currentPage*pageSize);
 function changePage(value:number){setPage(value);document.getElementById('catalog-results')?.scrollIntoView({behavior:'smooth',block:'start'});}
 function chooseCategory(value:string){setCategory(value);setPage(1);}
 function reset(){setCategory('All books');setQuery('');setPage(1);}
 const firstPage=Math.max(1,Math.min(currentPage-2,totalPages-4));
 const pages=Array.from({length:Math.min(5,totalPages)},(_,index)=>firstPage+index);
 return <>
  <div className="catalog-toolbar"><div className="filter-tabs" aria-label="Filter by category">{['All books','Fiction','Science','History','Kids','Others'].map(value=><button key={value} className={category===value?'selected':''} aria-pressed={category===value} onClick={()=>chooseCategory(value)}>{value}</button>)}</div><label className="search"><img className="ui-icon" src="/icons/search.svg" alt=""/><input aria-label="Search books or authors" maxLength={150} placeholder="Search books or authors…" value={query} onChange={event=>{setQuery(event.target.value);setPage(1);}}/></label></div>
  <div id="catalog-results" aria-busy={pending}>
   {pending?<div className="catalog-loading" role="status"><div className="loading-spinner"/>Finding your next read…</div>:error?<div className="empty-state" role="alert"><h2>The shelves are taking a moment.</h2><p>{error}</p><button className="button" onClick={()=>setRetry(value=>value+1)}>Try again</button></div>:<>
    <p className="result-count" role="status">{total} {total===1?'book':'books'} to discover <span>{total>0?`Showing ${(currentPage-1)*pageSize+1}–${Math.min(currentPage*pageSize,total)}`:'Try another title or category.'}</span></p>
    {items.length?<div className="book-grid">{items.map(book=><BookCard key={book.id} book={book}/>)}</div>:<div className="empty-state"><h2>No books found</h2><p>Try another title, author, or category.</p><button className="button" onClick={reset}>Reset filters</button></div>}
    {totalPages>1&&<nav className="catalog-pagination" aria-label="Book pages"><button disabled={currentPage===1} onClick={()=>changePage(currentPage-1)}>Previous</button><div>{pages.map(value=><button key={value} aria-label={`Page ${value}`} aria-current={currentPage===value?'page':undefined} onClick={()=>changePage(value)}>{value}</button>)}</div><button disabled={currentPage===totalPages} onClick={()=>changePage(currentPage+1)}>Next</button><span>Page {currentPage} of {totalPages}</span></nav>}
   </>}
  </div>
 </>;
}
