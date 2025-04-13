const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Path to the service account key file
const serviceAccountPath = path.resolve(process.env.HOME, 'Downloads', 'Mladezovy Zpevnik Firebase Service Account.json');

// Initialize Firebase Admin with the service account
try {
  const serviceAccount = require(serviceAccountPath);
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
  });

  console.log('Firebase Admin initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase Admin:', error);
  process.exit(1);
}

// Reference to Firestore
const db = admin.firestore();

// Function to export songs
async function exportSongs() {
  try {
    console.log('Fetching songs from Firebase...');
    
    // Get all songs from the 'songs' collection
    const songsSnapshot = await db.collection('songs').get();
    
    if (songsSnapshot.empty) {
      console.log('No songs found in the database.');
      process.exit(0);
    }
    
    // Convert the songs to an array of objects
    const songs = [];
    songsSnapshot.forEach(doc => {
      const songData = doc.data();
      songs.push({
        id: doc.id,
        number: songData.number,
        name: songData.name,
        checkRequired: songData.checkRequired,
        withChords: songData.withChords,
        withoutChords: songData.withoutChords
      });
    });
    
    console.log(`Found ${songs.length} songs.`);
    
    // Write the songs to a JSON file
    const outputPath = path.resolve(__dirname, 'data.json');
    fs.writeFileSync(outputPath, JSON.stringify(songs, null, 2));
    
    console.log(`Songs exported successfully to ${outputPath}`);
    process.exit(0);
  } catch (error) {
    console.error('Error exporting songs:', error);
    process.exit(1);
  }
}

// Run the export function
exportSongs();