import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async login({ request, auth }: HttpContextContract) {
    const { email, password } = request.all()
    console.log({ email, password })

    const token = await auth.use('api').attempt(email, password)
    return token.toJSON()
  }
}
