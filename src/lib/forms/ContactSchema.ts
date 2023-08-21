import * as z from "zod";

const ContactFormSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "Firstname must be at least 2 characters",
    })
    .max(15, {
      message: "Firstname not be longer than 15 characters",
    }),
  lastName: z
    .string()
    .min(2, {
      message: "Lastname must be at least 2 characters",
    })
    .max(15, {
      message: "Lastname not be longer than 15 characters",
    }),
  phones: z.array(
    z
      .object({
        number: z
          .string()
          .min(1, {
            message: "Phone must be at least 1 number",
          })
          .max(15, {
            message: "Phone not be longer than 15 number",
          })
          .refine(
            (value) => {
              const phoneNumberPattern = /^0|62\d{9,12}$/;
              return phoneNumberPattern.test(value);
            },
            {
              message: "Invalid phone number format",
            }
          ),
      })
      .optional()
  ),
});

const PhoneContactSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, {
      message: "Phone must be at least 1 number",
    })
    .max(15, {
      message: "Phone not be longer than 15 number",
    })
    .refine(
      (value) => {
        const phoneNumberPattern = /^0|62\d{9,12}$/;
        return phoneNumberPattern.test(value);
      },
      {
        message: "Invalid phone number format",
      }
    ),
});

const EditContactFormSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "Firstname must be at least 2 characters",
    })
    .max(15, {
      message: "Firstname not be longer than 15 characters",
    }),
  lastName: z
    .string()
    .min(2, {
      message: "Lastname must be at least 2 characters",
    })
    .max(15, {
      message: "Lastname not be longer than 15 characters",
    }),
});

export type ContactFormValues = z.infer<typeof ContactFormSchema>;
export type PhoneContactValues = z.infer<typeof PhoneContactSchema>;
export type EditContactFormValues = z.infer<typeof EditContactFormSchema>;

export { ContactFormSchema, PhoneContactSchema, EditContactFormSchema };
