import { Moment } from 'moment'

export enum TimeType {
    SimpleDynamicDate = 'SimpleDynamicDate',
    Ago = 'Ago',
    AfterDate = 'AfterDate',
    BeforeDate = 'BeforeDate',
    StaticDate = 'StaticDate',
    UnparsedDate = 'UnparsedDate',
    EpochSeconds = 'EpochSeconds',
    EpochMilliseconds = 'EpochMilliseconds'
}

export interface ParsedTime {
    type: TimeType,
    friendlyText: string,
    isDynamic: boolean,
    getValue: () => Moment | Error
}
