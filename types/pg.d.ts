declare module 'pg' {
  export interface PoolOptions {
    connectionString?: string;
    ssl?: {
      rejectUnauthorized: boolean;
    };
    max?: number;
    idleTimeoutMillis?: number;
    connectionTimeoutMillis?: number;
  }

  export interface QueryResult<T = any> {
    rows: T[];
    rowCount: number;
  }

  export class Pool {
    constructor(options?: PoolOptions);
    query<T = any>(text: string, params?: any[]): Promise<QueryResult<T>>;
    end(callback?: (err?: Error) => void): void;
  }

  export class Client {
    constructor(config?: PoolOptions);
    connect(): Promise<void>;
    query<T = any>(text: string, params?: any[]): Promise<QueryResult<T>>;
    end(): Promise<void>;
  }
}