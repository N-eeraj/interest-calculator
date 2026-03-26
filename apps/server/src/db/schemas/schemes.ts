import {
  mysqlEnum,
  mysqlTable,
  serial,
  timestamp,
} from "drizzle-orm/mysql-core";

import {
  SchemeType,
  InvestmentType,
  CompoundingType,
} from "@app/definitions/enums/schemes";

const schemes = mysqlTable("schemes", {
  id: serial("id")
    .primaryKey(),
  type: mysqlEnum("type", SchemeType)
    .notNull(),
  investmentType: mysqlEnum("investment_type", InvestmentType)
    .notNull(),
  compoundingType: mysqlEnum("compounding_type", CompoundingType)
    .notNull(),
  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .onUpdateNow()
    .notNull(),
});

export default schemes;
