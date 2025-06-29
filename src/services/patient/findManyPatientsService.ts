import { PrismaClient, Patient } from "@prisma/client";

const client = new PrismaClient();

export default {
  async execute(): Promise<any[]> {
    try {
      const patients = await client.patient.findMany({
        include: {
          appointment: true,
        },
      });

      return patients;
    } catch (error: any) {
      error.path = "/services/patient/createPatientService";
      throw error;
    } finally {
      await client.$disconnect();
    }
  },
};
