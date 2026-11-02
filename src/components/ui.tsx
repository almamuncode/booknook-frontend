"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Book } from '@/lib/books';
export function Mark() { return <span className="brand-mark" aria-hidden="true"><img src="/icons/book-open.svg" alt=""/></span>; }
export const cloth = (book: Book) => ({ '--cloth': book.color || '#dae3ce', '--cloth-ink': book.ink || '#264e3c' }) as React.CSSProperties;
export function Cover({ book, large = false, sizes = '130px' }: { book: Book & { image?: string }; large?: boolean; sizes?: string }) {
 const source = book.image || book.coverUrl;
 const [failed, setFailed] = useState<string | null>(null);
 return <div className={`cover published-cover ${large ? 'cover-large' : ''}`} style={cloth(book)}>
  <div className="cover-cloth" aria-hidden="true"><span>{book.title}</span><small>{book.author}</small></div>
  {source && failed !== source ? <Image src={source} alt={`${book.title} — published book cover`} fill sizes={sizes} onError={() => setFailed(source)} loading="lazy" unoptimized={source.startsWith('data:')}/> : <div className="cover-unavailable"><span>{book.title}</span><small>Cover unavailable</small></div>}
 </div>;
}
export function BookCard({ book }: { book: Book }) {
 return <article className="book-card" style={cloth(book)}><Link href={`/books/${book.id}`} className="book-image" aria-label={`View ${book.title}`}><Cover book={book} sizes="(max-width: 640px) 140px, 200px"/></Link><div className="book-meta"><span className="eyebrow">{book.category}</span><h3><Link href={`/books/${book.id}`}>{book.title}</Link></h3><p className="book-author">{book.author}</p><div className="book-card-bottom"><span className={`availability ${!book.copies?'unavailable':''}`}>{book.copies?`${book.copies} available`:'On loan'}</span><Link className="book-details-button" href={`/books/${book.id}`}>View Details</Link></div></div></article>;
}
