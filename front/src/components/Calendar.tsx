import { Calendar, Button, message } from 'antd';
import { Dayjs } from 'dayjs';

interface CalendarProps {
    startDate: string | null;
    endDate: string | null;
    onStartDateChange: (newStartDate: string | null) => void;
    onEndDateChange: (newEndDate: string | null) => void;
    onSendDates: () => void;
}

function CalendarComponent({
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,
    onSendDates
}: CalendarProps) {
    const onSelect = (date: Dayjs) => {
        const formattedDate = date.format('YYYY-MM-DD');

        if (!startDate) {
            onStartDateChange(formattedDate);
            message.info('시작하는 날짜를 선택하셨습니다.');
        } else if (!endDate) {
            onEndDateChange(formattedDate);
            message.info('마치는 날짜를 선택하셨습니다.');
        } else {
            onStartDateChange(formattedDate);
            onEndDateChange(null);
            message.info('시작하는 날짜를 선택하셨습니다');
        }
    };

    return (
        <div style={{ width: '480px', height: '480px' }}>
            <div className="w-480 h-480">
                <Calendar onSelect={onSelect} className="w-full h-full" />
            </div>
            <Button onClick={onSendDates} className="mt-5">
                일정 정하기
            </Button>
        </div>
    );
}

export default CalendarComponent;
