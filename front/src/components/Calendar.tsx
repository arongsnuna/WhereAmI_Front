import { useState } from 'react';
import { Calendar, Button, message } from 'antd';
import { useMutation } from 'react-query';
import { postData } from '../api/index';
import { Dayjs } from 'dayjs';


type ScheduleResponseType = {
    id: number;
    title: string;
    schedule: string[];
    startDate: string;
    endDate: string;
    userId: string;
};

function CalendarComponent() {
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);

    const token = localStorage.getItem('accessToken');
    console.log("Token from LocalStorage:", token);

    const mutation = useMutation(() => {
        return postData<ScheduleResponseType>('/scheduler/ask', {
            place: "somePlace",
            date: "someDate",
            title: "someTitle",
            userId: "someUserId",
            startDate: startDate,
            endDate: endDate
        });
    }, {
        onSuccess: () => {
            message.success('날짜를 성공적으로 저장하였습니다');
        },
        onError: () => {
            message.error('날짜 저장에 오류가 났습니다');
        }
    });

    const onSelect = (date: Dayjs) => {
        const formattedDate = date.format('YYYY-MM-DD');

        if (!startDate) {
            setStartDate(formattedDate);
            message.info("시작하는 날짜를 선택하셨습니다.");
        } else if (!endDate) {
            setEndDate(formattedDate);
            message.info("마치는 날짜를 선택하셨습니다.");
        } else {
            setStartDate(formattedDate);
            setEndDate(null);
            message.info("시작하는 날짜를 선택하셨습니다");
        }
    };

    const sendDates = () => {
        if (startDate && endDate) {
            mutation.mutate();
        } else {
            message.warning('시작과 마치는 날짜를 선택해 주셔야 됩니다.');
        }
    };

    return (
        <div style={{ width: '480px', height: '480px' }}>
            <div className="w-480 h-480">
                <Calendar onSelect={onSelect} className="w-full h-full" />
            </div>
            <Button onClick={sendDates} className="mt-5">일정 정하기</Button>
        </div>
    );
    
}

export default CalendarComponent;