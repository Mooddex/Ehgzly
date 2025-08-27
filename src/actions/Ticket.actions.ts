"use server"

import { prisma } from "@/db/prisma";


export async function createTicket(
  prevState: { success: boolean; message: string },
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  try {
    const subject = formData.get("subject") as string
    const description = formData.get("description") as string
    const priorty = formData.get("priority") as string

    if (!subject || !description || !priorty) {
      return {
        success: false,
        message: "Missing fields",
      }
    }

    //  Save ticket to database
    const ticket = await prisma.ticket.create({
      data: {
        subject,
        description,
        priorty,
      },
    })

    return {
      success: true,
      message: `Ticket created successfully with ID ${ticket.id}`,
    }
  } catch (error) {
    console.error("Error creating ticket:", error)
    return {
      success: false,
      message: "Failed to create ticket",
    }
  }
}
