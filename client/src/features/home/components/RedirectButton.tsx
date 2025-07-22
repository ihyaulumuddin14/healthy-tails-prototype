import styled from 'styled-components';

type Props = {
   label: string,
   onClick: () => void,
   addGapBottom?: boolean
   position?: 'left' | 'center' | 'right'
};

const RedirectButton = ({ label, onClick, addGapBottom = false, position }: Props) => {
  return (
    <StyledWrapper>
      <button
         className={`
            button ease-in-out duration-200 absolute z-0
            ${position === 'left' ? 'left-10' : position === 'right' ? 'right-10' : 'left-1/2 -translate-x-1/2'} 
            ${addGapBottom ? 'group-hover:bottom-10' : 'group-hover:bottom-0' }
            -bottom-50 opacity-100
            pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto`}
         onClick={onClick}>
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
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button {
    line-height: 1;
    text-decoration: none;
    display: inline-flex;
    border: none;
    cursor: pointer;
    align-items: center;
    gap: 0.75rem;
    background-color: var(--tertiary-color);
    color: #000;
    font-size: 1rem;
    border-radius: 10rem;
    font-weight: 600;
    padding: 0.75rem 1.5rem;
    padding-left: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: all 0.3s;
  }

  .button__icon-wrapper {
    flex-shrink: 0;
    width: 25px;
    height: 25px;
    position: relative;
    color: var(--clr);
    background-color: #fff;
    border-radius: 50%;
    display: grid;
    place-items: center;
    overflow: hidden;
  }

  .button:hover {
    background-color: #000;
    color: #fff;
  }

  .button:hover .button__icon-wrapper {
    color: #000;
  }

  .button__icon-svg--copy {
    position: absolute;
    transform: translate(-150%, 150%);
  }

  .button:hover .button__icon-svg:first-child {
    transition: transform 0.3s ease-in-out;
    transform: translate(150%, -150%);
  }

  .button:hover .button__icon-svg--copy {
    transition: transform 0.3s ease-in-out 0.1s;
    transform: translate(0);
  }`;

export default RedirectButton;
