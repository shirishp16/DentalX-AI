import os
import shutil
import pandas as pd

def csv_image_sort(csv_file, source_dir, destination_dir):

    # Read all CSV file names
    df = pd.read_csv(csv_file)
    substrings = df['filename'].dropna().astype(str).tolist()

    # Cache source image file names 
        # Handles copying repeated images
    all_files = os.listdir(source_dir)

    def unique_dst_path(dst_dir, filename):
        # If filename exists in dst_dir (1st copy), append _1, _2, etc. before extension
        # until non-existent path is found, then return that full path.
        
        base, ext = os.path.splitext(filename)
        candidate = filename
        counter = 1
        dst_path = os.path.join(dst_dir, candidate)
        while os.path.exists(dst_path):
            candidate = f"{base}_{counter}{ext}"
            dst_path = os.path.join(dst_dir, candidate)
            counter += 1
        return dst_path

    # Copy images and create path to destination
    copied = 0
    missing = []
    for sub in substrings:
        matches = [f for f in all_files if sub in f]
        if not matches:
            missing.append(sub)
            continue
        for fname in matches:
            src_path = os.path.join(source_dir, fname)
            dst_path = unique_dst_path(destination_dir, fname)
            try:
                shutil.copy2(src_path, dst_path)
                copied += 1
            except FileNotFoundError:
                missing.append(fname)

    print(f"Created {copied} copies in '{destination_dir}'.")
    if missing:
        print("No images found / could not copy the following images:", missing)


# Configuration
csv_path = input("Enter csv file path:")                        # CSV with header including 'filename'
source_path  = input("Enter image source folder path:")          # folder containing all images
destination_path  = input("Enter destination folder path:")      # existing folder to move the copies

csv_image_sort(csv_path, source_path, destination_path)

# Example input:
'test/testCavity.csv'   
'archive copy/test'
'test/Cavity'