## Classes & Styles

You can provide component CSS classes like this:

```ts
import React, { useState } from 'react';
import { InputNumber } from 'mz-react-input-number';

const App = () => {

    const [value, setValue] = useState(10);

    return (
        <InputNumber
            value={ value }
            onChangeCallback={ setValue }
            inputClasses="my-class-1 my-class-2"
        />
    );
};
``` 

The styles can be provided as follows:

```ts
import React, { useState } from 'react';
import { InputNumber } from 'mz-react-input-number';

const styles = {
    border: '3px solid #efefef',
    backgroundColor: '#fff',
};

const App = () => {

    const [value, setValue] = useState(10);

    return (
        <InputNumber
            value={ value }
            onChangeCallback={ setValue }
            inputStyles={ styles }
        />
    );
};
``` 