const getpublishTimeAgo = (publishDate) => {
  const numOfHours = Math.ceil((Date.now() - Date.parse(publishDate)) / 3600000);
  if (numOfHours >= 24) {
    return `${Math.floor(numOfHours / 24)} days ago`;
  }
  return `${numOfHours} hours ago`;
};

module.exports = getpublishTimeAgo;
