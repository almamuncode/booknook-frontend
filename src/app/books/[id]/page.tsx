import { BookDetails } from '@/components/book-details';
export const metadata = { title: 'Book Details' };
export default async function Page({ params }: { params:Promise<{id:string}> }) { const {id}=await params;return <BookDetails id={id}/>; }
