## onKeyDownCallback()

The component has an onKeyDownCallback() function that is triggered every time user presses a key.

```ts
import React, { KeyboardEvent } from 'react';
import { InputNumber } from 'mz-react-input-number';

const App = () => {

    const onKeyDownCallback = (evt: KeyboardEvent<HTMLInputElement>) => {
        console.log(updateValue);
    };
    
    return (
        <InputNumber
            value={ 10 }
            onKeyDownCallback={ onKeyDownCallback }
        />
    );
};
```
