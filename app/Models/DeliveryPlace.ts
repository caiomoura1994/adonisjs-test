import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class DeliveryPlace extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public profileId: number
  
  @column()
  public neighborhood: string

  @column()
  public value: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
