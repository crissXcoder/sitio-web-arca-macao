import { getDictionary } from "@/lib/dictionary";
import type { Locale, Dictionary } from "@/types/dictionary";
import { Navbar } from "@/components/common/navbar";
import { Hero } from "@/components/sections/hero";
import { Ecology } from "@/components/sections/ecology";
import { Threats } from "@/components/sections/threats";
import { Recovery } from "@/components/sections/recovery";
import { Sightseeing } from "@/components/sections/sightseeing";
import { Footer } from "@/components/layout/footer";
import FlowArt, { FlowSection } from "@/components/story-scroll";

interface PageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  const dict: Dictionary = await getDictionary(lang);

  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar lang={lang} dict={dict} />
      <main className="flex-1">
        <FlowArt>
          <Hero dict={dict} />
          <FlowSection aria-label="Ecology Section">
            <Ecology dict={dict} />
          </FlowSection>
          <FlowSection aria-label="Threats Section">
            <Threats dict={dict} />
          </FlowSection>
          <FlowSection aria-label="Recovery Section">
            <Recovery dict={dict} />
          </FlowSection>
          <FlowSection aria-label="Sightseeing Section">
            <Sightseeing dict={dict} />
          </FlowSection>
        </FlowArt>
      </main>

      <Footer dict={dict} lang={lang} />
    </div>
  );
}
