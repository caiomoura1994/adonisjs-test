import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile'
import User from 'App/Models/User'
import Address from 'App/Models/Address'

import slugify from 'slugify'
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

    const slug = slugify(profileData.establishmentName, { lower: true })

    const profileWithSlug = await Profile.findBy('slug', slug)
    if (profileWithSlug) return response.status(422).send('Slug já cadastrado')

    const profile = await Profile.create({
      ...profileData,
      slug,
      userId: user.id,
      addressId: addressEntyti.id,
    })

    await profile.related('deliveryPlaces').createMany(deliveryPlaces)
    await profile.related('openingHours').createMany(openingHours)

    await profile.save()
    await user.save()

    return profile.serialize()
  }

  public async show({ params }: HttpContextContract) {
    const profileId = params.id
    const profile = await Profile.find(profileId)
    return profile?.serialize()
  }

  public async findBySlug({ params }: HttpContextContract) {
    const { slug } = params
    const profile = await Profile.findBy('slug', slug)
    return profile?.serialize()
  }

  public async edit({}: HttpContextContract) {}

  public async update({ request, params, response }: HttpContextContract) {
    const { slug } = request.only(['slug'])
    if (slug) {
      const profileWithSlug = await Profile.findBy('slug', slug)
      if (profileWithSlug) return response.status(422).send('Slug já cadastrado')
    }

    const profileId = params.id
    const profile = await Profile.find(profileId)
    profile?.merge(request.all()).save()
    return profile?.serialize()
  }

  public async destroy({}: HttpContextContract) {}
}
