import { cn } from '@/utils/style';
import Link from 'next/link';
import { MdChevronLeft } from 'react-icons/md';

interface ProjectSidebarProps {
  stage: number;
}
const status = [
  '1. 기본 정보',
  '2. 준비 상태',
  '3. 프로젝트 상세',
  '4. 예산 및 일정',
  '5. 미팅',
  '6. 클라이언트 정보',
  '7. 추가 정보',
];
const ProjectSidebar: React.FC<ProjectSidebarProps> = ({ stage }) => {
  return (
    <div
      className={cn(
        'box-border block h-full w-[400px] bg-[#F2F7FF] pl-8 pt-10',
        'sm:hidden'
      )}
    >
      <Link
        href={'/'}
        className={cn(
          'mb-8 flex items-center font-semibold text-blue-600',
          'transition-all ease-in hover:opacity-70'
        )}
      >
        <MdChevronLeft />
        홈으로 나가기
      </Link>
      <h2 className="mb-8 text-xl font-bold">프로젝트 의뢰하기</h2>
      <p className="mb-4 text-lg">프로젝트 정보 등록</p>
      {status.map((item, index) => (
        <div
          key={index}
          className={cn(
            'border-l-4 border-slate-300 px-4 py-1',
            stage === index + 1 ? 'border-blue-300' : ''
          )}
        >
          <p
            className={cn(
              'text-base text-slate-500',
              stage >= index + 1 && 'font-bold text-slate-950'
            )}
          >
            {item}
          </p>
        </div>
      ))}
      <p className="mt-4 text-lg">프로젝트 등록 완료</p>
    </div>
  );
};

export default ProjectSidebar;
