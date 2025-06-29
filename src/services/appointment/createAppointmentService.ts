import { PrismaClient, Appointment, Status } from "@prisma/client";

const client = new PrismaClient();

export default {
  async execute(
    dateTime: Date,
    status: Status,
    patientId: string,
    doctorId: string
  ): Promise<Appointment> {
    try {
      // const userAlreadyExists = await client.doctor.findFirst({
      //   where: {
      //     OR: [{ crm }],
      //   },
      // });

      // if (userAlreadyExists) {
      //   if (crm === userAlreadyExists.crm) {
      //     throw Object.assign(new Error("O medico já existe!"), {
      //       status: 409,
      //     });
      //   }
      // }

      const appointment = await client.appointment.create({
        data: {
          dateTime,
          status,
          patientId,
          doctorId,
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
