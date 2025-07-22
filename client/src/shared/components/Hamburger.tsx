import { useRef } from 'react';
import styled from 'styled-components';

type Props = {
   handleOpen: (arg: boolean) => void
}

const Hamburger = ({ handleOpen }: Props) => {
   const checkBoxRef = useRef<HTMLInputElement>(null);

   return (
      <StyledWrapper className='flex lg:hidden'>
         <div>
            <input ref={checkBoxRef} type="checkbox" id="checkbox" />
            <label htmlFor="checkbox" className="toggle-btn" onClick={() => handleOpen(!checkBoxRef.current!.checked)}>
               <div className="bars" id="bar1" />
               <div className="bars" id="bar2" />
               <div className="bars" id="bar3" />
            </label>
         </div>
      </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  #checkbox {
    display: none;
  }

  .toggle-btn {
    position: relative;
    width: 40px;
    height: 40px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition-duration: .3s;
  }

  .bars {
    width: 100%;
    height: 4px;
    background-color: var(--tertiary-color);
    border-radius: 5px;
    transition-duration: .3s;
  }

  #checkbox:checked + .toggle-btn .bars {
    margin-left: 13px;
  }

  #checkbox:checked + .toggle-btn #bar2 {
    transform: rotate(135deg);
    margin-left: 0;
    transform-origin: center;
    transition-duration: .3s;
  }

  #checkbox:checked + .toggle-btn #bar1 {
    transform: rotate(45deg);
    transition-duration: .3s;
    transform-origin: left center;
  }

  #checkbox:checked + .toggle-btn #bar3 {
    transform: rotate(-45deg);
    transition-duration: .3s;
    transform-origin: left center;
  }`;

export default Hamburger;
