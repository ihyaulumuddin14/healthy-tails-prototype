export default function Main({ children }: { children: React.ReactNode }) {
   return (
      <main className="h-fit w-full">
         <div className="w-full h-screen gradient-background fixed z-[-1]"></div>
         {children}
      </main>
   );
}
