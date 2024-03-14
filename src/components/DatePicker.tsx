import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// onChange prop의 타입을 정의합니다.
interface DatepickerComponentProps {
  value: Date | null; // 선택된 날짜 상태
  onChange: (date: Date | null) => void; // 날짜 변경 핸들러
  minDate?: Date; // 최소 날짜
  maxDate?: Date; // 최대 날짜
}

const DatepickerComponent: React.FC<DatepickerComponentProps> = ({
  value,
  onChange,
  minDate,
  maxDate,
}) => {
  // 주말을 필터링하는 함수
  const isWeekday = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6; // 일요일(0)과 토요일(6)을 제외
  };
  return (
    <DatePicker
      className="rounded-md border border-gray-300 p-2 transition-all hover:border-gray-400"
      selected={value || new Date()}
      onChange={onChange}
      minDate={minDate}
      maxDate={maxDate}
      dateFormat="yyyy년 MM월 dd일"
      filterDate={isWeekday}
    />
  );
};

export default DatepickerComponent;
