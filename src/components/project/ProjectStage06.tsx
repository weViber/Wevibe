import {
  applicantRequirementsOptions,
  applicantRequirementsSubOptions,
  isFundingAvailableOptions,
  isFundingAvailableSubOptions,
} from '@/libs/constants/project';
import useProjectRequestStore from '@/libs/store/projectRequestStore';
import { cn } from '@/utils/style';
import { useEffect } from 'react';
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from 'react-icons/md';
import ProjectInput from '../ProjectInput';
import SelectLine from '../SelectLine';
import OptionSubtitle from './OptionSubtitle';
import OptionTitle from './OptionTitle';
import ProjectStageButtonWrap from './ProjectStageButtonWrap';

interface ProjectStage06Props {
  stage: number;
}
const ProjectStage06: React.FC<ProjectStage06Props> = ({ stage }) => {
  const {
    applicationDeadline,
    isFundingAvailable,
    isFundingAvailableSub,
    applicantRequirements,
    applicantRequirementsSub,
    preliminaryVerificationQuestions,

    updateState,
    toggleArrayItem,
  } = useProjectRequestStore((state) => ({
    applicationDeadline: state.applicationDeadline,
    isFundingAvailable: state.isFundingAvailable,
    isFundingAvailableSub: state.isFundingAvailableSub,
    applicantRequirements: state.applicantRequirements,
    applicantRequirementsSub: state.applicantRequirementsSub,
    preliminaryVerificationQuestions: state.preliminaryVerificationQuestions,

    updateState: state.updateState,
    toggleArrayItem: state.toggleArrayItem,
  }));

  useEffect(() => {
    updateState('applicationDeadline', new Date());
    // eslint-disable-next-line
  }, []);

  const isNextButtonDisabled = !isFundingAvailable;

  return (
    <div className="flex w-full flex-col gap-12 overflow-y-auto px-16 py-10">
      {/* <div className="flex w-full flex-col gap-4">
        <OptionTitle title={'지원자 모집 마감일'} necessary={true} />
        <OptionSubtitle
          subtitle={
            '지원자를 모집하는 기간은 최대 14일까지 가능합니다.\n지원자 모집 기간 중에도 파트너 선정과 계약 진행이 가능합니다.'
          }
        />
        <DatepickerComponent
          value={applicationDeadline}
          onChange={(date) => {
            updateState('applicationDeadline', date);
          }}
        />
      </div> */}
      <div className="flex w-full flex-col gap-4 ">
        <OptionTitle title={'지원사업 여부'} necessary={true} />
        {isFundingAvailableOptions.map((option, index) => (
          <SelectLine
            key={index}
            className={cn(isFundingAvailable === option ? 'text-blue-500' : '')}
            icon={
              isFundingAvailable === option ? (
                <MdOutlineCheckBox />
              ) : (
                <MdOutlineCheckBoxOutlineBlank />
              )
            }
            context={option}
            onClick={() => {
              updateState('isFundingAvailable', option);
            }}
          />
        ))}
        {isFundingAvailable ===
          '네, 정부지원사업 또는 정부지원 연구과제입니다.' && (
          <div className="flex flex-col gap-4 border-l-4 border-slate-300 py-2 pl-5">
            <OptionSubtitle
              subtitle={
                '정부지원사업 또는 연구과제에 선정되어 사업비 지원이 확정되었나요?'
              }
            />
            {isFundingAvailableSubOptions.map((option, index) => (
              <SelectLine
                key={index}
                className={cn(
                  isFundingAvailableSub === option ? 'text-blue-500' : ''
                )}
                icon={
                  isFundingAvailableSub === option ? (
                    <MdOutlineCheckBox />
                  ) : (
                    <MdOutlineCheckBoxOutlineBlank />
                  )
                }
                context={option}
                onClick={() => {
                  updateState('isFundingAvailableSub', option);
                }}
              />
            ))}
          </div>
        )}
      </div>
      <div className="flex w-full flex-col gap-4">
        <OptionTitle title={'클라이언트 정보'} necessary={false} />
        <OptionSubtitle subtitle={'아래 조건을 원합니다.'} />
        {applicantRequirementsOptions.map((option, index) => (
          <div key={index}>
            <SelectLine
              className={cn(
                applicantRequirements.includes(option) ? 'text-blue-500' : ''
              )}
              icon={
                applicantRequirements.includes(option) ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdOutlineCheckBoxOutlineBlank />
                )
              }
              context={option}
              onClick={() => {
                toggleArrayItem('applicantRequirements', option);
                if (option === '사업자 가능 (세금계산서 발행)') {
                  updateState('applicantRequirementsSub', [
                    '개인사업자',
                    '법인사업자',
                  ]);
                }
              }}
            />

            {option === '사업자 가능 (세금계산서 발행)' &&
              applicantRequirements.includes(
                '사업자 가능 (세금계산서 발행)'
              ) && (
                <div className="mt-4 flex flex-col gap-4 border-l-4 border-slate-300 py-2 pl-5">
                  {applicantRequirementsSubOptions.map((option, index) => (
                    <SelectLine
                      key={index}
                      className={cn(
                        applicantRequirementsSub.includes(option)
                          ? 'text-blue-500'
                          : ''
                      )}
                      icon={
                        applicantRequirementsSub.includes(option) ? (
                          <MdOutlineCheckBox />
                        ) : (
                          <MdOutlineCheckBoxOutlineBlank />
                        )
                      }
                      context={option}
                      onClick={() => {
                        toggleArrayItem('applicantRequirementsSub', option);
                        if (
                          applicantRequirementsSub.length === 1 &&
                          applicantRequirementsSub.includes(option)
                        ) {
                          toggleArrayItem(
                            'applicantRequirements',
                            '사업자 가능 (세금계산서 발행)'
                          );
                        }
                      }}
                    />
                  ))}
                </div>
              )}
          </div>
        ))}
      </div>
      <ProjectInput
        title={'사전 질문'}
        necessary={false}
        subtitle={'프로젝트관련 질문하고 싶은 내용을 작성해주세요.'}
        value={preliminaryVerificationQuestions}
        onChange={(text) => {
          updateState('preliminaryVerificationQuestions', text);
        }}
      />
      <ProjectStageButtonWrap
        className="sm:mb-28 sm:pb-10"
        stage={stage}
        isNextButtonDisabled={isNextButtonDisabled}
      />
    </div>
  );
};
export default ProjectStage06;
