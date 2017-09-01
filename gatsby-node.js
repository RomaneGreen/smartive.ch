exports.onCreatePage = ({ page, boundActionCreators }) => {
  const { createPage, deletePage } = boundActionCreators;
  const newPage = Object.assign({}, page);

  return new Promise((resolve) => {
    // Remove trailing slash
    const oldPath = newPage.path;
    // Removing '/' would result in a path that's
    // an empty string which is invalid
    newPage.path = newPage.path === '/' ? newPage.path : newPage.path.replace(/\/$/, '');
    if (newPage.path !== oldPath) {
      // Remove the old page
      deletePage({ path: oldPath });

      // Add the new page
      createPage(newPage);
    }

    resolve();
  });
};
