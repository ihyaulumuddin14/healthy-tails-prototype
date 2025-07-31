export default function PageNotFound() {
   return (
      <section className='w-full h-screen flex flex-col justify-center items-center font-barriecito gap-4 p-[min(10vw,100px)]'>
         <h1 className='text-9xl font-bold text-shadow-lg text-[var(--color-foreground)] flex items-center gap-1'>
            4
            <span className="h-25 w-25 flex justify-center shadow-lg bg-[var(--color-foreground)] rounded-full overflow-hidden">
               <video src="/animation/Loader cat.webm" autoPlay loop muted className="object-cover object-top drop-shadow-md drop-shadow-(color:--color-background)"></video>
            </span>
            4
         </h1>
         <p className='text-md sm:text-xl text-center'>Ooopss! The page you are looking for does not exist!</p>
      </section>
   )
}