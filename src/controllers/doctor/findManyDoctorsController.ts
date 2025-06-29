import { Request, RequestHandler, Response } from "express";
import path from "path";
import findManyDoctorsService from "../../services/doctor/findManyDoctorsService";

const handle: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const response = await findManyDoctorsService.execute();
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
