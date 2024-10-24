import { Account } from './../../../node_modules/next-auth/core/types.d';
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'
import { createGoalSchema } from "@/app/validationSchema";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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
                deadline: deadlineDate,
                userEmail: session.user.email
            }
        })
        
        return NextResponse.json(newGoal, {status: 201})
    }
}

export async function GET() {
  const session = await getServerSession(authOptions)

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
      const deadlines = await prisma.goal.findMany({
        where: {
          userEmail: session.user.email,
        },
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
  