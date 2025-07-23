import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export default {
  async execute(patientId: string): Promise<any[]> {
    if (typeof patientId !== "string") {
      throw Object.assign(new Error("ID de paciente invalido"), {
        status: 404,
      });
    }
    const patient = await client.patient.findFirst({
      where: { id: patientId },
    });
    if (!patient) {
      throw Object.assign(new Error("Falha ao buscar medico!"), {
        status: 404,
      });
    }
    try {
      const appointmentsPatient = await client.appointment.findMany({
        where: { patientId: patientId },
        include: {
          doctor: true,
          patient: true,
        },
      });

      return appointmentsPatient;
    } catch (error: any) {
      error.path = "/services/appointment/findManyAppointmentService";
      throw error;
    } finally {
      await client.$disconnect();
    }
  },
};
