export default function PageNotFound() {
   return (
      <section className='w-full h-screen flex flex-col justify-center items-center font-barriecito gap-4 p-[min(10vw,100px)]'>
         <h1 className='text-9xl font-bold text-shadow-lg text-white'>404</h1>
         <p className='text-md sm:text-xl text-center'>Ooopss! The page you are looking for does not exist!</p>
      </section>
   )
}
