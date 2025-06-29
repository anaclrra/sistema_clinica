import { Request, RequestHandler, Response } from "express";
import path from "path";
import findDoctorsBySpecialtiesService from "../../services/specialties/findDoctorsBySpecialtiesService";

const handle: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const response = await findDoctorsBySpecialtiesService.execute(id);
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
