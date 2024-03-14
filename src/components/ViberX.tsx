import Image from 'next/image';

const ViberX = () => {
  return (
    <>
      <div id="viber_X" className="mt-16">
        <div className="bg-[url('/img/viberX_bg.png')] bg-center ">
          <div className="m-auto max-w-[1000px] lg:px-6">
            <h4 className="pt-12 text-[#4ea223] ">핵심 기술 Core Tech</h4>
            <h2 className="pb-7 pt-8 text-7xl font-medium text-white">
              viber X
            </h2>
            <div>
              <ul className="flex w-[80%] justify-between pb-16 text-white md:block md:w-[100%] md:pb-10">
                <li className=" ">
                  사용자의 취향 , 관심 스타일을
                  <br />
                  스타일 매칭 코디 AI 솔루션 , viber X
                </li>
                <li className="mr-4 border-l-2 md:my-4 md:border-l-0 md:border-t-2"></li>
                <li>
                  유저, 상품 거래 등의 데이터를 분석해
                  <br />
                  이커머스소비자와 운영자에게만족스러운 결과를 제공합니다
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <div className="m-auto mt-16 max-w-[1000px] lg:px-6">
          <h3 className="text-3xl font-semibold ">개인화 추천</h3>
          <p className="mt-6 text-xl">
            지속적으로 데이터를 수집함에 따라 사용자의 취향과 구매패턴을 파악해{' '}
            <br />
            더욱 높은 구매율을 목표로하는 추천 알고리즘이 구성됩니다
          </p>
          <ul className="mt-7 flex text-white md:flex-wrap  ">
            <li className="mr-3 block w-[90px] rounded-xl bg-[#5b74e1] py-8 text-center md:mb-3">
              ATP
            </li>
            <li className="mr-3 block w-[90px] rounded-xl bg-[#fcbd08] py-8 text-center md:mb-3">
              담기횟수
            </li>
            <li className="mr-3 block w-[90px] rounded-xl bg-[#f76060] py-8 text-center md:mb-3">
              구매율
            </li>
            <li className="mr-3 block w-[90px] rounded-xl bg-[#000000] py-8 text-center md:mb-3">
              비슷한 상품
            </li>
            <li className="mr-3 block w-[90px] rounded-xl bg-[#fcbd08] py-8 text-center md:mb-3">
              외부 데이터
            </li>
            <li className="mr-3 block w-[90px] rounded-xl bg-[#5b74e1] py-8 text-center md:mb-3">
              리뷰
            </li>
          </ul>
        </div>
        <div className="m-auto mt-16 max-w-[1000px] lg:px-6">
          <h3 className="text-3xl font-semibold ">AI 코디매칭</h3>
          <p className="mt-6 text-xl">
            유사한 패턴의 구매자들이 선택한 아이템 혹은 함께 자주 담긴 아이템을
            추천해 <br />
            하나의 제품이 아닌 코디 전체를 추천하고 구매를 돕습니다.
          </p>
          <p className="mt-12">
            <Image
              src="/img/ai_coding.png"
              alt="Next.js Logo"
              width={650}
              height={50}
            />
          </p>
        </div>
        <div className="m-auto mt-16 max-w-[1000px] lg:px-6">
          <h3 className="text-3xl font-semibold ">AI 스타일링</h3>
          <p className="mt-6 text-xl">
            최신 유행하는 스타일을 추천 , 사용자가 제일 선호하는 스타일링을
            추천해 줍니다.
          </p>
          <p className="mt-8">
            {' '}
            <Image
              src="/img/ai_ styling.png"
              alt="Next.js Logo"
              width={870}
              height={50}
            />
          </p>
        </div>
      </div>
    </>
  );
};

export default ViberX;
