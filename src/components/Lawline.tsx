import Image from 'next/image';

const Lawline = () => {
  return (
    <>
      <div
        id="Ai_lawline"
        className="mt-16 bg-[url('/img/lawline_bg.png')]  bg-cover bg-fixed  bg-center bg-no-repeat"
      >
        <div className="m-auto max-w-[1000px] lg:px-6">
          <p className="pb-10 pt-16">
            <Image
              src="/img/lawline_logo.png"
              alt="Next.js Logo"
              width={100}
              height={50}
            />
          </p>
          <h3 className="text-4xl font-semibold ">AI 문서작성 도우미 로라인</h3>
          <p className="mt-3 pb-16 text-xl">
            작성하기 힘든 각종 서류,문서 양식을 자동으로 채우고 필요한 서류를
            찾아서 준비해주는 AI기반 서비스
          </p>
        </div>
      </div>
      <div className="m-auto mt-16 max-w-[1000px]">
        <p className="px-6">
          {' '}
          <Image
            src="/img/lawline.png"
            alt="Next.js Logo"
            width={1000}
            height={500}
            style={{ width: '100%', height: 'auto' }}
          />
        </p>
        <ul className=" mt-6 flex w-full justify-between">
          <li>
            {' '}
            <p className="pl-6">
              {' '}
              <Image
                src="/img/lawline_1.png"
                alt="Next.js Logo"
                width={1000}
                height={500}
                style={{ width: '100%', height: 'auto' }}
              />
            </p>
          </li>
          <li>
            {' '}
            <p className="px-3">
              {' '}
              <Image
                src="/img/lawline_2.png"
                alt="Next.js Logo"
                width={1000}
                height={500}
                style={{ width: '100%', height: 'auto' }}
              />
            </p>
          </li>
          <li>
            {' '}
            <p className="pr-6 ">
              {' '}
              <Image
                src="/img/lawline_3.png"
                alt="Next.js Logo"
                width={1000}
                height={500}
                style={{ width: '100%', height: 'auto' }}
              />
            </p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Lawline;
