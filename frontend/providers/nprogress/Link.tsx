import NextLink from "next/link";
import { forwardRef } from "react";
import NProgress from "nprogress";
import { Link as TransitionLink } from "next-transition-router";
import { shouldTriggerStartEvent } from "./shouldTriggerStartEvent";

interface LinkProps extends React.ComponentProps<"a"> {
   isAnimated?: boolean
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { href, onClick, isAnimated = false, ...rest },
  ref,
) {
  const useLink = href && href.startsWith("/");
  if (!useLink) return <a href={href} onClick={onClick} {...rest} />;

  return (
   <>
      {isAnimated ? (
         <TransitionLink
            href={href}
            onClick={(event) => {
               if (shouldTriggerStartEvent(href, event)) NProgress.start();
               if (onClick) onClick(event);
            }}
            {...rest}
            ref={ref} />
      ) : (
         <NextLink
            href={href}
            onClick={(event) => {
               if (shouldTriggerStartEvent(href, event)) NProgress.start();
               if (onClick) onClick(event);
            }}
            {...rest}
            ref={ref}
         />

      )}
   </>
  );
});