#!/usr/bin/env python3
import json
import os
import math

# Script to split data.json into separate files with 5 songs each

def main():
    # Read the data.json file
    with open('data.json', 'r', encoding='utf-8') as file:
        data = json.load(file)
    
    # Calculate how many files we'll need
    total_songs = len(data)
    songs_per_file = 5
    num_files = math.ceil(total_songs / songs_per_file)
    
    print(f"Total songs: {total_songs}")
    print(f"Will create {num_files} files with {songs_per_file} songs each (last file may have fewer)")
    
    # Split the songs into groups and write each group to a separate file
    for i in range(num_files):
        # Calculate the start and end indices for this group
        start_idx = i * songs_per_file
        end_idx = min((i + 1) * songs_per_file, total_songs)
        
        # Get the songs for this group
        songs_group = data[start_idx:end_idx]
        
        # Create the output filename
        output_filename = f"songs_{i+1}.json"
        
        # Write the songs to the output file
        with open(output_filename, 'w', encoding='utf-8') as outfile:
            json.dump(songs_group, outfile, ensure_ascii=False, indent=2)
        
        print(f"Created {output_filename} with songs {start_idx+1} to {end_idx}")

if __name__ == "__main__":
    main()