import { createFileRoute } from "@tanstack/react-router";
import { LegalDocument, type LegalDoc } from "@/components/LegalDocument";
import { canonicalUrl } from "@/lib/seo";

const doc: LegalDoc = {
  eyebrow: "Legal",
  title: "Terms of Service",
  updated: "Effective date: 7 August 2026",
  plain: true,
  intro: [
    'Welcome to Smartytel.com! These Terms of Service ("Terms") govern your use of our website, services, and products (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, do not use our Services.',
  ],
  sections: [
    {
      heading: "Use of Services",
      paragraphs: [
        "You may use the Services only in compliance with these Terms and all applicable laws. You agree not to misuse the Services, interfere with their operation, or access them using unauthorized methods.",
      ],
    },
    {
      heading: "Account Responsibilities",
      paragraphs: [
        "You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You must notify us immediately of any unauthorized use or security breach.",
      ],
    },
    {
      heading: "Payment and Billing",
      paragraphs: [
        "If you purchase any services or products, you agree to provide accurate payment information and authorize us to charge the applicable fees. All fees are non-refundable unless otherwise stated.",
      ],
    },
    {
      heading: "Intellectual Property",
      paragraphs: [
        "All content, trademarks, and materials available through the Services are owned by or licensed to Smartytel and are protected by intellectual property laws. You may not use, reproduce, or distribute any content without prior written consent.",
      ],
    },
    {
      heading: "Termination",
      paragraphs: [
        "We reserve the right to suspend or terminate your access to the Services at any time if you violate these Terms or engage in unlawful activities.",
      ],
    },
    {
      heading: "Limitation of Liability",
      paragraphs: [
        "To the fullest extent permitted by law, Smartytel shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Services.",
      ],
    },
    {
      heading: "Changes to Terms",
      paragraphs: [
        "We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. Your continued use of the Services constitutes acceptance of the revised Terms.",
      ],
    },
    {
      heading: "Governing Law",
      paragraphs: [
        "These Terms are governed by and construed in accordance with the laws of the jurisdiction in which Smartytel operates.",
      ],
    },
    {
      heading: "Contact Us",
      paragraphs: [
        "If you have any questions about these Terms, please contact us at support@smartytel.com.",
      ],
    },
  ],
  footer: [
    "By using Smartytel.com, you acknowledge that you have read, understood, and agreed to these Terms of Service.",
  ],
};

export const Route = createFileRoute("/{-$locale}/terms")({
  head: ({ params }) => ({
    links: [{ rel: "canonical", href: canonicalUrl("/terms", params.locale) }],
    meta: [
      { property: "og:url", content: canonicalUrl("/terms", params.locale) },
      { title: "Terms of Service | Smartytel" },
      {
        name: "description",
        content:
          "Smartytel Terms of Service: use of services, account responsibilities, billing, intellectual property, termination and liability.",
      },
      { property: "og:title", content: "Terms of Service | Smartytel" },
      {
        property: "og:description",
        content:
          "Smartytel Terms of Service: use of services, account responsibilities, billing, intellectual property, termination and liability.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <LegalDocument doc={doc} />,
});
