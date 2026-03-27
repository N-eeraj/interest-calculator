import {
  bigint,
  boolean,
  decimal,
  int,
  mysqlTable,
  serial,
  timestamp,
} from "drizzle-orm/mysql-core";
import users from "#db/schemas/users";
import schemes from "#db/schemas/schemes";
import schemeRates from "#db/schemas/schemeRates";

const investments = mysqlTable("investments", {
  id: serial("id")
    .primaryKey(),
  userId: bigint("user_id", {
    mode: "number",
    unsigned: true,
  })
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),
  schemeId: bigint("scheme_id", {
    mode: "number",
    unsigned: true,
  })
    .notNull()
    .references(() => schemes.id),
  schemeRateId: bigint("scheme_rate_id", {
    mode: "number",
    unsigned: true,
  })
    .notNull()
    .references(() => schemeRates.id),
  tenureMonths: int("tenure_months", {
    unsigned: true,
  })
    .notNull(),
  isSeniorCitizen: boolean("is_senior_citizen")
    .default(false),
  principalAmount: decimal("principal_amount", {
    mode: "bigint",
    unsigned: true,
    scale: 2,
  }),
  monthlyDeposit: decimal("monthly_deposit", {
    mode: "bigint",
    unsigned: true,
    scale: 2,
  }),
  interestRate: decimal("interest_rate", {
    mode: "number",
    scale: 2,
    precision: 4,
  })
    .notNull(),
  maturityAmount: decimal("maturity_amount", {
    mode: "bigint",
    unsigned: true,
    scale: 2,
  }),
  monthlyPayout: decimal("monthly_payout", {
    mode: "bigint",
    unsigned: true,
    scale: 2,
  }),
  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .onUpdateNow()
    .notNull(),
});

export default investments;
