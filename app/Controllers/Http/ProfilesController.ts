import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile'
import User from 'App/Models/User'
import Address from 'App/Models/Address'

import * as Yup from 'yup'

const newProfileSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  phoneNumber: Yup.string().required(),
  establishmentName: Yup.string().required(),
  taxDocument: Yup.string().required(),
  description: Yup.string().min(20).required(),
})

export default class ProfilesController {
  public async index({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 10
    const users = await Profile.query().paginate(page, limit)
    return users
  }

  public async store({ request, response }: HttpContextContract) {
    const { email, password, address, deliveryPlaces, openingHours, ...profileData } = request.all()
    const exists_old_user = await User.findBy('email', email)
    if (exists_old_user) return response.status(422).send('Usuário já cadastrado')

    await newProfileSchema.validate(request.all())

    const user = await User.create({
      email,
      password,
    })

    const addressEntyti = await Address.create(address)

    const profile = await Profile.create({
      ...profileData,
      userId: user.id,
      addressId: addressEntyti.id,
    })

    await profile.related('deliveryPlaces').createMany(deliveryPlaces)
    await profile.related('openingHours').createMany(openingHours)

    await profile.save()
    await user.save()

    return profile.serialize()
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
