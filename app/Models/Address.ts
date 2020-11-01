import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Profile from './Profile'

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasOne(() => Profile)
  public profile: HasOne<typeof Profile>

  @column()
  public zipCode: string

  @column()
  public publicPlace: string

  @column()
  public neighborhood: string

  @column()
  public number: string

  @column()
  public complement: string

  @column()
  public city: string

  @column()
  public country: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
