import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

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
}
