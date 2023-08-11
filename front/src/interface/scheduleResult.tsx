export interface ScheduleItem {
    name: string;
    time: string;
    address: string;
    distance: number;
    duration: number;
    description: string;
    recommendPlace: string;
    transportation: string;
    imagePath: string;
}

export interface TripSchedule {
    id: number;
    title: string;
    startDate: string;
    endDate: string;
    schedule: [{
        [date: string]: ScheduleItem[];
    }];
    userId: string;
}

export interface MySchedule{
    imagePath: string;
    schedulerId: number;
    title: string;
}
