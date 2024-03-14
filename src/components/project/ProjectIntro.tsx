'use client'

import useProjectPageStore from '@/libs/store/projectPageStore';
import useProjectRequestStore from '@/libs/store/projectRequestStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProjectIntro: React.FC = () => {
  const router = useRouter();

  const { pageNumber, resetPage } = useProjectPageStore((state) => ({
    pageNumber: state.pageNumber,
    resetPage: state.resetPage,
  }));

  const { projectCategory } = useProjectRequestStore((state) => ({
    projectCategory: state.projectCategory,
  }));

  const resetStore = useProjectRequestStore((state) => state.resetStore);

  useEffect(() => {
    // 컴포넌트가 마운트 되자마자 실행되는 로직
    const checkData = async () => {
      // 데이터 체크 로직이 여기에 위치
      if (pageNumber !== 1 || projectCategory.length !== 0) {
        const confirmLeave = window.confirm('이전에 입력한 데이터를 불러오시겠습니까?');
        if (!confirmLeave) {
          resetPage();
          resetStore();
          await router.push('/project/1');
        } else {
          await router.push(`/project/${pageNumber}`);
        }
      } else {
        await router.push('/project/1');
      }
    };

    checkData();
  }, [pageNumber, projectCategory, resetPage, resetStore, router]);

  return null;
};

export default ProjectIntro;
