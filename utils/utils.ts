/**const customGalleryStyles = (imageNumber: number): string =>
    `relative w-${getRandomInt(9, 6)}/10 transform  ${
      getRandomInt(2) === 1 ? "-" : ""
    }translate-x-${getRandomInt(12)} ${
      "-translate-y-" + getRandomInt(imageNumber * 5, imageNumber * 4) * 4
    } m${imageNumber % 2 === 1 ? "l" : "r"}-auto`;
*/
export const customGalleryStyles = (imageNumber: number): string =>
  `relative w-${getRandomInt(9, 6)}/10 ${
    getRandomInt(2) === 1 ? "-" : ""
  }transform-${getRandomInt(5, 1)}-${getRandomInt(
    imageNumber * 3,
    imageNumber * 2
  )}-${getRandomInt(imageNumber * 2, imageNumber * 1)} m${
    imageNumber % 2 === 1 ? "l" : "r"
  }-auto ${getRandomInt(2) === 1 ? "-" : ""}z-index-${getRandomInt(10)}`;

const getRandomInt = (max: number, min?: number): number => {
  const randomNumber = Math.floor(Math.random() * max);
  if (!min || randomNumber > min) {
    return randomNumber;
  }
  return Math.ceil(min);
};
