import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { InputNumber } from '../core/ui/InputNumber';
import { useState } from 'react';

const App = () => {

    const [num, setNum] = useState(2.2);

    return (
        <InputNumber
            min={ 10 }
            max={ 100 }
            step={ 0.01 }
            value={ num }
            onChangeCallback={ setNum }
            removeRegex={ /[^\-0-9.]*/ig }
        />
    );
};

const init = () => {
    const $root =  document.getElementById('root') as HTMLElement;
    if(!$root) return;

    const root = ReactDOM.createRoot($root);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
};

init();

