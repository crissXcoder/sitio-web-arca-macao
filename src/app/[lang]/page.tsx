import { getDictionary } from "@/lib/dictionary";
import type { Locale, Dictionary } from "@/types/dictionary";
import { Navbar } from "@/components/common/navbar";
import { Hero } from "@/components/sections/hero";
import { Ecology } from "@/components/sections/ecology";
import { Threats } from "@/components/sections/threats";
import { Recovery } from "@/components/sections/recovery";
import { Sightseeing } from "@/components/sections/sightseeing";
import { Footer } from "@/components/layout/footer";

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
        <Hero dict={dict} />
        <Ecology dict={dict} />
        <Threats dict={dict} />
        <Recovery dict={dict} />
        <Sightseeing dict={dict} />
      </main>
      
      <Footer dict={dict} lang={lang} />
    </div>
  );
}
