export const getRandomStringFromList = (list: string[]): string => {
  if (!list?.[0]) {
    throw new Error("Word list is empty");
  }

  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
};
