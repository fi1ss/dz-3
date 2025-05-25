import { memo } from "react"
import { useCallback } from "react"
import { useMemo } from "react"
import { useContext } from "react"
import { useReducer } from "react"
import { createContext } from "react"
import { useState } from 'react'

import './styles.css'

const financeContext = createContext()

const initialState = {
  transactions: [
    {id: 1, amount: 5000, category: 'Зп', type: 'income', date: '2023-05-01' },
    {id: 2, amount: 3000, category: 'Магазины', type: 'expense', date: '2023-05-01' },
    {id: 3, amount: 1500, category: 'Рестораны', type: 'expense', date: '2023-05-01' },
    {id: 4, amount: 50000, category: 'Темки', type: 'income', date: '2023-05-01' }
  ],
  filter: 'all',
  dateFilter: null
}

function FinanceReducer(state, action) {
  switch(action.type) {
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [...state.transactions, {
          id: Date.now(),
          amount: action.amount,
          category: action.category,
          type: action.transactionType,
          date: action.date
        }]
      }
    case 'DELETE_TRANSACTION':
      return {
        ...state, transactions: state.transactions.filter(transaction => transaction.id !== action.id)
      }
    case 'SET_FILTER':
      return {
         ...state, filter: action.filter 
      }
    case 'SET_DATE_FILTER':
      return {
        ...state, dateFilter: action.date
      }
  }
}

const TransactionEl = memo(({transaction}) => {
  const dispatch = useContext(financeContext).dispatch

  const deleteTrans = useCallback(() => {
    dispatch(
      {type: 'DELETE_TRANSACTION', id: transaction.id}
    )
  })
  return (
    <div className={'transEl ' + (transaction.type === 'income' ? 'income' : 'expense')}>
      <h4>{transaction.category}, <small>{transaction.date}</small></h4>
      {transaction.type === 'income' ? '+' : '-'}{transaction.amount} руб.
      <button onClick={deleteTrans}>Удалить</button>
    </div>
    
  )

})

const FinanceFilters = () => {
  const {state, dispatch} = useContext(financeContext)

  const changeFilter = useCallback((filter) => {
    dispatch({type: 'SET_FILTER', filter})
  }, [dispatch])
  // const changeDateFilter = useCallback((event) => {
  //   dispatch({type: 'SET_DATE_FILTER', date: event.target.value})
  // })
  return (
    <div>
      <label>По типу: </label>
      <select onChange={(event) => changeFilter(event.target.value)} value={state.filter}>
        <option value="all">Все</option>
        <option value="income">Доходы</option>
        <option value="expense">Расходы</option>
      </select>

    </div>
  )
}

const AddTransactionForm = () => {
  const dispatch = useContext(financeContext).dispatch
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [transactionType, setTransactionType] = useState('expense');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  
  const saveTransaction = useCallback((e) => {
    e.preventDefault()
    if (!amount || !category) return

    dispatch ({
      type: 'ADD_TRANSACTION',
      amount: Number(amount),
      category,
      transactionType,
      date
    })

    setAmount('')
    setCategory('')
  }, [amount, category, transactionType, date, dispatch])

  return (
    <form onSubmit={saveTransaction}>
      <div>
        <select value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
          <option value="expense">Расходы</option>
          <option value="income">Доходы</option>
        </select>
      </div>
      <div>
        <input type="number" placeholder="Сумма" value={amount} onChange={(e) => setAmount(e.target.value)} min='1'/>
      </div>
      <div>
        <input type="text" placeholder="Категория" value={category} onChange={(e) => setCategory(e.target.value)}/>
      </div>
      <div>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
      </div>
      <button type="submit">Добавить</button>
    </form>
  )
}



function App() {
  const [state, dispatch] = useReducer(FinanceReducer, initialState)

  const filteredTransactions = useMemo(() => {
    return state.transactions.filter(trans => {
      return state.filter === 'all' || trans.type === state.filter
    })
  }, [state.transactions, state.filter])

  const balance = useMemo(() => {
    return state.transactions.reduce((sum, trans) => {
      return trans.type === 'income' ? sum + trans.amount : sum - trans.amount
    }, 0)
  }, [state.transactions])

  return (
    <financeContext.Provider value = {{state, dispatch}}>
      <h1>Журнал доходов/расходов</h1>
      <h2>
        Баланс: {balance} руб.
      </h2>
      <AddTransactionForm />
      <FinanceFilters />
      <div>
      {filteredTransactions.map(trans => (
        <TransactionEl key={trans.id} transaction={trans} />
      ))}

      </div>

    </financeContext.Provider>
  )
}

export default App