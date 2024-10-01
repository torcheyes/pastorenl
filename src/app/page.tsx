import Landing from "@containers/Landing/Landing";
import Brands from "@containers/Landing/Brands";
import WhatWeOffer from "@containers/Landing/WhatWeOffer";
import ServiceForLargeCompanies from "@containers/Landing/ServiceForLargeCompanies";
import ServiceForSourcing from "@containers/Landing/ServiceForSourcing";
import Clients from "@containers/Landing/Clients";
// import Testimonials from "@containers/Landing/Testimonials";
import FeaturedProducts from "@containers/Landing/FeaturedProducts";

export default function Home() {
  return (
    <div>
      <Landing />
      <Brands />
      <WhatWeOffer />
      <ServiceForLargeCompanies />
      <ServiceForSourcing />
      <Clients />
      <FeaturedProducts />
    </div>
  );
}

// path: src/app/home/page.tsx
