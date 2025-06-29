import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export default {
  async execute(): Promise<any[]> {
    // retorno
    try {
      const patients = await client.appointment.findMany({
        include: {
          doctor: true,
          patient: true,
        },
      });

      return patients;
    } catch (error: any) {
      error.path = "/services/appointment/findManyAppointmentService";
      throw error;
    } finally {
      await client.$disconnect();
    }
  },
};
