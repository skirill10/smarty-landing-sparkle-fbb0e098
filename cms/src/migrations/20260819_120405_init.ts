import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_integrations_category" AS ENUM('crm', 'automation', 'productivity', 'support', 'commerce', 'finance', 'messaging', 'other');
  CREATE TYPE "public"."enum_countries_region" AS ENUM('europe', 'north-america', 'south-america', 'asia', 'africa', 'oceania');
  CREATE TYPE "public"."enum_rates_destination_type" AS ENUM('landline', 'mobile', 'sms');
  CREATE TYPE "public"."enum_rates_currency" AS ENUM('EUR', 'USD', 'GBP', 'CHF', 'PLN', 'SEK', 'NOK', 'DKK', 'CZK', 'CAD', 'AUD', 'NZD', 'AED', 'INR');
  CREATE TYPE "public"."enum_rates_unit" AS ENUM('minute', 'message');
  CREATE TABLE "marketing_pages_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL
  );
  
  CREATE TABLE "marketing_pages_proof" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "marketing_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"eyebrow" varchar NOT NULL,
  	"headline" varchar NOT NULL,
  	"sub" varchar NOT NULL,
  	"meta_title" varchar NOT NULL,
  	"meta_description" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "integrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"icon_slug" varchar,
  	"logo_id" integer,
  	"category" "enum_integrations_category" DEFAULT 'other',
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "countries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"iso2" varchar NOT NULL,
  	"iso3" varchar,
  	"dial_code" varchar NOT NULL,
  	"region" "enum_countries_region" NOT NULL,
  	"trunk_prefix" varchar,
  	"calling_instructions" varchar,
  	"short_description" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"featured" boolean DEFAULT false,
  	"active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "rates" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"country_id" varchar NOT NULL,
  	"destination_type" "enum_rates_destination_type" NOT NULL,
  	"destination_label" varchar,
  	"prefix" varchar,
  	"price" numeric NOT NULL,
  	"currency" "enum_rates_currency" DEFAULT 'EUR' NOT NULL,
  	"unit" "enum_rates_unit" DEFAULT 'minute' NOT NULL,
  	"billing_interval_seconds" numeric DEFAULT 60,
  	"connection_fee" numeric,
  	"minimum_charge" numeric,
  	"valid_from" timestamp(3) with time zone,
  	"valid_until" timestamp(3) with time zone,
  	"active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "faqs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"country_id" varchar,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "legal_documents_intro" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "legal_documents_sections_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "legal_documents_sections_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"term" varchar,
  	"body" varchar
  );
  
  CREATE TABLE "legal_documents_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar
  );
  
  CREATE TABLE "legal_documents_footer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "legal_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"eyebrow" varchar DEFAULT 'Legal',
  	"title" varchar NOT NULL,
  	"updated" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"marketing_pages_id" integer,
  	"integrations_id" integer,
  	"countries_id" integer,
  	"rates_id" integer,
  	"faqs_id" integer,
  	"legal_documents_id" integer,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_nav_groups_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"to" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "site_settings_nav_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"to" varchar
  );
  
  CREATE TABLE "site_settings_footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"to" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "site_settings_footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_regions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_hey_ai_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "site_settings_cta_proof_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"brand_name" varchar DEFAULT 'Smartytel',
  	"logo_id" integer,
  	"footer_note" varchar,
  	"announcement_enabled" boolean DEFAULT true,
  	"announcement_message" varchar,
  	"announcement_primary_label" varchar,
  	"announcement_primary_url" varchar,
  	"announcement_secondary_label" varchar,
  	"announcement_secondary_url" varchar,
  	"hey_ai_eyebrow" varchar,
  	"hey_ai_heading" varchar,
  	"hey_ai_body" varchar,
  	"hey_ai_link_label" varchar,
  	"hey_ai_page_url" varchar,
  	"cta_eyebrow" varchar,
  	"cta_title" varchar,
  	"cta_subtitle" varchar,
  	"cta_primary_label" varchar,
  	"cta_secondary_label" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_logos_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "home_feature_groups_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar
  );
  
  CREATE TABLE "home_feature_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL
  );
  
  CREATE TABLE "home_showcase_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"link" varchar
  );
  
  CREATE TABLE "home_stories_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"business" varchar NOT NULL,
  	"person" varchar,
  	"role" varchar,
  	"quote" varchar,
  	"stat" varchar,
  	"stat_label" varchar
  );
  
  CREATE TABLE "home_built_for_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "home_plans_perks" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "home_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"price" varchar,
  	"unit" varchar,
  	"tagline" varchar
  );
  
  CREATE TABLE "home" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_rating" varchar,
  	"hero_reviews" varchar,
  	"hero_headline" varchar,
  	"hero_sub" varchar,
  	"hero_primary_cta" varchar,
  	"hero_secondary_cta" varchar,
  	"hero_platforms" varchar,
  	"logos_heading" varchar,
  	"showcase_heading" varchar,
  	"stories_heading" varchar,
  	"stories_sub" varchar,
  	"built_for_heading" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "pricing_plans_perks" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "pricing_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"monthly" numeric,
  	"annual_monthly" numeric,
  	"tagline" varchar,
  	"cta" varchar,
  	"featured" boolean
  );
  
  CREATE TABLE "pricing_add_ons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"price" varchar,
  	"unit" varchar,
  	"note" varchar,
  	"link_label" varchar
  );
  
  CREATE TABLE "pricing_ai_tiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tier" varchar NOT NULL,
  	"price" varchar,
  	"included" varchar,
  	"overage" varchar
  );
  
  CREATE TABLE "pricing_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "pricing" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"sub" varchar,
  	"cta_title" varchar,
  	"cta_primary_label" varchar,
  	"cta_primary_url" varchar,
  	"cta_secondary_label" varchar,
  	"cta_secondary_url" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "rates_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_title" varchar,
  	"hero_description" varchar,
  	"search_placeholder" varchar,
  	"disclaimer_title" varchar,
  	"disclaimer_body" varchar,
  	"faq_title" varchar,
  	"cta_title" varchar,
  	"cta_description" varchar,
  	"primary_cta_label" varchar,
  	"primary_cta_url" varchar,
  	"secondary_cta_label" varchar,
  	"secondary_cta_url" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "crm_page_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar
  );
  
  CREATE TABLE "crm_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_headline" varchar,
  	"hero_sub" varchar,
  	"hero_primary_cta" varchar,
  	"hero_secondary_cta" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_page_channels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"cta" varchar,
  	"to" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "contact_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_headline" varchar,
  	"hero_sub" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "llm_info_page_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"term" varchar,
  	"detail" varchar
  );
  
  CREATE TABLE "llm_info_page_answers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "llm_info_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_headline" varchar,
  	"hero_sub" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "marketing_pages_bullets" ADD CONSTRAINT "marketing_pages_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_pages_proof" ADD CONSTRAINT "marketing_pages_proof_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "integrations" ADD CONSTRAINT "integrations_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "legal_documents_intro" ADD CONSTRAINT "legal_documents_intro_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."legal_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "legal_documents_sections_paragraphs" ADD CONSTRAINT "legal_documents_sections_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."legal_documents_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "legal_documents_sections_items" ADD CONSTRAINT "legal_documents_sections_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."legal_documents_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "legal_documents_sections" ADD CONSTRAINT "legal_documents_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."legal_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "legal_documents_footer" ADD CONSTRAINT "legal_documents_footer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."legal_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_marketing_pages_fk" FOREIGN KEY ("marketing_pages_id") REFERENCES "public"."marketing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_integrations_fk" FOREIGN KEY ("integrations_id") REFERENCES "public"."integrations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_countries_fk" FOREIGN KEY ("countries_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_rates_fk" FOREIGN KEY ("rates_id") REFERENCES "public"."rates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_legal_documents_fk" FOREIGN KEY ("legal_documents_id") REFERENCES "public"."legal_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_nav_groups_links" ADD CONSTRAINT "site_settings_nav_groups_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_nav_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_nav_groups" ADD CONSTRAINT "site_settings_nav_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_columns_links" ADD CONSTRAINT "site_settings_footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_columns" ADD CONSTRAINT "site_settings_footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_regions" ADD CONSTRAINT "site_settings_regions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_socials" ADD CONSTRAINT "site_settings_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_hey_ai_items" ADD CONSTRAINT "site_settings_hey_ai_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_cta_proof_points" ADD CONSTRAINT "site_settings_cta_proof_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_logos_items" ADD CONSTRAINT "home_logos_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_feature_groups_cards" ADD CONSTRAINT "home_feature_groups_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_feature_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_feature_groups" ADD CONSTRAINT "home_feature_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_showcase_items" ADD CONSTRAINT "home_showcase_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_stories_items" ADD CONSTRAINT "home_stories_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_built_for_items" ADD CONSTRAINT "home_built_for_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_plans_perks" ADD CONSTRAINT "home_plans_perks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_plans" ADD CONSTRAINT "home_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_plans_perks" ADD CONSTRAINT "pricing_plans_perks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_plans" ADD CONSTRAINT "pricing_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_add_ons" ADD CONSTRAINT "pricing_add_ons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_ai_tiers" ADD CONSTRAINT "pricing_ai_tiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_faqs" ADD CONSTRAINT "pricing_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "crm_page_features" ADD CONSTRAINT "crm_page_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."crm_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_channels" ADD CONSTRAINT "contact_page_channels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "llm_info_page_facts" ADD CONSTRAINT "llm_info_page_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."llm_info_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "llm_info_page_answers" ADD CONSTRAINT "llm_info_page_answers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."llm_info_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "marketing_pages_bullets_order_idx" ON "marketing_pages_bullets" USING btree ("_order");
  CREATE INDEX "marketing_pages_bullets_parent_id_idx" ON "marketing_pages_bullets" USING btree ("_parent_id");
  CREATE INDEX "marketing_pages_proof_order_idx" ON "marketing_pages_proof" USING btree ("_order");
  CREATE INDEX "marketing_pages_proof_parent_id_idx" ON "marketing_pages_proof" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "marketing_pages_slug_idx" ON "marketing_pages" USING btree ("slug");
  CREATE INDEX "marketing_pages_updated_at_idx" ON "marketing_pages" USING btree ("updated_at");
  CREATE INDEX "marketing_pages_created_at_idx" ON "marketing_pages" USING btree ("created_at");
  CREATE INDEX "integrations_logo_idx" ON "integrations" USING btree ("logo_id");
  CREATE INDEX "integrations_updated_at_idx" ON "integrations" USING btree ("updated_at");
  CREATE INDEX "integrations_created_at_idx" ON "integrations" USING btree ("created_at");
  CREATE UNIQUE INDEX "countries_slug_idx" ON "countries" USING btree ("slug");
  CREATE INDEX "countries_updated_at_idx" ON "countries" USING btree ("updated_at");
  CREATE INDEX "countries_created_at_idx" ON "countries" USING btree ("created_at");
  CREATE INDEX "rates_country_id_idx" ON "rates" USING btree ("country_id");
  CREATE INDEX "rates_updated_at_idx" ON "rates" USING btree ("updated_at");
  CREATE INDEX "rates_created_at_idx" ON "rates" USING btree ("created_at");
  CREATE INDEX "faqs_updated_at_idx" ON "faqs" USING btree ("updated_at");
  CREATE INDEX "faqs_created_at_idx" ON "faqs" USING btree ("created_at");
  CREATE INDEX "legal_documents_intro_order_idx" ON "legal_documents_intro" USING btree ("_order");
  CREATE INDEX "legal_documents_intro_parent_id_idx" ON "legal_documents_intro" USING btree ("_parent_id");
  CREATE INDEX "legal_documents_sections_paragraphs_order_idx" ON "legal_documents_sections_paragraphs" USING btree ("_order");
  CREATE INDEX "legal_documents_sections_paragraphs_parent_id_idx" ON "legal_documents_sections_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "legal_documents_sections_items_order_idx" ON "legal_documents_sections_items" USING btree ("_order");
  CREATE INDEX "legal_documents_sections_items_parent_id_idx" ON "legal_documents_sections_items" USING btree ("_parent_id");
  CREATE INDEX "legal_documents_sections_order_idx" ON "legal_documents_sections" USING btree ("_order");
  CREATE INDEX "legal_documents_sections_parent_id_idx" ON "legal_documents_sections" USING btree ("_parent_id");
  CREATE INDEX "legal_documents_footer_order_idx" ON "legal_documents_footer" USING btree ("_order");
  CREATE INDEX "legal_documents_footer_parent_id_idx" ON "legal_documents_footer" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "legal_documents_slug_idx" ON "legal_documents" USING btree ("slug");
  CREATE INDEX "legal_documents_updated_at_idx" ON "legal_documents" USING btree ("updated_at");
  CREATE INDEX "legal_documents_created_at_idx" ON "legal_documents" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_marketing_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("marketing_pages_id");
  CREATE INDEX "payload_locked_documents_rels_integrations_id_idx" ON "payload_locked_documents_rels" USING btree ("integrations_id");
  CREATE INDEX "payload_locked_documents_rels_countries_id_idx" ON "payload_locked_documents_rels" USING btree ("countries_id");
  CREATE INDEX "payload_locked_documents_rels_rates_id_idx" ON "payload_locked_documents_rels" USING btree ("rates_id");
  CREATE INDEX "payload_locked_documents_rels_faqs_id_idx" ON "payload_locked_documents_rels" USING btree ("faqs_id");
  CREATE INDEX "payload_locked_documents_rels_legal_documents_id_idx" ON "payload_locked_documents_rels" USING btree ("legal_documents_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_nav_groups_links_order_idx" ON "site_settings_nav_groups_links" USING btree ("_order");
  CREATE INDEX "site_settings_nav_groups_links_parent_id_idx" ON "site_settings_nav_groups_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_nav_groups_order_idx" ON "site_settings_nav_groups" USING btree ("_order");
  CREATE INDEX "site_settings_nav_groups_parent_id_idx" ON "site_settings_nav_groups" USING btree ("_parent_id");
  CREATE INDEX "site_settings_footer_columns_links_order_idx" ON "site_settings_footer_columns_links" USING btree ("_order");
  CREATE INDEX "site_settings_footer_columns_links_parent_id_idx" ON "site_settings_footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_footer_columns_order_idx" ON "site_settings_footer_columns" USING btree ("_order");
  CREATE INDEX "site_settings_footer_columns_parent_id_idx" ON "site_settings_footer_columns" USING btree ("_parent_id");
  CREATE INDEX "site_settings_regions_order_idx" ON "site_settings_regions" USING btree ("_order");
  CREATE INDEX "site_settings_regions_parent_id_idx" ON "site_settings_regions" USING btree ("_parent_id");
  CREATE INDEX "site_settings_socials_order_idx" ON "site_settings_socials" USING btree ("_order");
  CREATE INDEX "site_settings_socials_parent_id_idx" ON "site_settings_socials" USING btree ("_parent_id");
  CREATE INDEX "site_settings_hey_ai_items_order_idx" ON "site_settings_hey_ai_items" USING btree ("_order");
  CREATE INDEX "site_settings_hey_ai_items_parent_id_idx" ON "site_settings_hey_ai_items" USING btree ("_parent_id");
  CREATE INDEX "site_settings_cta_proof_points_order_idx" ON "site_settings_cta_proof_points" USING btree ("_order");
  CREATE INDEX "site_settings_cta_proof_points_parent_id_idx" ON "site_settings_cta_proof_points" USING btree ("_parent_id");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "home_logos_items_order_idx" ON "home_logos_items" USING btree ("_order");
  CREATE INDEX "home_logos_items_parent_id_idx" ON "home_logos_items" USING btree ("_parent_id");
  CREATE INDEX "home_feature_groups_cards_order_idx" ON "home_feature_groups_cards" USING btree ("_order");
  CREATE INDEX "home_feature_groups_cards_parent_id_idx" ON "home_feature_groups_cards" USING btree ("_parent_id");
  CREATE INDEX "home_feature_groups_order_idx" ON "home_feature_groups" USING btree ("_order");
  CREATE INDEX "home_feature_groups_parent_id_idx" ON "home_feature_groups" USING btree ("_parent_id");
  CREATE INDEX "home_showcase_items_order_idx" ON "home_showcase_items" USING btree ("_order");
  CREATE INDEX "home_showcase_items_parent_id_idx" ON "home_showcase_items" USING btree ("_parent_id");
  CREATE INDEX "home_stories_items_order_idx" ON "home_stories_items" USING btree ("_order");
  CREATE INDEX "home_stories_items_parent_id_idx" ON "home_stories_items" USING btree ("_parent_id");
  CREATE INDEX "home_built_for_items_order_idx" ON "home_built_for_items" USING btree ("_order");
  CREATE INDEX "home_built_for_items_parent_id_idx" ON "home_built_for_items" USING btree ("_parent_id");
  CREATE INDEX "home_plans_perks_order_idx" ON "home_plans_perks" USING btree ("_order");
  CREATE INDEX "home_plans_perks_parent_id_idx" ON "home_plans_perks" USING btree ("_parent_id");
  CREATE INDEX "home_plans_order_idx" ON "home_plans" USING btree ("_order");
  CREATE INDEX "home_plans_parent_id_idx" ON "home_plans" USING btree ("_parent_id");
  CREATE INDEX "pricing_plans_perks_order_idx" ON "pricing_plans_perks" USING btree ("_order");
  CREATE INDEX "pricing_plans_perks_parent_id_idx" ON "pricing_plans_perks" USING btree ("_parent_id");
  CREATE INDEX "pricing_plans_order_idx" ON "pricing_plans" USING btree ("_order");
  CREATE INDEX "pricing_plans_parent_id_idx" ON "pricing_plans" USING btree ("_parent_id");
  CREATE INDEX "pricing_add_ons_order_idx" ON "pricing_add_ons" USING btree ("_order");
  CREATE INDEX "pricing_add_ons_parent_id_idx" ON "pricing_add_ons" USING btree ("_parent_id");
  CREATE INDEX "pricing_ai_tiers_order_idx" ON "pricing_ai_tiers" USING btree ("_order");
  CREATE INDEX "pricing_ai_tiers_parent_id_idx" ON "pricing_ai_tiers" USING btree ("_parent_id");
  CREATE INDEX "pricing_faqs_order_idx" ON "pricing_faqs" USING btree ("_order");
  CREATE INDEX "pricing_faqs_parent_id_idx" ON "pricing_faqs" USING btree ("_parent_id");
  CREATE INDEX "crm_page_features_order_idx" ON "crm_page_features" USING btree ("_order");
  CREATE INDEX "crm_page_features_parent_id_idx" ON "crm_page_features" USING btree ("_parent_id");
  CREATE INDEX "contact_page_channels_order_idx" ON "contact_page_channels" USING btree ("_order");
  CREATE INDEX "contact_page_channels_parent_id_idx" ON "contact_page_channels" USING btree ("_parent_id");
  CREATE INDEX "llm_info_page_facts_order_idx" ON "llm_info_page_facts" USING btree ("_order");
  CREATE INDEX "llm_info_page_facts_parent_id_idx" ON "llm_info_page_facts" USING btree ("_parent_id");
  CREATE INDEX "llm_info_page_answers_order_idx" ON "llm_info_page_answers" USING btree ("_order");
  CREATE INDEX "llm_info_page_answers_parent_id_idx" ON "llm_info_page_answers" USING btree ("_parent_id");`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "marketing_pages_bullets" CASCADE;
  DROP TABLE "marketing_pages_proof" CASCADE;
  DROP TABLE "marketing_pages" CASCADE;
  DROP TABLE "integrations" CASCADE;
  DROP TABLE "countries" CASCADE;
  DROP TABLE "rates" CASCADE;
  DROP TABLE "faqs" CASCADE;
  DROP TABLE "legal_documents_intro" CASCADE;
  DROP TABLE "legal_documents_sections_paragraphs" CASCADE;
  DROP TABLE "legal_documents_sections_items" CASCADE;
  DROP TABLE "legal_documents_sections" CASCADE;
  DROP TABLE "legal_documents_footer" CASCADE;
  DROP TABLE "legal_documents" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings_nav_groups_links" CASCADE;
  DROP TABLE "site_settings_nav_groups" CASCADE;
  DROP TABLE "site_settings_footer_columns_links" CASCADE;
  DROP TABLE "site_settings_footer_columns" CASCADE;
  DROP TABLE "site_settings_regions" CASCADE;
  DROP TABLE "site_settings_socials" CASCADE;
  DROP TABLE "site_settings_hey_ai_items" CASCADE;
  DROP TABLE "site_settings_cta_proof_points" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "home_logos_items" CASCADE;
  DROP TABLE "home_feature_groups_cards" CASCADE;
  DROP TABLE "home_feature_groups" CASCADE;
  DROP TABLE "home_showcase_items" CASCADE;
  DROP TABLE "home_stories_items" CASCADE;
  DROP TABLE "home_built_for_items" CASCADE;
  DROP TABLE "home_plans_perks" CASCADE;
  DROP TABLE "home_plans" CASCADE;
  DROP TABLE "home" CASCADE;
  DROP TABLE "pricing_plans_perks" CASCADE;
  DROP TABLE "pricing_plans" CASCADE;
  DROP TABLE "pricing_add_ons" CASCADE;
  DROP TABLE "pricing_ai_tiers" CASCADE;
  DROP TABLE "pricing_faqs" CASCADE;
  DROP TABLE "pricing" CASCADE;
  DROP TABLE "rates_page" CASCADE;
  DROP TABLE "crm_page_features" CASCADE;
  DROP TABLE "crm_page" CASCADE;
  DROP TABLE "contact_page_channels" CASCADE;
  DROP TABLE "contact_page" CASCADE;
  DROP TABLE "llm_info_page_facts" CASCADE;
  DROP TABLE "llm_info_page_answers" CASCADE;
  DROP TABLE "llm_info_page" CASCADE;
  DROP TYPE "public"."enum_integrations_category";
  DROP TYPE "public"."enum_countries_region";
  DROP TYPE "public"."enum_rates_destination_type";
  DROP TYPE "public"."enum_rates_currency";
  DROP TYPE "public"."enum_rates_unit";`);
}
