const defaults = ['https://myapi.filmtanapon.com','http://localhost:5173','http://localhost:8080','http://localhost:3001'];
const origins = new Set([...defaults,...(process.env.CORS_ORIGINS || '').split(',').map(value=>value.trim()).filter(Boolean)]);
module.exports = {
  origin(origin,callback) { callback(null,!origin || origins.has(origin)); },
  credentials: true,
};
