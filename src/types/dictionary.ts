export interface Dictionary {
  nav: {
    ecology: string;
    threats: string;
    recovery: string;
    sightseeing: string;
  };
  hero: {
    title: string;
    location: string;
    subtitle: string;
    cta_primary: string;
    cta_secondary: string;
  };
  ecology: {
    title: string;
    subtitle: string;
    content: string;
  };
  threats: {
    title: string;
    subtitle: string;
    content: string;
    quote: string;
    items: {
      [key: string]: {
        title: string;
        description: string;
      };
    };
  };
  recovery: {
    title: string;
    subtitle: string;
    content: string;
    stats: Array<{
      value: string;
      label: string;
      description: string;
    }>;
  };
  sightseeing: {
    title: string;
    subtitle: string;
    content: string;
    dos: string[];
    donts: string[];
  };
}

export type Locale = "es" | "en";
