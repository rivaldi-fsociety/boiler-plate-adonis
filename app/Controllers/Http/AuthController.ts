import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class AuthController {
    async index({ response }: HttpContextContract){
        response.header('Content-type', 'application/json')
		response.type('application/json')
		let data = {
			title: 'Welcome to Boiler Plate Adonis JS',
			description: 'Adonis JS API Services',
			version: '1.0',
			copyright: 'Muhammad Rivaldi Irawan',
		}
		return response.send(data)
    }

	async register({ request, response }: HttpContextContract){
		let { full_name } = request.only(['full_name'])

		const validationAccountSchema = schema.create({
			full_name: schema.string({ trim: true }, [
				rules.maxLength(30)
			])
		})

		const validatedAccount = await request.validate({
			schema: validationAccountSchema,
			messages: {
				'full_name.required': 'Fullname is Required',
				'full_name.maxLength': 'Fullname length cannot exceed 30 character',
			}
		})

		if (!validatedAccount) {
			return response.send({
				code: '400',
				message: 'test',
				data: {}
			})
		}
	}
}
