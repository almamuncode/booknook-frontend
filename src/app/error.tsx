"use client";
export default function ErrorPage({reset}:{reset:()=>void}) {return <section className="container empty-state"><p className="eyebrow">A LITTLE INTERRUPTION</p><h1>Let’s try that again.</h1><p>We couldn’t open this part of the library. Please try again.</p><button className="button" onClick={reset}>Try again</button></section>;}
