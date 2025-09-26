// Demo usage of WhatWeOfferCard component
import WhatWeOfferCard from "./WhatWeOfferCard";

// Example data for Contract Packing services (from your website structure)
const contractPackingServices = [
  {
    text: "Custom ingredient sourcing & blending to your exact formulas",
  },
  {
    text: "Bulk, retail, and trial-size filling",
  },
  {
    text: "White label & private label services",
  },
  {
    text: "Flexible packaging options: bottles, jars, pouches, tubes, pumps, sprays, buckets",
  },
  {
    text: "Small batch production & no minimum order requirement (ideal for startups)",
  },
  {
    text: "Label design, packaging sourcing, and eco-friendly packaging options",
  },
  {
    text: "Compliance, quality control & documentation (safety, regulatory)",
  },
  {
    text: "Liquid, cream, powder, or gel filling as required",
  },
];

// Usage Examples:

// Default split layout with image
export const DefaultCard = () => (
  <WhatWeOfferCard
    title="Professional Contract Packing"
    subtitle="Expert packaging solutions tailored to your business requirements"
    items={contractPackingServices}
    cardStyle="default"
    layout="split"
    showCTA={true}
    ctaText="Learn More"
    ctaLink="/contact"
  />
);

// Gradient style stacked layout
export const GradientStacked = () => (
  <WhatWeOfferCard
    title="Our Capabilities"
    subtitle="Professional solutions tailored to your business needs"
    items={contractPackingServices}
    cardStyle="gradient"
    layout="stacked"
    image="/images/packaging-example.jpg"
    showCTA={true}
    ctaText="Get Started"
    ctaLink="/services"
  />
);

// Bordered style with custom image
export const BorderedWithImage = () => (
  <WhatWeOfferCard
    title="Service Overview"
    subtitle="Comprehensive contract packing solutions"
    items={contractPackingServices}
    cardStyle="bordered"
    layout="split"
    image="/images/facility.jpg"
    showCTA={true}
    ctaText="Request Quote"
    ctaLink="/quote"
  />
);

// Minimal version without CTA
export const MinimalCard = () => (
  <WhatWeOfferCard
    title="Core Services"
    items={contractPackingServices.slice(0, 4)} // Only show first 4 items
    layout="split"
    showCTA={false}
  />
);
