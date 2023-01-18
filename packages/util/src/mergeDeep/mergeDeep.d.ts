type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};
type GetObjDifferentKeys<T, U, T0 = Omit<T, keyof U> & Omit<U, keyof T>, T1 = {
    [K in keyof T0]: T0[K];
}> = T1;
type GetObjSameKeys<T, U> = Omit<T | U, keyof GetObjDifferentKeys<T, U>>;
type MergeTwoObjects<T, U, T0 = Partial<GetObjDifferentKeys<T, U>> & {
    [K in keyof GetObjSameKeys<T, U>]: DeepMergeTwoTypes<T[K], U[K]>;
}, T1 = {
    [K in keyof T0]: T0[K];
}> = T1;
type DeepMergeTwoTypes<T, U> = [T, U] extends [
    {
        [key: string]: unknown;
    },
    {
        [key: string]: unknown;
    }
] ? MergeTwoObjects<T, U> : T | U;
export declare function mergeDeep<T extends Record<string, unknown>>(target: T, ...sources: RecursivePartial<T>[]): DeepMergeTwoTypes<T, RecursivePartial<T>>;
export default mergeDeep;
