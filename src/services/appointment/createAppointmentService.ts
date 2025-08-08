import { PrismaClient, Appointment, Status } from "@prisma/client";

const client = new PrismaClient();

export default {
  async execute(
    dateTime: Date,
    patientId: string,
    doctorId: string
  ): Promise<Appointment> {
    try {
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

      const appointment = await client.appointment.create({
        data: {
          dateTime,
          status: "AGENDADA",
          patientId,
          doctorId,
        },
        select: {
          id: true,
          patientId: true,
          doctorId: true,
          dateTime: true,
          status: true,
          doctor: true,
          patient: true,
        },
      });

      return appointment;
    } catch (error: any) {
      error.path = "/services/appointment/createAppointmentService";
      throw error;
    } finally {
      await client.$disconnect();
    }
  },
};
