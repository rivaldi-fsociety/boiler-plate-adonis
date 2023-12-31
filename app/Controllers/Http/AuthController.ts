import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
import Account from 'App/Models/Account'
import User from 'App/Models/User'

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
		try {
            const validationAccountSchema = schema.create({
                full_name: schema.string({ trim: true }, [
                    rules.maxLength(30)
                ])
            })

            const validationUserSchema = schema.create({
                username: schema.string({ trim: true }, [
                    rules.maxLength(30),
                    rules.unique({ table:"users", column:"username" })
                ]),
                email: schema.string({ trim: true }, [
                    rules.email(),
                    rules.maxLength(30),
                    rules.unique({ table:"users", column:"email" })
                ]),
                password: schema.string({ trim: true }, [
                    rules.maxLength(50)
                ])
            })

            const validatedAccount = await request.validate({
                schema: validationAccountSchema,
                messages: {
                    'full_name.required': 'Fullname is Required',
                    'full_name.maxLength': 'Fullname length cannot exceed 30 character',
                }
            })

            const validatedUser = await request.validate({
                schema: validationUserSchema,
                messages: {
                    'username.required': 'Username is Required',
                    'username.maxLength': 'Username length cannot exceed 30 character',
                    'email.required': 'Email is Required',
                    'email.maxLength': 'Email length cannot exceed 30 character',
                    'password.required': 'Password is Required',
                    'password.maxLength': 'Password length cannot exceed 50 character',
                }
            })

            const result = await Database.transaction(async (trx) => {
                const newAccount = new Account()
                newAccount.$attributes = validatedAccount

                newAccount.useTransaction(trx)
                const account = await newAccount.save()

                const newUser = new User()
                newUser.$attributes = validatedUser
                newUser.accountId = newAccount.id
                newUser.roleId = 2

                newUser.useTransaction(trx)
                const user = await newUser.save()

                trx.commit()
                return {
                    user: user,
                    account: account
                }
            })

            return response.status(200).json({
                result
            })
        } catch (error) {
            return response.status(500).json({
                error,
                messages: error.messages ? error.messages : 'error'
            })
        }
	}
}
