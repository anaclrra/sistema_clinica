import { Request, RequestHandler, Response } from "express";
import path from "path";
import updatePatientService from "../../services/patient/updatePatientService";

const handle: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, cpf, dateOfBirth, phone } = req.body;
    const response = await updatePatientService.execute(
      id,
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
