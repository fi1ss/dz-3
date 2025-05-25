import { memo, useCallback, useState } from "react"

const ChildOfParent = ({props}) => {
    console.log('Рендер обычного компонента')
    return (
        <div>
            Обычный компонент: {props}
        </div>
    )
}

const ChildOfParentMemo = memo(({props}) => {
    console.log('Рендер мемо компонента')
    return (
        <div>
            Компонент в мемо: {props}
        </div>
    )
})

const ChildDemonstratingCallback = memo(({props}) => {
    console.log('Рендер мемо компонента с функцией') //подразумевается, что в пропс здесь
                    // прокидывается функция, ссылка на которую остается неизменной
                    // только если она была создана через коллбэк, соответственно
                    // ререндер происходит только если была прокинута функция без коллбэка
    return (
        <div>
            {props() ? 'Компонент с прокинутой функцией с исп. колбэка' : 'Компонент с прокинутой функцией без исп. колбэка'}
        </div>
    )
})







function ParentOfMemos() {
    const [count, setCount] = useState(0)
    const [count_, setCount_] = useState(0)
    const funcWithCallback = useCallback(() => {
        return true
    }, [])
    const funcWithoutCallback = () => {
        return false
    }
    return (
        <div>
            <h2>Родитель, значение пропсов: {count}, {count_}</h2>
            <button onClick={() => setCount(prevCount => prevCount + 1)}>Изменить пропс</button>
            <button onClick={() => setCount_(prevCount => prevCount + 1)}>Изменить пропс, не прокидывающийся в детей</button>
            <ChildOfParent props={count}/>
            <ChildOfParentMemo props={count}/>
            <ChildDemonstratingCallback props={funcWithCallback} />
            <ChildDemonstratingCallback props={funcWithoutCallback} />
        </div>
    )
}

export default ParentOfMemos