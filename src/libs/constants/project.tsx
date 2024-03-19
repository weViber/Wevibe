import { ReactElement } from 'react';
import { GrPlan } from 'react-icons/gr';
import { HiOutlineLightBulb } from 'react-icons/hi';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { MdOutlineDesignServices } from 'react-icons/md';
import { PiFolders } from 'react-icons/pi';
import { TbDeviceImac } from 'react-icons/tb';

interface CategoryOption {
  icon: ReactElement;
  context: string;
}

interface FieldOption {
  category: string;
  selects: string[];
}
interface ClientLocation {
  [key: string]: string[];
}

export const categoryOptions: CategoryOption[] = [
  {
    icon: <TbDeviceImac />,
    context: '개발',
  },
  {
    icon: <GrPlan />,
    context: '기획',
  },
  {
    icon: <MdOutlineDesignServices />,
    context: '디자인',
  },
];

export const fieldOptions: FieldOption[] = [
  {
    category: '개발',
    selects: ['웹', '어플리케이션', '커머스, 쇼핑몰', '퍼블리싱', '워드프레스'],
  },
  {
    category: '디자인',
    selects: [
      '웹',
      '어플리케이션',
      '커머스, 쇼핑몰',
      '제품',
      '프레젠테이션',
      '그래픽',
      '인쇄물',
      '로고',
      '기타',
    ],
  },
  {
    category: '기획',
    selects: [
      '웹',
      '어플리케이션',
      '커머스, 쇼핑몰',
      '워드프레스',
      '제품',
      '프레젠테이션',
      '인쇄물',
      '로고',
      '기타',
    ],
  },
];

export const progressClassificationOptions = [
  '신규 프로젝트를 진행하려 합니다.',
  '운영 중인 서비스의 리뉴얼 또는 유지보수를 하려 합니다.',
];
export const planningStatusOptions = [
  {
    icon: <HiOutlineLightBulb />,
    context: '아이디어만 있습니다.',
  },
  {
    icon: <PiFolders />,
    context: '필요한 내용들을 간단히 정리해두었습니다.',
  },
  {
    icon: <IoDocumentTextOutline />,
    context: '상세한 문서가 있습니다.',
  },
];
export const detailedPlanningStatusOptions = [
  {
    context: '요구사항 정의서',
    desc: '구현을 원하는 기능과 그에 대한 설명, 작업 우선순위 등이 작성된 문서입니다.',
  },
  {
    context: '화면설계서 (스토리보드, 와이어프레임)',
    desc: '제작될 결과물의 UI 설계와 기능에 대한 설명이 기재된 문서입니다.',
  },
  {
    context: '프로토타입 (프로젝트 결과물의 샘플 버전)',
    desc: '중요한 기능으로만 구성된 프로젝트 결과물의 샘플 버전입니다.',
  },
  {
    context: '제안요청서',
    desc: '제안을 받기 위한 요청서로 프로젝트 목적, 요구사항, 제안서 양식, 평가 기준 등이 기재된 문서입니다.',
  },
  {
    context: '메뉴구조도 (IA)',
    desc: '제작될 결과물의 정보가 메뉴 단위로 설계된 문서입니다.',
  },
];
export const preMeetingMethodOptions = [
  '온라인 (카카오톡, 화상미팅 등)',
  '온프라인',
];
export const meetingMethodOptions = [
  '온라인 (카카오톡, 화상미팅 등)',
  '온프라인',
];
export const meetingFrequencyOptions = ['주 2회', '주 1회', '필요시 요청'];

