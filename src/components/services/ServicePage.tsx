import type { ReactNode } from "react";
import type { Service } from "@/content/services";
import { CtaBlock } from "@/components/ui/CtaBlock";
import { Toolkit } from "@/components/home/Toolkit";
import { Approach, Capabilities, NextService, OtherServices, RelatedWork, ServiceFaq, ServiceHero, ServiceIntro } from "./blocks";
import { DeviceSwitcher, PageAnatomy } from "./signatures/Web";
import { PhoneTour, PlatformPicker } from "./signatures/Mobile";
import { AiDemo, Guardrails } from "./signatures/Ai";
import { ArchitectureExplorer, SpreadsheetToSystem } from "./signatures/Software";
import { SaasBlocks, SaasRoadmap } from "./signatures/Saas";
import { Journey, StoreDemo } from "./signatures/Commerce";
import { DesignPlayground, WireToFinal } from "./signatures/Design";
import { DeployConsole } from "./signatures/Cloud";

/**
 * Each service gets its own composition: a different hero, its own signature
 * sections, and its blocks in an order that suits the story it's telling.
 */
export function ServicePage({ service: s }: { service: Service }) {
  const end = (cta: { title: ReactNode; body?: string }) => (
    <>
      <ServiceFaq service={s} />
      <NextService service={s} />
      <CtaBlock title={cta.title} body={cta.body} />
    </>
  );

  switch (s.slug) {
    case "web-development":
      return (
        <>
          <ServiceHero service={s} variant="split" />
          <ServiceIntro service={s} aside={<OtherServices service={s} />} />
          <DeviceSwitcher />
          <Capabilities service={s} variant="grid" />
          <PageAnatomy />
          <Approach service={s} variant="steps" />
          <Toolkit only={s.stack} />
          <RelatedWork service={s} />
          {end({
            title: (
              <>
                Let&apos;s build
                <br />
                your website.
              </>
            ),
          })}
        </>
      );

    case "mobile-applications":
      return (
        <>
          <ServiceHero service={s} variant="center" />
          <PhoneTour />
          <PlatformPicker />
          <Capabilities service={s} variant="list" title={<>From prototype<br />to the stores.</>} />
          <Approach service={s} variant="timeline" />
          <RelatedWork service={s} title={<>Apps we&apos;ve<br />shipped.</>} />
          {end({
            title: (
              <>
                Let&apos;s put you
                <br />
                in their pocket.
              </>
            ),
          })}
        </>
      );

    case "ai-solutions":
      return (
        <>
          <ServiceHero service={s} variant="stacked" />
          <AiDemo />
          <Capabilities service={s} variant="bento" title={<>Where AI<br />earns its keep.</>} lead="Specific, checkable jobs — the places AI reliably saves time." />
          <Guardrails />
          <Approach service={s} variant="cycle" title={<>Small, real,<br />then bigger.</>} />
          <Toolkit only={s.stack} />
          {end({
            title: (
              <>
                Find your first
                <br />
                AI win.
              </>
            ),
            body: "Tell us about one workflow that eats your team's time. We'll tell you honestly whether AI is the right tool for it.",
          })}
        </>
      );

    case "software-development":
      return (
        <>
          <ServiceHero service={s} variant="split" />
          <SpreadsheetToSystem />
          <Capabilities service={s} variant="bento" />
          <ArchitectureExplorer />
          <Approach service={s} variant="steps" />
          <RelatedWork service={s} title={<>Systems in<br />production.</>} />
          <Toolkit only={s.stack} />
          {end({
            title: (
              <>
                Retire the
                <br />
                spreadsheet.
              </>
            ),
          })}
        </>
      );

    case "saas-development":
      return (
        <>
          <ServiceHero service={s} variant="stacked" />
          <SaasBlocks />
          <SaasRoadmap />
          <Capabilities service={s} variant="list" title={<>What we<br />build in.</>} />
          <RelatedWork service={s} title={<>Platforms<br />we&apos;ve built.</>} />
          <ServiceIntro service={s} id="summary" aside={<OtherServices service={s} />} />
          {end({
            title: (
              <>
                Ship your
                <br />
                first version.
              </>
            ),
          })}
        </>
      );

    case "ecommerce-development":
      return (
        <>
          <ServiceHero service={s} variant="split" />
          <StoreDemo />
          <Journey />
          <Capabilities service={s} variant="grid" />
          <RelatedWork service={s} title={<>Stores we&apos;ve<br />launched.</>} />
          <Approach service={s} variant="steps" />
          {end({
            title: (
              <>
                Let&apos;s open
                <br />
                your store.
              </>
            ),
          })}
        </>
      );

    case "ui-ux-design":
      return (
        <>
          <ServiceHero service={s} variant="center" />
          <DesignPlayground />
          <WireToFinal />
          <Capabilities service={s} variant="list" />
          <Approach service={s} variant="timeline" />
          <RelatedWork service={s} title={<>Designed<br />by us.</>} />
          {end({
            title: (
              <>
                Make it
                <br />
                feel obvious.
              </>
            ),
          })}
        </>
      );

    case "cloud-devops":
      return (
        <>
          <ServiceHero service={s} variant="split" />
          <DeployConsole />
          <Capabilities service={s} variant="bento" title={<>Foundations<br />that hold.</>} />
          <Approach service={s} variant="cycle" title={<>Audit. Automate.<br />Operate.</>} />
          <Toolkit only={s.stack} />
          <RelatedWork service={s} title={<>Running on<br />AWS.</>} />
          {end({
            title: (
              <>
                Make releases
                <br />
                boring.
              </>
            ),
          })}
        </>
      );
  }
}
