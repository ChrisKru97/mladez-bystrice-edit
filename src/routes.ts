const login = "/login";
const register = "/register";
const root = "/";
const song = (id?: string): string => `/song/${id ?? ":songId"}`;
const addSong = song("add");

export default {
  login,
  register,
  root,
  song,
  addSong,
};
