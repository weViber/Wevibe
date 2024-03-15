import {
  detailedPlanningStatusOptions,
  planningStatusOptions,
  progressClassificationOptions,
} from '@/libs/constants/project';
import useProjectRequestStore from '@/libs/store/projectRequestStore';
import { cn } from '@/utils/style';
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from 'react-icons/md';
import SelectCard from '../SelectCard';
import SelectInput from '../SelectInput';
import SelectLine from '../SelectLine';
import OptionSubtitle from './OptionSubtitle';
import OptionTitle from './OptionTitle';
import ProjectStageButtonWrap from './ProjectStageButtonWrap';

interface ProjectStage02Props {
  stage: number;
}
const ProjectStage02: React.FC<ProjectStage02Props> = ({ stage }) => {
  const {
    projectProgressClassification,
    planningStatus,
    detailedPlanningStatus,
    detailedPlanningText,
    updateState,
    toggleArrayItem,
  } = useProjectRequestStore((state) => ({
    projectProgressClassification: state.projectProgressClassification,
    planningStatus: state.planningStatus,
    detailedPlanningStatus: state.detailedPlanningStatus,
    detailedPlanningText: state.detailedPlanningText,
    updateState: state.updateState,
    toggleArrayItem: state.toggleArrayItem,
  }));

  const isNextButtonDisabled =
    projectProgressClassification.length === 0 || planningStatus.length === 0;

  return (
    <div className="flex h-auto w-full flex-col gap-12 overflow-y-auto px-16 py-10">
      <div className="flex w-full flex-col gap-4">
        <OptionTitle title={'프로젝트 진행 분류'} necessary={true} />
        <div className="flex flex-col gap-4">
          {progressClassificationOptions.map((option, index) => (
            <SelectLine
              key={index}
              className={cn(
                projectProgressClassification === option ? 'text-blue-500' : ''
              )}
              icon={
                projectProgressClassification === option ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdOutlineCheckBoxOutlineBlank />
                )
              }
              context={option}
              onClick={() => {
                updateState('projectProgressClassification', option);
              }}
            />
          ))}
        </div>
      </div>
      <div className="flex w-full flex-col gap-4">
        <OptionTitle title={'기획 상태'} necessary={true} />
        <OptionSubtitle
          subtitle={
            '업무 범위 산정과 예산 및 일정 상담을 위해 현재 기획 상태를 선택해 주세요.'
          }
        />
        <div className="flex gap-4 sm:flex-col">
          {planningStatusOptions.map((option, index) => (
            <SelectCard
              key={index}
              className={cn(
                'flex-1',
                planningStatus === option.context
                  ? 'border-2 border-blue-500 bg-[#e3edfa]'
                  : ''
              )}
              icon={option.icon}
              context={option.context}
              onClick={() => {
                updateState('planningStatus', option.context);
              }}
            />
          ))}
        </div>
      </div>
      {planningStatus === '상세한 문서가 있습니다.' && (
        <>
          <div className="flex w-full flex-col gap-4">
            <OptionTitle title={'상세 기획 상태'} />
            <OptionSubtitle
              subtitle={'준비된 상세 기획 문서를 선택해주세요.'}
            />
            <div className="flex flex-col gap-4">
              {detailedPlanningStatusOptions.map((option, index) => (
                <SelectLine
                  key={index}
                  className={cn(
                    detailedPlanningStatus.includes(option.context)
                      ? 'text-blue-500'
                      : ''
                  )}
                  icon={
                    detailedPlanningStatus.includes(option.context) ? (
                      <MdOutlineCheckBox />
                    ) : (
                      <MdOutlineCheckBoxOutlineBlank />
                    )
                  }
                  context={option.context}
                  onClick={() => {
                    toggleArrayItem('detailedPlanningStatus', option.context);
                  }}
                />
              ))}
              <SelectInput
                icon={
                  detailedPlanningStatus.includes('기타') ? (
                    <MdOutlineCheckBox />
                  ) : (
                    <MdOutlineCheckBoxOutlineBlank />
                  )
                }
                placeholder="기타 (직접입력)"
                inputTrue={detailedPlanningStatus.includes('기타')}
                onClick={() => {
                  toggleArrayItem('detailedPlanningStatus', '기타');
                  if (detailedPlanningStatus.includes('기타')) {
                    updateState('detailedPlanningText', '');
                  }
                }}
                value={detailedPlanningText}
                onChange={(text) => {
                  // 입력된 텍스트를 상태로 업데이트
                  updateState('detailedPlanningText', text);
                }}
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-4">
            <OptionTitle title={'참고 자료'} />
            <OptionSubtitle
              subtitle={
                '아이디어 또는 필요한 내용을 정리한 자료가 있다면 추가해보세요. \n견적 산정에 활용됩니다.'
              }
            />
            <input
              className={cn(
                'px-4 py-2',
                'rounded-md border',
                'border-slate-300 bg-slate-50'
              )}
              type="file"
              multiple
            />
          </div>
        </>
      )}
      <ProjectStageButtonWrap
        className="sm:mb-28 sm:pb-10"
        stage={stage}
        isNextButtonDisabled={isNextButtonDisabled}
      />
    </div>
  );
};
export default ProjectStage02;
