import { Request, RequestHandler, Response } from "express";
import path from "path";
import createAppointmentController from "../../services/appointment/createAppointmentService";

const handle: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { dateTime, status, patientId, doctorId } = req.body;
    const response = await createAppointmentController.execute(
      dateTime,
      patientId,
      doctorId
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
