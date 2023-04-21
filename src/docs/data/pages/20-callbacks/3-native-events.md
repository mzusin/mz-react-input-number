# Native Events

The component accepts all standard input events like **onClick**, **onFocus**, etc. (along with standard HTML input properties like  disabled, autocomplete, etc.):

```ts
const App = () => {

    const [num, setNum] = useState<number|undefined>();

    return (
        <InputNumber
            min={ 10 }
            max={ 100 }
            step={ 0.01 }
            value={ num }
            onChangeCallback={ setNum }
            removeRegex={ /[^\-0-9.]*/ig }
            autoFocus={ true }
            onClick={ ()=> {
                console.log('click');
            }}
            onFocus={ ()=> {
                console.log('focus');
            }}
        />
    );
};
```