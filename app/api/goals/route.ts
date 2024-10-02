import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const createGoalSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(5)
})

export async function POST(request: NextRequest) {
    const body = await request.json()
    const validation = createGoalSchema.safeParse(body)
    if (!validation.success) 
        return NextResponse.json(validation.error.errors, {status : 400})

    // const repeatedGoal = await prisma.goal.findFirst({
    //     where: {
    //         title: body.title,
    //         description: body.description
    //     }
    // });

    // if (repeatedGoal.title === body.title) {
    //     return NextResponse.json({ error: 'Goal with this title already exists' }, { status: 409 });
    // }

    const newGoal =  await prisma.goal.create({
        data: {
            title: body.title,
            description: body.description
        }
    })
    
    return NextResponse.json(newGoal, {status: 201})
}