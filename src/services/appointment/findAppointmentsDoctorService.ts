import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export default {
  async execute(doctorId: string): Promise<any[]> {
    if (typeof doctorId !== "string") {
      throw Object.assign(new Error("ID de paciente invalido"), {
        status: 404,
      });
    }
    const doctor = await client.doctor.findFirst({
      where: { id: doctorId },
    });
    if (!doctor) {
      throw Object.assign(new Error("Falha ao buscar medico!"), {
        status: 404,
      });
    }
    try {
      const appointmentsDoctor = await client.appointment.findMany({
        where: { doctorId: doctorId },
        include: {
          doctor: true,
          patient: true,
        },
      });

      return appointmentsDoctor;
    } catch (error: any) {
      error.path = "/services/appointment/findManyAppointmentService";
      throw error;
    } finally {
      await client.$disconnect();
    }
  },
};
