// English to Czech translations for the application UI

// Define the structure of our translations
export type Translations = {
  [key: string]: string;
};

// English translations (used as keys)
export const en: Translations = {
  // Navigation menu
  "Song List": "Song List",
  "Add Song": "Add Song",
  "Logout": "Logout",
  "Login": "Login",
  "Register": "Register",
  
  // Song form
  "Song Name": "Song Name",
  "Enter song name": "Enter song name",
  "Song Number": "Song Number",
  "Enter song number (optional)": "Enter song number (optional)",
  "Lyrics with Chords in [brackets]": "Lyrics with Chords in [brackets]",
  "Enter lyrics with chords in [brackets], e.g. [G]Amazing [D]grace, how [C]sweet the [G]sound": "Enter lyrics with chords in [brackets], e.g. [G]Amazing [D]grace, how [C]sweet the [G]sound",
  "Place chords in [square brackets] before the syllable they belong to.": "Place chords in [square brackets] before the syllable they belong to.",
  "Cancel": "Cancel",
  "Saving...": "Saving...",
  "Update Song": "Update Song",
  
  // Song list
  "Error loading songs: {error}": "Error loading songs: {error}",
  "Search songs by name or number...": "Search songs by name or number...",
  "No songs found. Add your first song!": "No songs found. Add your first song!",
  "No songs match your search.": "No songs match your search.",
  "Number: {number}": "Number: {number}",
  
  // Login page
  "An error occurred during login. Please try again.": "An error occurred during login. Please try again.",
  "An error occurred during Google login. Please try again.": "An error occurred during Google login. Please try again.",
  "Login to Songbook Editor": "Login to Songbook Editor",
  "Email": "Email",
  "your@email.com": "your@email.com",
  "Password": "Password",
  "Logging in...": "Logging in...",
  "OR": "OR",
  "Sign in with Google": "Sign in with Google",
  "Don't have an account?": "Don't have an account?",
  "Register here": "Register here",
  
  // Register page
  "Passwords do not match": "Passwords do not match",
  "Password must be at least 6 characters long": "Password must be at least 6 characters long",
  "An error occurred during registration. Please try again.": "An error occurred during registration. Please try again.",
  "Create an Account": "Create an Account",
  "Confirm Password": "Confirm Password",
  "Registering...": "Registering...",
  "Already have an account?": "Already have an account?",
  "Login here": "Login here",
  
  // Add song page
  "An error occurred while adding the song. Please try again.": "An error occurred while adding the song. Please try again.",
  "Add New Song": "Add New Song",
  
  // Edit song page
  "Song not found": "Song not found",
  "An error occurred while updating the song. Please try again.": "An error occurred while updating the song. Please try again.",
  "Are you sure you want to delete this song? This action cannot be undone.": "Are you sure you want to delete this song? This action cannot be undone.",
  "An error occurred while deleting the song. Please try again.": "An error occurred while deleting the song. Please try again.",
  "Edit Song": "Edit Song",
  "Deleting...": "Deleting...",
  "Delete Song": "Delete Song"
};

// Czech translations
export const cs: Translations = {
  // Navigation menu
  "Song List": "Seznam písní",
  "Add Song": "Přidat píseň",
  "Logout": "Odhlásit se",
  "Login": "Přihlásit se",
  "Register": "Registrovat se",
  
  // Song form
  "Song Name": "Název písně",
  "Enter song name": "Zadejte název písně",
  "Song Number": "Číslo písně",
  "Enter song number (optional)": "Zadejte číslo písně (volitelné)",
  "Lyrics with Chords in [brackets]": "Text s akordy v [závorkách]",
  "Enter lyrics with chords in [brackets], e.g. [G]Amazing [D]grace, how [C]sweet the [G]sound": "Zadejte text s akordy v [závorkách], např. [G]Amazing [D]grace, how [C]sweet the [G]sound",
  "Place chords in [square brackets] before the syllable they belong to.": "Umístěte akordy v [hranatých závorkách] před slabiku, ke které patří.",
  "Cancel": "Zrušit",
  "Saving...": "Ukládání...",
  "Update Song": "Aktualizovat píseň",
  
  // Song list
  "Error loading songs: {error}": "Chyba při načítání písní: {error}",
  "Search songs by name or number...": "Hledat písně podle názvu nebo čísla...",
  "No songs found. Add your first song!": "Nebyly nalezeny žádné písně. Přidejte svou první píseň!",
  "No songs match your search.": "Žádné písně neodpovídají vašemu vyhledávání.",
  "Number: {number}": "Číslo: {number}",
  
  // Login page
  "An error occurred during login. Please try again.": "Při přihlašování došlo k chybě. Zkuste to prosím znovu.",
  "An error occurred during Google login. Please try again.": "Při přihlašování přes Google došlo k chybě. Zkuste to prosím znovu.",
  "Login to Songbook Editor": "Přihlášení do editoru zpěvníku",
  "Email": "E-mail",
  "your@email.com": "vas@email.cz",
  "Password": "Heslo",
  "Logging in...": "Přihlašování...",
  "OR": "NEBO",
  "Sign in with Google": "Přihlásit se přes Google",
  "Don't have an account?": "Nemáte účet?",
  "Register here": "Zaregistrujte se zde",
  
  // Register page
  "Passwords do not match": "Hesla se neshodují",
  "Password must be at least 6 characters long": "Heslo musí mít alespoň 6 znaků",
  "An error occurred during registration. Please try again.": "Při registraci došlo k chybě. Zkuste to prosím znovu.",
  "Create an Account": "Vytvořit účet",
  "Confirm Password": "Potvrdit heslo",
  "Registering...": "Registrace...",
  "Already have an account?": "Již máte účet?",
  "Login here": "Přihlaste se zde",
  
  // Add song page
  "An error occurred while adding the song. Please try again.": "Při přidávání písně došlo k chybě. Zkuste to prosím znovu.",
  "Add New Song": "Přidat novou píseň",
  
  // Edit song page
  "Song not found": "Píseň nebyla nalezena",
  "An error occurred while updating the song. Please try again.": "Při aktualizaci písně došlo k chybě. Zkuste to prosím znovu.",
  "Are you sure you want to delete this song? This action cannot be undone.": "Opravdu chcete tuto píseň smazat? Tuto akci nelze vrátit zpět.",
  "An error occurred while deleting the song. Please try again.": "Při mazání písně došlo k chybě. Zkuste to prosím znovu.",
  "Edit Song": "Upravit píseň",
  "Deleting...": "Mazání...",
  "Delete Song": "Smazat píseň"
};

// Default language
export const defaultLanguage = 'cs';

// Helper function to get a translation
export function t(key: string, params: Record<string, string | number> = {}): string {
  const translation = cs[key] || key;
  
  // Replace parameters in the translation
  return Object.entries(params).reduce((result, [param, value]) => {
    return result.replace(`{${param}}`, String(value));
  }, translation);
}