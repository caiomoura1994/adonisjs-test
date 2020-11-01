import test from 'japa'
import supertest from 'supertest'
import Database from '@ioc:Adonis/Lucid/Database'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('User Empity', (gp) => {
  gp.before(async () => {
    await Database.beginGlobalTransaction()
  })

  gp.after(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('Should return users with pagination', async (assert) => {
    const { body } = await supertest(BASE_URL).get('/users').expect(200)
    assert.exists(body)
    assert.hasAllDeepKeys(body, ['meta', 'data'])
    assert.isEmpty(body.data)
  })

  test('Should register a user', async (assert) => {
    const { body } = await supertest(BASE_URL)
      .post('/users')
      .send({
        email: 'caiobdmoura@gmail.com',
        password: 'C410140311',
      })
      .expect(200)
    assert.exists(body)
    assert.hasAllDeepKeys(body, ['email', 'created_at', 'updated_at', 'id'])
  })

  test('Should return only one user', async (assert) => {
    const { body } = await supertest(BASE_URL).get('/users').expect(200)
    assert.exists(body)
    assert.hasAllDeepKeys(body, ['meta', 'data'])
    body.data
    assert.lengthOf(body.data, 1)
  })
})
