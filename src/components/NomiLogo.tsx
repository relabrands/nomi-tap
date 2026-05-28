export const NomiLogo = ({ className = "" }: { className?: string }) => (
  <span
    aria-label="Nomi"
    className={`inline-flex h-3.5 w-3.5 items-center justify-center rounded-[4px] bg-primary text-[8px] font-bold text-primary-foreground ${className}`}
  >
    N
  </span>
);
