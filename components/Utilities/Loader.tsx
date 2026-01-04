export default function QuantumLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-8">
      <div className="relative w-24 h-24">
        
        <div className="absolute inset-0 rounded-full border-4 border-t-giq-main border-r-transparent border-b-giq-main border-l-transparent animate-spin-slow shadow-[0_0_15px_rgba(72,192,178,0.5)]"></div>
        
        <div className="absolute inset-2 rounded-full border-4 border-t-transparent border-r-giq-purple border-b-transparent border-l-giq-purple animate-spin-reverse shadow-[0_0_15px_rgba(247,166,220,0.5)]"></div>
        
        <div className="absolute inset-[38%] rounded-full bg-giq-dark animate-pulse shadow-[0_0_20px_rgba(42,143,133,0.8)]"></div>
        
        <div className="absolute top-0 left-1/2 w-2 h-2 bg-giq-yellow rounded-full -translate-x-1/2 -translate-y-1/2 animate-ping"></div>
        <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-giq-blue rounded-full -translate-x-1/2 translate-y-1/2 animate-ping delay-300"></div>
      </div>

      {/* Text Feedback */}
      <div className="text-center space-y-2">
        <h3 className="text-lg font-bold text-gray-900 tracking-widest uppercase animate-pulse">
          Entangling States...
        </h3>
        <p className="text-xs text-gray-400 font-mono">
          Collapsing wave function
        </p>
      </div>
    </div>
  );
}