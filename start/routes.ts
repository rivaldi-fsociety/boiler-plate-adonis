/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
	Route.get('', 'AuthController.index')
	Route.post('register', 'AuthController.register')
	// Route.post('login', 'AuthController.login')
	// Route.get('logout', 'AuthController.logout')
  	// nice to have OAuth2
	// Route.post('o-auth-login', 'AuthController.oAuthLogin')

	Route.get('/role','RolesController.index') /** Read Roles */
	Route.post('/role','RolesController.store') /** Create Roles */
})
.prefix('api/v1/')
// .middleware('globalparam')
