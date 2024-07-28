# author: Valeria Molina Recinos

import pandas as pd
import requests
import os
from dotenv import load_dotenv

load_dotenv()

df = pd.read_csv('./notion_dumps/kat.csv')

# remove notion metadata
df['Brand'] = df['Brand'].str.replace(r'\s*\(.*?\)', '', regex=True).str.strip()

# remove rows with incomplete entries
df = df.dropna()

url = os.getenv('SERVER')

# iterate through all polishes and insert through an API
for index, row in df.iterrows():
    endpoint = url + '/polish/new'
    headers = {
        'Authorization': 'Bearer ' + os.getenv('TOKEN')
    }
    effect_colors = row['Effects Colors'].split(', ')
    formulas = row['Formula'].split(', ')
    body = {
        'brandName': row['Brand'],
        'type': 'Lacquer',
        'primaryColor': row['Primary Color'],
        'formulas': formulas,
        'name': row['Name'],
        'description': '',
        'effectColors': effect_colors
    }
    r = requests.post(endpoint, headers=headers, data=body)
    # verify response
    if r.status_code == 201:
        print(f'Inserted polish: {row["Name"]}')
    else:
        print(r.json())