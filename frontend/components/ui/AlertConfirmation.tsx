import {
  AlertDialogAction,
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
   submitLabel: string
   onSubmit: (arg?: string) => void
}

export function AlertConfirmation({ heading, description, submitLabel, onSubmit }: Props) {
  return (
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{heading}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className=" cursor-pointer gap-2 rounded-md py-3 px-5 text-md shadow-sm active:scale-95 active:shadow-none transition-all duration-100 ease-in-out">Cancel</AlertDialogCancel>
          <AlertDialogAction className=" cursor-pointer gap-2 rounded-md py-3 px-5 text-md shadow-sm active:scale-95 active:shadow-none transition-all duration-100 ease-in-out" onClick={() => onSubmit()}>{submitLabel}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
  )
}
