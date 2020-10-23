import { Moment } from 'moment'

export enum TimeType {
    STATIC_DATE = "Date",
    DYNAMIC_DATE = "Dynamic Date"
}

export interface ParsedTime {
    type: TimeType,
    friendlyText: string,
    getValue: () => Moment
}
