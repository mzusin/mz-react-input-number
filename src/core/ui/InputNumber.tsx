import { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { parseNumber } from '../domain/parse-provider';
import { EUpdateType, IInputNumber } from '../interfaces';
import { setDecimalPlaces } from 'mz-math';

export const InputNumber = (props: IInputNumber) => {

    const {
        min, max,
        step, value,
        onChange, onKeyDown,
        decimalPlaces
    } = props;

    const getMin = () => {
        const _min = parseNumber(min);
        return isNaN(_min) ? -Infinity : _min;
    };

    const getMax = () => {
        const _max = parseNumber(max);
        return isNaN(_max) ? Infinity : _max;
    };

    const getStep = () => {
        const _step = parseNumber(step);
        return isNaN(_step) ? 1 : _step;
    };

    const getDecimalPlaces = () => {
        return decimalPlaces === undefined ? 2 : decimalPlaces;
    };

    const getInitialValue = (num?: string|number) => {
        const parsed = parseNumber(num?.toString() || '');
        const val = Math.min(Math.max(getMin(), parsed), getMax());
        return isNaN(parsed) ? '' : setDecimalPlaces(val, getDecimalPlaces()).toString();
    };

    const [ text, setText ] = useState(getInitialValue(value));

    useEffect(() => {
        setText(getInitialValue(value));
    }, [value]);

    const sendOnChangeEventToUser = (num: number) => {
        if(!isNaN(num) && !!onChange && typeof onChange === 'function'){
            onChange(num);
        }
    };

    /**
     * Update text in the state, and send the updated number
     * (only when the number is valid)
     */
    const onChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
        const _text = evt.target.value;
        if(_text == text) return;

        setText(_text);

        const parsed = parseNumber(_text);
        sendOnChangeEventToUser(parsed);
    };

    /**
     * Up / Down arrows.
     */
    const onKeyDownHandler = (evt: KeyboardEvent<HTMLInputElement>) => {

        switch(evt.key) {
            case 'ArrowUp': {
                const value = update(EUpdateType.UP);
                setText(isNaN(value) ? '' : value.toString());
                sendOnChangeEventToUser(value);
                break;
            }

            case 'ArrowDown': {
                const value = update(EUpdateType.DOWN);
                setText(isNaN(value) ? '' : value.toString());
                sendOnChangeEventToUser(value);
                break;
            }
        }

        if(typeof onKeyDown === 'function'){
            onKeyDown(evt);
        }
    };

    /**
     * Return up / down number or NaN.
     */
    const update = (updateType: EUpdateType) : number => {

        const parsed = parseNumber(text);

        switch (updateType) {
            case EUpdateType.NO_CHANGE: {
                return isNaN(parsed) ? NaN : setDecimalPlaces(Math.min(getMax(), parsed), getDecimalPlaces());
            }

            case EUpdateType.UP: {
                return isNaN(parsed) ? NaN : setDecimalPlaces(Math.min(getMax(), parsed + getStep()), getDecimalPlaces());
            }

            case EUpdateType.DOWN: {
                return isNaN(parsed) ? NaN : setDecimalPlaces(Math.max(getMin(), parsed - getStep()), getDecimalPlaces());
            }
        }

        return parsed;
    };

    return (
        <input
            type="text"
            value={ text }
            onChange={ onChangeHandler }
            onKeyDown={ onKeyDownHandler }
        />
    )
};