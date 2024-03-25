'use client';
import Image from "next/image";
import Link from "next/link";
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

      
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className=" fixed right-6 bottom-10 border-[2px] p-2 rounded-2xl border-[#848484] z-50 bg-[#fcfcfc] opacity-99">
        <p ref={scrollUpImageRef} className="mt-0.5 mb-2.5 cursor-pointer" onClick={handleScrollToTop}>
          <Image
            src="/img/UpArrow.png"
            alt="Scroll Up"
            width={15}
            height={15}
          />
        </p>

        <p onClick={handleScrollToBottom} className="cursor-pointer">
          <Image
            src="/img/DownArrow.png"
            alt="Scroll Down"
            width={15}
            height={15}
          />
        </p>

        <p className="cursor-pointer">
        <Link href={`/mypage`}>
          <Image
           className=" mt-3 cursor-pointer"
            src="/img/Profile.png"
            alt="Profile"
            width={15}
            height={15}
          />
          </Link>
        </p>
      </div>
    </>
  );
};

export default ScrollToTop;
