import {
  bigint,
  check,
  decimal,
  int,
  mysqlTable,
  serial,
  timestamp,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

import schemes from "#db/schemas/schemes";

const schemeRates = mysqlTable("scheme_rates", {
  id: serial()
    .primaryKey(),
  schemeId: bigint("scheme_id", {
    mode: "number",
    unsigned: true,
  })
    .notNull()
    .references(() => schemes.id, {
      onDelete: "cascade",
    }),
  tenureMonths: int("tenure_months", {
    unsigned: true,
  })
    .notNull(),
  regularRate: decimal("regular_rate", {
    mode: "number",
    scale: 2,
    precision: 4,
  })
    .notNull(),
  seniorRate: decimal("senior_rate", {
    mode: "number",
    scale: 2,
    precision: 4,
  })
    .notNull(),
  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .onUpdateNow()
    .notNull(),
}, (table) => [
  check("tenure_months_step_check", sql`${table.tenureMonths} % 3 = 0`),
  check("tenure_months_min_max_check", sql`${table.tenureMonths} BETWEEN 3 AND 120`),
  check("rates_min_check", sql`${table.regularRate} > 1 AND ${table.seniorRate} > 1`),
  check("senior_rate_greater_than_regular_rate_check", sql`${table.seniorRate} >= ${table.regularRate}`),
]);

export default schemeRates;
