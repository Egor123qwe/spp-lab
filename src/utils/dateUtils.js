export const formatDate = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('ru-RU');
};

export const getCurrentDate = () => {
  return new Date();
};
