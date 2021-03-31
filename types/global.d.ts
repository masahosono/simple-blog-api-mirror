declare namespace NodeJS {
    interface ProcessEnv {
        readonly NODE_ENV: 'development' | 'production' | 'test';
        readonly MONGODB_URI: string;
        readonly SECRET: string;
        readonly BASE_URL: string;
        readonly IS_LOCAL: boolean;
    }
}
