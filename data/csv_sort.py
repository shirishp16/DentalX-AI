import pandas as pd

def data_sort(path_csv, class_name, sorted_csv):
    
    df = pd.read_csv(path_csv)
    sorted_df = df[df['class'] == class_name]
    sorted_df.to_csv(sorted_csv, index=False)
    print(f"Successfully sorted {class_name} data.")

file_path = input("Enter the csv file path:")
category = input("Enter the desired class to sort:")
new_file_name = input("Enter a name for the new file:")

data_sort(file_path, category, new_file_name)

# Example input:
'_train.csv'
'Cavity'
'trainCavity.csv'