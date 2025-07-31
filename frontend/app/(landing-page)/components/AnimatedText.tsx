'use client'

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

type Props = {
   children?: React.ReactNode;
   triggerWrapper?: string;
   type: 'h1' | 'h2' | 'h3' | 'p';
   splitBy: 'words' | 'lines' | 'chars';
   className?: string;
   reverse?: boolean;
}

export default function AnimatedText({ 
   children,
   triggerWrapper = '.container', 
   type = 'p', 
   splitBy = 'words', 
   className = '', 
   reverse = false 
}: Props) {
   const textRef = useRef<HTMLElement>(null);

   useEffect(() => {
      if (!textRef.current) return;

      const splitText = SplitText.create(textRef.current, {
         type: splitBy,
         mask: splitBy === 'lines' ? 'lines' : undefined,
         lineClass: 'split-line',
         wordClass: 'split-word',
      });

      const target =
         splitBy === 'lines' ? splitText.lines :
         splitBy === 'words' ? splitText.words : splitText.chars;

      gsap.from(target, {
         opacity: 0,
         yPercent: 100,
         duration: 2,
         ease: 'easeInOut',
         stagger: 0.2,
         scrollTrigger: triggerWrapper !== '#home' ? 
         {
            trigger: triggerWrapper,
            start: 'top center',
            end: 'bottom center',
            toggleActions: reverse
            ? 'play none none reverse'
               : 'play none none none',
         } :
         undefined
         });

      return () => {
         splitText.revert();
         gsap.killTweensOf(target);
      };
   }, [triggerWrapper, splitBy, reverse]);


   const renderElement = () => {
      const baseProps = {
         className: `animated-text ${className}`,
         children: children || `animated ${type}`
      };

      switch(type) {
         case 'h1': 
            return <h1 ref={textRef as React.RefObject<HTMLHeadingElement>} {...baseProps} />;
         case 'h2': 
            return <h2 ref={textRef as React.RefObject<HTMLHeadingElement>} {...baseProps} />;
         case 'h3': 
            return <h3 ref={textRef as React.RefObject<HTMLHeadingElement>} {...baseProps} />;
         default: 
            return <p ref={textRef as React.RefObject<HTMLParagraphElement>} {...baseProps} />;
      }
   };

   return (
      <>
         {renderElement()}
      </>
   );
}