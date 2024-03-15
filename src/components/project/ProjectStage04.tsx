import useProjectRequestStore from '@/libs/store/projectRequestStore';
import { cn } from '@/utils/style';
import { useEffect } from 'react';
import { FaWonSign } from 'react-icons/fa';
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from 'react-icons/md';
import DatepickerComponent from '../DatePicker';
import Input from '../Input';
import InputIcon from '../InputIcon';
import SelectLine from '../SelectLine';
import OptionSubtitle from './OptionSubtitle';
import OptionTitle from './OptionTitle';
import ProjectStageButtonWrap from './ProjectStageButtonWrap';

interface ProjectStage04Props {
  stage: number;
}
const ProjectStage04: React.FC<ProjectStage04Props> = ({ stage }) => {
  const {
    availableBudget,
    budgetNegotiable,

    expectedStartDate,
    startDateNegotiable,

    expectedEndDate,
    endDateNegotiable,

    expectedDuration,
    durationNegotiable,

    updateState,
    toggleArrayItem,
  } = useProjectRequestStore((state) => ({
    availableBudget: state.availableBudget,
    budgetNegotiable: state.budgetNegotiable,

    expectedStartDate: state.expectedStartDate,
    startDateNegotiable: state.startDateNegotiable,

    expectedEndDate: state.expectedEndDate,
    endDateNegotiable: state.endDateNegotiable,

    expectedDuration: state.expectedDuration,
    durationNegotiable: state.durationNegotiable,

    updateState: state.updateState,
    toggleArrayItem: state.toggleArrayItem,
  }));

  useEffect(() => {
    updateState('expectedStartDate', new Date());
    // eslint-disable-next-line
  }, []);

  const isNextButtonDisabled =
    !availableBudget || !expectedStartDate || !expectedEndDate;

  function calculateWeekdays(startDate: Date, endDate: Date) {
    let weekdaysCount = 0;
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        weekdaysCount++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return weekdaysCount;
  }

  useEffect(() => {
    if (
      expectedStartDate &&
      expectedEndDate &&
      expectedStartDate !== expectedEndDate
    ) {
      const duration = `${calculateWeekdays(
        expectedStartDate,
        expectedEndDate
      )}일`;
      updateState('expectedDuration', duration);
    }
  }, [expectedStartDate, expectedEndDate, updateState]);

  return (
    <div className="flex w-full flex-col gap-12 overflow-y-auto px-16 py-10">
      <div className="flex w-full flex-col gap-4">
        <OptionTitle title={'지출 가능 예산'} necessary={true} />
        <OptionSubtitle
          subtitle={'프로젝트에 지출 가능한 예산을 입력해 주세요.'}
        />
        <InputIcon
          icon={<FaWonSign />}
          value={availableBudget}
          onKeyDown={(e) => {
            if (!/[0-9]/.test(e.key)) {
              e.preventDefault();
            }
          }}
          onChange={(e) => {
            updateState('availableBudget', Number(e.target.value));
          }}
        />
        <p className="ml-4 text-[13px] text-[#9e9e9e]">
          예상 결제 금액 :{' '}
          {new Intl.NumberFormat('ko-KR').format(
            Math.floor(availableBudget * 1.1)
          )}
          원 (부가가치세 10% 포함)
        </p>
        <SelectLine
          className={cn(budgetNegotiable ? 'text-blue-500' : '')}
          icon={
            budgetNegotiable ? (
              <MdOutlineCheckBox />
            ) : (
              <MdOutlineCheckBoxOutlineBlank />
            )
          }
          context={'입력한 예산에서 조율이 가능합니다.'}
          onClick={() => {
            updateState('budgetNegotiable', !budgetNegotiable);
          }}
        />
      </div>

      <div className="flex w-full flex-col gap-4">
        <OptionTitle title={'예상 시작일'} necessary={true} />
        <OptionSubtitle
          subtitle={
            '프로젝트가 시작되는 날짜입니다.\n해당 날짜에 프로젝트 시작이 가능합니다.'
          }
        />
        <DatepickerComponent
          value={expectedStartDate}
          onChange={(date) => {
            updateState('expectedStartDate', date);
          }}
          maxDate={expectedEndDate || undefined}
          minDate={new Date()}
        />
        <SelectLine
          className={cn(startDateNegotiable ? 'text-blue-500' : '')}
          icon={
            startDateNegotiable ? (
              <MdOutlineCheckBox />
            ) : (
              <MdOutlineCheckBoxOutlineBlank />
            )
          }
          context={'프로젝트 착수 일자의 협의가 가능합니다.'}
          onClick={() => {
            updateState('startDateNegotiable', !startDateNegotiable);
          }}
        />
        <p className=" py-1"></p>
        <OptionTitle title={'예상 종료일'} necessary={true} />
        <OptionSubtitle
          subtitle={
            '프로젝트가 종료되는 날짜입니다.\n해당 날짜에 프로젝트가 종료됩니다.'
          }
        />
        <DatepickerComponent
          value={expectedEndDate}
          onChange={(date) => {
            updateState('expectedEndDate', date);
          }}
          minDate={expectedStartDate || new Date()}
        />
      </div>
      <div className="flex w-full flex-col gap-4">
        <OptionTitle title={'예상 진행 기간'} necessary={true} />
        <OptionSubtitle subtitle={'프로젝트 진행 기간을 입력해 주세요.'} />
        <Input
          value={
            (expectedStartDate && expectedEndDate
              ? calculateWeekdays(expectedStartDate, expectedEndDate)
              : 0) + '일'
          }
          onChange={(e) => {
            updateState('expectedDuration', e.target.value);
          }}
        />
        <SelectLine
          className={cn(durationNegotiable ? 'text-blue-500' : '')}
          icon={
            durationNegotiable ? (
              <MdOutlineCheckBox />
            ) : (
              <MdOutlineCheckBoxOutlineBlank />
            )
          }
          context={'입력한 기간에서 조율이 가능합니다.'}
          onClick={() => {
            updateState('durationNegotiable', !durationNegotiable);
          }}
        />
      </div>
      <ProjectStageButtonWrap
        className="sm:mb-28 sm:pb-10"
        stage={stage}
        isNextButtonDisabled={isNextButtonDisabled}
      />
    </div>
  );
};
export default ProjectStage04;
