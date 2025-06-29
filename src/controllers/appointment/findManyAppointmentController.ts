import { Request, RequestHandler, Response } from "express";
import path from "path";
import findManyAppointmentService from "../../services/appointment/findManyAppointmentService";

const handle: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const response = await findManyAppointmentService.execute();
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
