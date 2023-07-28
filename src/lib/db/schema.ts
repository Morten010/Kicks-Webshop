import {mysqlTable, serial, varchar, int, decimal, boolean, text, mysqlEnum, bigint} from "drizzle-orm/mysql-core"


export const users = mysqlTable("users", {
    id: serial("id").primaryKey(),
    email: varchar("email", {length: 256}).notNull(),
    password: varchar("password", {length: 256}).notNull(),
    gender: varchar("gender", {length: 10}).notNull(),
    firstName: varchar("firstName", {length: 256}).notNull(),
    lastName: varchar("lastName", {length: 256}).notNull(),
    phoneNumber: int("phoneNumber"),
    Role: mysqlEnum("Role", ["ADMIN", "USER"]).default("USER").notNull()
})

// auth
export const user = mysqlTable("auth_user", {
	email: varchar("id", {length: 15 }).primaryKey()
});

export const session = mysqlTable("auth_session", {
	id: varchar("id", {length: 128}).primaryKey(),
	userId: varchar("user_id", {length: 15}).notNull(),
	activeExpires: bigint("active_expires", {mode: "number"}).notNull(),
	idleExpires: bigint("idle_expires", {mode: "number"}).notNull()
});
 
export const key = mysqlTable("auth_key", {
	id: varchar("id", {length: 255}).primaryKey(),
	userId: varchar("user_id", {length: 15}).notNull(),
	primaryKey: boolean("primary_key").notNull(),
	hashedPassword: varchar("hashed_password", {length: 255}),
	expires: bigint("expires", {mode: "number"})
});

// end of auth

export const shoppingSession = mysqlTable("shoppingSession", {
    id: serial("id").primaryKey(),
    userId: int("userId"),
    total: int("total"),
})

export const products = mysqlTable("products", {
    id: serial("id").primaryKey(),
    name: varchar("name", {length: 256}),
    slug: varchar("slug", {length: 256}),
    desc: text("desc"),
    price: int("price"),
    sku: varchar("sku", {length: 256}),
    categoryId: int("categoryId"),
    discountId: int("discountId"),
})

export const productCategories = mysqlTable("productCategories", {
    id: serial("id").primaryKey().notNull(),
    name: varchar("name", {length: 256}).notNull(),
    desc: text("desc").notNull(),
})

export const sizes = mysqlTable("sizes", {
    id: serial("id").primaryKey(),
    productId: int("productId"),
    size: int("size"),
    quantity: int("quantity"),
})

export const discounts = mysqlTable("discounts", {
    id: serial("id").primaryKey(),
    name: varchar("name", {length: 256}),
    desc: varchar("desc", {length: 256}),
    discountPercentage: decimal("discountPercentage"),
    active: boolean("active"),
})