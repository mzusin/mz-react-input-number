import { isNumber, stringToNumber } from 'mz-math';

/**
 * Return number or NaN.
 */
export const parseNumber = (text: string) : number => {
    const _text = text.trim();

    if (isNumber(_text)){
        return stringToNumber(_text, 0);
    }

    return NaN;
};