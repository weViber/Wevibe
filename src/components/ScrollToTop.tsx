'use client';
import Image from "next/image";
import { useEffect, useRef } from 'react';

const ScrollToTop = () => {
  const scrollUpImageRef = useRef<HTMLParagraphElement>(null); // p 요소에 대한 ref 생성

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollUpImageRef.current) {
        if (scrollY > 300) {
          scrollUpImageRef.current.style.display = 'block';
        } else {
          scrollUpImageRef.current.style.display = 'none';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="fixed right-6 bottom-10 border-2 p-2 rounded-2xl border-[#000] z-50 bg-slate-50">
        <p ref={scrollUpImageRef} className="mb-3 cursor-pointer" style={{ display: 'none' }} onClick={handleScrollToTop}>
          <Image
            src="/img/UpArrow.png"
            alt="Scroll Up"
            width={30}
            height={30}
          />
        </p>

        <p onClick={handleScrollToBottom} className="cursor-pointer">
          <Image
            src="/img/DownArrow.png"
            alt="Scroll Down"
            width={30}
            height={30}
          />
        </p>
      </div>
    </>
  );
};

export default ScrollToTop;
