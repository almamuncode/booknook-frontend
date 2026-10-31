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

const stories = [
 { title: 'Find a little wonder between the pages.', category: 'Fiction', image: 'library' },
 { title: 'Big questions. A whole new perspective.', category: 'Science', image: 'reading' },
 { title: 'Every generation has a story to tell.', category: 'History', image: 'discovery' },
];
const categories = ['All books','Fiction','Science','History','Kids','Others'];
export function Hero() {
 const { books } = useLibrary();
 const [slide, setSlide] = useState(0);
 const [query, setQuery] = useState('');
 const carousel = useRef<SwiperInstance | null>(null);
 const router = useRouter();
 const count = (category:string) => category === 'All books' ? books.length : books.filter(book=>book.category===category).length;
 const categoryUrl = (category:string) => category === 'All books' ? '/books' : `/books?category=${encodeURIComponent(category)}`;
 return <section className="discovery-hero" aria-label="Discover BookNook">
  <div className="container">
   <div className="discovery-heading">
    <div><p className="eyebrow">A little library. A world of possibilities.</p><h1>Where quiet moments<br/>meet great books.</h1><div className="discovery-actions"><Link className="button" href="/books">Explore books</Link><a className="discovery-secondary" href="#discover-categories">Browse categories</a></div></div>
    <p className="discovery-intro">A familiar favorite. A new perspective. A story you can’t put down. Find your next read, borrow it, and make a little time for yourself.</p>
   </div>
   <div className="discovery-mosaic">
    <div className="discovery-feature">
     <Swiper modules={[A11y,Keyboard]} rewind keyboard={{enabled:true,onlyInViewport:true}} a11y={{enabled:true}} speed={450} onSwiper={instance=>{carousel.current=instance;}} onSlideChange={instance=>setSlide(instance.activeIndex)}>
      {stories.map((story,index)=><SwiperSlide key={story.category}><Link className="discovery-photo discovery-main-photo" href={categoryUrl(story.category)} inert={index!==slide} tabIndex={index===slide?0:-1}><img src={`/images/hero-${story.image}.webp`} alt="" fetchPriority={index===0?'high':'auto'}/><div className="discovery-photo-caption"><span className="discovery-photo-tag">The {story.category.toLowerCase()} collection</span><h2>{story.title}</h2><span>{count(story.category)} {count(story.category)===1?'book':'books'} to discover</span></div></Link></SwiperSlide>)}
     </Swiper>
     <div className="discovery-slide-controls" aria-label="Featured collections">{stories.map((story,index)=><button key={story.category} aria-label={`Show ${story.category.toLowerCase()} collection`} aria-pressed={slide===index} onClick={()=>carousel.current?.slideTo(index)}>0{index+1}</button>)}</div>
    </div>
    <div className="discovery-middle">
     <Link className="discovery-photo discovery-reader" href="/books?category=Kids"><img src="/images/hero-discovery.webp" alt=""/><div className="discovery-photo-caption"><h2>Small pages.<br/>Big adventures.</h2><span>Discover books for young minds</span></div></Link>
     <div className="discovery-search-card"><span className="eyebrow">Your next chapter</span><h2>Have a book in mind?</h2><form onSubmit={event=>{event.preventDefault();router.push(`/books${query.trim()?`?q=${encodeURIComponent(query.trim())}`:''}`);}}><label className="sr-only" htmlFor="hero-book-search">Search the library</label><input id="hero-book-search" value={query} onChange={event=>setQuery(event.target.value)} placeholder="Title or author…"/><button type="submit">Find books</button></form></div>
    </div>
    <Link className="discovery-photo discovery-nook" href="/books?category=Others"><img src="/images/hero-reading.webp" alt=""/><div className="discovery-photo-caption"><span className="discovery-photo-tag">Slow down. Settle in.</span><h2>Make room for<br/>a good book.</h2><span>A little escape from the everyday</span></div></Link>
   </div>
   <nav className="discovery-categories" id="discover-categories" aria-label="Discover books by category">{categories.map(category=><Link href={categoryUrl(category)} key={category}><img src="/icons/book-open.svg" alt=""/><strong>{category==='Others'?'More to explore':category}</strong><span>{count(category)} {count(category)===1?'book':'books'}</span></Link>)}</nav>
  </div>
 </section>;
}
