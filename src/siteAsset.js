/** Returns an asset URL that works locally and on GitHub Pages. */
export const siteAsset = (path) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
