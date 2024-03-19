import {
  futurePlansOptions,
  itProjectManagementExperienceOptions,
  projectPriorityOptions,
} from '@/libs/constants/project';
import useProjectRequestStore from '@/libs/store/projectRequestStore';
import { cn } from '@/utils/style';
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from 'react-icons/md';
import Input from '../Input';
import SelectLine from '../SelectLine';
import OptionSubtitle from './OptionSubtitle';
import OptionTitle from './OptionTitle';
import ProjectHomeButtonWrap from './ProjectHomeButtonWrap';
import ProjectStageButtonWrap from './ProjectStageButtonWrap';

interface ProjectStage07Props {
  userId: string;
  stage: number;
}
const ProjectStage07: React.FC<ProjectStage07Props> = ({ userId, stage }) => {
  const {
    collaborationTeamComposition,
    isCollaborationTeamComposition,
    itProjectManagementExperience,
    futurePlans,
    projectPriorityFirst,
    projectPrioritySecond,
    projectPriorityThird,

    updateState,
    toggleArrayItem,
  } = useProjectRequestStore((state) => ({
    collaborationTeamComposition: state.collaborationTeamComposition,
    isCollaborationTeamComposition: state.isCollaborationTeamComposition,
    itProjectManagementExperience: state.itProjectManagementExperience,
    futurePlans: state.futurePlans,

    projectPriorityFirst: state.projectPriorityFirst,
    projectPrioritySecond: state.projectPrioritySecond,
    projectPriorityThird: state.projectPriorityThird,

    updateState: state.updateState,
    toggleArrayItem: state.toggleArrayItem,
  }));
  const isNextButtonDisabled =
    (!collaborationTeamComposition && !isCollaborationTeamComposition) ||
    !itProjectManagementExperience;

  return (
    <div className="flex w-full flex-col gap-12 overflow-y-auto px-16 py-10">
      <ProjectHomeButtonWrap />
      <div className="flex w-full flex-col gap-4">
        <OptionTitle title={'협업 인력 구성'} necessary={true} />
        <OptionSubtitle
          subtitle={
            '협업 예정인 인력이 있다면 어떻게 구성되어 있는지 알려주세요.'
          }
        />
        <Input
          value={collaborationTeamComposition}
          placeholder={
            '예시) 자사 PM 1명, 발주처 소속 기획자 1명, 외부 Front-end 개발자 1명 등'
          }
          onChange={(e) => {
            updateState('collaborationTeamComposition', e.target.value);
          }}
          className={cn(isCollaborationTeamComposition ? 'bg-slate-100' : '')}
          disabled={isCollaborationTeamComposition}
        />
        <SelectLine
          className={cn(isCollaborationTeamComposition ? 'text-blue-500' : '')}
          icon={
            isCollaborationTeamComposition ? (
              <MdOutlineCheckBox />
            ) : (
              <MdOutlineCheckBoxOutlineBlank />
            )
          }
          context={'협업 가능한 인력이 없습니다.'}
          onClick={() => {
            updateState(
              'isCollaborationTeamComposition',
              !isCollaborationTeamComposition
            );
            if (!isCollaborationTeamComposition) {
              updateState('collaborationTeamComposition', '');
            }
          }}
        />
      </div>
      <div className="flex w-full flex-col gap-4">
        <OptionTitle title={'IT 프로젝트 관리 경험 '} necessary={true} />
        {itProjectManagementExperienceOptions.map((option, index) => (
          <SelectLine
            key={index}
            className={cn(
              itProjectManagementExperience === option ? 'text-blue-500' : ''
            )}
            icon={
              itProjectManagementExperience === option ? (
                <MdOutlineCheckBox />
              ) : (
                <MdOutlineCheckBoxOutlineBlank />
              )
            }
            context={option}
            onClick={() => {
              updateState('itProjectManagementExperience', option);
            }}
          />
        ))}
      </div>
      <div className="flex w-full flex-col gap-4">
        <OptionTitle title={'향후 계획'} necessary={false} />
        {futurePlansOptions.map((option, index) => (
          <SelectLine
            key={index}
            className={cn(futurePlans.includes(option) ? 'text-blue-500' : '')}
            icon={
              futurePlans.includes(option) ? (
                <MdOutlineCheckBox />
              ) : (
                <MdOutlineCheckBoxOutlineBlank />
              )
            }
            context={option}
            onClick={() => {
              toggleArrayItem('futurePlans', option);
            }}
          />
        ))}
      </div>
      <div className="flex w-full flex-col gap-4">
        <OptionTitle title={'프로젝트 우선순위'} necessary={false} />
        <OptionSubtitle
          subtitle={
            '프로젝트 우선순위를 알려주시면, 우선순위를 고려하여 지원합니다.'
          }
        />
        <div className="flex w-full gap-4 sm:flex-col">
          <select
            className="flex-1 rounded-md border border-gray-300 p-2 transition-all hover:border-gray-400"
            value={projectPriorityFirst}
            onChange={(e) => {
              updateState('projectPriorityFirst', e.target.value);
            }}
          >
            <option value="" disabled>
              1순위 선택
            </option>
            {projectPriorityOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            className="flex-1 rounded-md border border-gray-300 p-2 transition-all hover:border-gray-400"
            value={projectPrioritySecond}
            onChange={(e) => {
              updateState('projectPrioritySecond', e.target.value);
            }}
          >
            <option value="" disabled>
              2순위 선택
            </option>
            {projectPriorityOptions.map((option, index) => (
              <option
                key={index}
                value={option}
                disabled={projectPriorityFirst === option}
              >
                {option}
              </option>
            ))}
          </select>
          <select
            className="flex-1 rounded-md border border-gray-300 p-2 transition-all hover:border-gray-400"
            value={projectPriorityThird}
            onChange={(e) => {
              updateState('projectPriorityThird', e.target.value);
            }}
          >
            <option value="" disabled>
              3순위 선택
            </option>
            {projectPriorityOptions.map((option, index) => (
              <option
                key={index}
                value={option}
                disabled={
                  projectPriorityFirst === option ||
                  projectPrioritySecond === option
                }
              >
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <ProjectStageButtonWrap
        className="sm:mb-28 sm:pb-10"
        userId={userId}
        stage={stage}
        isNextButtonDisabled={isNextButtonDisabled}
      />
    </div>
  );
};
export default ProjectStage07;
