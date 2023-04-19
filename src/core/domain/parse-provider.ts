import { isNumber, stringToNumber } from 'mz-math';

/**
 * Return number or NaN.
 */
export const parseNumber = (text: string|number|undefined) : number => {
    if(!text) return NaN;

    const _text = text.toString().trim();

    if (isNumber(_text)){
        return stringToNumber(_text, 0);
    }

    return NaN;
};