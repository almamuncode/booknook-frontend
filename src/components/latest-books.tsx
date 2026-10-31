"use client";
import { useLibrary } from './library-provider';
import { BookCard } from './ui';
export function LatestBooks() { const { books } = useLibrary(); return <div className="book-grid">{books.slice(0,6).map(book=><BookCard key={book.id} book={book}/>)}</div>; }
