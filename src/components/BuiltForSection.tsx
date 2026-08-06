import { useState } from "react";
import homeServices from "@/assets/ind-home-services.jpg";
import property from "@/assets/ind-property.jpg";
import law from "@/assets/ind-law.jpg";
import smallBusiness from "@/assets/ind-small-business.jpg";
import healthcare from "@/assets/ind-healthcare.jpg";
import startups from "@/assets/ind-startups.jpg";
import support from "@/assets/ind-support.jpg";
import sales from "@/assets/ind-sales.jpg";

const audiences = [
  { label: "Home services", image: homeServices, alt: "Isometric service vans illustration" },
  {
    label: "Property management",
    image: property,
    alt: "Isometric apartment buildings illustration",
  },
  { label: "Law firms", image: law, alt: "Isometric law office illustration" },
  { label: "Small business", image: smallBusiness, alt: "Isometric storefronts illustration" },
  { label: "Healthcare", image: healthcare, alt: "Isometric medical clinic illustration" },
  { label: "Startups", image: startups, alt: "Isometric rocket and laptop illustration" },
  { label: "Support teams", image: support, alt: "Isometric support desk illustration" },
  { label: "Sales teams", image: sales, alt: "Isometric sales chart and phone illustration" },
];

export function BuiltForSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-light-grey py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2">
        <div>
          <h2 className="max-w-md font-display text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl">
            Built for how your team actually works
          </h2>

          <div className="mt-10 flex flex-wrap gap-3">
            {audiences.map((item, index) => (
              <button
                key={item.label}
                type="button"
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                aria-pressed={active === index}
                className={`rounded-md px-4 py-3 text-sm font-medium transition-colors ${
                  active === index
                    ? "bg-foreground text-background"
                    : "bg-secondary text-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative aspect-[4/3] w-full">
          {audiences.map((item, index) => (
            <img
              key={item.label}
              src={item.image}
              alt={item.alt}
              width={1024}
              height={768}
              loading="lazy"
              className={`absolute inset-0 size-full rounded-3xl object-contain transition-opacity duration-500 ${
                active === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
