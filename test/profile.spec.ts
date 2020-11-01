import test from 'japa'
import supertest from 'supertest'
import Database from '@ioc:Adonis/Lucid/Database'
import OpeningHour from 'App/Models/OpeningHour'
import DeliveryPlace from 'App/Models/DeliveryPlace'
import Address from 'App/Models/Address'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Profile', (gp) => {
  gp.before(async () => {
    await Database.beginGlobalTransaction()
  })

  gp.after(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('Should create new user with profile', async (assert) => {
    const address = {
      zipCode: '41710020',
      publicPlace: 'Rua',
      neighborhood: 'Boca do rio',
      number: '619',
      complement: 'Casa',
      city: 'Salvador',
      country: 'BA',
    } as Address
    const deliveryPlaces = [{ neighborhood: 'Boca do rio', value: 20.0 }] as DeliveryPlace[]
    const openingHours = [
      {
        dayOfWeek: 'sunday',
        startHour: '18:00',
        endHour: '24:00',
      },
    ] as OpeningHour[]

    const { body } = await supertest(BASE_URL)
      .post('/profiles')
      .send({
        email: 'caiobdmoura@gmail.com',
        password: 'Senhatest',
        phoneNumber: '71988362338',
        establishmentName: 'O militar',
        taxDocument: '02308244599',
        description: 'Descricao maior que 20 caracteres',
        address,
        deliveryPlaces,
        openingHours,
      })
      .expect(200)
    assert.exists(body)
    assert.hasAnyKeys(body, ['id', 'user_id'])
  })

  test('should return 422 user already created', async () => {
    await supertest(BASE_URL).post('/profiles').send({ email: 'caiobdmoura@gmail.com' }).expect(422)
  })

  test('Should do login', async (assert) => {
    const { body } = await supertest(BASE_URL)
      .post('/login')
      .send({
        email: 'caiobdmoura@gmail.com',
        password: 'Senhatest',
      })
      .expect(200)
    assert.exists(body)
    assert.containsAllKeys(body, ['token', 'user_id', 'id'])
  })

  test('Should update profile', async (assert) => {
    const phoneNumber = '71876432'
    const { body } = await supertest(BASE_URL)
      .patch('/profiles/1/')
      .send({ phoneNumber })
      .expect(200)
    assert.exists(body)
    assert.equal(body.phone_number, phoneNumber)
  })
})
