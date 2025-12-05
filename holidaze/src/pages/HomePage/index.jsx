//import HeroSection from "../../components/HeroSection";
import React from "react";
import VenuesGrid from "../../components/VenuesGrid";
//import Newsletter from "../../components/Newsletter";

export default function HomePage() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/*<HeroSection />*/}
      <VenuesGrid />
      {/*<Newsletter />*/}
    </div>
  );
}
