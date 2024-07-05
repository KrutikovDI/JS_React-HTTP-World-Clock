export interface IForm {
    name: string;
    timeZone: number;
    handler: (event: React.MouseEvent<HTMLDivElement>) => void;
    id: string;
}

export interface IState {
    secondsDegrees: number,
    minutesDegrees: number,
    hoursDegrees: number
}