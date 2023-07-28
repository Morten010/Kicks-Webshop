CREATE TABLE `discounts` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(256),
	`desc` varchar(256),
	`discountPercentage` decimal,
	`active` boolean
);
--> statement-breakpoint
CREATE TABLE `productCategories` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(256),
	`desc` text
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(256),
	`slug` varchar(256),
	`sku` varchar(256),
	`categoryId` int,
	`sizes` int,
	`discountId` int
);
--> statement-breakpoint
CREATE TABLE `shoppingSession` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`userId` int,
	`total` int
);
--> statement-breakpoint
CREATE TABLE `sizes` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`productId` int,
	`size` int,
	`quantity` int
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`email` varchar(256) NOT NULL,
	`password` varchar(256) NOT NULL,
	`gender` varchar(10) NOT NULL,
	`firstName` varchar(256) NOT NULL,
	`lastName` varchar(256) NOT NULL,
	`phoneNumber` int
);
