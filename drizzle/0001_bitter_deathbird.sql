CREATE TABLE `bib_abstract` (
	`id` text PRIMARY KEY NOT NULL,
	`work_id` text NOT NULL,
	`abstract` text NOT NULL,
	FOREIGN KEY (`work_id`) REFERENCES `bib_works`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `bib_agents` (
	`id` text PRIMARY KEY NOT NULL,
	`preferred_name` text NOT NULL,
	`preferred_name_transcription` text,
	`agent_type` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `bib_collective_agents` (
	`id` text PRIMARY KEY NOT NULL,
	`agent_id` text NOT NULL,
	`preferred_name` text NOT NULL,
	`preferred_name_transcription` text,
	FOREIGN KEY (`agent_id`) REFERENCES `bib_agents`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `bib_dates` (
	`id` text PRIMARY KEY NOT NULL,
	`work_id` text NOT NULL,
	`date` text NOT NULL,
	FOREIGN KEY (`work_id`) REFERENCES `bib_works`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `bib_description` (
	`id` text PRIMARY KEY NOT NULL,
	`work_id` text NOT NULL,
	`description` text NOT NULL,
	FOREIGN KEY (`work_id`) REFERENCES `bib_works`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `bib_extent` (
	`id` text PRIMARY KEY NOT NULL,
	`work_id` text NOT NULL,
	`extent` text NOT NULL,
	FOREIGN KEY (`work_id`) REFERENCES `bib_works`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `bib_identifiers` (
	`id` text PRIMARY KEY NOT NULL,
	`work_id` text NOT NULL,
	`identifier` text NOT NULL,
	`identifier_type` text NOT NULL,
	FOREIGN KEY (`work_id`) REFERENCES `bib_works`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `bib_items_agencies` (
	`item_id` text NOT NULL,
	`agent_id` text NOT NULL,
	`role` text NOT NULL,
	`raw_role` text NOT NULL,
	FOREIGN KEY (`item_id`) REFERENCES `bib_items`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`agent_id`) REFERENCES `bib_agents`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `bib_items` (
	`id` text PRIMARY KEY NOT NULL,
	`work_id` text NOT NULL,
	FOREIGN KEY (`work_id`) REFERENCES `bib_works`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `bib_languages` (
	`id` text PRIMARY KEY NOT NULL,
	`language` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `bib_original_languages` (
	`id` text PRIMARY KEY NOT NULL,
	`language` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `bib_persons` (
	`id` text PRIMARY KEY NOT NULL,
	`agent_id` text NOT NULL,
	`preferred_name` text NOT NULL,
	`preferred_name_transcription` text,
	FOREIGN KEY (`agent_id`) REFERENCES `bib_agents`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `bib_price` (
	`id` text PRIMARY KEY NOT NULL,
	`work_id` text NOT NULL,
	`price` text NOT NULL,
	FOREIGN KEY (`work_id`) REFERENCES `bib_works`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `bib_series_title` (
	`id` text PRIMARY KEY NOT NULL,
	`work_id` text NOT NULL,
	`title` text NOT NULL,
	`transcription` text,
	FOREIGN KEY (`work_id`) REFERENCES `bib_works`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `bib_subjects` (
	`id` text PRIMARY KEY NOT NULL,
	`preferred_label` text NOT NULL,
	`preferred_label_transcription` text
);
--> statement-breakpoint
CREATE TABLE `bib_alternative_title` (
	`id` text PRIMARY KEY NOT NULL,
	`work_id` text NOT NULL,
	`title` text NOT NULL,
	`transcription` text,
	FOREIGN KEY (`work_id`) REFERENCES `bib_works`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `bib_works_subjects` (
	`work_id` text NOT NULL,
	`subject_id` text NOT NULL,
	FOREIGN KEY (`work_id`) REFERENCES `bib_works`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`subject_id`) REFERENCES `bib_subjects`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `bib_works` (
	`id` text PRIMARY KEY NOT NULL,
	`preferred_title` text NOT NULL,
	`preferred_title_transcription` text,
	`catalog_source` text NOT NULL,
	`catalog_source_type` text NOT NULL,
	`cataloging_rule` text,
	`thumbnail_url` text,
	`preferred_volume` text,
	`preferred_volume_title` text,
	`preferred_volume_title_transcription` text
);
--> statement-breakpoint
DROP TABLE `users_table`;