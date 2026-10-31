"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Mark } from './ui';
export function Header() { const path = usePathname(); const [open, setOpen] = useState(false); return <header className="site-header"><div className="container header-inner"><Link href="/" className="brand"><Mark/>BookNook<span className="brand-dot">.</span></Link><button className="menu-toggle" aria-expanded={open} aria-label="Toggle navigation" onClick={() => setOpen(!open)}>{open ? '✕' : '☰'}</button><nav className={open ? 'nav open' : 'nav'} aria-label="Main navigation"><Link className={path === '/' ? 'active' : ''} href="/" onClick={() => setOpen(false)}>Home</Link><Link className={path.startsWith('/books') ? 'active' : ''} href="/books" onClick={() => setOpen(false)}>All books</Link><a href="/#how-it-works" onClick={() => setOpen(false)}>How it works</a><div className="nav-auth"><Link href="/login" onClick={() => setOpen(false)}>Log in</Link><Link href="/register" className="button small" onClick={() => setOpen(false)}>Join the library <span>↗</span></Link></div></nav></div></header>; }
