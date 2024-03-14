'use client';

import useProjectPageStore from '@/libs/store/projectPageStore';
import ProjectStage01 from './ProjectStage01';
import ProjectStage02 from './ProjectStage02';
import ProjectStage03 from './ProjectStage03';
import ProjectStage04 from './ProjectStage04';
import ProjectStage05 from './ProjectStage05';
import ProjectStage06 from './ProjectStage06';
import ProjectStage07 from './ProjectStage07';

interface ProjectProps {
  userId: string;
  stage: number;
}

const Project: React.FC<ProjectProps> = ({ userId, stage }) => {
  const { pageNumber } = useProjectPageStore((state) => ({
    pageNumber: state.pageNumber,
  }));

  if (stage === 1) return <ProjectStage01 stage={stage} />;
  if (stage === 2) return <ProjectStage02 stage={stage} />;
  if (stage === 3) return <ProjectStage03 stage={stage} />;
  if (stage === 4) return <ProjectStage04 stage={stage} />;
  if (stage === 5) return <ProjectStage05 stage={stage} />;
  if (stage === 6) return <ProjectStage06 stage={stage} />;
  if (stage === 7) return <ProjectStage07 userId={userId} stage={stage} />;

  return <div>{JSON.stringify(pageNumber)}</div>;
};

export default Project;
