export const hasMessage = (
  x: unknown
): x is { message: string } => {
  if (typeof x !== 'object' || x === null)
    return false;
  const m = (x as { message?: unknown }).message;
  return typeof m === 'string';
};

export const hasErrorArray = (
  x: unknown
): x is {
  errors: Array<{ message?: string }>;
} => {
  if (typeof x !== 'object' || x === null)
    return false;
  const e = (x as { errors?: unknown }).errors;
  if (!Array.isArray(e)) return false;

  return e.some(
    (it) =>
      typeof (it as { message?: unknown })
        .message === 'string'
  );
};
