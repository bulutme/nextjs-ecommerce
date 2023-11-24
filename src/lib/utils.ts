// function to generate id
export function generateShortId(length = 8) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let shortId = "";

  for (let i = 0; i < length; i++) {
    const randomCharacter = characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
    shortId += randomCharacter;
  }

  return shortId;
}
