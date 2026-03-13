import {
  mysqlTable,
  serial,
  bigint,
  varchar,
  timestamp,
} from "drizzle-orm/mysql-core";
import users from "#db/schema/users";

const tokensTable = mysqlTable("tokens", {
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
  token: varchar({
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
});

export default tokensTable;
