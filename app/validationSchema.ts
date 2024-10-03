import { z } from 'zod'
export const createGoalSchema = z.object({
    title: z.string().min(1, "Title is required!").max(255),
    description: z.string().min(5, "Description must be at least 5 Characters!"),
    // deadline: z.date()
})