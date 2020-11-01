import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Profiles extends BaseSchema {
  protected tableName = 'profiles'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('phone_number')
      table.string('establishment_name')
      table.string('tax_document')
      table.string('description')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumns('phone_number', 'establishment_name', 'tax_document', 'description')
    })
  }
}
