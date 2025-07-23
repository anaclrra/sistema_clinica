import { Router } from "express";

const routes = Router();

// Paciente
import createPatientController from "./controllers/patient/createPatientController";
import updatePatientController from "./controllers/patient/updatePatientController";
import findManyPatientsController from "./controllers/patient/findManyPatientsController";
import findPatientController from "./controllers/patient/findPatientController";

// Medico
import createDoctorController from "./controllers/doctor/createDoctorController";
import updateDoctorController from "./controllers/doctor/updateDoctorController";
import findManyDoctorsController from "./controllers/doctor/findManyDoctorsController";
import findDoctorController from "./controllers/doctor/findDoctorController";

// Especialidades
import findManySpecialtiesController from "./controllers/specialties/findManySpecialtiesController";
import findDoctorsBySpecialtiesController from "./controllers/specialties/findDoctorsBySpecialtiesController";

// Consultas
import createAppointmentController from "./controllers/appointment/createAppointmentController";
import findManyAppointmentController from "./controllers/appointment/findManyAppointmentController";
import findAppointmentController from "./controllers/appointment/findAppointmentController";
import cancelAppointmentController from "./controllers/appointment/cancelAppointmentController";
import updateAppointmentController from "./controllers/appointment/updateAppointmentController";
import findAppointmentsPatientController from "./controllers/appointment/findAppointmentsPatientController";
import findAppointmentsDoctorController from "./controllers/appointment/findAppointmentsDoctorController";

// Paciente
routes.post("/patient/create", createPatientController.handle);
routes.get("/patients", findManyPatientsController.handle);
routes.put("/patient/update/:id", updatePatientController.handle);
routes.get("/patient/:id", findPatientController.handle);

// Medico
routes.post("/doctor/create", createDoctorController.handle);
routes.get("/doctors", findManyDoctorsController.handle);
routes.put("/doctor/update/:id", updateDoctorController.handle);
routes.get("/doctor/:id", findDoctorController.handle);

// Especialidades
routes.get("/specialties", findManySpecialtiesController.handle);
routes.get("/specialtie/:id", findDoctorsBySpecialtiesController.handle);

// Consultas
routes.get(
  "/appointments/patient/:id",
  findAppointmentsPatientController.handle
);
routes.get("/appointments/doctor/:id", findAppointmentsDoctorController.handle);

routes.get("/appointments", findManyAppointmentController.handle);
routes.get("/appointment/:id", findAppointmentController.handle);
routes.post("/appointment/create", createAppointmentController.handle);
routes.put("/appointment/update/:id", updateAppointmentController.handle);
routes.patch("/appointment/cancel/:id", cancelAppointmentController.handle);
export default routes;
