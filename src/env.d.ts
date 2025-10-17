/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_WP_API_URL: string;
  readonly PUBLIC_SITE_URL: string;
  readonly PUBLIC_SITE_NAME: string;
  readonly PUBLIC_PHONE: string;
  readonly PUBLIC_EMAIL: string;
  readonly PUBLIC_ADDRESS: string;
  readonly PUBLIC_GOOGLE_MAPS_EMBED_URL: string;
  readonly PUBLIC_GOOGLE_PLACE_ID: string;
  readonly PUBLIC_GOOGLE_RATING: string;
  readonly PUBLIC_GOOGLE_REVIEW_COUNT: string;
  readonly PUBLIC_INSTAGRAM_URL: string;
  readonly PUBLIC_FACEBOOK_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

