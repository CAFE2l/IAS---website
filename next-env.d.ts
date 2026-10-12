/// <reference types="next" />
/// <reference types="next/types/global" />

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SITE_URL: string;
    NEXT_PUBLIC_SITE_NAME: string;
  }
}