import { createContext, useContext, useEffect, useState} from 'react';
// import './App.css'
import './Themes.css'
import Toolbar from './Toolbar';
import Counters from './Counters'
import SumRandoms from './SumRandoms';

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

  return (
      <themeContext.Provider value = {{theme, toggleTheme}}>
        <body className={theme}>
          <Toolbar /> 
          <Counters />
          <SumRandoms />
        </body>
        
        

      </themeContext.Provider>
  )
}





export default App
