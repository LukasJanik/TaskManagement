export const environment = {
  production: true,
  host: () => {
    return window.location.protocol + '//' + window.location.hostname;
  },
};
