## Basic Usage

Install the library from npm:
  
```shell
npm i mz-react-input-number
```

Or with yarn:

```shell
yarn add mz-react-input-number
```

Use the **min**, **max**, **step**, and **value** properties to customize the component. 

```ts
import React, { useState } from 'react';
import { InputNumber } from 'mz-react-input-number';

const App = () => {

    const [value, setValue] = useState(10);

    return (
        <InputNumber
            min={ 0 }
            max={ 100 }
            step={ 0.1 }
            value={ value }
            onChangeCallback={ setValue }
        />
    );
};
``` 

> All props are **optional**.


