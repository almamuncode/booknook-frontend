import type { Metadata } from 'next';
import './globals.css';
import { LibraryProvider } from '@/components/library-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
export const metadata: Metadata = { title: { default: 'BookNook | Your next chapter starts here', template: 'BookNook | %s' }, description: 'Discover, borrow, and share books in your small community library.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a><LibraryProvider><Header/><main id="main">{children}</main><Footer/></LibraryProvider></body></html>; }
