import { NextRequest, NextResponse } from "next/server";
import { createGoalSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id } = await params
    const goalId = parseInt(id);

    if (isNaN(goalId)) {
        return NextResponse.json({ error: "Invalid goal ID" }, { status: 400 });
    }

    const validation = createGoalSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const deadlineDate = new Date(body.deadline);

    const goal = await prisma.goal.findUnique({
        where: {
            id: goalId,
        },
    });

    if (!goal) {
        return NextResponse.json({ error: "Goal not found" }, { status: 404 });
    }

    const updatedGoal = await prisma.goal.update({
        where: {
            id: goalId,
        },
        data: {
            title: body.title,
            description: body.description,
            deadline: deadlineDate,
            status: body.status
        },
    });

    return NextResponse.json(updatedGoal, { status: 200 });
}

export async function DELETE (request: NextRequest, { params }: { params: { id: string }}) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }


   const { id } = await params 
   const goal = await prisma.goal.findUnique({
        where: {
            id : parseInt(id)
        }
    })

    if(!goal)
        return NextResponse.json({error : 'The goal is not found !'})
    await prisma.goal.delete({
        where: {
            id: goal.id
        }
    })

    return NextResponse.json({data : "Deleted successfully"},{status : 200})

}