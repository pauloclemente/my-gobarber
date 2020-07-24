import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequestDTO {
	provider_id: string;
	date: Date;
}
@injectable()
class CreateAppointmentService {
	constructor(
		@inject('AppointmentsRepository')
		private appointmentsRepository: IAppointmentsRepository,
	) {}

	public async execute({
		provider_id,
		date,
	}: IRequestDTO): Promise<Appointment> {
		const appointmentDate = startOfHour(date);

		const findInSameDate = await this.appointmentsRepository.findByDate(
			appointmentDate,
		);

		if (findInSameDate) {
			throw new AppError('This Appointment is already booked');
		}

		const appointment = this.appointmentsRepository.create({
			provider_id,
			date: appointmentDate,
		});
		await this.appointmentsRepository.save(appointment);

		return appointment;
	}
}

export default CreateAppointmentService;