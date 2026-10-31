"use client";
import Link from 'next/link';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Keyboard } from 'swiper/modules';
import type { Swiper as SwiperInstance } from 'swiper';
import 'swiper/css';
import 'swiper/css/a11y';
import { useLibrary } from './library-provider';
import { Cover } from './ui';
const stories = [
 { label: 'A world of stories, one little library', title: <>A little library. A world of possibilities.</>, description: 'A quiet escape. A different perspective. A story you can’t put down. Discover a collection of books to borrow, share, and fall in love with.' },
 { label: 'Make time for something wonderful', title: <>Follow your curiosity. Find your next chapter.</>, description: 'From timeless fiction to the wonders of science, follow your curiosity into a new chapter. Your next favorite might be one shelf away.' },
 { label: 'Good stories deserve another reader', title: <>Good books bring people together.</>, description: 'Give a book you love a new home for a little while. Build your own shelf and be part of a community that keeps good stories moving.' },
];
export function Hero() {
 const { books } = useLibrary();
 const [slide, setSlide] = useState(0);
 const [query, setQuery] = useState('');
 const carousel = useRef<SwiperInstance | null>(null);
 const router = useRouter();
 const picks = books.length ? Array.from({length:Math.min(5,books.length)},(_,index)=>books[(slide+index)%books.length]) : [];

 // Only the story text slides; search, browse link and the cover stage stay in place.
 return <section className="library-hero" aria-label="Discover BookNook">
  <div className="container library-hero-inner">
   <div className="library-hero-copy">
    <Swiper modules={[A11y, Keyboard]} slidesPerView={1} spaceBetween={64} rewind keyboard={{enabled:true,onlyInViewport:true}} a11y={{enabled:true}} speed={450} onSwiper={instance=>{carousel.current=instance;}} onSlideChange={instance=>setSlide(instance.activeIndex)}>
     {stories.map((story,index)=><SwiperSlide key={story.label}><div className="hero-story" inert={index!==slide}><p className="eyebrow">{story.label}</p><h1>{story.title}</h1><p className="hero-lede">{story.description}</p></div></SwiperSlide>)}
    </Swiper>
    <form className="hero-search" onSubmit={event=>{event.preventDefault();router.push(`/books${query.trim()?`?q=${encodeURIComponent(query.trim())}`:''}`);}}><label><img src="/icons/search.svg" alt=""/><input aria-label="Search the library" value={query} onChange={event=>setQuery(event.target.value)} placeholder="Find your next great read…"/></label><button type="submit" className="button">Search</button></form>
    <div className="hero-reading-note"><Link href="/books" className="hero-browse">Browse Books</Link><span>Borrow. Return. Repeat.</span></div>
   </div>
   <div className="hero-shelf" aria-label="Books to discover">
    <div className="hero-shelf-label"><span>Discover something worth reading</span><span>Selected from our shelves</span></div>
    {picks.length ? <div className="hero-cover-row">{picks.map((book,i)=><Link key={`${book.id}-${i}`} href={`/books/${book.id}`} className="hero-shelf-book" aria-label={`View ${book.title}`}><Cover book={book}/><span>{book.title}</span></Link>)}</div> : <p className="hero-empty">New stories are on their way. Browse the collection or share a book to get started.</p>}
   </div>
   <div className="hero-pagination" aria-label="Featured stories">{stories.map((story,index)=><button key={story.label} aria-label={`Show featured story ${index+1}`} aria-pressed={slide===index} onClick={()=>carousel.current?.slideTo(index)}><span>0{index+1}</span></button>)}</div>
  </div>
 </section>;
}
