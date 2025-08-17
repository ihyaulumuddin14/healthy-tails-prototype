export default function Main({ children }: { children: React.ReactNode }) {
   return (
      <main id="main" className="h-fit w-full relative">
         {children}
      </main>
   );
}
