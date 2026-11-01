export interface BaseElement {
  id: string;
  visible: boolean;
}

export interface LinkElement extends BaseElement {
  label: string;
  href: string;
}

export interface CtaElement {
  visible: boolean;
  label: string;
  href: string;
}

export interface NavbarContent {
  logo: {
    text: string;
    shortText: string;
  };
  links: LinkElement[];
  cta: CtaElement;
}

export interface SocialElement extends BaseElement {
  platform: string;
  icon: string;
  href: string;
}

export interface FooterContent {
  preFooter: {
    visible: boolean;
    heading: string;
    highlightWord: string;
    description: string;
    cta: CtaElement;
  };

  brand: {
    description: string;
    socials: SocialElement[];
  };

  companyLinks: LinkElement[];
  careersLinks: LinkElement[];

  contact: {
    email: string;
    address: string;
    phone: string;
  };

  bottomLinks: LinkElement[];
}

/* =========================================================
   HOME PAGE
========================================================= */

export interface HeroStat extends BaseElement {
  value: string;
  label: string;
  sub: string;
}

export interface HeroContent {
  visible: boolean;
  badge: string;
  titlePrefix: string;
  titleSuffix: string;
  subtitle: string;
  domainTags: string;
  description: string;
  primaryCta: CtaElement;
  secondaryCta: CtaElement;
  stats: HeroStat[];
}

export interface StatCardContent extends BaseElement {
  value: number;
  suffix: string;
  label: string;
  desc: string;
  detail?: string;
  color: string;
}

export interface StatsSectionContent {
  visible: boolean;
  badge: string;
  headingPrefix: string;
  headingHighlight: string;
  description: string;
  cards: StatCardContent[];
}

export interface DomainCardContent extends BaseElement {
  color: string;
  pill: string;
  icon: string;
  title: string;
  desc: string;
  tags: string[];
}

export interface DomainsSectionContent {
  visible: boolean;
  badge: string;
  title: string;
  description: string;
  cta: CtaElement;
  cards: DomainCardContent[];
}

export interface AIHighlightContent extends BaseElement {
  icon: string;
  color: string;
  title: string;
  desc: string;
}

export interface AIHighlightSectionContent {
  visible: boolean;
  badge: string;
  headingPrefix: string;
  headingHighlight: string;
  description: string;
  cta: CtaElement;
  highlights: AIHighlightContent[];
}

export interface TechChipContent extends BaseElement {
  name: string;
  color: string;
  icon: string;
}

export interface TechStackSectionContent {
  visible: boolean;
  badge: string;
  headingPrefix: string;
  headingHighlight: string;
  description: string;
  row1: TechChipContent[];
  row2: TechChipContent[];
}

export interface WhyJoinReason extends BaseElement {
  icon: string;
  color: string;
  title: string;
  desc: string;
}

export interface WhyJoinSectionContent {
  visible: boolean;
  badge: string;
  headingPrefix: string;
  headingHighlight: string;
  description: string;
  cta: CtaElement;
  reasons: WhyJoinReason[];
}

export interface TestimonialItem extends BaseElement {
  name: string;
  role: string;
  tenure: string;
  avatar: string;
  color: string;
  quote: string;
}

export interface TestimonialsSectionContent {
  visible: boolean;
  badge: string;
  headingPrefix: string;
  headingHighlight: string;
  description: string;
  items: TestimonialItem[];
}

export interface OfficeItem extends BaseElement {
  city: string;
  country: string;
  role: string;
  team: string;
  color: string;
  x: string;
  y: string;
}

export interface ClientItem extends BaseElement {
  name: string;
}

export interface MapSectionContent {
  visible: boolean;
  badge: string;
  headingPrefix: string;
  headingHighlight: string;
  description: string;
  offices: OfficeItem[];
  clientsTitle: string;
  clients: ClientItem[];
  reachNumber: string;
  reachLabel: string;
}

export interface CTAStat extends BaseElement {
  label: string;
  value: string;
}

export interface CTASectionContent {
  visible: boolean;
  badge: string;
  headingPrefix: string;
  headingHighlight: string;
  headingItalic: string;
  description: string;
  primaryCta: CtaElement;
  secondaryCta: CtaElement;
  stats: CTAStat[];
}

export interface HomePageContent {
  pageTitle: string;
  metaDescription: string;
  hero: HeroContent;
  stats: StatsSectionContent;
  domains: DomainsSectionContent;
  aiHighlight: AIHighlightSectionContent;
  techStack: TechStackSectionContent;
  whyJoin: WhyJoinSectionContent;
  testimonials: TestimonialsSectionContent;
  map: MapSectionContent;
  ctaSection: CTASectionContent;
}

