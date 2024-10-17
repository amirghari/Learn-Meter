import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'
import { createGoalSchema } from "@/app/validationSchema";

const prisma = new PrismaClient()



export async function POST(request: NextRequest) {
    const body = await request.json()
    const validation = createGoalSchema.safeParse(body)
    if (!validation.success) 
        return NextResponse.json(validation.error.errors, {status : 400})

    const repeatedGoal = await prisma.goal.findFirst({
        where: {
            title : body.title,
        }
    });

    const deadlineDate = new Date(body.deadline);

    if (repeatedGoal?.title === body.title) {
        return NextResponse.json({ error: 'Goal with this title already exists' }, { status: 409 });
    }
    else {
        const newGoal =  await prisma.goal.create({
            data: {
                title: body.title,
                description: body.description,
                deadline: deadlineDate
            }
        })
        
        return NextResponse.json(newGoal, {status: 201})
    }
}

export async function GET() {
    try {
      const deadlines = await prisma.goal.findMany({
        select: {
          deadline: true,
        },
      })
      
      const formattedDeadlines = deadlines.map((goal) => goal.deadline)
      return NextResponse.json(formattedDeadlines, {status : 200})
    } catch {
      return NextResponse.json({ error: 'Error fetching deadlines' }, {status:400})
    }
  }
  