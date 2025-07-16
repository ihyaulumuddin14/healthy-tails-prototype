import Divider from "./components/Divider"
import AuthLinks from "./components/AuthLinks"
import toastMessage, { Toaster } from 'react-hot-toast'

type AuthLayoutProps = {
   children: React.ReactNode
   title: string
   subtitle: string,
   type?: string
}

export default function AuthLayout({ children, title, subtitle, type = '' }: AuthLayoutProps) {
   return (
      <section className='w-full min-h-screen h-fit pt-10 flex flex-col items-center bg-[var(--primary-color)] text-[var(--text-color)]'>
         <div className='wrapper w-full max-w-xl h-fit flex flex-col justify-center items-center gap-5 p-[min(7vw,50px)] relative'>

            <Toaster position="top-center" reverseOrder={false}></Toaster>

            <svg className="w-[48px] h-[48px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
               <path stroke="currentColor" strokeWidth="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
            </svg>

            <header className='flex flex-col gap-2 mb-4'>
               <h1 className='text-3xl font-semibold text-center'>{title}</h1>
               <p className='opacity-80 text-center'>{subtitle}</p>
            </header>

            <main className="w-full">
               {children}

               {(type === 'login' || type === 'register') && (
                  <>
                     <Divider />

                     <button
                        onClick={(e) => {
                           e.preventDefault();
                           toastMessage("Ini boongan sumpah", { icon: '😭' });
                        }}
                        className='w-full py-3 rounded-xl flex justify-center items-center gap-2 border cursor-pointer hover:scale-99 ease-in-out duration-100'>
                           <span>
                              <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                 <path fillRule="evenodd" d="M12.037 21.998a10.313 10.313 0 0 1-7.168-3.049 9.888 9.888 0 0 1-2.868-7.118 9.947 9.947 0 0 1 3.064-6.949A10.37 10.37 0 0 1 12.212 2h.176a9.935 9.935 0 0 1 6.614 2.564L16.457 6.88a6.187 6.187 0 0 0-4.131-1.566 6.9 6.9 0 0 0-4.794 1.913 6.618 6.618 0 0 0-2.045 4.657 6.608 6.608 0 0 0 1.882 4.723 6.891 6.891 0 0 0 4.725 2.07h.143c1.41.072 2.8-.354 3.917-1.2a5.77 5.77 0 0 0 2.172-3.41l.043-.117H12.22v-3.41h9.678c.075.617.109 1.238.1 1.859-.099 5.741-4.017 9.6-9.746 9.6l-.215-.002Z" clipRule="evenodd"/>
                              </svg>

                           </span>
                           {type === "login" ? ("Login with Google") : ("Register with Google")}
                     </button>
                  </>
               )}
            </main>

            {(type === 'register' || type === 'login' || type === 'recovery') && (
               <footer>
                  <AuthLinks type={type} />
               </footer>
            )}
         </div>
      </section>
   )
}