import styled from 'styled-components';
import useTheme from '../hooks/useTheme';
import { useShallow } from 'zustand/react/shallow'
import { useEffect } from 'react';

const ThemeToggle = () => {
   const { theme, setTheme } = useTheme(
      useShallow((state) => ({theme: state.theme, setTheme: state.setTheme}))
   )
   useEffect(() => {
      if (theme === 'dark') {
         document.documentElement.classList.add("dark");
      } else {
         document.documentElement.classList.remove("dark");
      }
   }, [theme])

  return (
    <StyledWrapper>
      <label className="switch">
        <input type="checkbox" checked={theme === 'dark'} onChange={setTheme}/>
        <span className="slider" />
      </label>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /* The switch - the box around the slider */
  .switch {
    font-size: 17px;
    position: relative;
    display: inline-block;
    width: 3.5em;
    height: 2em;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    inset: 0;
    border: 2px solid #fff;
    border-radius: 50px;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 1.4em;
    width: 1.4em;
    left: 0.2em;
    bottom: 0.2em;
    background-color: white;
    border-radius: inherit;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
  }

  .switch input:checked + .slider {
    box-shadow: 0 0 10px var(--tertiary-color);
    border: 2px solid var(--tertiary-color);
  }

  .switch input:checked + .slider:before {
    transform: translateX(1.5em);
  }`;

export default ThemeToggle;
