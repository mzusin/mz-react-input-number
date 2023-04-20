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

        test('Arrow up when there is no value', () => {

            const { container} = render(
                <InputNumber />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.keyDown($input, {
                key: 'ArrowUp',
            });

            expect($input.value).toStrictEqual('');
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

        test('Arrow down when there is no value', () => {

            const { container} = render(
                <InputNumber />
            );
            const $input = container.querySelector('input') as HTMLInputElement;

            fireEvent.keyDown($input, {
                key: 'ArrowDown',
            });

            expect($input.value).toStrictEqual('');
        });
    });

});