import { Request, RequestHandler, Response } from "express";
import path from "path";
import updateDoctorService from "../../services/doctor/updateDoctorService";

const handle: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, crm, specialtiesId } = req.body;
    const response = await updateDoctorService.execute(
      id,
      name,
      crm,
      specialtiesId
    );
    res.status(201).json(response);
  } catch (error: any) {
    console.error(error);
    if (!error.path) {
      error.path = path.relative(process.cwd(), __filename);
    }
    throw error;
  }
};
export default { handle };
