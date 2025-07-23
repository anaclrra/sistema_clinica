import { Request, RequestHandler, Response } from "express";
import path from "path";
import findAppointmentsPatientService from "../../services/appointment/findAppointmentsPatientService";
import findAppointmentsDoctorService from "../../services/appointment/findAppointmentsDoctorService";

const handle: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const response = await findAppointmentsDoctorService.execute(id);
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
