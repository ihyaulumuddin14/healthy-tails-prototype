import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"


type Props = {
   heading: string
   description: string
   children?: React.ReactNode
}

export function AlertInfo({ heading, description, children }: Props) {
  return (
      <AlertDialogContent>
        <AlertDialogHeader className="border-b-1 border-[var(--color-foreground)]/30 pb-3">
          <AlertDialogTitle>{heading}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {children}
        <AlertDialogFooter>
          <AlertDialogCancel className=" cursor-pointer gap-2 rounded-md py-3 px-5 text-md shadow-sm active:scale-95 active:shadow-none transition-all duration-100 ease-in-out">Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
  )
}
