import { PrismaClient, Patient } from "@prisma/client";

const client = new PrismaClient();

interface PatientResponse {
  patient: Patient;
}

export default {
  async execute(
    name: string,
    cpf: string,
    dateOfBirth: Date,
    phone: string
  ): Promise<PatientResponse> {
    try {
      const userAlreadyExists = await client.patient.findFirst({
        where: {
          OR: [{ cpf }],
        },
      });

      if (userAlreadyExists) {
        if (cpf === userAlreadyExists.cpf) {
          throw Object.assign(new Error("O usuário já existe!"), {
            status: 409,
          });
        }
      }

      if (cpf.length > 11) {
        throw Object.assign(new Error("CPF excedeu limites de caracteres!"), {
          status: 422,
        });
      }

      const patient = await client.patient.create({
        data: {
          name,
          cpf,
          dateOfBirth,
          phone,
        },
      });

      return { patient: patient };
    } catch (error: any) {
      error.path = "/services/patient/createPatientService";
      throw error;
    } finally {
      await client.$disconnect();
    }
  },
};
