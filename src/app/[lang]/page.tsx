import { getDictionary } from "@/lib/dictionary";
import type { Locale, Dictionary } from "@/types/dictionary";
import { Navbar } from "@/components/common/navbar";
import { Hero } from "@/components/sections/hero";
import { Ecology } from "@/components/sections/ecology";
import { Threats } from "@/components/sections/threats";
import { Recovery } from "@/components/sections/recovery";
import { Sightseeing } from "@/components/sections/sightseeing";
import { Infographics } from "@/components/sections/infographics";
import { CampaignSection } from "@/components/sections/campaign-section";
import { Footer } from "@/components/layout/footer";
import FlowArt, { FlowSection } from "@/components/story-scroll";

interface PageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  const dict: Dictionary = await getDictionary(lang);

  // Copiar infografías de docs/ a public/images/ si no existen (en el servidor de Next.js)
  try {
    const fs = await import("fs");
    const path = await import("path");
    const srcDir = path.join(process.cwd(), "docs");
    const destDir = path.join(process.cwd(), "public", "images");

    const filesToCopy = [
      { src: "Ara Macao pico.png", dest: "ara-macao-pico.png" },
      { src: "Lapa roja (1).png", dest: "lapa-roja-conservacion.png" }
    ];

    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    filesToCopy.forEach((file) => {
      const srcPath = path.join(srcDir, file.src);
      const destPath = path.join(destDir, file.dest);
      if (fs.existsSync(srcPath) && !fs.existsSync(destPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`[Copier] Copied ${file.src} to ${file.dest}`);
      }
    });
  } catch (error) {
    console.error("[Copier] Error copying infographics:", error);
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar lang={lang} dict={dict} />
      <main className="flex-1">
        <FlowArt>
          <Hero dict={dict} />
          <CampaignSection dict={dict} />
          <FlowSection aria-label="Ecology Section">
            <Ecology dict={dict} />
          </FlowSection>

          <Threats dict={dict} />


          <Recovery dict={dict} />


          <Sightseeing dict={dict} />

          <FlowSection aria-label="Infographics Section">
            <Infographics dict={dict} />
          </FlowSection>
        </FlowArt>
      </main>

      <Footer dict={dict} lang={lang} />
    </div>
  );
}
