const parseContactType = (value) => {
  const includesType = ['work', 'home', 'personal'].includes(value);

  if (typeof value !== 'string' || !includesType) return;

  return value;
};

const parseIsFavourite = (value) => {
  const includesIsFavourite = ['true', 'false'].includes(value);

  if (
    typeof value === 'undefined' ||
    typeof value !== 'string' ||
    !includesIsFavourite
  )
    return;

  return value;
};

export const parseFilterParams = (query) => {
  const { isFavourite, contactType } = query;

  const parsedContactType = parseContactType(contactType);
  const parsedIsFavourite = parseIsFavourite(isFavourite);
  console.log('ContactType:', parsedContactType);
  console.log('IsFavourite:', parsedIsFavourite);

  return {
    isFavourite: parsedIsFavourite,
    type: parsedContactType,
  };
};
