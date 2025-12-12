interface ImportMetaEnv {
    readonly PUBLIC_FACEBOOK_ACCESS_TOKEN: any;
    readonly PUBLIC_PAGE_ID: number;
    readonly PUBLIC_APP_ID: number;

  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }