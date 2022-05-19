alter table "public"."visit_counts" drop constraint "visit_counts_from_key";
alter table "public"."visit_counts" add constraint "visit_counts_from_page_key" unique ("from", "page");
