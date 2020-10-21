export enum KeywordToken {
    NOW = "now",
    TODAY = "today",
    AGO = "ago",
    FROM = "from"
}

export enum MonthType {
    JAN,
    FEB,
    MAR,
    APR,
    MAY,
    JUN,
    JUL,
    AUG,
    SEP,
    OCT,
    NOV,
    DEC
}

export interface MonthToken {
    month: MonthType,
    str: String
}