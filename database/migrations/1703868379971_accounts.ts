import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'accounts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('full_name', 30).notNullable()
      table.date('birth').nullable()
      table.string('gender', 1).nullable()
      table.string('address', 30).nullable()
      table.boolean('is_active').notNullable().defaultTo(true)
      table.boolean('is_deleted').notNullable().defaultTo(false)
      table.integer('created_by').notNullable()
      table.integer('updated_by').notNullable()
      table.integer('deleted_by').nullable()

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
      table.timestamp('deleted_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
