import Link from "next/link";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { LanguageSwitcher } from "@/components/common/language-switcher";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

interface NavbarProps {
  lang: string;
  dict: any;
}

export function Navbar({ lang, dict }: NavbarProps) {
  const navItems = [
    { name: dict.nav.ecology, href: "#ecology" },
    { name: dict.nav.threats, href: "#threats" },
    { name: dict.nav.recovery, href: "#recovery" },
    { name: dict.nav.sightseeing, href: "#sightseeing" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href={`/${lang}`} className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight text-primary">
              Ara<span className="text-destructive">Macao</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
          <div className="flex items-center space-x-2 pl-4 border-l">
            <LanguageSwitcher currentLang={lang} />
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center space-x-2">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader className="text-left">
                <SheetTitle className="text-xl font-bold tracking-tight">
                  Ara<span className="text-destructive">Macao</span>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-6 mt-10">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-6 border-t flex flex-col space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Idioma</span>
                    <LanguageSwitcher currentLang={lang} />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
