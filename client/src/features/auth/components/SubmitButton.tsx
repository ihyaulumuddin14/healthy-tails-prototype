const SubmitButton = ({ label }: { label: string }) =>  {
   return (
      <button
         type='submit'
         className='w-full mt-3 py-3 bg-[var(--tertiary-color)] text-black font-semibold rounded-xl hover:inset-shadow-sm ease-in-out duration-100 cursor-pointer hover:scale-99'>
            {label}
      </button>
   )
}

export default SubmitButton;