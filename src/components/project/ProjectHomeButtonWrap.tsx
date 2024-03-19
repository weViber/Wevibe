import { cn } from '@/utils/style';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MdChevronLeft } from 'react-icons/md';

export default function ProjectHomeButtonWrap() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <>
      {windowWidth <= 640 ? (
        <div className="flex justify-start">
          <Link
            href={'/'}
            className={cn(
              'flex items-center font-semibold text-blue-600',
              'transition-all ease-in hover:opacity-70'
            )}
          >
            <MdChevronLeft />
            홈으로 나가기
          </Link>
        </div>
      ) : null}
    </>
  );
}
