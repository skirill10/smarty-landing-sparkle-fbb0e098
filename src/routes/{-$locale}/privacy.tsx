import { createFileRoute } from "@tanstack/react-router";
import { LegalDocument, type LegalDoc } from "@/components/LegalDocument";
import { canonicalUrl } from "@/lib/seo";

const doc: LegalDoc = {
  eyebrow: "Legal",
  title: "Privacy Policy for Smartytel.com",
  updated: "Effective date: 7 August 2026",
  intro: [
    "At Smartytel, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your information when you use our services. By using Smartytel.com, you agree to the terms of this Privacy Policy.",
  ],
  sections: [
    {
      heading: "Information We Collect",
      paragraphs: [
        "We collect different types of information to provide and improve our services, including:",
      ],
      items: [
        {
          term: "Personal Information",
          body: "Such as your name, email address, phone number, and payment information, which you provide when you create an account, subscribe to our services, or contact us.",
        },
        {
          term: "Usage Data",
          body: "Information about how you interact with our services, including IP addresses, browser type, device information, and pages visited.",
        },
        {
          term: "Cookies and Tracking Technology",
          body: "We use cookies and similar tracking technologies to enhance your experience on our website.",
        },
      ],
    },
    {
      heading: "How We Use Your Information",
      paragraphs: ["Smartytel uses the information we collect to:"],
      items: [
        { body: "Provide and maintain our services" },
        { body: "Process payments and manage your account" },
        { body: "Send service updates, promotional material, and other communications" },
        { body: "Analyze user behavior to improve our offerings" },
        { body: "Ensure compliance with legal obligations" },
      ],
    },
    {
      heading: "Sharing Your Information",
      paragraphs: [
        "We do not sell your personal information. However, we may share your data in the following circumstances:",
      ],
      items: [
        {
          term: "With Service Providers",
          body: "To help us deliver our services, such as payment processors and hosting providers.",
        },
        {
          term: "For Legal Compliance",
          body: "When required by law or to protect the rights, safety, and property of Smartytel or others.",
        },
        {
          term: "Business Transfers",
          body: "In the event of a merger, acquisition, or sale of Smartytel's assets.",
        },
      ],
    },
    {
      heading: "Data Security",
      paragraphs: [
        "We implement industry-standard security measures to protect your information. However, no method of transmission over the Internet or electronic storage is completely secure, and we cannot guarantee absolute security.",
      ],
    },
    {
      heading: "Your Privacy Choices",
      paragraphs: ["You have the right to:"],
      items: [
        { body: "Access, update, or delete your personal information" },
        { body: "Opt out of receiving promotional communications" },
        { body: "Disable cookies through your browser settings" },
        { body: "To exercise these rights, please contact us at support@smartytel.com." },
      ],
    },
    {
      heading: "Third-Party Links",
      paragraphs: [
        "Our website may contain links to third-party websites. We are not responsible for the privacy practices of these websites and encourage you to review their privacy policies.",
      ],
    },
    {
      heading: "Changes to This Privacy Policy",
      paragraphs: [
        "We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated effective date. Your continued use of Smartytel.com after changes are made constitutes your acceptance of the revised policy.",
      ],
    },
    {
      heading: "Contact Us",
      paragraphs: [
        "If you have any questions about this Privacy Policy, please contact us at:",
        "Smartytel — support@smartytel.com",
      ],
    },
  ],
  footer: ["Thank you for using Smartytel.com. Your privacy is important to us."],
};

export const Route = createFileRoute("/{-$locale}/privacy")({
  head: ({ params }) => ({
    links: [{ rel: "canonical", href: canonicalUrl("/privacy", params.locale) }],
    meta: [
      { property: "og:url", content: canonicalUrl("/privacy", params.locale) },
      { title: "Privacy Policy | Smartytel" },
      {
        name: "description",
        content:
          "How Smartytel collects, uses, shares and safeguards your information, and the privacy choices available to you.",
      },
      { property: "og:title", content: "Privacy Policy | Smartytel" },
      {
        property: "og:description",
        content:
          "How Smartytel collects, uses, shares and safeguards your information, and the privacy choices available to you.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <LegalDocument doc={doc} slug="privacy" />,
});
