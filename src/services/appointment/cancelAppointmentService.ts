import { PrismaClient, Patient } from "@prisma/client";

const client = new PrismaClient();

export default {
  async execute(id: string): Promise<any> {
    try {
      if (typeof id !== "string") {
        throw Object.assign(new Error("ID de consulta invalida"), {
          status: 404,
        });
      }
      const appointment = await client.appointment.findFirst({
        where: { id },
      });
      if (!appointment) {
        throw Object.assign(new Error("Falha ao buscar consulta!"), {
          status: 404,
        });
      }

      const response = await client.appointment.update({
        where: { id },
        data: {
          status: "CANCELADA",
        },
      });

      return response;
    } catch (error: any) {
      error.path = "/services/appointment/findAppointmentService";
      throw error;
    } finally {
      await client.$disconnect();
    }
  },
};
