import { z } from "zod";

export const eventSchema = z.object({
    id: z.string().uuid(),
    title: z.string().min(5, "Title must be at least 5 characters").max(100),
    description: z.string().min(10, "Description must be at least 10 characters").max(1000),
    date: z.string().date(), // ISO 8601 date format (YYYY-MM-DD)
    time: z.string().time(), // ISO 8601 time format (HH:mm:ss)
    location: z.string().min(5, "Location must be at least 5 characters").max(200),
  price: z.number().min(0),
    category: z.string().min(1, "Category is required"),
    image: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

// For form validation (without id, since it's generated on server)
export const ValidatedEvent = eventSchema.omit({ id: true });
export type TValidateEvent = z.infer<typeof ValidatedEvent>;

export const EditEventSchema = eventSchema.partial();
export type TEditEventSchema = z.infer<typeof EditEventSchema>;