import { useRef, useState } from "react"

function TextInput() {
    const inputEl = useRef(null)
    const [value, setValue] = useState('')
    const inValue = useRef('')
    const prevValue = useRef('')
    const focusOnInput = () => {
        inputEl.current.focus();
    }
    
    return (
        <div>
            <h1>Задание 4:</h1>
            <input ref={inputEl} type="text" onChange={(event) => {
                // setValue(event.target.value)
                inValue.current = event.target.value
            }}/>
            <br />
            <button onClick={focusOnInput}>Кнопочка делающая фокус</button>
            <br />
            <button onClick={() => {
                setValue(inValue.current)
                inputEl.current.value = ''
                }}>Сохранить</button>
            <p>Предыдущее значение: {value}</p>
        </div>
    )   // Получается, что текущее значение всегда доступно в inValue.current,
        //  а по нажатии Сохранить, значение идёт в стейт value
}

export default TextInput