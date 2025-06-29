import { PrismaClient, Patient, Doctor } from "@prisma/client";

const client = new PrismaClient();

interface DoctorResponse {
  doctor: Doctor;
}

export default {
  async execute(
    name: string,
    crm: string,
    specialtiesId: string
  ): Promise<DoctorResponse> {
    try {
      const userAlreadyExists = await client.doctor.findFirst({
        where: {
          OR: [{ crm }],
        },
      });

      if (userAlreadyExists) {
        if (crm === userAlreadyExists.crm) {
          throw Object.assign(new Error("O medico já existe!"), {
            status: 409,
          });
        }
      }

      const doctor = await client.doctor.create({
        data: {
          name,
          crm,
          specialtiesId,
        },
      });

      return { doctor: doctor };
    } catch (error: any) {
      error.path = "/services/patient/createPatientService";
      throw error;
    } finally {
      await client.$disconnect();
    }
  },
};
