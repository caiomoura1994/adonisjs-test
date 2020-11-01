import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class OpeningHours extends BaseSchema {
  protected tableName = 'opening_hours'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.enum('day_of_week', [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
      ])
      table.integer('profile_id')
      table.string('start_hour')
      table.string('end_hour')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
