import { createContext, useContext, useEffect, useState} from 'react';
// import './App.css'
import './Themes.css'
import Toolbar from './Toolbar';
import Counters from './Counters'
import SumRandoms from './SumRandoms';
import TextInput from './TextInput';
import TodoList from './todolist';
import ParentOfMemos from './ParentOfMemos';

export const themeContext = createContext();

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme ? savedTheme : 'light'
  })
  const toggleTheme = (() => {
    setTheme(prevTheme => {
    const newTheme = prevTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    return newTheme;
  });
  })

  useEffect(() => {
    document.body.className = theme;
  }, [theme])

  return (
      <themeContext.Provider value = {{theme, toggleTheme}}>
        <div className={theme}>
          <Toolbar /> 
          <Counters />
          <SumRandoms />
          <TextInput />
          <TodoList />
          <ParentOfMemos />
        </div>
        
        

      </themeContext.Provider>
  )
}





export default App
