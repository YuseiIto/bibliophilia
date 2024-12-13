PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_bib_works_subjects` (
	`id` text PRIMARY KEY NOT NULL,
	`work_id` text NOT NULL,
	`subject_id` text NOT NULL,
	FOREIGN KEY (`work_id`) REFERENCES `bib_works`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`subject_id`) REFERENCES `bib_subjects`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_bib_works_subjects`("id", "work_id", "subject_id") SELECT "id", "work_id", "subject_id" FROM `bib_works_subjects`;--> statement-breakpoint
DROP TABLE `bib_works_subjects`;--> statement-breakpoint
ALTER TABLE `__new_bib_works_subjects` RENAME TO `bib_works_subjects`;--> statement-breakpoint
PRAGMA foreign_keys=ON;