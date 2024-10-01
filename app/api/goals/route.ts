import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod'

const createGoalSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(2)
})

export async function POST (request: NextRequest){
    const body = await request.json()
    const validation = createGoalSchema.safeParse(body)
    if (!validation.success) return NextResponse.json(
        validation.error.errors, {status: 400});
        
    

}