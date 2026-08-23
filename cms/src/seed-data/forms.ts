import { richText } from "./richText";

/**
 * Contact and demo-request forms rendered by the frontend's PayloadForm
 * adapter (src/components/PayloadForm.tsx). Kept to the field types that
 * page actually needs — see the formBuilderPlugin config in payload.config.ts
 * for which field types are enabled at all.
 */
export const forms = [
  {
    title: "Contact",
    formType: "contact",
    submitButtonLabel: "Send message",
    confirmationType: "message" as const,
    confirmationMessage: richText("Thanks — we'll be in touch shortly."),
    fields: [
      { blockType: "text" as const, name: "name", label: "Name", required: true },
      { blockType: "email" as const, name: "email", label: "Email", required: true },
      { blockType: "textarea" as const, name: "message", label: "Message", required: true },
    ],
    emails: [],
  },
  {
    title: "Demo request",
    formType: "demo",
    submitButtonLabel: "Request a demo",
    confirmationType: "message" as const,
    confirmationMessage: richText("Thanks — we'll reach out to schedule your demo."),
    fields: [
      { blockType: "text" as const, name: "name", label: "Name", required: true },
      { blockType: "email" as const, name: "email", label: "Work email", required: true },
      { blockType: "text" as const, name: "company", label: "Company", required: false },
      {
        blockType: "select" as const,
        name: "teamSize",
        label: "Team size",
        required: false,
        options: [
          { label: "1-10", value: "1-10" },
          { label: "11-50", value: "11-50" },
          { label: "51-200", value: "51-200" },
          { label: "200+", value: "200+" },
        ],
      },
    ],
    emails: [],
  },
];
