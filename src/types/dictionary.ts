export interface Dictionary {
  nav: {
    campaign: string;
    ecology: string;
    threats: string;
    recovery: string;
    sightseeing: string;
    brand_prefix: string;
    brand_suffix: string;
    docs: string;
    language: string;
    view_docs: string;
  };
  hero: {
    title: string;
    location: string;
    subtitle: string;
    cta_primary: string;
    cta_secondary: string;
    cards: {
      population: {
        label: string;
        value: string;
        desc: string;
      };
      habitat: {
        label: string;
        value: string;
        desc: string;
      };
    };
    explore: string;
  };
  ecology: {
    tag: string;
    title: string;
    subtitle: string;
    content: string;
    bg_text: string;
    image_main_alt: string;
    image_forest_alt: string;
    quote: string;
    quote_author: string;
    cards: Array<{
      title: string;
      meta: string;
      description: string;
      status: string;
      tags: string[];
    }>;
  };
  threats: {
    tag: string;
    title: string;
    subtitle: string;
    content: string;
    bg_text: string;
    image_alt: string;
    impact_tag: string;
    quote: string;
    items: {
      [key: string]: {
        title: string;
        description: string;
      };
    };
  };
  recovery: {
    tag: string;
    title: string;
    subtitle: string;
    content: string;
    bg_text: string;
    quote: string;
    cta: {
      title: string;
      subtitle: string;
    };
    stats: Array<{
      value: string;
      meta: string;
      label: string;
      description: string;
    }>;
  };
  sightseeing: {
    tag: string;
    title: string;
    subtitle: string;
    content: string;
    bg_text: string;
    dos_tag: string;
    dos_title: string;
    dos: string[];
    donts_tag: string;
    donts_title: string;
    donts: string[];
    commitment_tag: string;
    commitment_title: string;
  };
  footer: {
    bg_text: string;
    project_label: string;
    brand_prefix: string;
    brand_suffix: string;
    description: string;
    explore_label: string;
    explore_items: string[];
    legal_label: string;
    legal_items: string[];
    location_label: string;
    location_text: string;
    copyright: string;
    made_with: string;
    by: string;
    newsletter_title: string;
    newsletter_placeholder: string;
    newsletter_button: string;
    newsletter_success: string;
    newsletter_invalid: string;
    widget_time_label: string;
    widget_gmt: string;
  };
  infographics: {
    tag: string;
    title: string;
    subtitle: string;
    bg_text: string;
    download_btn: string;
    view_btn: string;
    close_btn: string;
    anatomy: {
      title: string;
      summary: string;
      steps_title: string;
      steps: string[];
      details_title: string;
      details: string;
    };
    conservation: {
      title: string;
      summary: string;
    };
  };
  campaign: {
    tag: string;
    title: string;
    subtitle: string;
    bg_text: string;
    tabs: {
      mission: string;
      census: string;
      botany: string;
    };
    mission: {
      title: string;
      rector_title: string;
      rector_text: string;
      description: string;
      umbrella_title: string;
      umbrella_desc: string;
    };
    census: {
      title: string;
      desc: string;
      regions: Array<{
        name: string;
        meta: string;
        count: string;
        label: string;
        status: string;
        desc: string;
      }>;
    };
    botany: {
      title: string;
      desc: string;
      trees: Array<{
        name: string;
        scientific: string;
        role: string;
        desc: string;
      }>;
    };
  };
}

export type Locale = "es" | "en";

