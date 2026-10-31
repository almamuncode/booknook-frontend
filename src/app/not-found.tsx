import Link from 'next/link';
export default function NotFound() { return <div className="empty-state not-found"><p className="eyebrow">404 · A MISSING CHAPTER</p><h1>This page wandered<br/><em>off the shelf.</em></h1><p>Let’s get you back to a story worth reading.</p><Link className="button" href="/">Back to home <span>↗</span></Link></div>; }
