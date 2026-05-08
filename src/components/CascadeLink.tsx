interface CascadeLinkProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

export default function CascadeLink({ text, onClick, className = "" }: CascadeLinkProps) {
  const chars = text.split("");
  return (
    <span
      className={`group relative inline-flex items-start h-[1.5em] overflow-hidden cursor-pointer ${className}`}
      onClick={onClick}
    >
      {chars.map((char, i) => (
        <span
          key={i}
          className="relative inline-flex flex-col h-[1.5em] transition-transform duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full"
          style={{ transitionDelay: `${i * 15}ms` }}
        >
          <span className="block h-[1.5em] leading-[1.5em]">
            {char === " " ? "\u00A0" : char}
          </span>
          <span
            className="block h-[1.5em] leading-[1.5em] text-[#E53935]"
            aria-hidden="true"
          >
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ))}
    </span>
  );
}
