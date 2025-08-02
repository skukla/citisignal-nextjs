/**
 * Popular Phones Section Data
 * Content for the popular phones showcase section
 */

export interface PopularPhonesContent {
  header: {
    title: string;
    description: string;
  };
  phoneCount: number;
  viewAllLink: {
    href: string;
    text: string;
  };
}

export const popularPhonesContent: PopularPhonesContent = {
  header: {
    title: "Popular Phones",
    description: "Discover the latest smartphones with exclusive CitiSignal deals. Get the phone you want with flexible payment options."
  },
  phoneCount: 4,
  viewAllLink: {
    href: "/phones",
    text: "View All Phones"
  }
};