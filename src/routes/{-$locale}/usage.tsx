import { createFileRoute } from "@tanstack/react-router";
import { LegalDocument, type LegalDoc } from "@/components/LegalDocument";
import { canonicalUrl } from "@/lib/seo";

const doc: LegalDoc = {
  eyebrow: "Legal",
  title: "Usage Policy for Smartytel.com",
  updated: "Effective date: 7 August 2026",
  plain: true,
  intro: [
    "Welcome to Smartytel.com. This Usage Policy outlines the terms and conditions governing your use of our services. By accessing or using Smartytel.com, you agree to comply with this policy. Please read it carefully as it contains important legal information regarding your rights and obligations.",
  ],
  sections: [
    {
      heading: "Scope of Policy",
      paragraphs: [
        "This policy applies to all users of Smartytel.com, including but not limited to registered users, visitors, and any individuals or entities accessing our services. It governs the use of all content, tools, and features provided by Smartytel.com.",
      ],
    },
    {
      heading: "Permitted Use",
      paragraphs: [
        "You are permitted to use Smartytel.com for lawful purposes only. You agree not to use our services for:",
      ],
      items: [
        { body: "Engaging in any illegal or unauthorized activities." },
        { body: "Distributing harmful, obscene, or offensive materials." },
        {
          body: "Violating the rights of others, including intellectual property rights and privacy rights.",
        },
      ],
    },
    {
      heading: "Account Responsibility",
      paragraphs: [
        "If you create an account on Smartytel.com, you are responsible for maintaining the confidentiality of your account information and for all activities conducted under your account. Notify us immediately of any unauthorized access or use.",
      ],
    },
    {
      heading: "Prohibited Activities",
      paragraphs: ["You agree not to:"],
      items: [
        {
          body: "Use automated tools (e.g., bots, scrapers) to access or interact with our services.",
        },
        { body: "Introduce malware, viruses, or any other harmful software." },
        { body: "Interfere with the proper functioning of the platform." },
      ],
    },
    {
      heading: "Assumptions and Disclaimers",
      items: [
        {
          term: "Service availability",
          body: "Smartytel.com aims to provide uninterrupted service but does not guarantee continuous or error-free access. We reserve the right to suspend or terminate services for maintenance, security, or other operational reasons.",
        },
        {
          term: "Accuracy of information",
          body: "While we strive to provide accurate and up-to-date information, Smartytel.com does not warrant the completeness or accuracy of content provided on the platform. Use the information at your own risk.",
        },
        {
          term: "Third-party content",
          body: "The platform may contain links to third-party websites or services. Smartytel.com is not responsible for the content, policies, or practices of third-party entities.",
        },
      ],
    },
    {
      heading: "User Responsibilities",
      items: [
        {
          term: "Compliance with laws",
          body: "Users must comply with all applicable laws and regulations while using Smartytel.com. This includes, but is not limited to, intellectual property laws, privacy laws, and anti-fraud regulations.",
        },
        {
          term: "Reporting violations",
          body: "If you encounter any misuse or violations of this policy, please report it to our support team immediately at support@smartytel.com.",
        },
      ],
    },
    {
      heading: "Changes to the Policy",
      paragraphs: [
        "Smartytel.com reserves the right to update or modify this Usage Policy at any time. Changes will be communicated through appropriate channels, and continued use of our services after such changes constitutes your acceptance of the revised policy.",
      ],
    },
    {
      heading: "Contact Information",
      paragraphs: [
        "For any questions or concerns regarding this Usage Policy, please contact us at support@smartytel.com.",
      ],
    },
  ],
  footer: [
    "By using Smartytel.com, you acknowledge that you have read, understood, and agreed to this Usage Policy.",
  ],
};

export const Route = createFileRoute("/{-$locale}/usage")({
  head: ({ params }) => ({
    links: [{ rel: "canonical", href: canonicalUrl("/usage", params.locale) }],
    meta: [
      { property: "og:url", content: canonicalUrl("/usage", params.locale) },
      { title: "Usage Policy | Smartytel" },
      {
        name: "description",
        content:
          "Smartytel usage policy: permitted use, account responsibility, prohibited activities, disclaimers and user responsibilities.",
      },
      { property: "og:title", content: "Usage Policy | Smartytel" },
      {
        property: "og:description",
        content:
          "Smartytel usage policy: permitted use, account responsibility, prohibited activities, disclaimers and user responsibilities.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <LegalDocument doc={doc} />,
});
