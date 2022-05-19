alter table "public"."visit_counts" add constraint "total should be one or above" check (total >= 1);
