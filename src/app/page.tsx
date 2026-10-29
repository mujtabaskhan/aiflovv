import { HomeHero } from "@/components/hero/HomeHero";
import { ClientsMarquee } from "@/components/home/ClientsMarquee";
import { Manifesto } from "@/components/home/Manifesto";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { WorkReel } from "@/components/home/WorkReel";
import { Pipeline } from "@/components/home/Pipeline";
import { Toolkit } from "@/components/home/Toolkit";
import { LatestNotes } from "@/components/home/LatestNotes";
import { CtaBlock } from "@/components/ui/CtaBlock";

export default function Home() {
  return (
    <>
      <HomeHero />
      <ClientsMarquee />
      <Manifesto />
      <ServicesShowcase />
      <WorkReel />
      <Pipeline />
      <Toolkit />
      <LatestNotes />
      <CtaBlock />
    </>
  );
}
