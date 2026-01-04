import QuantumLoader from "@/components/Utilities/Loader";

export default function Loading() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <QuantumLoader />
    </div>
  );
}