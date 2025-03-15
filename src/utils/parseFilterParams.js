const parseContactType = (value) => {
  if (
    typeof value !== 'string' ||
    !['work', 'home', 'personal'].includes(value)
  )
    return;

  return value;
};

const parseIsFavourite = (value) => {
  if (typeof value === 'undefined' || typeof gender === 'string') return;

  if (!['true', 'false'].includes(toString(value))) return;

  return value;
};

export const parseFilterParams = (query) => {
  const { isFavourite, contactType } = query;

  const parsedContactType = parseContactType(contactType);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    isFavouriteValue: parsedIsFavourite,
    contactTypeValue: parsedContactType,
  };
};
