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
import { Cover, cloth } from './ui';
const stories = [
 { label: 'A world of stories, one little library', title: <>Start your reading adventure with BookNook.</>, description: 'A quiet escape. A different perspective. A story you can’t put down. Discover a collection of books to borrow, share, and fall in love with.' },
 { label: 'Make time for something wonderful', title: <>Turn a page. Open your mind. Find your story.</>, description: 'From timeless fiction to the wonders of science, follow your curiosity into a new chapter. Your next favorite might be one shelf away.' },
 { label: 'Good stories deserve another reader', title: <>Share a book. Pass on the joy. Read together.</>, description: 'Give a book you love a new home for a little while. Build your own shelf and be part of a community that keeps good stories moving.' },
];
export function Hero() {
 const { books } = useLibrary();
 const [slide, setSlide] = useState(0);
 const [query, setQuery] = useState('');
 const carousel = useRef<SwiperInstance | null>(null);
 const router = useRouter();
 return <section className="library-hero" aria-label="Discover BookNook">
  <div className="container">
   <Swiper modules={[A11y, Keyboard]} slidesPerView={1} rewind keyboard={{enabled:true,onlyInViewport:true}} a11y={{enabled:true}} speed={450} onSwiper={instance=>{carousel.current=instance;}} onSlideChange={instance=>setSlide(instance.activeIndex)}>
    {stories.map((story,index)=>{
     const picks = books.length ? [books[(index+1)%books.length],books[(index+4)%books.length],books[index%books.length]] : [];
     const lead = picks[0];
     return <SwiperSlide key={story.label}><div className="library-hero-inner" inert={index!==slide}>
      <div className="library-hero-copy"><p className="eyebrow">{story.label}</p><h1>{story.title}</h1><p className="hero-lede">{story.description}</p>
       <form className="hero-search" onSubmit={event=>{event.preventDefault();router.push(`/books${query.trim()?`?q=${encodeURIComponent(query.trim())}`:''}`);}}><label><img src="/icons/search.svg" alt=""/><input aria-label="Search the library" value={query} onChange={event=>setQuery(event.target.value)} placeholder="Find your next great read…"/></label><button type="submit" className="button">Search</button></form>
       <div className="hero-reading-note"><Link href="/books" className="hero-browse">Browse Books</Link><span>Borrow. Return. Repeat.</span></div>
      </div>
      <div className="spotlight" style={lead?cloth(lead):undefined}>
       <div className="spotlight-heading"><span>On our bookshelf</span><span className="spotlight-count">{index+1} / 3</span></div>
       {picks.length?<div className="spotlight-books">{picks.map((book,i)=><Link key={`${book.id}-${i}`} href={`/books/${book.id}`} className={`spotlight-book spotlight-book-${i}`} aria-label={`View ${book.title}`}><Cover book={book}/></Link>)}</div>:<p className="hero-empty">New stories are on their way. Browse the collection or share a book to get started.</p>}
       {lead && <div className="spotlight-caption"><strong>{lead.title}</strong><span>by {lead.author}</span></div>}
       <div className="spotlight-controls"><button aria-label="Previous featured slide" onClick={()=>carousel.current?.slidePrev()}>Previous</button><button aria-label="Next featured slide" onClick={()=>carousel.current?.slideNext()}>Next</button><span>{lead?`${lead.category} & beyond`:'Your next chapter awaits'}</span></div>
      </div>
     </div></SwiperSlide>;
    })}
   </Swiper>
  </div>
 </section>;
}
