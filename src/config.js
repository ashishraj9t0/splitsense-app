const browserHost =
  typeof window !== 'undefined' ? window.location.hostname : 'localhost';
const browserProtocol =
  typeof window !== 'undefined' && window.location.protocol === 'https:'
    ? 'https:'
    : 'http:';

const API_URL =
  process.env.REACT_APP_API_URL || `${browserProtocol}//${browserHost}:8080`;

export { API_URL };
