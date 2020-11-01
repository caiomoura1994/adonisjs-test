import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile'

export default class ProfilesController {
  public async index({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 10
    const users = await Profile.query().paginate(page, limit)
    return users
  }

  public async store({ request, response, auth }: HttpContextContract) {
    await auth.authenticate()
    const exists_old_user = await Profile.findBy('userId', auth?.user?.id)
    if (exists_old_user?.id) {
      return response.status(422).send('Usuário já cadastrado')
    }

    const user = await Profile.create(request.all())
    await user.save()
    return user.serialize()
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
