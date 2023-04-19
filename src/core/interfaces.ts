export interface IInputNumber {
    min?: number|string;
    max?: number|string;
    step?: number|string;
    value?: number|string;
    onChange?: Function;
    onKeyDown?: Function;
    decimalPlaces?: number; // 2 by default
}

export enum EUpdateType {
    NO_CHANGE = 0,
    UP = 1,
    DOWN = 2,
}