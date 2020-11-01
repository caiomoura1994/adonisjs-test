import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Addresses extends BaseSchema {
  protected tableName = 'addresses'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('id')
      table.string('zip_code')
      table.string('public_place')
      table.string('neighborhood')
      table.string('number')
      table.string('complement')
      table.string('city')
      table.string('country')
      table.timestamps(true)
    })
    this.schema.alterTable('profiles', (table) => {
      table.string('address_id')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
    this.schema.alterTable('profiles', (table) => {
      table.dropColumn('address_id')
    })
  }
}
