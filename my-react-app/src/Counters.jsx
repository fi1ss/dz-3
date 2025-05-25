import { useState, memo, useCallback } from "react"



function Counters() {


    return (
        <div>
            Без использования callBack:
            <br />
            <Counter />
            <br />
            С использованием callBack:
            <CounterV2 />
        </div>
    )
}

function Counter() {
    const [count, setCount] = useState(1)
    const [itemsCount, setItemsCount] = useState([1])
    const increment = (() => {
        const newCount = count + 1
        setCount(newCount)
        setItemsCount([...itemsCount, newCount])
    })
    const decrement = (() => {
        setCount(prevCount => Math.max(prevCount - 1, 0) )
        setItemsCount(prevItems => prevItems.slice(0, -1))
    })
    const items = itemsCount.map(itemCount => (<CounterElement key={itemCount}/>
    ))
    
    
    return (
        <div>
            Значение: {count}
            <br />
            <button onClick={increment}>Увеличить</button>
            <button onClick={decrement}>Уменьшить</button>
            {items}
            <br />
            
        </div>
    )
}

function CounterV2() {
    const [count, setCount] = useState(1)
    const [itemsCount, setItemsCount] = useState([1])
    const increment = useCallback(() => {
        const newCount = count + 1
        setCount(newCount)
        setItemsCount([...itemsCount, newCount])
    }, [count, itemsCount])
    const decrement = useCallback(() => {
        setCount(prevCount => Math.max(prevCount - 1, 0) )
        setItemsCount(prevItems => prevItems.slice(0, -1))
    }, [])
    const items = itemsCount.map(itemCount => (<CounterElementV2 key={itemCount}/>
    ))
    return (
        <div>
            Значение: {count}
            <br />
            <button onClick={increment}>Увеличить</button>
            <button onClick={decrement}>Уменьшить</button>
            {items}
            <br />
            
        </div>
    )
}

function CounterElement() {
    console.log('Рендер! (задание 2)')
    return <div>Элемент!</div>
}

const CounterElementV2 = memo(function CounterElementV2() {
    console.log('Рендер! (задание 2)')
    return <div>Элемент!</div>
})

export default Counters