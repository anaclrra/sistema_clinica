import { PrismaClient, Patient } from "@prisma/client";

const client = new PrismaClient();

export default {
  async execute(id: string): Promise<any> {
    try {
      const specialtie = await client.specialties.findFirst({
        where: { id },
      });
      if (!specialtie) {
        throw Object.assign(new Error("Falha ao buscar especialidade!"), {
          status: 404,
        });
      }

      const response = await client.specialties.findUnique({
        where: { id },
        select: {
          doctors: true,
        },
      });

      return response;
    } catch (error: any) {
      error.path = "/services/specialties/findDoctorsBySpecialtiesService";
      throw error;
    } finally {
      await client.$disconnect();
    }
  },
};
