import { Icons } from "@/components/shared/icons";
import { Subscription } from "@lemonsqueezy/lemonsqueezy.js";
import { Bookmark, Collection } from "@prisma/client";

export type Icon = keyof typeof Icons;

export type NavItem = {
  title: string;
  href: string;
};
export type MainNavItem = {
  icon: Icon;
} & NavItem;

export type PostFilter = {
  title: string;
  href: string;
  value?: string;
};

export type AppConfig = {
  mainNav: MainNavItem[];
  settingsNav: NavItem[];
  filters: {
    postsFilter: PostFilter[];
  };
};
export type NewsletterProps = {
  title: string;
  published: string;
  author: string;
  articleURL: string;
  subId: string;
};

export type PrivacySection = {
  title?: string;
  content: string;
};
export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    home: string;
    twitter: string;
    posts: string;
    login: string;
    signup: string;
    app: string;
    github: string;
    help: string;
    privacy: string;
    demo: string;
  };
  privacy: {
    lastUpdated: string;
    sections: PrivacySection[];
  };
};

export type UserPageConfig = {
  pages: MainNavItem[];
};

export type Feature = {
  title: string;
  icon: Icon;
  description: string;
};

export type PlanFeature = {
  name: string;
  icon: Icon;
};
export type Plan = {
  title: "Free" | "Pro";
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  maxPostLimit: number | "∞";
  features: PlanFeature[];
  action: {
    text: string;
    link: string;
  };
};

export type Link = {
  name: string;
  href: string;
  icon: Icon;
};

export type Preview = {
  title: string;
  icon?: Icon;
  image: string;
};
export type MarketingConfig = {
  headline: string;
  features: Feature[];
  plans: Plan[];
  links: Link[];
  previews: Preview[];
};

export type UserSubscriptionPlan = Plan &
  Pick<User, "lsId"> & {
    lsCurrentPeriodEnd: number | null;
    isPro: boolean;
    status?: Subscription["data"]["attributes"]["status"];
  };

export type social = {
  platform: "Github" | "Linkedin" | "Twitter" | "Dribbble" | "Email";
  username: string | null;
  url: string;
  icon: Icon;
};

export type Period = keyof Plan["price"];

export type DomainStatus =
  | "Unknown Error"
  | "Invalid Configuration"
  | "Valid Configuration"
  | "Domain not found"
  | "Pending Verification";

export type BookmarkWithCollection = Bookmark & {
  collection: Collection | null;
};
