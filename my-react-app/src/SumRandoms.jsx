import { useMemo, useState } from "react"

function SumRandoms(){
    const [nums, setNums] = useState(genRandomNums())

    function genRandomNums() {
        const count = 10
        return Array.from({length: count}, () => Math.floor(Math.random() * 100 + 1)) 
    }
    const sum = useMemo(() => {
        console.log('Вычисление суммы')
        return nums.reduce((acc, num) => acc + num, 0)
    }, [nums])
    const genNewNums = (() => {
        setNums(genRandomNums())
    })
    return (
        <div>
            <h2>Список чисел:</h2>
            {nums.join(', ')}
            <h2>Сумма: {sum} </h2>
            <button onClick={genNewNums}>Сгенерировать новые числа</button>
        </div>
    )
}

export default SumRandoms