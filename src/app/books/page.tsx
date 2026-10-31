import { Suspense } from 'react';
import { Catalog } from '@/components/catalog';
export const metadata = { title: 'All Books' };
export default function BooksPage() { return <section className="container section catalog-page"><div className="page-heading"><p className="eyebrow">THE BOOKNOOK COLLECTION</p><h1>A whole world.<br/><em>One bookshelf.</em></h1><p>Old favorites, new discoveries, and the book you didn’t know you needed.</p></div><Suspense fallback={<p role="status">Loading the collection…</p>}><Catalog/></Suspense><p className="demo-note">Preview collection · Live availability will be connected with the backend.</p></section>; }
