CREATE TABLE IF NOT EXISTS "users" (
	"email" text,
	"id" uuid DEFAULT gen_random_uuid(),
	"password" varchar,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
