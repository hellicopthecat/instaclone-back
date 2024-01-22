export const makeHashtags = (caption: string) => {
  const hashTags = caption.match(/#[\w]+/g) || null;
  return hashTags?.map((hashtag) => ({
    where: { hashtag },
    create: { hashtag },
  }));
};
