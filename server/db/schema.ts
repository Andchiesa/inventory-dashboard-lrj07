import { pgTable, text, integer, timestamp, varchar } from 'drizzle-orm/pg-core';

export const missingTable = pgTable('missing', {
  id: text('id').primaryKey().default('gen_random_uuid()'),
  data: varchar('data', { length: 10 }).notNull(),
  operacao: varchar('operacao', { length: 3 }).notNull(), // 'AM' ou 'DDP'
  quantidadeEncontrada: integer('quantidade_encontrada').notNull(),
  totalExcluido: integer('total_excluido').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const comercialTable = pgTable('comercial', {
  id: text('id').primaryKey().default('gen_random_uuid()'),
  data: varchar('data', { length: 10 }).notNull(),
  total: integer('total').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const justificativasTable = pgTable('justificativas', {
  id: text('id').primaryKey().default('gen_random_uuid()'),
  data: varchar('data', { length: 10 }).notNull(),
  operacao: varchar('operacao', { length: 3 }).notNull(), // 'AM' ou 'DDP'
  tratativa: text('tratativa').notNull(),
  total: integer('total').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const backlogTable = pgTable('backlog', {
  id: text('id').primaryKey().default('gen_random_uuid()'),
  data: varchar('data', { length: 10 }).notNull(),
  operation: varchar('operation', { length: 3 }).notNull(), // 'AM' ou 'DDP'
  backlog: integer('backlog').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type Missing = typeof missingTable.$inferSelect;
export type Comercial = typeof comercialTable.$inferSelect;
export type Justificativa = typeof justificativasTable.$inferSelect;
export type Backlog = typeof backlogTable.$inferSelect;
