export const environment = {
  production: true,
  host: () => {
    return window.location.protocol + '//' + window.location.hostname;
  },
  googleAPI: () => {
    return '329968499656-ctmlqjdad69qkqkko2bqhqlifo7fcibl.apps.googleusercontent.com';
  }
};
