import { redirect, notFound } from 'next/navigation';
import { getBook } from '@/lib/books';
export async function generateMetadata() { return { title: 'Book Details' }; }
export default async function BookPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; if(!await getBook(id)) notFound(); redirect(`/login?callbackURL=${encodeURIComponent(`/books/${id}`)}`); }