/* =========================================================
   SHARED PAGE HERO
========================================================= */

export interface PageHeroContent {
  visible: boolean;
  badge: string;
  title: string;
  highlightWord: string;
  subtitle: string;
}

/* =========================================================
   ABOUT PAGE
========================================================= */

export interface StoryParagraph extends BaseElement {
  text: string;
}

export interface StoryStat extends BaseElement {
  n: string;
  label: string;
  color: string;
}

export interface StorySectionContent {
  visible: boolean;
  headingPrefix: string;
  headingHighlight: string;
  paragraphs: StoryParagraph[];
  cta: CtaElement;
  stats: StoryStat[];
}

export interface PurposeItem extends BaseElement {
  icon: string;
  color: string;
  pill: string;
  title: string;
  text: string;
}

export interface PurposeSectionContent {
  visible: boolean;
  badge: string;
  title: string;
  items: PurposeItem[];
}

export interface TimelineEvent extends BaseElement {
  year: string;
  event: string;
}

export interface TimelineSectionContent {
  visible: boolean;
  badge: string;
  title: string;
  events: TimelineEvent[];
}

export interface ValueItem extends BaseElement {
  icon: string;
  color: string;
  title: string;
  desc: string;
}

export interface ValuesSectionContent {
  visible: boolean;
  badge: string;
  title: string;
  items: ValueItem[];
}

export interface AboutPageContent {
  pageTitle: string;
  metaDescription: string;
  hero: PageHeroContent;
  story: StorySectionContent;
  purpose: PurposeSectionContent;
  timeline: TimelineSectionContent;
  values: ValuesSectionContent;
}

/* =========================================================
   CAREERS PAGE
========================================================= */

export interface Department {
  id: string;
  label: string;
}

export interface JobContent extends BaseElement {
  slug: string;
  title: string;
  department: string;
  location: string;
  experience: string;
  type: string;
  description: string;
  responsibilities?: string[];
  requirements?: string[];
}

export interface CareersCTA {
  visible: boolean;
  text: string;
  emailLabel: string;
  emailHref: string;
}

export interface CareersPageContent {
  pageTitle: string;
  metaDescription: string;
  hero: PageHeroContent;
  departments: Department[];
  departmentColors: Record<string, string>;
  jobs: JobContent[];
  cta: CareersCTA;
}

/* =========================================================
   CONTACT PAGE
========================================================= */

export interface ContactFormTopic {
  value: string;
  label: string;
}

export interface ContactFormContent {
  visible: boolean;
  title: string;
  successTitle: string;
  successText: string;
  buttonText: string;
  buttonSending: string;
  topics: ContactFormTopic[];
}

export interface ContactInfoItem {
  id: string;
  icon: string;
  title: string;
  details: string[];
  copy: boolean;
}

export interface ContactInfoSection {
  visible: boolean;
  title: string;
  items: ContactInfoItem[];
}

/**
 * Social links used specifically by the Contact page.
 *
 * `icon` is required because the Contact page renders
 * each link through the SocialIcon component.
 */
export interface ContactSocialLink {
  id: string;
  label: string;
  href: string;
  icon: string;
}

export interface ContactSocialSection {
  visible: boolean;
  title: string;
  links: ContactSocialLink[];
}

export interface ContactPageHeroContent extends PageHeroContent {
  badgeIcon: string;
}

export interface ContactPageContent {
  pageTitle: string;
  metaDescription: string;
  hero: ContactPageHeroContent;
  form: ContactFormContent;
  infoSection: ContactInfoSection;
  socialSection: ContactSocialSection;
}

/* =========================================================
   DOMAINS PAGE
========================================================= */

export interface DomainDetailStat {
  n: number;
  suffix: string;
  label: string;
}

export interface DomainDetailItem extends BaseElement {
  title: string;
  tagline: string;
  color: string;
  icon: string;

  /**
   * Multiple statistics can be displayed for a domain.
   */
  stats: DomainDetailStat[];

  description: string;
  stack: string[];
  careersFilter: string;
}

export interface DomainsPageContent {
  pageTitle: string;
  metaDescription: string;
  hero: PageHeroContent;
  domains: DomainDetailItem[];
}

/* =========================================================
   TECHNOLOGIES PAGE
========================================================= */

export interface TechnologyItem {
  name: string;
  desc: string;
}

export interface TechDomainItem extends BaseElement {
  label: string;
  color: string;
  description: string;
  technologies: TechnologyItem[];
}

export interface TechnologiesPageContent {
  pageTitle: string;
  metaDescription: string;
  hero: PageHeroContent;
  cta: CtaElement;
  domains: TechDomainItem[];
}
