import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cmsEnabled, fetchForm, submitForm } from "@/lib/cms";
import { useT } from "@/i18n/LocaleProvider";

/**
 * Adapter that renders a @payloadcms/plugin-form-builder form through the
 * site's existing shadcn form primitives. Payload owns the field
 * definitions and submission storage; this component owns nothing but the
 * mapping between the two.
 */

type FieldBlock = {
  blockType: "text" | "textarea" | "select" | "radio" | "email" | "checkbox";
  name: string;
  label?: string;
  required?: boolean;
  defaultValue?: string | boolean;
  options?: { label: string; value: string }[];
};

type PayloadFormDoc = {
  id: string;
  title: string;
  submitButtonLabel?: string;
  confirmationType: "message" | "redirect";
  confirmationMessage?: unknown;
  redirect?: { url?: string };
  fields: FieldBlock[];
};

function schemaForField(field: FieldBlock) {
  switch (field.blockType) {
    case "email": {
      const f = z.string().email();
      return field.required ? f : f.optional().or(z.literal(""));
    }
    case "checkbox":
      return field.required
        ? z.boolean().refine((v) => v === true, { message: "Required" })
        : z.boolean().optional();
    default: {
      const f = z.string();
      return field.required ? f.min(1, "Required") : f.optional();
    }
  }
}

function buildSchema(fields: FieldBlock[]) {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const field of fields) {
    shape[field.name] = schemaForField(field);
  }
  return z.object(shape);
}

function defaultsForFields(fields: FieldBlock[]) {
  const defaults: Record<string, unknown> = {};
  for (const field of fields) {
    defaults[field.name] =
      field.blockType === "checkbox" ? Boolean(field.defaultValue) : (field.defaultValue ?? "");
  }
  return defaults;
}

export function PayloadForm({ formType }: { formType: "contact" | "demo" }) {
  const t = useT();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const { data: form } = useQuery({
    queryKey: ["cms-form", formType],
    queryFn: () => fetchForm<PayloadFormDoc>(formType),
    enabled: cmsEnabled,
    staleTime: 60_000,
  });

  const fields = useMemo(() => form?.fields ?? [], [form]);
  const schema = useMemo(() => buildSchema(fields), [fields]);
  const rhf = useForm<Record<string, unknown>>({
    resolver: zodResolver(schema),
    defaultValues: defaultsForFields(fields),
  });

  if (!cmsEnabled || !form) return null;

  async function onSubmit(values: Record<string, unknown>) {
    setStatus("submitting");
    const submissionData = fields.map((field) => ({
      field: field.name,
      value: values[field.name],
    }));
    const ok = await submitForm(form!.id, submissionData);
    if (!ok) {
      setStatus("error");
      return;
    }
    setStatus("success");
    if (form!.confirmationType === "redirect" && form!.redirect?.url) {
      window.location.href = form!.redirect.url;
    }
  }

  if (status === "success" && form.confirmationType === "message") {
    return (
      <div className="rounded-2xl border border-border bg-card p-7 text-sm font-medium">
        {t("Thanks — we'll be in touch shortly.")}
      </div>
    );
  }

  return (
    <Form {...rhf}>
      <form onSubmit={rhf.handleSubmit(onSubmit)} className="grid gap-5">
        {fields.map((field) => (
          <FormField
            key={field.name}
            control={rhf.control}
            name={field.name}
            render={({ field: rhfField }) => (
              <FormItem>
                {field.blockType !== "checkbox" && field.label && (
                  <FormLabel>{t(field.label)}</FormLabel>
                )}
                <FormControl>
                  {field.blockType === "textarea" ? (
                    <Textarea {...rhfField} value={(rhfField.value as string) ?? ""} />
                  ) : field.blockType === "select" ? (
                    <Select onValueChange={rhfField.onChange} value={rhfField.value as string}>
                      <SelectTrigger>
                        <SelectValue placeholder={t("Select…")} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {t(option.label)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : field.blockType === "radio" ? (
                    <RadioGroup onValueChange={rhfField.onChange} value={rhfField.value as string}>
                      {field.options?.map((option) => (
                        <label key={option.value} className="flex items-center gap-2 text-sm">
                          <RadioGroupItem value={option.value} />
                          {t(option.label)}
                        </label>
                      ))}
                    </RadioGroup>
                  ) : field.blockType === "checkbox" ? (
                    <label className="flex items-center gap-2 text-sm">
                      <Checkbox
                        checked={Boolean(rhfField.value)}
                        onCheckedChange={rhfField.onChange}
                      />
                      {field.label && t(field.label)}
                    </label>
                  ) : (
                    <Input
                      type={field.blockType === "email" ? "email" : "text"}
                      {...rhfField}
                      value={(rhfField.value as string) ?? ""}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        {status === "error" && (
          <p className="text-sm font-medium text-destructive">
            {t("Something went wrong — please try again.")}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground transition-all hover:-translate-y-0.5 hover:bg-dark hover:text-dark-foreground disabled:pointer-events-none disabled:opacity-50"
        >
          {t(form.submitButtonLabel || "Submit")}
        </button>
      </form>
    </Form>
  );
}
