import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import * as Yup from 'yup'

import User from 'App/Models/User'

const userSchema = Yup.object().shape({
  email: Yup.string().email().required('Obrigatório'),
  password: Yup.string().required('Obrigatório'),
})

export default class UsersController {
  public async index({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 10
    const users = await User.query().paginate(page, limit)
    return users
  }

  public async store({ request, response }: HttpContextContract) {
    const bodyRequest = request.all() as User
    await userSchema.validate(bodyRequest)

    const exists_old_user = await User.findBy('email', bodyRequest.email)
    if (exists_old_user?.id) {
      return response.status(422).send('Usuário já cadastrado')
    }

    const user = await User.create(request.all())
    await user.save()
    return user.serialize()
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const user = await User.findOrFail(params.id)
      await user.delete()
      return response.status(204)
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND')
        return response.status(404).send('Usuário não encontrado')
    }
    return response.status(404).send('Usuário não encontrado')
  }
}
