CREATE TABLE IF NOT EXISTS "users" (
	"created_at" timestamp DEFAULT now(),
	"email" text,
	"id" uuid DEFAULT gen_random_uuid(),
	"password" varchar,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
