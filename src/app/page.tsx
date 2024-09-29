import Landing from "@containers/Landing/Landing";
import Brands from "@containers/Landing/Brands";
import ServiceForLargeCompanies from "@containers/Landing/ServiceForLargeCompanies";
import ServiceForSourcing from "@containers/Landing/ServiceForSourcing";

export default function Home() {
  return (
    <>
      <Landing />
      <Brands />
      <ServiceForLargeCompanies />
      <ServiceForSourcing />
    </>
  );
}
