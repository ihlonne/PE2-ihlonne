export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('nb-NO', {
    timeZone: 'UTC',
  });
