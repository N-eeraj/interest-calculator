CREATE TABLE `investments` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user_id` bigint unsigned NOT NULL,
	`scheme_id` bigint unsigned NOT NULL,
	`scheme_rate_id` bigint unsigned NOT NULL,
	`tenure_months` int unsigned NOT NULL,
	`is_senior_citizen` boolean DEFAULT false,
	`principal_amount` decimal unsigned,
	`monthly_deposit` decimal unsigned,
	`interest_rate` decimal(4,2) NOT NULL,
	`maturity_amount` decimal unsigned,
	`monthly_payout` decimal unsigned,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `investments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `investments` ADD CONSTRAINT `investments_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `investments` ADD CONSTRAINT `investments_scheme_id_schemes_id_fk` FOREIGN KEY (`scheme_id`) REFERENCES `schemes`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `investments` ADD CONSTRAINT `investments_scheme_rate_id_scheme_rates_id_fk` FOREIGN KEY (`scheme_rate_id`) REFERENCES `scheme_rates`(`id`) ON DELETE no action ON UPDATE no action;