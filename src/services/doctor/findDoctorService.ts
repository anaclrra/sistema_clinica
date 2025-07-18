import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export default {
  async execute(id: string): Promise<any> {
    try {
      if (typeof id !== "string") {
        throw Object.assign(new Error("Invalid usuario ID"), {
          status: 404,
        });
      }
      const doctor = await client.doctor.findFirst({
        where: { id },
      });
      if (!doctor) {
        throw Object.assign(new Error("Falha ao buscar medico!"), {
          status: 404,
        });
      }

      const response = await client.doctor.findUnique({
        where: { id },
        include: {
          specialties: true,
          appointment: true,
        },
      });

      return response;
    } catch (error: any) {
      error.path = "/services/patient/createPatientService";
      throw error;
    } finally {
      await client.$disconnect();
    }
  },
};
