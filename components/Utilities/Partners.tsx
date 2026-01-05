import Image from "next/image";

export default function Partners() {
  const partners = [
    "/partners/ibm.png",
    "/partners/perimeter.png",
    "/partners/qbraid.png",
    "/partners/citibank.png",
    "/partners/quantique.png",
    "/partners/lewagon.png",
    "/partners/girlup.png",
    "/partners/infleqtion.png",
    "/partners/quanscient.png",
    "/partners/unitednations.png",
    "/partners/UniOfPatras.png",
    "/partners/iyq.png",
    "/partners/gitex.png",
    "/partners/Quantum-Tech.png",
    "/partners/quantumbasel.png",
    "/partners/quantuminsider.png",
    "/partners/super.png",
    "/partners/swisscyber.png",
    "/partners/hop.jpg",
    "/partners/inspiringgirls.png",
    

  ];

  return (
    <section className="py-20 bg-giq-light overflow-hidden border-t border-gray-100">
      <div className="text-center mb-10">
        <span className="text-giq-dark font-bold tracking-[0.2em] uppercase text-base">
          Our Supporters
        </span>
      </div>

      <div className="relative flex overflow-hidden">

        <div className="flex animate-marquee whitespace-nowrap gap-16 md:gap-32 items-center">
          {[...partners, ...partners].map((logo, i) => (
            <div 
              key={i} 
              className="relative w-32 md:w-60 h-16 md:h-24 flex-shrink-0"
            >
              <Image
                src={logo}
                alt={`Partner logo ${i + 1}`}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}