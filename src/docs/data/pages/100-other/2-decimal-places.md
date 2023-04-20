# Numeric Precision (number of decimal places)

The default number of decimal places is **4**. But you can customize it like this:

```ts
import React, { useState } from 'react';
import { InputNumber } from 'mz-react-input-number';

const App = () => {

    const [value, setValue] = useState(10);

    return (
        <InputNumber
            value={ value }
            onChangeCallback={ setValue }
            decimalPlaces={ 2 }
        />
    );
};
``` 

> To disable the decimal places limit, you can pass **Infinity**.