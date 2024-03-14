'use client';

import { Project } from '@prisma/client';
import { format } from 'date-fns';
import Link from 'next/link';

interface MyProjectListProps {
  projects: Project[];
}
const MyProjectList: React.FC<MyProjectListProps> = ({ projects }) => {
  return (
    <div
      id="dev"
      className=" top-0   mb-[-30px] mt-[-152px]  h-auto w-full  bg-[url('/img/h_bg.png')] bg-cover bg-center bg-no-repeat  py-12 leading-7 md:px-0 lg:px-4"
    >
      <div className=" m-auto mb-[60px] h-auto min-h-[500px] w-[50%] rounded-3xl bg-white  pb-8   shadow-lg drop-shadow-sm md:w-[92%] lg:w-[80%] 2sm:w-[100%] ">
        <div className="mx-auto mt-[155px] flex  max-w-full flex-col gap-4 px-12 py-8  md:px-2 ">
          <h3 className=" my-4 mb-9 text-center text-2xl">
            {' '}
            의뢰한 프로젝트 목록
          </h3>
          <div className="container flex flex-col gap-8  ">
            {projects &&
              projects.map((project, index) => (
                <Link
                  className="block w-full rounded-xl border-2 border-[#EAEAEA]  p-4 hover:bg-[#EAEAEA]  "
                  key={index}
                  href={'/myproject/' + project.id}
                >
                  {format(new Date(project.createdAt), 'yyyy년 MM월 dd일')}{' '}
                  {project.projectTitle}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProjectList;
