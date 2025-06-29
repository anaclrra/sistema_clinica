import { PrismaClient, Patient } from "@prisma/client";

const client = new PrismaClient();

export default {
  async execute(): Promise<any[]> {
    try {
      const doctors = await client.doctor.findMany({
        include: {
          specialties: true,
          appointment: true,
        },
      });

      return doctors;
    } catch (error: any) {
      error.path = "/services/patient/createPatientService";
      throw error;
    } finally {
      await client.$disconnect();
    }
  },
};
