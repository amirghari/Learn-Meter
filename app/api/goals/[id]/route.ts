import { NextRequest, NextResponse } from "next/server";
import { createGoalSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";

export async function PATCH (request: NextRequest, {params} : { params :{ id : string }}) {
    const body = await request.json()
    

   const validation =  createGoalSchema.safeParse(body)
   if (!validation) return NextResponse.json(validation.error.errors, {status : 400})

    const deadlineDate = new Date(body.deadline);

    const goal = prisma.goal.findUnique({
        where:{
            id: parseInt(params.id)
        }
    })
    if (!goal) return NextResponse.json({error : "Goal is not found"} , {status : 404}) 
   const updatedGoal = await prisma.goal.update({
    where: {
        id : parseInt(params.id)
    },
    data: {
        title: body.title,
        description: body.description,
        // status: body.status,
        deadline: deadlineDate,
      }
   })
   return NextResponse.json(updatedGoal, {status: 200})
}