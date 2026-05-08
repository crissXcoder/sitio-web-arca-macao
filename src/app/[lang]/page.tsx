import { getDictionary } from "@/lib/dictionary";
import { Navbar } from "@/components/common/navbar";
import { Hero } from "@/components/sections/hero";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar lang={lang} dict={dict} />
      <main className="flex-1">
        <Hero dict={dict} />
        
        <ScrollReveal>
          <section id="ecology" className="py-24 bg-muted/30">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">{dict.nav.ecology}</h2>
              <div className="mt-8 mx-auto h-1 w-20 bg-destructive" />
              <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
                Próximamente: Explora cómo la Lapa Roja interactúa con el ecosistema único del bosque seco tropical.
              </p>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal direction="left">
          <section id="threats" className="py-24">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">{dict.nav.threats}</h2>
              <div className="mt-8 mx-auto h-1 w-20 bg-destructive" />
              <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
                Próximamente: Los desafíos críticos que enfrenta la especie, desde el cambio climático hasta el tráfico ilegal.
              </p>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal direction="right">
          <section id="recovery" className="py-24 bg-muted/30">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">{dict.nav.recovery}</h2>
              <div className="mt-8 mx-auto h-1 w-20 bg-destructive" />
              <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
                Próximamente: Las iniciativas de reintroducción y monitoreo que están devolviendo el color a los cielos de Guanacaste.
              </p>
            </div>
          </section>
        </ScrollReveal>
      </main>
      
      <footer className="border-t py-12 bg-background">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Proyecto Ara Macao Guanacaste. Símbolo de los Cielos.</p>
          <p className="mt-2 text-xs opacity-50">Hecho con fines educativos y de conservación.</p>
        </div>
      </footer>
    </div>
  );
}
