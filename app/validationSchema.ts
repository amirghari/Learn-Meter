import { z } from 'zod'

export const createGoalSchema = z.object({
    title: z.string().min(1, "Title is required!").max(255),
    description: z.string().min(5, "Description must be at least 5 Characters!"),
    deadline: z.string().refine((value) => {
        const date = new Date(value);
        return !isNaN(date.getTime()); 
    }, {
        message: "Invalid date format",
    }),
})

const statusEnum = ["JUST_SET", "IN_PROGRESS", "DONE", "POSTPONED"] as const

export const updateGoalSchema = z.object({
    title: z.string().min(1, "Title is required!").max(255),
    description: z.string().min(5, "Description must be at least 5 Characters!"),
    deadline: z.string().refine((value) => {
        const date = new Date(value);
        return !isNaN(date.getTime()); 
    }, {
        message: "Invalid date format",
    }),
    status: z.enum(statusEnum, {
        errorMap: () => ({ message: "Invalid status value" }),
    })
})