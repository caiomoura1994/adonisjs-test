import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import DeliveryPlace from './DeliveryPlace'
import OpeningHour from './OpeningHour'

export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasMany(() => DeliveryPlace)
  public deliveryPlaces: HasMany<typeof DeliveryPlace>

  @hasMany(() => OpeningHour)
  public openingHours: HasMany<typeof OpeningHour>

  @column()
  public canPickUpAtStore: boolean

  @column()
  public userId: number

  @column()
  public addressId: number

  @column()
  public phoneNumber: string

  @column()
  public establishmentName: string
  
  @column()
  public slug: string

  @column()
  public taxDocument: string

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
