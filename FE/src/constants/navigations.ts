const mainNavigations = {
  HOME: 'Home',
  FEED: 'Feed',
  CALENDAR: 'Calendar',
} as const;

// as const로 선언하면 readonly로 만듬
const authNavigations = {
  AUTH_HOME: 'AuthHome',
  LOGIN: 'Login',
  SIGNUP: 'Signup',
} as const;

const mapNavigations = {
  MAP_HOME: 'MapHome',
  ADD_POST: 'AddPost',
} as const;

const feedNavigations = {
  FEED_HOME: 'FeedHome',
  FEED_DETAIL: 'FeedDetail',
  EDIT_POST: 'EditPost',
  IMAGE_ZOOM: 'ImageZoom',
} as const;

const feedTabNavigations = {
  FEED_HOME: 'FeedTabHome',
  FEED_FAVORITE: 'FeedFavorite',
} as const;

export {
  mainNavigations,
  authNavigations,
  mapNavigations,
  feedNavigations,
  feedTabNavigations,
};
