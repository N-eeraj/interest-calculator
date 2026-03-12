import {
  mysqlTable,
  varchar,
  serial,
  timestamp,
} from "drizzle-orm/mysql-core";

const usersTable = mysqlTable("users", {
  id: serial("id")
    .primaryKey(),
  name: varchar("name", {
    length: 50,
  })
    .notNull(),
  email: varchar("email", {
    length: 50,
  })
    .notNull()
    .unique(),
  password: varchar("password", {
    length: 255,
  })
    .notNull(),
  avatarUrl: varchar("avatar_url", {
    length: 255,
  }),
  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .onUpdateNow()
    .notNull(),
});

export default usersTable;
