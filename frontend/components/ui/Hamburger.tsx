'use client'

import appStore from '@/stores/appStore';
import { useRef } from 'react';


export default function Hamburger() {
   const setIsMobileNavOpen = appStore((state) => state.setIsMobileNavOpen);
   const isMobileNavOpen = appStore((state) => state.isMobileNavOpen);
   const checkBoxRef = useRef<HTMLInputElement>(null);

   const handleChange = () => {
      if (!checkBoxRef.current) return;
      setIsMobileNavOpen(checkBoxRef.current.checked);
   }

   return (
      <div className='lg:hidden block'>
         <input ref={checkBoxRef} type="checkbox" id="checkbox" onChange={() => handleChange()} checked={isMobileNavOpen} />
         <label htmlFor="checkbox" className="toggle">
            <div className="bars" id="bar1" />
            <div className="bars" id="bar2" />
            <div className="bars" id="bar3" />
         </label>
      </div>
   );
}