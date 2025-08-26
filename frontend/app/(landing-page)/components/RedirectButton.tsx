import { Link } from "@/providers/nprogress/Link";

type Props = {
   transition?: boolean;
   label: string,
   link?: string,
   addGapBottom?: boolean
   position?: 'left' | 'center' | 'right'
   onClick?: () => void
};

const RedirectButton = ({ onClick, transition = true, label, link, addGapBottom = false, position }: Props) => {
   return (
      <>
         {link ? (
            <Link href={link}>
               <ButtonBase transition={transition} onClick={onClick} label={label} addGapBottom={addGapBottom} position={position}/>
            </Link>
         ) : (
            <ButtonBase transition={transition} onClick={onClick} label={label} addGapBottom={addGapBottom} position={position}/>
         )}
      </>
   );
}

const ButtonBase = ({ onClick, transition = true, label, addGapBottom = false, position }: Props) => {
   return (
      <button
         className={`
            redirect-button ease-in-out duration-200 absolute z-0
            ${transition ? "-bottom-50" : "bottom-0"}
            ${position === 'left' ? 'left-0' : position === 'right' ? 'right-0' : 'left-1/2 -translate-x-1/2'} 
            ${addGapBottom ? 'group-hover:bottom-10' : 'group-hover:bottom-0' }`}
            onClick={onClick}
         >
         <span className="button__icon-wrapper">
            <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="button__icon-svg" width={10}>
               <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor" />
            </svg>
            <svg viewBox="0 0 14 15" fill="none" width={10} xmlns="http://www.w3.org/2000/svg" className="button__icon-svg button__icon-svg--copy">
            <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor" />
            </svg>
         </span>
         {label}
      </button>
   )
}

export default RedirectButton;