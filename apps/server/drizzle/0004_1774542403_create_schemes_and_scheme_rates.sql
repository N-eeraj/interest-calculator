CREATE TABLE `scheme_rates` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`scheme_id` bigint unsigned NOT NULL,
	`tenure_months` int unsigned NOT NULL,
	`regular_rate` decimal(4,2) NOT NULL,
	`senior_rate` decimal(4,2) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `scheme_rates_id` PRIMARY KEY(`id`),
	CONSTRAINT `tenure_months_step_check` CHECK(`scheme_rates`.`tenure_months` % 3 = 0),
	CONSTRAINT `tenure_months_min_max_check` CHECK(`scheme_rates`.`tenure_months` BETWEEN 3 AND 120),
	CONSTRAINT `rates_min_check` CHECK(`scheme_rates`.`regular_rate` > 1 AND `scheme_rates`.`senior_rate` > 1),
	CONSTRAINT `senior_rate_greater_than_regular_rate_check` CHECK(`scheme_rates`.`senior_rate` >= `scheme_rates`.`regular_rate`)
);
--> statement-breakpoint
CREATE TABLE `schemes` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`type` enum('fd','rd','mis') NOT NULL,
	`investment_type` enum('lump-sum','recurring') NOT NULL,
	`compounding_type` enum('nil','qtr','yr') NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `schemes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `scheme_rates` ADD CONSTRAINT `scheme_rates_scheme_id_schemes_id_fk` FOREIGN KEY (`scheme_id`) REFERENCES `schemes`(`id`) ON DELETE cascade ON UPDATE no action;