export interface IInputNumber {
    min?: number;
    max?: number;
    step?: number;
    value?: number;
    onChange?: Function;
    onKeyDown?: Function;
    decimalPlaces?: number; // 2 by default
}

export enum EUpdateType {
    NO_CHANGE = 0,
    UP = 1,
    DOWN = 2,
}