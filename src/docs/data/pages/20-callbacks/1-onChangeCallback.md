## onChangeCallback()

The component has an onChangeCallback() function that is triggered every time the input value changes.

```ts
import React from 'react';
import { InputNumber } from 'mz-react-input-number';

const App = () => {

    const onChangeCallback = (updateValue: number) => {
        console.log(updateValue);
    };
    
    return (
        <InputNumber
            value={ 10 }
            onChangeCallback={ onChangeCallback }
        />
    );
};
```
