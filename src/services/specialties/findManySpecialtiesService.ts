import { PrismaClient, Patient } from "@prisma/client";

const client = new PrismaClient();

export default {
  async execute(): Promise<any[]> {
    try {
      const specialties = await client.specialties.findMany();

      return specialties;
    } catch (error: any) {
      error.path = "/services/specialties/findManySpecialtiesService";
      throw error;
    } finally {
      await client.$disconnect();
    }
  },
};
