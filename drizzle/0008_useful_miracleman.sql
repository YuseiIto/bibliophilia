PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_bib_work_agencies` (
	`work_id` text NOT NULL,
	`agent_id` text NOT NULL,
	`role` text NOT NULL,
	`raw` text NOT NULL,
	FOREIGN KEY (`work_id`) REFERENCES `bib_works`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`agent_id`) REFERENCES `bib_agents`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_bib_work_agencies`("work_id", "agent_id", "role", "raw") SELECT "work_id", "agent_id", "role", "raw" FROM `bib_work_agencies`;--> statement-breakpoint
DROP TABLE `bib_work_agencies`;--> statement-breakpoint
ALTER TABLE `__new_bib_work_agencies` RENAME TO `bib_work_agencies`;--> statement-breakpoint
PRAGMA foreign_keys=ON;