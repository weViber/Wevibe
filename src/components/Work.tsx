'use client';
import Image from 'next/image';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const Work = () => {
  
  return (
    <>
      <div id="WORKS" className="mt-16 lg:px-6 ">
        <div className="m-auto max-w-[1000px]">
          <h3 className="text-4xl font-semibold ">WORKS</h3>
          <p className="mt-1 pb-16 text-xl">
            보다 입체적인 솔루션과 디자인을 제안합니다
          </p>
        </div>
      </div>

      <div className='overflow-hidden'>
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 0, disableOnInteraction: false }}
        speed={8000}
        loop={true}
        spaceBetween={50}
        slidesPerView={3}
        className="sample-slider md:min-w-[1200px] "
        freeMode={true}
        resistance={true}
        resistanceRatio={0.85}
      >
        <SwiperSlide className="swiper-slide">
          <Link target='_blank' href='https://abraxaskorea.com/'>
          <Image 
            src="/img/works2.png"
            width={700}
            height={100}
            alt="abraxas 사이트제작"
          />
          </Link>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
        <Link target='_blank' href='https://zenian.kr'>
          <Image
            src="/img/works1.png"
            width={700}
            height={100}
            alt="zenian 사이트제작"
          />
            </Link>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
        <Link target='_blank' href='https://lawandpeople.co.kr/cases'>
          <Image
            src="/img/works3.png"
            width={700}
            height={100}
            alt="법과사람들 사이트제작"
          />
             </Link>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
        <Link target='_blank' href='https://abraxaskorea.com'>
          <Image
            src="/img/works5.png"
            width={700}
            height={100}
            alt="아브락삭스 끼브리자 디자인"
          />
           </Link>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
        {/* <Link target='_blank' href=''> */}
          <Image
            src="/img/works8.png"
            width={700}
            height={100}
            alt="우리동네카센터 제작"
          />
             {/* </Link> */}
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
        
          <Image
            src="/img/works7.png"
            width={700}
            height={100}
            alt="디블럭,우리동네카센터 사이트제작"
          />
         
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
       
          <Image
            src="/img/works6.png"
            width={700}
            height={100}
            alt="법무법인정곡 사이트제작"
          />
        
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
       
          <Image
            src="/img/works4.png"
            width={700}
            height={100}
            alt="디블럭필터 디자인"
          />
         
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
        <Link target='_blank' href='https://westloke.com/'>
          <Image
            src="/img/works9.png"
            width={700}
            height={100}
            alt="WestlokeAmps"
          />
               </Link>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
        <Link target='_blank' href='http://www.tk-trade.co.kr'>
          <Image
            src="/img/works10.png"
            width={700}
            height={100}
            alt="Tk_trade"
          />
             </Link>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
        <Link target='_blank' href='https://lyncare.co.kr'>
          <Image
            src="/img/lyncare.png"
            width={700}
            height={100}
            alt="lyncare"
          />
             </Link>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
        <Link target='_blank' href='https://dblock.kr'>
          <Image
            src="/img/dblock.png"
            width={700}
            height={100}
            alt="dblock"
          />
             </Link>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
        <Link target='_blank' href='http://lynplus.kr/'>
          <Image
            src="/img/lynpluscare.png"
            width={700}
            height={100}
            alt="lynpluscare"
          />
             </Link>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
        <Link target='_blank' href='https://ic-korea.com/'>
          <Image
            src="/img/icKorea.png"
            width={700}
            height={100}
            alt="icKorea"
          />
             </Link>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
        <Link target='_blank' href='http://lawfirmjk.co.kr/'>
          <Image
            src="/img/JungGok.png"
            width={700}
            height={100}
            alt="JungGok"
          />
             </Link>
        </SwiperSlide>
      </Swiper>
      </div>
    </>
  );
};

export default Work;
