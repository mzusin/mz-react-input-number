import { InputNumber } from '../src/core';
import { cleanup, render, fireEvent } from '@testing-library/react'; // https://testing-library.com/docs/dom-testing-library/api-events/

afterEach(cleanup);

describe('Input Number', () => {

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

    test('ArrowDown', () => {

        const { container} = render(
            <InputNumber
                min={ 10 }
                max={ 100 }
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

    test('ArrowUp', () => {

        const { container} = render(
            <InputNumber
                min={ 10 }
                max={ 100 }
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
});