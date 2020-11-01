import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class DeliveryPlaces extends BaseSchema {
  protected tableName = 'delivery_places'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('profile_id')
      table.string('neighborhood')
      table.float('value')
      table.timestamps(true)
    })

    this.schema.alterTable('profiles', (table) => {
      table.boolean('can_pick_up_at_store').defaultTo(false)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
    this.schema.alterTable('profiles', (table) => {
      table.dropColumn('can_pick_up_at_store')
    })
  }
}
