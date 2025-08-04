import { PrismaClient, Appointment, Status } from "@prisma/client";

const client = new PrismaClient();

export default {
  async execute(
    id: string,
    dateTime: Date,
    status: Status,
    patientId: string,
    doctorId: string
  ): Promise<Appointment> {
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
      const dateTimeConvert = new Date(dateTime);

      // Define o intervalo mínimo entre consultas
      const MIN_INTERVAL_MINUTES = 15;

      const startInterval = new Date(
        dateTimeConvert.getTime() - MIN_INTERVAL_MINUTES * 60000
      );
      const endInterval = new Date(
        dateTimeConvert.getTime() + MIN_INTERVAL_MINUTES * 60000
      );

      const hasConflict = await client.appointment.findFirst({
        where: {
          doctorId,
          status: "AGENDADA",
          dateTime: {
            gte: startInterval,
            lte: endInterval,
          },
          NOT: {
            id,
          },
        },
      });

      if (hasConflict) {
        throw Object.assign(
          new Error(
            `Conflito: Médico já possui consulta próxima a esse horário.`
          ),
          {
            status: 409,
          }
        );
      }

      const response = await client.appointment.update({
        where: { id },
        data: {
          dateTime,
          status,
          patientId,
          doctorId,
        },
      });

      return response;
    } catch (error: any) {
      error.path = "/services/appointment/createAppointmentService";
      throw error;
    } finally {
      await client.$disconnect();
    }
  },
};
