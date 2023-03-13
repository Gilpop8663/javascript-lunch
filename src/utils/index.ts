const $ = (selector: string) => document.querySelector(selector);

const shortenString = (word: string, range: number) => {
  if (word.length > range) {
    return `${word.slice(0, range)}···`;
  }

  return word;
};

export { $, shortenString };
