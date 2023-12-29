import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('uuid').notNullable()
      table.string('username', 30).notNullable().unique()
      table.string('email', 30).notNullable().unique()
      table.string('password', 180).notNullable()
      table.integer('account_id').unsigned().references('accounts.id').onDelete('CASCADE').onUpdate('RESTRICT')
      table.boolean('is_active').notNullable().defaultTo(true)
      table.boolean('is_deleted').notNullable().defaultTo(false)
      table.integer('created_by').notNullable()
      table.integer('updated_by').notNullable()
      table.integer('deleted_by').nullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('deleted_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
