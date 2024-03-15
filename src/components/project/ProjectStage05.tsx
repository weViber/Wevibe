import {
  clientLocation,
  meetingFrequencyOptions,
  meetingMethodOptions,
  preMeetingMethodOptions,
} from '@/libs/constants/project';
import useProjectRequestStore from '@/libs/store/projectRequestStore';
import { cn } from '@/utils/style';
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from 'react-icons/md';
import SelectLine from '../SelectLine';
import OptionSubtitle from './OptionSubtitle';
import OptionTitle from './OptionTitle';
import ProjectStageButtonWrap from './ProjectStageButtonWrap';

interface ProjectStage05Props {
  stage: number;
}
const ProjectStage05: React.FC<ProjectStage05Props> = ({ stage }) => {
  const {
    preMeetingMethod,
    meetingMethod,
    meetingFrequency,
    clientLocationCity,
    clientLocationDistrict,

    updateState,
    toggleArrayItem,
  } = useProjectRequestStore((state) => ({
    preMeetingMethod: state.preMeetingMethod,
    meetingMethod: state.meetingMethod,
    meetingFrequency: state.meetingFrequency,
    clientLocationCity: state.clientLocationCity,
    clientLocationDistrict: state.clientLocationDistrict,

    updateState: state.updateState,
    toggleArrayItem: state.toggleArrayItem,
  }));

  const isNextButtonDisabled =
    preMeetingMethod.length === 0 ||
    !meetingMethod ||
    !meetingFrequency ||
    !clientLocationCity ||
    !clientLocationDistrict;

  return (
    <div className="flex w-full flex-col gap-12 overflow-y-auto px-16 py-10">
      <div className="flex w-full flex-col gap-4">
        <OptionTitle title={'사전 미팅 방식'} necessary={true} />
        <OptionSubtitle
          subtitle={
            '클라이언트에게 편한 미팅 방식으로 미팅 조율을 도와드립니다.'
          }
        />
        {preMeetingMethodOptions.map((option, index) => (
          <SelectLine
            key={index}
            className={cn(preMeetingMethod === option ? 'text-blue-500' : '')}
            icon={
              preMeetingMethod === option ? (
                <MdOutlineCheckBox />
              ) : (
                <MdOutlineCheckBoxOutlineBlank />
              )
            }
            context={option}
            onClick={() => {
              updateState('preMeetingMethod', option);
            }}
          />
        ))}
      </div>
      <div className="flex w-full flex-col gap-4">
        <OptionTitle title={'프로젝트 진행 중 미팅'} necessary={true} />
        <OptionSubtitle subtitle={'미팅 방식'} />
        {meetingMethodOptions.map((option, index) => (
          <SelectLine
            key={index}
            className={cn(meetingMethod === option ? 'text-blue-500' : '')}
            icon={
              meetingMethod === option ? (
                <MdOutlineCheckBox />
              ) : (
                <MdOutlineCheckBoxOutlineBlank />
              )
            }
            context={option}
            onClick={() => {
              updateState('meetingMethod', option);
            }}
          />
        ))}

        <OptionSubtitle subtitle={'미팅 주기'} />
        {meetingFrequencyOptions.map((option, index) => (
          <SelectLine
            key={index}
            className={cn(meetingFrequency === option ? 'text-blue-500' : '')}
            icon={
              meetingFrequency === option ? (
                <MdOutlineCheckBox />
              ) : (
                <MdOutlineCheckBoxOutlineBlank />
              )
            }
            context={option}
            onClick={() => {
              updateState('meetingFrequency', option);
            }}
          />
        ))}
      </div>
      <div className="flex w-full flex-col gap-4">
        <OptionTitle title={'클라이언트 위치'} necessary={true} />
        <OptionSubtitle
          subtitle={'미팅 위치 선정시 클라이언트의 위치를 참고합니다.'}
        />
        <div className="flex w-full gap-4">
          <select
            className="flex-1 rounded-md border border-gray-300 p-2 transition-all hover:border-gray-400"
            value={clientLocationCity}
            onChange={(e) => {
              updateState('clientLocationCity', e.target.value);
            }}
          >
            <option value="">시/도 선택</option>
            {Object.keys(clientLocation).map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>

          <select
            className="flex-1 rounded-md border border-gray-300 p-2 transition-all hover:border-gray-400"
            value={clientLocationDistrict}
            onChange={(e) => {
              updateState('clientLocationDistrict', e.target.value);
            }}
            disabled={!clientLocationCity}
          >
            <option value="">구/군 선택</option>
            {clientLocationCity &&
              clientLocation[clientLocationCity].map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
          </select>
        </div>
      </div>
      <ProjectStageButtonWrap
        className="sm:mb-28 sm:pb-10"
        stage={stage}
        isNextButtonDisabled={isNextButtonDisabled}
      />
    </div>
  );
};
export default ProjectStage05;
