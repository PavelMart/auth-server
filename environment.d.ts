declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: number;
            DB_NAME: string;
            DB_USER: string;
            DB_PASSWORD: string;
            DB_HOST: string;
            DB_PORT: number;
            JWT_ACCESS_SECRET: string;
            JWT_REFRESH_SECRET: string;
            CLIENT_URL: string;
        }
    }
}

export {};
