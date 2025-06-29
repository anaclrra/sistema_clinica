import { Request, RequestHandler, Response } from "express";
import createDoctorService from "../../services/doctor/createDoctorService";
import path from "path";

const handle: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, crm, specialtiesId } = req.body;
    const response = await createDoctorService.execute(
      name,
      crm,
      specialtiesId
    );
    res.status(201).json(response.doctor);
  } catch (error: any) {
    console.error(error);
    if (!error.path) {
      error.path = path.relative(process.cwd(), __filename);
    }
    throw error;
  }
};
export default { handle };
