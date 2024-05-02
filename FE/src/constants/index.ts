// as const로 선언하면 readonly로 만듬
const authNavigations = {
  AUTH_HOME: 'AuthHome',
  LOGIN: 'Login',
  SIGNUP: 'Signup',
} as const;

export {authNavigations};
