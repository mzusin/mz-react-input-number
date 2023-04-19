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

        fireEvent.keyDown($input, {
            key: 'ArrowDown',
        });

        expect($input.value).toStrictEqual('10');
    });
});