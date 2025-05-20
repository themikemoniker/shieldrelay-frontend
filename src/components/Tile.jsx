export default function Tile({ children, className = "" }) {
  return (
    <div
      className={`bg-[#1f1f1f]/70 backdrop-blur-md border border-brand-orange/20 
                  rounded-xl shadow-card p-6 transition-shadow duration-300 
                  hover:shadow-hover ${className}`}
    >
      {children}
    </div>
  );
}