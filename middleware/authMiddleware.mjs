export const checkAuthenticated = (request, response, next) => {
  return request.isAuthenticated() ? next() : response.redirect('/login');
};

export const checkIsNotAuthenticated = (request, response, next) => {
  return request.isAuthenticated() ? response.redirect('/dashboard') : next();
};
