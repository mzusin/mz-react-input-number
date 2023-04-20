# "Remove" Regex 

This property allows removing non-numeric characters from the input field using regular expression, ensuring that the input only contains valid numeric characters.

```ts
import React, { useState } from 'react';
import { InputNumber } from 'mz-react-input-number';

const App = () => {

    const [value, setValue] = useState(10);

    return (
        <InputNumber
            value={ value }
            onChangeCallback={ setValue }
            removeRegex={ /[^\-0-9.]*/ig }
        />
    );
};
``` 

> Any regular expression can be specified.