/* eslint-disable @typescript-eslint/no-explicit-any */
export type Validator = (data: any) => { error?: Error; value: any };
