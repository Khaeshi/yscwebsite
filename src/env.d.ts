/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly PUBLIC_FACEBOOK_ACCESS_TOKEN: any;
    readonly PUBLIC_PAGE_ID: number;
    readonly PUBLIC_APP_ID: number;

  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

declare namespace App {
  interface Locals {
    user: {
      id: string;
      email: string;
      full_name?: string;     
      role: string;
    } | null;
    session: import('lucia').Session | null;
  }
}