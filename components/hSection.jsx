export default function HSection({ className = '', children }) {
  return <section className={`h-full shrink-0 overflow-y-auto overflow-x-clip p-4 ${className}`}>{children}</section>;
}
