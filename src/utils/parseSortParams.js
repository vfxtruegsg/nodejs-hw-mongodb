const parseSortBy = (value) => {
  if (typeof value === 'undefined') return '_id';

  const keys = ['_id', 'name', 'phoneNumber', 'email', 'createdAt'];

  if (!keys.includes(value)) return '_id';

  return value;
};

const parseSortOrder = (value) => {
  if (typeof value === 'undefined') return 'asc';

  if (!['asc', 'desc'].includes(value)) return 'asc';

  return value;
};

export const parseSortParams = (query) => {
  const { sortBy, sortOrder } = query;

  const parsedSortBy = parseSortBy(sortBy);
  const parsedSortOrder = parseSortOrder(sortOrder);

  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
};
