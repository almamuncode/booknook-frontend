import { MemberPage } from '@/components/member-pages';
export const metadata = { title: 'Edit Book' };
export default async function Page({ params }: { params:Promise<{id:string}> }) {const {id}=await params;return <MemberPage view="edit" id={id}/>;}

