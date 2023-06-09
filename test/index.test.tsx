import { InputNumber } from '../src/core';
import { cleanup, render, fireEvent } from '@testing-library/react'; // https://testing-library.com/docs/dom-testing-library/api-events/

afterEach(cleanup);

describe('Input Number', () => {

    describe('Initial Value', () => {

        test('Initial value when no props', () => {

            const { container} = render(
                <InputNumber />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            expect($input.value).toStrictEqual('');
        });

        test('Initial value when only value is provided', () => {

            const { container} = render(
                <InputNumber value={ 14.33 } />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            expect($input.value).toStrictEqual('14.33');
        });

        test('Initial value greater than decimal places = 4', () => {

            const { container} = render(
                <InputNumber value={ 18.556677 } />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            expect($input.value).toStrictEqual('18.5567');
        });

        test('Initial value when decimal places is provided', () => {

            const { container} = render(
                <InputNumber value={ 18.556677 } decimalPlaces={ 6 } />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            expect($input.value).toStrictEqual('18.556677');
        });

        test('Initial value below the provided minimum', () => {

            const { container} = render(
                <InputNumber
                    min={ 10 }
                    max={ 100 }
                    step={ 0.01 }
                    value={ 2.2 }
                />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            expect($input.value).toStrictEqual('10');
        });

        test('Initial value above the provided maximum', () => {

            const { container} = render(
                <InputNumber
                    min={ 10 }
                    max={ 100 }
                    step={ 0.01 }
                    value={ 101 }
                />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            expect($input.value).toStrictEqual('100');
        });

        test('Wrong initial value', () => {

            const { container} = render(
                <InputNumber value="aaa" />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            expect($input.value).toStrictEqual('');
        });

        test('Initial value with tabs and spaces', () => {

            const { container} = render(
                <InputNumber value="   17    " />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            expect($input.value).toStrictEqual('17');
        });

        test('Negative initial number', () => {

            const { container} = render(
                <InputNumber value={ -14.33 } />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            expect($input.value).toStrictEqual('-14.33');
        });

    });

    describe('Arrow Up', () => {

        test('Simple arrow up', () => {

            const { container} = render(
                <InputNumber
                    step={ 1 }
                    value={ 10 }
                />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.keyDown($input, {
                key: 'ArrowUp',
            });

            expect($input.value).toStrictEqual('11');
        });

        test('Arrow up when step is not provided', () => {

            const { container} = render(
                <InputNumber
                    value={ 10 }
                />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.keyDown($input, {
                key: 'ArrowUp',
            });

            expect($input.value).toStrictEqual('11');
        });

        test('Arrow up when step is provided', () => {

            const { container} = render(
                <InputNumber
                    value={ 10 }
                    step={ 2 }
                />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.keyDown($input, {
                key: 'ArrowUp',
            });

            expect($input.value).toStrictEqual('12');
        });

        test('Arrow up when step = 0.1', () => {

            const { container} = render(
                <InputNumber
                    value={ 10 }
                    step={ 0.1 }
                />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.keyDown($input, {
                key: 'ArrowUp',
            });

            expect($input.value).toStrictEqual('10.1');
        });

        test('Arrow up when step = 0.0001', () => {

            const { container} = render(
                <InputNumber
                    value={ 10 }
                    step={ 0.0001 }
                />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.keyDown($input, {
                key: 'ArrowUp',
            });

            expect($input.value).toStrictEqual('10.0001');
        });

        test('Arrow up when step = 0.123456 - greater than default decimal places', () => {

            const { container} = render(
                <InputNumber
                    value={ 10 }
                    step={ 0.123456 }
                />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.keyDown($input, {
                key: 'ArrowUp',
            });

            expect($input.value).toStrictEqual('10.1235');
        });

        test('Arrow up when when decimal places is provided', () => {

            const { container} = render(
                <InputNumber
                    value={ 10 }
                    step={ 0.123456 }
                    decimalPlaces={ 6 }
                />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.keyDown($input, {
                key: 'ArrowUp',
            });

            expect($input.value).toStrictEqual('10.123456');
        });

        test('Arrow up when there is no value ---> add one step', () => {

            const { container} = render(
                <InputNumber />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.keyDown($input, {
                key: 'ArrowUp',
            });

            expect($input.value).toStrictEqual('1');
        });

        test('Arrow up with negative step', () => {

            const { container} = render(
                <InputNumber
                    value={ 10 }
                    step={ -0.1 }
                />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.keyDown($input, {
                key: 'ArrowUp',
            });

            expect($input.value).toStrictEqual('9.9');
        });

        test('Arrow up when no value, but max = -1', () => {

            const { container} = render(
                <InputNumber
                    max={ -1 }
                />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.keyDown($input, {
                key: 'ArrowUp',
            });

            expect($input.value).toStrictEqual('-1');
        });

        test('Arrow up when no value, and max = 100', () => {

            const { container} = render(
                <InputNumber
                    max={ 100 }
                />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.keyDown($input, {
                key: 'ArrowUp',
            });

            expect($input.value).toStrictEqual('1');
        });

        test('Arrow up when no value, min = 10 and max = 100', () => {

            const { container} = render(
                <InputNumber
                    min={ 10 }
                    max={ 100 }
                />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.keyDown($input, {
                key: 'ArrowUp',
            });

            expect($input.value).toStrictEqual('11');
        });

        test('Arrow down when no value, but max is provided', () => {

            const { container} = render(
                <InputNumber
                    min={ 10 }
                />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.keyDown($input, {
                key: 'ArrowDown',
            });

            expect($input.value).toStrictEqual('10');
        });
    });

    describe('Arrow Down', () => {

        test('Simple arrow down', () => {

            const { container} = render(
                <InputNumber
                    step={ 1 }
                    value={ 100 }
                />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.keyDown($input, {
                key: 'ArrowDown',
            });

            expect($input.value).toStrictEqual('99');
        });

        test('Arrow down when step is not provided', () => {

            const { container} = render(
                <InputNumber
                    value={ 100 }
                />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.keyDown($input, {
                key: 'ArrowDown',
            });

            expect($input.value).toStrictEqual('99');
        });

        test('Arrow down when step is provided', () => {

            const { container} = render(
                <InputNumber
                    value={ 100 }
                    step={ 2 }
                />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.keyDown($input, {
                key: 'ArrowDown',
            });

            expect($input.value).toStrictEqual('98');
        });

        test('Arrow down when step = 0.1', () => {

            const { container} = render(
                <InputNumber
                    value={ 100 }
                    step={ 0.1 }
                />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.keyDown($input, {
                key: 'ArrowDown',
            });

            expect($input.value).toStrictEqual('99.9');
        });

        test('Arrow down when step = 0.0001', () => {

            const { container} = render(
                <InputNumber
                    value={ 100 }
                    step={ 0.0001 }
                />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.keyDown($input, {
                key: 'ArrowDown',
            });

            expect($input.value).toStrictEqual('99.9999');
        });

        test('Arrow down when step = 0.123456 - greater than default decimal places', () => {

            const { container} = render(
                <InputNumber
                    value={ 100 }
                    step={ 0.123456 }
                />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.keyDown($input, {
                key: 'ArrowDown',
            });

            expect($input.value).toStrictEqual('99.8765');
        });

        test('Arrow down when when decimal places is provided', () => {

            const { container} = render(
                <InputNumber
                    value={ 100 }
                    step={ 0.123456 }
                    decimalPlaces={ 6 }
                />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.keyDown($input, {
                key: 'ArrowDown',
            });

            expect($input.value).toStrictEqual('99.876544');
        });

        test('Arrow down when there is no value ---> remove one step', () => {

            const { container} = render(
                <InputNumber />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.keyDown($input, {
                key: 'ArrowDown',
            });

            expect($input.value).toStrictEqual('-1');
        });

        test('Arrow down with negative step', () => {

            const { container} = render(
                <InputNumber
                    value={ 10 }
                    step={ -0.1 }
                />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.keyDown($input, {
                key: 'ArrowDown',
            });

            expect($input.value).toStrictEqual('10.1');
        });

        test('When there is not value: arrow up and then down', () => {

            const { container} = render(
                <InputNumber />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.keyDown($input, {
                key: 'ArrowUp',
            });
            fireEvent.keyDown($input, {
                key: 'ArrowUp',
            });
            fireEvent.keyDown($input, {
                key: 'ArrowUp',
            });

            fireEvent.keyDown($input, {
                key: 'ArrowDown',
            });

            expect($input.value).toStrictEqual('2');
        });
    });

    describe('Enter', () => {

        test('Simple enter ---> value not changing', () => {

            const { container} = render(
                <InputNumber
                    value={ 10 }
                />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.keyDown($input, {
                key: 'Enter',
            });

            expect($input.value).toStrictEqual('10');
        });

        test('Enter when wrong value', () => {

            const { container} = render(
                <InputNumber
                    value="aaa"
                />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.keyDown($input, {
                key: 'Enter',
            });

            expect($input.value).toStrictEqual('');
        });

        test('Enter when value < min', () => {

            const { container} = render(
                <InputNumber
                    min={ 10 }
                    value={ 1 }
                />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.keyDown($input, {
                key: 'Enter',
            });

            expect($input.value).toStrictEqual('10');
        });

        test('Enter when value > max', () => {

            const { container} = render(
                <InputNumber
                    max={ 10 }
                    value={ 100 }
                />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.keyDown($input, {
                key: 'Enter',
            });

            expect($input.value).toStrictEqual('10');
        });

    });

    describe('Escape', () => {

        test('Simple escape ---> clear the value', () => {

            const { container} = render(
                <InputNumber
                    value={ 10 }
                />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.keyDown($input, {
                key: 'Escape',
            });

            expect($input.value).toStrictEqual('');
        });

    });

    describe('Change Value', () => {

        test('Change value to 1', () => {

            const { container} = render(
                <InputNumber />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.change($input, {
                target: {
                    value: '1'
                }
            });

            expect($input.value).toStrictEqual('1');
        });

        test('Change value to 1.99', () => {

            const { container} = render(
                <InputNumber />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.change($input, {
                target: {
                    value: '1.99'
                }
            });

            expect($input.value).toStrictEqual('1.99');
        });

        test('Change value to -1.99', () => {

            const { container} = render(
                <InputNumber />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.change($input, {
                target: {
                    value: '-1.99'
                }
            });

            expect($input.value).toStrictEqual('-1.99');
        });

        test('Change value to decimal places > than default should not be changed before the blur', () => {

            const { container} = render(
                <InputNumber />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.change($input, {
                target: {
                    value: '1.1234567'
                }
            });

            expect($input.value).toStrictEqual('1.1234567');
        });

        test('Change value to wrong text should not be changed before the blur', () => {

            const { container} = render(
                <InputNumber />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.change($input, {
                target: {
                    value: 'aaa'
                }
            });

            expect($input.value).toStrictEqual('aaa');
        });
    });

    describe('Change value & blur event', () => {

        test('Change value to 1 and then blur event', () => {

            const { container} = render(
                <InputNumber />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.change($input, {
                target: {
                    value: '1'
                }
            });

            fireEvent.blur($input);

            expect($input.value).toStrictEqual('1');
        });

        test('Change value to 1.99 and then blur event', () => {

            const { container} = render(
                <InputNumber />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.change($input, {
                target: {
                    value: '1.99'
                }
            });

            fireEvent.blur($input);

            expect($input.value).toStrictEqual('1.99');
        });

        test('Change value to -1.99 and then blur event', () => {

            const { container} = render(
                <InputNumber />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.change($input, {
                target: {
                    value: '-1.99'
                }
            });

            fireEvent.blur($input);

            expect($input.value).toStrictEqual('-1.99');
        });

        test('Change value to decimal places > than default ---> should change after the blur', () => {

            const { container} = render(
                <InputNumber />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.change($input, {
                target: {
                    value: '1.1234567'
                }
            });

            fireEvent.blur($input);

            expect($input.value).toStrictEqual('1.1235');
        });

        test('Change value to wrong text ---> should change after the blur', () => {

            const { container} = render(
                <InputNumber />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.change($input, {
                target: {
                    value: 'aaa'
                }
            });

            fireEvent.blur($input);

            expect($input.value).toStrictEqual('');
        });
    });

    describe('User Callbacks ', () => {

        test('send onChange callback', () => {

            const onChangeCallback = jest.fn();

            const { container} = render(
                <InputNumber onChangeCallback={ onChangeCallback }/>
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.change($input, {
                target: {
                    value: '1'
                }
            });

            expect(onChangeCallback).toHaveBeenCalledTimes(1);
        });

        test("don't send onChange callback if value hasn't changed", () => {

            const onChange = jest.fn();

            const { container} = render(
                <InputNumber value="1" onChange={ onChange }/>
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.change($input, {
                target: {
                    value: '1'
                }
            });

            expect(onChange).toHaveBeenCalledTimes(0);
        });

        test('send onKeyDown callback on arrow up', () => {

            const onKeyDownCallback = jest.fn();

            const { container} = render(
                <InputNumber
                    value={ 10 }
                    onKeyDownCallback={ onKeyDownCallback }
                />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.keyDown($input, {
                key: 'ArrowUp',
            });

            expect(onKeyDownCallback).toHaveBeenCalledTimes(1);
        });

        test('send onKeyDown callback on arrow down', () => {

            const onKeyDownCallback = jest.fn();

            const { container} = render(
                <InputNumber
                    value={ 10 }
                    onKeyDownCallback={ onKeyDownCallback }
                />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.keyDown($input, {
                key: 'ArrowDown',
            });

            expect(onKeyDownCallback).toHaveBeenCalledTimes(1);
        });

        test('send onChange callback on arrow up', () => {

            const onChangeCallback = jest.fn();

            const { container} = render(
                <InputNumber
                    value={ 10 }
                    onChangeCallback={ onChangeCallback }
                />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.keyDown($input, {
                key: 'ArrowUp',
            });

            expect(onChangeCallback).toHaveBeenCalledTimes(1);
        });

        test('send onChange callback on arrow down', () => {

            const onChangeCallback = jest.fn();

            const { container} = render(
                <InputNumber
                    value={ 10 }
                    onChangeCallback={ onChangeCallback }
                />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.keyDown($input, {
                key: 'ArrowDown',
            });

            expect(onChangeCallback).toHaveBeenCalledTimes(1);
        });
    });

    describe('Classes & Styles', () => {

        test('Provided inputClasses', () => {

            const { container} = render(
                <InputNumber inputClasses="class1 class2" />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            expect($input.classList.contains('class1') && $input.classList.contains('class2')).toStrictEqual(true);
        });

        test('Provided className', () => {

            const { container} = render(
                <InputNumber className="class1 class2" />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            expect($input.classList.contains('class1') && $input.classList.contains('class2')).toStrictEqual(true);
        });

        test('Provided inputStyles', () => {

            const styles = {
                color: 'red',
            };

            const { container} = render(
                <InputNumber inputStyles={ styles } />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            expect($input.style.color).toStrictEqual('red');
        });

        test('Provided style', () => {

            const styles = {
                color: 'red',
            };

            const { container} = render(
                <InputNumber style={ styles } />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            expect($input.style.color).toStrictEqual('red');
        });
    });

    describe('Cursor Position', () => {

        test('Press on Home ---> should jump to the start', () => {

            const { container} = render(
                <InputNumber value="100" />
            );
            const $input = container.querySelector('input') as HTMLInputElement;
            $input.setSelectionRange(2, 2);

            fireEvent.keyDown($input, {
                key: 'Home',
            });

            expect($input.selectionStart).toStrictEqual(0);
        });

        test('Press on PageUp ---> should jump to the start', () => {

            const { container} = render(
                <InputNumber value="100" />
            );
            const $input = container.querySelector('input') as HTMLInputElement;
            $input.setSelectionRange(2, 2);

            fireEvent.keyDown($input, {
                key: 'PageUp',
            });

            expect($input.selectionStart).toStrictEqual(0);
        });

        test('Press on End ---> should jump to the end', () => {

            const { container} = render(
                <InputNumber value="100" />
            );
            const $input = container.querySelector('input') as HTMLInputElement;
            $input.setSelectionRange(0, 0);

            fireEvent.keyDown($input, {
                key: 'End',
            });

            expect($input.selectionStart).toStrictEqual(3);
        });

        test('Press on PageDown ---> should jump to the end', () => {

            const { container} = render(
                <InputNumber value="100" />
            );
            const $input = container.querySelector('input') as HTMLInputElement;
            $input.setSelectionRange(0, 0);

            fireEvent.keyDown($input, {
                key: 'PageDown',
            });

            expect($input.selectionStart).toStrictEqual(3);
        });

        test('Press on ArrowUp ---> should jump to the end', () => {

            const { container} = render(
                <InputNumber value="100" />
            );
            const $input = container.querySelector('input') as HTMLInputElement;
            $input.setSelectionRange(0, 0);

            fireEvent.keyDown($input, {
                key: 'ArrowUp',
            });

            expect($input.selectionStart).toStrictEqual(3);
        });

        test('Press on ArrowDown ---> should jump to the end', () => {

            const { container} = render(
                <InputNumber value="110" />
            );
            const $input = container.querySelector('input') as HTMLInputElement;
            $input.setSelectionRange(0, 0);

            fireEvent.keyDown($input, {
                key: 'ArrowDown',
            });

            expect($input.selectionStart).toStrictEqual(3);
        });
    });

    describe('MouseWheel', () => {

        test('MouseWheel up', () => {

            const { container} = render(
                <InputNumber
                    step={ 1 }
                    value={ 10 }
                />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.wheel($input, {
                deltaY: -1, // go up
            });

            expect($input.value).toStrictEqual('11');
        });

        test('MouseWheel down', () => {

            const { container} = render(
                <InputNumber
                    step={ 1 }
                    value={ 10 }
                />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.wheel($input, {
                deltaY: 1, // go down
            });

            expect($input.value).toStrictEqual('9');
        });

        test('MouseWheel up on empty value ---> add one step', () => {

            const { container} = render(
                <InputNumber />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.wheel($input, {
                deltaY: -1, // go up
            });

            expect($input.value).toStrictEqual('1');
        });

        test('MouseWheel down on empty value ---> remove one step', () => {

            const { container} = render(
                <InputNumber />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.wheel($input, {
                deltaY: 1, // go down
            });

            expect($input.value).toStrictEqual('-1');
        });

    });

    describe('Other input attributes', () => {

        test('Disabled', () => {

            const { container} = render(
                <InputNumber value={ 50 } disabled={ true } />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            expect($input.disabled).toStrictEqual(true);
        });
    });

    describe('Remove Regex', () => {

        test('Accept only numbers: aaa1aaa2', () => {

            const { container} = render(
                <InputNumber removeRegex={ /[^\-0-9.]*/ig } />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.change($input, {
                target: {
                    value: 'aaa1aaa2'
                }
            });

            fireEvent.blur($input);

            expect($input.value).toStrictEqual('12');
        });

        test('Accept only numbers: -12.5asdfasdf', () => {

            const { container} = render(
                <InputNumber removeRegex={ /[^\-0-9.]*/ig } />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.change($input, {
                target: {
                    value: '-12.5asdfasdf'
                }
            });

            fireEvent.blur($input);

            expect($input.value).toStrictEqual('-12.5');
        });
    });
});