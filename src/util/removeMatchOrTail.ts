/** Remove an element from an array if it matches; otherwise remove the last element */
export const removeMatchOrTail = <T>(arr: T[], toMatch: T): T[] => {
  const arrCopy = [...arr];

  if (arrCopy.length === 0) {
    return arrCopy;
  }

  const matchedIndex = arrCopy.indexOf(toMatch);

  if (matchedIndex === -1) {
    return arrCopy.slice(0, -1);
  }

  // remove at index
  arrCopy.splice(matchedIndex, 1);

  return arrCopy;
};
