import { CSSProperties, InputHTMLAttributes } from 'react';
export interface IInputNumber extends InputHTMLAttributes<HTMLInputElement> {
    min?: number | string;
    max?: number | string;
    step?: number | string;
    value?: number | string;
    inputClasses?: string;
    inputStyles?: CSSProperties;
    onChangeCallback?: Function;
    onKeyDownCallback?: Function;
    decimalPlaces?: number;
    removeRegex?: RegExp;
}
export declare enum EUpdateType {
    NO_CHANGE = 0,
    UP = 1,
    DOWN = 2
}
