export default function Main({ children }: { children: React.ReactNode }) {
   return (
      <main className="h-fit w-full relative">
         <div className="w-full h-screen gradient-background top-0 fixed z-[-1]"></div>
         {children}
      </main>
   );
}
