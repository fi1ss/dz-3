import { useContext } from "react";
import { themeContext } from './App';

function Toolbar() {
  return (
    <div className='toolbar'>
      <ThemeButton />
    </div>
  )
}

function ThemeButton() {
  const { toggleTheme } = useContext(themeContext);

  return (
    <button onClick={toggleTheme}>Переключить тему</button>
  )

}

export default Toolbar