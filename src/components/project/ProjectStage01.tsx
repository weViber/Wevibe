import { categoryOptions, fieldOptions } from '@/libs/constants/project';
import useProjectRequestStore from '@/libs/store/projectRequestStore';
import { cn } from '@/utils/style';
import { FaCheck } from 'react-icons/fa';
import SelectCard from '../SelectCard';
import OptionSubtitle from './OptionSubtitle';
import OptionTitle from './OptionTitle';
import ProjectStageButtonWrap from './ProjectStageButtonWrap';

interface ProjectStage01Props {
  stage: number;
}
const ProjectStage01: React.FC<ProjectStage01Props> = ({ stage }) => {
  const { projectCategory, projectField, toggleArrayItem } =
    useProjectRequestStore((state) => ({
      projectCategory: state.projectCategory,
      projectField: state.projectField,
      toggleArrayItem: state.toggleArrayItem,
    }));

  const filteredFields = fieldOptions
    .filter((field) => projectCategory.includes(field.category))
    .flatMap((field) => field.selects)
    .filter((value, index, self) => self.indexOf(value) === index);

  const isNextButtonDisabled =
    projectCategory.length === 0 || projectField.length === 0;

  return (
    <div className="flex h-auto w-full flex-col gap-12 overflow-y-auto px-16 py-10">
      <div className="flex w-full flex-col gap-4">
        <OptionTitle title={'프로젝트 카테고리'} necessary={true} />
        <OptionSubtitle
          subtitle={'해당하는 프로젝트 카테고리를 모두 선택해 주세요.'}
        />
        <div className="flex gap-4 sm:flex-col">
          {categoryOptions.map((content, index) => (
            <SelectCard
              key={index}
              className={cn(
                'flex-1',
                projectCategory.includes(content.context)
                  ? 'border-2 border-blue-500 bg-[#e3edfa]'
                  : ''
              )}
              icon={content.icon}
              context={content.context}
              onClick={() => {
                toggleArrayItem('projectCategory', content.context);
              }}
            />
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col gap-4">
        <OptionTitle title={'프로젝트 분야'} necessary={true} />
        <OptionSubtitle
          subtitle={'해당하는 프로젝트 분야를 모두 선택해 주세요.'}
        />
        <div className="flex flex-wrap gap-4">
          {filteredFields.map((option, index) => (
            <div
              key={index}
              className={cn(
                'flex cursor-pointer items-center justify-center gap-2',
                'rounded-full bg-slate-200 px-6 py-2',
                projectField.includes(option) ? 'bg-[#e3edfa]' : ''
              )}
              onClick={() => {
                toggleArrayItem('projectField', option);
              }}
            >
              <FaCheck
                className={cn(
                  projectField.includes(option)
                    ? 'text-blue-500'
                    : 'text-slate-400'
                )}
              />
              {option}
            </div>
          ))}
        </div>
      </div>

      <ProjectStageButtonWrap
        stage={stage}
        isNextButtonDisabled={isNextButtonDisabled}
      />
    </div>
  );
};
export default ProjectStage01;
