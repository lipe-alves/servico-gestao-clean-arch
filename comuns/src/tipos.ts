export type Json<T extends object> = { [K in keyof T]: T[K] };
