export const kind = 'argument';
export const ArgumentKind = kind;
export type Argument = { kind: typeof kind; name: string };
export const arg = (name: string): Argument => ({ kind, name });
