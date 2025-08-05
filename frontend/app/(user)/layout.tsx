export default function layout({ children }: { children: React.ReactNode }) {
   return (
      <div>
         <h1>User Layout</h1>
         <div>{children}</div>
      </div>
   )
}
