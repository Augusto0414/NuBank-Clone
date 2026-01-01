export const hasNullOrEmptyValues = (obj: Record<string, any>) =>
  Object.values(obj).some(
    (value) =>
      value === null || value === undefined || (typeof value === 'string' && value.trim() === '')
  );
