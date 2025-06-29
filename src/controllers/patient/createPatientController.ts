import { Request, RequestHandler, Response } from "express";
import createPatientService from "./../../services/patient/createPatientService";
import path from "path";

const handle: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, cpf, dateOfBirth, phone } = req.body;
    const response = await createPatientService.execute(
      name,
      cpf,
      dateOfBirth,
      phone
    );
    res.status(201).json(response.patient);
  } catch (error: any) {
    console.error(error);
    if (!error.path) {
      error.path = path.relative(process.cwd(), __filename);
    }
    throw error;
  }
};
export default { handle };
