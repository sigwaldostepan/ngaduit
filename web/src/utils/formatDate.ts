export const formatDate = (dateToBeFormatted: string) => {
  const date = new Date(dateToBeFormatted);

  const formattedDate = new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);

  return formattedDate;
};
