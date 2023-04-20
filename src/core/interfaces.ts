import { CSSProperties, InputHTMLAttributes } from 'react';

// input: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
export interface IInputNumber extends InputHTMLAttributes<HTMLInputElement>{
    min?: number|string;
    max?: number|string;
    step?: number|string;
    value?: number|string;

    inputClasses?: string;
    inputStyles?: CSSProperties;

    onChangeCallback?: Function;
    onKeyDownCallback?: Function;

    decimalPlaces?: number; // 2 by default

    // ------------------------------
    autoComplete?: string;
    disabled?: boolean;
    maxLength?: number;
}

export enum EUpdateType {
    NO_CHANGE = 0,
    UP = 1,
    DOWN = 2,
}