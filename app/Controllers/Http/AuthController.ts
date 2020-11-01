import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile'

export default class AuthController {
  public async login({ request, auth }: HttpContextContract) {
    const { email, password } = request.all()

    const { token, user } = await auth.use('api').attempt(email, password)
    const profile = await Profile.findBy('user_id', user?.id)

    return { ...profile?.serialize(), token: token }
  }
}
