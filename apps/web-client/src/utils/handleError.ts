import type {
  AnyFormApi,
  AnyFieldMetaBase,
} from "@tanstack/form-core";
import { toast } from "sonner";

type FieldError = { message: string };
type FieldErrorMap = Record<string, FieldError[]>;

export default function handleFormError(
  form: AnyFormApi,
  error: unknown
) {
  const shape = (error as any)?.shape;

  if (shape?.fieldErrors) {
    const fieldErrors: FieldErrorMap = shape.fieldErrors;

    Object.entries(fieldErrors).forEach(([field, messages]) => {
      if (!Array.isArray(messages)) return;

      form.setFieldMeta(field as string, (prev: AnyFieldMetaBase) => ({
        ...prev,
        errorMap: {
          ...prev.errorMap,
          onServer: messages.map((message) => ({ message: String(message) })),
        },
      }));
    });
  } else {
    const formErrors = shape?.formErrors as string[] | undefined;
    toast.error(formErrors?.[0] ?? (error as any)?.message ?? "Unknown error");
  }
}
