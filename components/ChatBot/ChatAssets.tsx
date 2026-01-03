
export const SchrodingerEquation = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 300 100" className={className} fill="currentColor" aria-hidden="true">

    <path d="M40,50 q0,-20 10,-20 t10,20 t-10,20 t-10,-20 M55,30 l0,40 m-5,-35 l10,0" stroke="currentColor" strokeWidth="5" fill="none" opacity="1"/>
    <text x="80" y="65" fontFamily="serif" fontSize="50" fontStyle="italic" fontWeight="bold" letterSpacing="2">
       ∂Ψ/∂t = ĤΨ
    </text>
    <text x="10" y="65" fontFamily="serif" fontSize="50" fontStyle="italic" fontWeight="bold">iħ</text>
  </svg>
);