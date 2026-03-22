import {
  mysqlTable,
  serial,
  bigint,
  varchar,
  timestamp,
} from "drizzle-orm/mysql-core";
import users from "#db/schemas/users";

const tokens = mysqlTable("tokens", {
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
  token: varchar("token", {
    length: 255,
  })
    .unique()
    .notNull(),
  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .onUpdateNow()
    .notNull(),
  expiresAt: timestamp("expires_at")
    .notNull(),
});

export default tokens;
