import { createContext, useContext, useEffect, useState} from 'react';
// import './App.css'
import './Themes.css'

const themeContext = createContext();

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
        </body>
        
        

      </themeContext.Provider>
  )
}

function Toolbar() {
  return (
    <ThemeButton />
  )
}

function ThemeButton() {
  const { theme, toggleTheme } = useContext(themeContext);

  return (
    <button className={theme} onClick={toggleTheme}>Переключить тему</button>
  )

}



export default App
