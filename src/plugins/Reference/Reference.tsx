export const kind = 'reference';
export const ReferenceKind = kind;
export type Reference = { kind: typeof kind; name: string };
export const ref = (name: string): Reference => ({ kind, name });
