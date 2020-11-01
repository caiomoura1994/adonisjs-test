import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

enum DaysOfWeekEnum {
  SUNDAY = 'sunday',
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday',
}


export default class OpeningHour extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public profileId: number

  @column()
  public dayOfWeek: DaysOfWeekEnum

  @column()
  public startHour: string

  @column()
  public endHour: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
