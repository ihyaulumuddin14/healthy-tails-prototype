import { forwardRef } from 'react'

type Props = {
   name: string
}

const RememberMe = forwardRef<HTMLInputElement, Props>(({name}, ref) => {
  return (
      <div className='flex h-fit gap-2 items-center mb-2 ml-2'>
         <input
            ref={ref}
            type="checkbox"
            name={name}
            id="remember-me"
            className='w-4 h-4 cursor-pointer'/>
         <label htmlFor="remember-me" className='text-sm'>Remember me</label>
      </div>
  )
})

RememberMe.displayName = 'RememberMe'

export default RememberMe