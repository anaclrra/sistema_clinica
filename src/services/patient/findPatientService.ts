import { PrismaClient, Patient } from "@prisma/client";

const client = new PrismaClient();

interface PatientResponse {
  patient: Patient;
}

export default {
  async execute(id: string): Promise<any> {
    try {
      if (typeof id !== "string") {
        throw Object.assign(new Error("Invalid usuario ID"), {
          status: 404,
        });
      }
      const patient = await client.patient.findFirst({
        where: { id },
      });
      if (!patient) {
        throw Object.assign(new Error("Falha ao buscar paciente!"), {
          status: 404,
        });
      }

      const response = await client.patient.findUnique({
        where: { id },
        include: {
          appointment: true,
        },
      });

      return { patient: response };
    } catch (error: any) {
      error.path = "/services/patient/createPatientService";
      throw error;
    } finally {
      await client.$disconnect();
    }
  },
};
