import { useState, useEffect, ChangeEvent, KeyboardEvent, useRef, WheelEvent } from 'react';
import { parseNumber } from '../domain/parse-provider';
import { EUpdateType, IInputNumber } from '../interfaces';
import { setDecimalPlaces } from 'mz-math';

export const DEFAULT_DECIMAL_PLACES = 4;

export const InputNumber = (props: IInputNumber) => {

    const {
        min, max,
        step, value,
        onChangeCallback, onKeyDownCallback,
        decimalPlaces, removeRegex,
        inputClasses, inputStyles
    } = props;

    // ------------------------ HELPERS -------------------------

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
        return decimalPlaces === undefined ? DEFAULT_DECIMAL_PLACES : decimalPlaces;
    };

    const validate = (num?: string|number) => {
        let formatted = num?.toString() || '';
        if(removeRegex){
            formatted = formatted.replace(removeRegex, '');
        }

        const parsed = parseNumber(formatted);
        const val = Math.min(Math.max(getMin(), parsed), getMax());
        return isNaN(parsed) ? '' : setDecimalPlaces(val, getDecimalPlaces()).toString();
    };

    const moveCursorToStart = () => {
        inputRef.current?.setSelectionRange(0, 0);
    };

    const moveCursorToEnd = () => {
        const val = inputRef.current?.value || '';
        inputRef.current?.setSelectionRange(val.length, val.length);
    };

    const up = () => {
        const value = update(EUpdateType.UP);
        setText(isNaN(value) ? '' : value.toString());
        moveCursorToEnd();
        sendOnChangeEventToUser(value);
    };

    const down = () => {
        const value = update(EUpdateType.DOWN);
        setText(isNaN(value) ? '' : value.toString());
        moveCursorToEnd();
        sendOnChangeEventToUser(value);
    };

    // ------------------------ INIT -------------------------

    const [ text, setText] = useState(validate(value));
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // dont reset text value while editing
        if(document.activeElement === inputRef.current) return;

        setText(validate(value));
    }, [value]);

    // ------------------------ EVENTS -------------------------

    const sendOnChangeEventToUser = (num: number) => {
        if(!isNaN(num) && !!onChangeCallback && typeof onChangeCallback === 'function'){
            onChangeCallback(num);
        }
    };

    /**
     * Update text in the state, and send the updated number
     * (only when the number is valid)
     */
    const onChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
        let _text = evt.target.value;

        if(removeRegex){
            _text = _text.replace(removeRegex, '');
        }

        setText(_text);

        if(_text === text) return;

        const parsed = parseNumber(_text);
        sendOnChangeEventToUser(parsed);
    };

    /**
     * Up / Down arrows.
     */
    const onKeyDownHandler = (evt: KeyboardEvent<HTMLInputElement>) => {

        switch(evt.key) {
            case 'ArrowUp': {
                up();
                evt.preventDefault();
                break;
            }

            case 'ArrowDown': {
                down();
                evt.preventDefault();
                break;
            }

            case 'Enter': {
                setText(validate(text));
                break;
            }

            case 'Escape': {
                setText('');
                break;
            }

            case 'Home':
            case 'PageUp':{
                moveCursorToStart();
                break;
            }

            case 'End':
            case 'PageDown':{
                moveCursorToEnd();
                break;
            }
        }

        if(!!onKeyDownCallback && typeof onKeyDownCallback === 'function'){
            onKeyDownCallback(evt);
        }
    };

    /**
     * Validate text value on blur
     */
    const onBlurHandler = () => {
        setText(validate(text));
    };

    const onWheelHandler = (evt: WheelEvent) => {
        const isUp = evt.deltaY < 0;

        if(isUp){
            up();
        }
        else{
            down();
        }
    };

    // ------------------------ RENDER -------------------------

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

    const filterProps = () => {
        const copy = { ...props };

        delete copy.decimalPlaces;
        delete copy.inputStyles;
        delete copy.inputClasses;
        delete copy.onKeyDownCallback;
        delete copy.onChangeCallback;

        return copy;
    };

    return (
        <input
            { ...filterProps() }
            type="text"
            value={ text }
            ref={ inputRef }
            onChange={ onChangeHandler }
            onKeyDown={ onKeyDownHandler }
            onBlur={ onBlurHandler }
            className={ inputClasses }
            style={ inputStyles }
            onWheel={ onWheelHandler }
        />
    )
};