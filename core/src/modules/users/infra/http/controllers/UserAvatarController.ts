import { container } from 'tsyringe';

import { Request, Response } from 'express';
import UpdateUserAvatarService from '@modules/users/services/UpadateUserAvatarService';

export default class UserAvatarController {
	public async update(request: Request, response: Response): Promise<Response> {
		const updateUserAvatar = container.resolve(UpdateUserAvatarService);

		const user = await updateUserAvatar.execute({
			user_id: request.user.id,
			avatar_filename: request.file.filename,
		});

		delete user.password;
		return response.json(user);
	}
}