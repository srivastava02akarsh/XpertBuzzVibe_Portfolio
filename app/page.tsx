import HeroCinematic from "@/components/landing/HeroCinematic";
import Manifesto from "@/components/landing/Manifesto";
import ClientsVelocity from "@/components/landing/ClientsVelocity";
import StatsWall from "@/components/landing/StatsWall";
import ServicesStack from "@/components/landing/ServicesStack";
import WorkHorizontal from "@/components/landing/WorkHorizontal";
import IndustriesList from "@/components/landing/IndustriesList";
import ProcessPath from "@/components/landing/ProcessPath";
import TestimonialsScrub from "@/components/landing/TestimonialsScrub";
import ContactSection from "@/components/landing/ContactSection";
import { getAllBrandAssets } from "@/lib/brand-assets";
import { caseStudies } from "@/lib/data/case-studies";

export default function Home() {
  const brandAssets = getAllBrandAssets(caseStudies.map((study) => study.slug));
  return (
    <>
      <HeroCinematic />
      <Manifesto />
      <ClientsVelocity />
      <StatsWall />
      <ServicesStack />
      <WorkHorizontal brandAssets={brandAssets} />
      <IndustriesList />
      <ProcessPath />
      <TestimonialsScrub />
      <ContactSection />
    </>
  );
}
