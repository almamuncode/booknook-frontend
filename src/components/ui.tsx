"use client";
import { useState } from 'react';
import Link from 'next/link';
import type { Book } from '@/lib/books';
export function Mark() { return <span className="brand-mark" aria-hidden="true"><img src="/icons/book-open.svg" alt=""/></span>; }
export function Cover({ book, large = false }: { book: Book & { image?: string }; large?: boolean }) {
 const source = book.image || book.coverUrl;
 const [failed, setFailed] = useState<string | null>(null);
 return <div className={`cover published-cover ${large ? 'cover-large' : ''}`}>
  {source && failed !== source ? <img src={source} alt={`${book.title} — published book cover`} onError={() => setFailed(source)} loading="lazy"/> : <div className="cover-unavailable"><span>{book.title}</span><small>Cover unavailable</small></div>}
 </div>;
}
export function BookCard({ book }: { book: Book }) {
 return <article className="book-card"><Link href={`/books/${book.id}`} className="book-image" aria-label={`View ${book.title}`}><Cover book={book}/></Link><div className="book-meta"><span className="eyebrow">{book.category}</span><h3><Link href={`/books/${book.id}`}>{book.title}</Link></h3><p className="book-author">{book.author}</p><div className="book-card-bottom"><span className={`availability ${!book.copies?'unavailable':''}`}>{book.copies?`${book.copies} available`:'On loan'}</span><Link className="book-details-button" href={`/books/${book.id}`}>View Details </Link></div></div></article>;
}