export const clientLocation: ClientLocation = {
  서울특별시: [
    '강남구',
    '강동구',
    '강북구',
    '강서구',
    '관악구',
    '광진구',
    '구로구',
    '금천구',
    '노원구',
    '도봉구',
    '동대문구',
    '동작구',
    '마포구',
    '서대문구',
    '서초구',
    '성동구',
    '성북구',
    '송파구',
    '양천구',
    '영등포구',
    '용산구',
    '은평구',
    '종로구',
    '중구',
    '중랑구',
  ],
  경기도: [
    '수원시 장안구',
    '수원시 권선구',
    '수원시 팔달구',
    '수원시 영통구',
    '성남시 수정구',
    '성남시 중원구',
    '성남시 분당구',
    '의정부시',
    '안양시 만안구',
    '안양시 동안구',
    '부천시',
    '광명시',
    '평택시',
    '동두천시',
    '안산시 상록구',
    '안산시 단원구',
    '고양시 덕양구',
    '고양시 일산동구',
    '고양시 일산서구',
    '과천시',
    '구리시',
    '남양주시',
    '오산시',
    '시흥시',
    '군포시',
    '의왕시',
    '하남시',
    '용인시 처인구',
    '용인시 기흥구',
    '용인시 수지구',
    '파주시',
    '이천시',
    '안성시',
    '김포시',
    '화성시',
    '광주시',
    '양주시',
    '포천시',
    '여주시',
    '연천군',
    '가평군',
    '양평군',
  ],
  인천광역시: [
    '계양구',
    '미추홀구',
    '남동구',
    '동구',
    '부평구',
    '서구',
    '연수구',
    '중구',
    '강화군',
    '옹진군',
  ],
  강원도: [
    '춘천시',
    '원주시',
    '강릉시',
    '동해시',
    '태백시',
    '속초시',
    '삼척시',
    '홍천군',
    '횡성군',
    '영월군',
    '평창군',
    '정선군',
    '철원군',
    '화천군',
    '양구군',
    '인제군',
    '고성군',
    '양양군',
  ],
  충청북도: [
    '청주시 상당구',
    '청주시 서원구',
    '청주시 흥덕구',
    '청주시 청원구',
    '충주시',
    '제천시',
    '보은군',
    '옥천군',
    '영동군',
    '증평군',
    '진천군',
    '괴산군',
    '음성군',
    '단양군',
  ],
  충청남도: [
    '천안시 동남구',
    '천안시 서북구',
    '공주시',
    '보령시',
    '아산시',
    '서산시',
    '논산시',
    '계룡시',
    '당진시',
    '금산군',
    '부여군',
    '서천군',
    '청양군',
    '홍성군',
    '예산군',
    '태안군',
  ],
  대전광역시: ['대덕구', '동구', '서구', '유성구', '중구'],
  세종특별자치시: ['세종특별자치시'],
  전라북도: [
    '전주시 완산구',
    '전주시 덕진구',
    '군산시',
    '익산시',
    '정읍시',
    '남원시',
    '김제시',
    '완주군',
    '진안군',
    '무주군',
    '장수군',
    '임실군',
    '순창군',
    '고창군',
    '부안군',
  ],
  전라남도: [
    '목포시',
    '여수시',
    '순천시',
    '나주시',
    '광양시',
    '담양군',
    '곡성군',
    '구례군',
    '고흥군',
    '보성군',
    '화순군',
    '장흥군',
    '강진군',
    '해남군',
    '영암군',
    '무안군',
    '함평군',
    '영광군',
    '장성군',
    '완도군',
    '진도군',
    '신안군',
  ],
  광주광역시: ['광산구', '남구', '동구', '북구', '서구'],
  경상북도: [
    '포항시 남구',
    '포항시 북구',
    '경주시',
    '김천시',
    '안동시',
    '구미시',
    '영주시',
    '영천시',
    '상주시',
    '문경시',
    '경산시',
    '군위군',
    '의성군',
    '청송군',
    '영양군',
    '영덕군',
    '청도군',
    '고령군',
    '성주군',
    '칠곡군',
    '예천군',
    '봉화군',
    '울진군',
    '울릉군',
  ],
  경상남도: [
    '창원시 의창구',
    '창원시 성산구',
    '창원시 마산합포구',
    '창원시 마산회원구',
    '창원시 진해구',
    '진주시',
    '통영시',
    '사천시',
    '김해시',
    '밀양시',
    '거제시',
    '양산시',
    '의령군',
    '함안군',
    '창녕군',
    '고성군',
    '남해군',
    '하동군',
    '산청군',
    '함양군',
    '거창군',
    '합천군',
  ],
  부산광역시: [
    '강서구',
    '금정구',
    '남구',
    '동구',
    '동래구',
    '부산진구',
    '북구',
    '사상구',
    '사하구',
    '서구',
    '수영구',
    '연제구',
    '영도구',
    '중구',
    '해운대구',
    '기장군',
  ],
  대구광역시: [
    '남구',
    '달서구',
    '동구',
    '북구',
    '서구',
    '수성구',
    '중구',
    '달성군',
  ],
  울산광역시: ['남구', '동구', '북구', '중구', '울주군'],
  제주특별자치도: ['서귀포시', '제주시'],
};

export const isFundingAvailableOptions = [
  '아닙니다.',
  '네, 정부지원사업 또는 정부지원 연구과제입니다.',
];
export const isFundingAvailableSubOptions = [
  '네, 사업비 지원이 확정되었습니다.',
  '선정 전입니다.',
];
export const applicantRequirementsOptions = [
  '개인 또는 팀 가능',
  '사업자 가능 (세금계산서 발행)',
  '업력 1년 이상 (사업자등록증 기준)',
  '보증보험 발급 가능',
];
export const applicantRequirementsSubOptions = ['개인사업자', '법인사업자'];
export const itProjectManagementExperienceOptions = [
  'IT 프로젝트 관리 경험이 있습니다.',
  '없습니다.',
];
export const futurePlansOptions = [
  '월 단위 유지보수를 의뢰 예정입니다. 미팅 시 논의가 필요합니다.',
  '고도화 프로젝트를 의뢰 예정입니다. 미팅 시 논의가 필요합니다.',
];
export const projectPriorityOptions = ['산출물 완성도', '금액', '일정 준수'];
