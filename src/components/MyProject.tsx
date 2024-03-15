'use client';

import { Project } from '@prisma/client';
import { format } from 'date-fns';
import Image from 'next/image';

interface MyProjectProps {
  project: Project;
}
const MyProject: React.FC<MyProjectProps> = ({ project }) => {
  console.log(project);

  const projectCategoryObj = project.projectCategory;
  const projectCategory = projectCategoryObj
    .split('"')
    .join('')
    .split('[')
    .join('')
    .split(']')
    .join('')
    .split(',')
    .join(', ');

  const projectFieldObj = project.projectField;
  const projectField = projectFieldObj
    .split('"')
    .join('')
    .split('[')
    .join('')
    .split(']')
    .join('')
    .split(',')
    .join(', ');

  const detailedPlanningStatusObj = project.detailedPlanningStatus;
  const detailedPlanningStatus = detailedPlanningStatusObj
    ?.split('"')
    .join('')
    .split('[')
    .join('')
    .split(']')
    .join('')
    .split(',')
    .join('\n - ');

  const relatedTechnologiesObj = project.relatedTechnologies;
  const relatedTechnologies = relatedTechnologiesObj
    ?.split('"')
    .join('')
    .split('[')
    .join('')
    .split(']')
    .join('')
    .split(',')
    .join(', ');

  const applicantRequirementsSubObj = project.applicantRequirementsSub;
  const applicantRequirementsSub = applicantRequirementsSubObj
    ?.split('"')
    .join('')
    .split('[')
    .join('')
    .split(']')
    .join('')
    .split(',')
    .join(', ');

  const futurePlansObj = project.futurePlans;
  const futurePlans = futurePlansObj
    ?.split('"')
    .join('')
    .split('[')
    .join('')
    .split(']')
    .join('')
    .split(',')
    .join('\n - ');

  const applicantRequirementsObj = project.applicantRequirements;
  const applicantRequirements = applicantRequirementsObj
    ?.split('"')
    .join('')
    .split('[')
    .join('')
    .split(']')
    .join('')
    .split(',')
    .join('\n ');

  return (
    <div
      id="dev"
      className=" top-0   mb-[-30px] mt-[-152px]  h-auto w-full  bg-[url('/img/h_bg.png')] bg-cover bg-center bg-no-repeat  py-12 leading-7 md:px-0 lg:px-4"
    >
      <div className=" m-auto mb-[60px] h-auto min-h-[500px] w-[50%] rounded-3xl bg-white  pb-8   shadow-lg drop-shadow-sm md:w-[92%] lg:w-[80%] 2sm:w-[100%] ">
        <div className="mx-auto mt-[155px] flex  max-w-full flex-col gap-4 px-12 py-8  md:px-2 ">
          <h3 className=" my-4 text-center text-2xl font-bold ">
            {project.projectTitle}
          </h3>
          <div className="container flex flex-col gap-5  px-4 ">
            <div className="-mb-3 flex justify-between sm:block">
              <p className=" text-sm text-[#9e9e9e] sm:mb-2 ">
                카테고리 : {projectCategory}
              </p>
              <p className="text-right text-sm text-[#9e9e9e] ">
                등록일 {format(new Date(project.createdAt), 'yyyy. MM. dd')}
              </p>
            </div>
            <hr className="mt-2" />

            {/* 카테고리 예산 기간 */}
            <div className="rounded-xl border-2 border-[#e6edf0] p-3  shadow-md ">
              <p className="">
                <Image
                  className="mb-1 mr-2 inline-block  "
                  src="/Icon/icon-korean-won.png"
                  alt="icon-korean-won"
                  width={18}
                  height={30}
                />
                지출 가능 예산 :{' '}
                {project.availableBudget.toLocaleString('ko-KR')}원
              </p>
              <p>{project.budgetNegotiable}</p>
              <p>
                {' '}
                <Image
                  className="mb-1 mr-2 inline-block "
                  src="/Icon/icon-clock.png"
                  alt="icon-korean-won"
                  width={18}
                  height={30}
                />
                예상 시작일 :{' '}
                {format(
                  new Date(project.expectedStartDate),
                  'yyyy년 MM월 dd일'
                )}
              </p>
              <p>
                {' '}
                <Image
                  className="mb-1 mr-2 inline-block "
                  src="/Icon/icon-clock.png"
                  alt="icon-korean-won"
                  width={18}
                  height={30}
                />
                예상 종료일 :{' '}
                {format(new Date(project.expectedEndDate), 'yyyy년 MM월 dd일')}
              </p>
              <p>{project.startDateNegotiable}</p>
              <p>
                {' '}
                <Image
                  className="mb-1 mr-2 inline-block "
                  src="/Icon/icon-clock.png"
                  alt="icon-korean-won"
                  width={18}
                  height={30}
                />
                예상 진행 기간 : {project.expectedDuration}
              </p>
              <p>{project.durationNegotiable}</p>
            </div>

            {/* <hr className='opacity-70' /> */}

            {/* 모집 마감 + 관련정보 */}
            <div className=" text-base  leading-8  ">
              <div className="flex">
                <p className="w-[150px]  text-[#757575]   ">• 진행 분류 </p>
                <p>{project.projectProgressClassification}</p>
              </div>
              <div className="flex">
                <p className="w-[150px]  text-[#757575]   ">• 기획 상태</p>
                <p>{project.planningStatus}</p>
              </div>
              <div className="flex">
                <p className="w-[150px]  text-[#757575]   ">• 프로젝트 경험</p>
                <p>{project.itProjectManagementExperience}</p>
              </div>
              <div className="flex">
                <p className="w-[150px]  text-[#757575]   ">
                  • 협업 인력 구성{' '}
                </p>
                <p>{project.collaborationTeamComposition}</p>
              </div>
              <div className="flex  ">
                <p className="w-[150px]  text-[#757575]   ">• 우선순위 </p>
                <p>
                  {' '}
                  1순위 - {project.projectPriorityFirst}&nbsp;&nbsp;&nbsp; 2순위
                  - {project.projectPrioritySecond}&nbsp;&nbsp;&nbsp; 3순위 -
                  {project.projectPriorityThird}
                </p>
              </div>
              <div className="flex">
                <p className="text-[#757575]">
                  {JSON.parse(project.interestedProducts)}
                </p>
              </div>
            </div>

            <hr />

            {/* 프로젝트 내용 */}
            <h4 className="  text-xl  font-semibold ">프로젝트 내용</h4>
            <div className=" text-base text-[#4f4f4f]">
              <p className="text-lg font-semibold text-black">프로젝트 분야</p>
              <p>
                {' '}
                {projectField}
                {/* {JSON.parse(project.projectField)} */}
              </p>
              <br />
              <p className="text-lg font-semibold text-black">상세 기획 상태</p>
              <p className="whitespace-pre-line"> - {detailedPlanningStatus}</p>
              <br />
              <p className="text-lg font-semibold text-black">기획문서</p>
              <p> {project.detailedPlanningText}</p>
              <br />
              <p className="text-lg font-semibold text-black">
                프로젝트 관련 기술
              </p>
              <p> {relatedTechnologies}</p>
              <br />
              <p className="text-lg font-semibold text-black">
                상세 업무 내용{' '}
              </p>
              <p className="whitespace-pre-line">
                {project.detailedTaskDescription}
              </p>
              <br />
              <p className="text-lg font-semibold text-black">참고 자료</p>
              <p> {JSON.parse(project.referenceMaterials || '')}</p>
              <br />
              <p className="text-lg font-semibold text-black">향후 계획</p>
              <p className="whitespace-pre-line"> - {futurePlans}</p>
            </div>
            <hr />

            {/* 미팅 */}
            <h3 className="  text-xl  font-semibold"> 미팅방식</h3>
            <div className="flex flex-wrap justify-between text-base leading-9 text-[#4f4f4f] sm:justify-center sm:leading-8 ">
              <p className=" m-2 min-h-28 w-[46%] rounded-xl border-2 px-6 py-3 sm:w-full">
                프로젝트 진행 중 미팅 <br /> - {project.preMeetingMethod}
              </p>
              <p className=" m-2 min-h-28 w-[46%] rounded-xl border-2 px-6 py-3 sm:w-full">
                진행 중 미팅 <br />- {project.meetingMethod}
              </p>
              <p className=" m-2 min-h-28 w-[46%] rounded-xl border-2 px-6 py-3 sm:w-full">
                미팅 주기 <br /> - {project.meetingFrequency}
              </p>
              <p className=" m-2 min-h-28 w-[46%] rounded-xl border-2 px-6 py-3 sm:w-full">
                회사 위치 <br /> - {project.clientLocationCity}{' '}
                {project.clientLocationDistrict}
              </p>
            </div>
            <hr />

            {/* 모집요건 */}

            <h5 className="text-lg ">정부지원사업 여부</h5>
            <div className="mb-3 text-base leading-8 text-[#4f4f4f]">
              <p>지원사업 여부 : {project.isFundingAvailable}</p>
              <p>{project.isFundingAvailableSub}</p>
            </div>
            <h5 className="text-lg">클라이언트 정보</h5>
            <div className="whitespace-pre-line text-base leading-8 text-[#4f4f4f]">
              <p> {applicantRequirements}</p>
              <p className="py-1" />
              <p>{applicantRequirementsSub}</p>
              <p>{project.isCollaborationTeamComposition}</p>
              <hr className="my-4 opacity-70" />
              <h5 className="mb-3 whitespace-pre-line text-lg text-black">
                사전 검증 질문
              </h5>
              <p> - {project.preliminaryVerificationQuestions}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProject;
