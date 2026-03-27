ALTER TABLE `scheme_rates` ADD CONSTRAINT `unique_scheme_tenure` UNIQUE(`scheme_id`,`tenure_months`);--> statement-breakpoint
ALTER TABLE `schemes` ADD CONSTRAINT `schemes_type_unique` UNIQUE(`type`);