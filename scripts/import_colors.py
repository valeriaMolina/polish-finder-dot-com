# author: Valeria Molina Recinos

import pandas as pd
import requests

# importing os module for environment variables
import os
from dotenv import load_dotenv
# loading variables from .env file
load_dotenv()

df = pd.read_csv('./notion_dumps/kat.csv')

# remove rows with incomplete entries
df = df.dropna()

url = os.getenv('SERVER')

# iterate through colors and insert through an API
for color in df['Primary Color']:
    # insert color into DB
    endpoint = url + '/colors/new'
    headers = {
        'Authorization': 'Bearer ' + os.getenv('TOKEN')
    }
    body = {
        'name': color
    }
    r = requests.post(endpoint, headers=headers, data=body)
    # verify response
    if r.status_code == requests.codes.ok:
        print(f'Inserted color: {color}')
    else:
        print(f'Color {color} already exists in the DB')

# iterate through effect colors
for color in df['Effects Colors']:
    # insert effect colors into DB
    endpoint = url + '/colors/new'
    headers = {
        'Authorization': 'Bearer ' + os.getenv('TOKEN')
    }
    effect_colors = color.split(',')
    for effect in effect_colors:
        body = {
            'name': effect.strip()
        }
        r = requests.post(endpoint, headers=headers, data=body)
        # verify response
        if r.status_code == requests.codes.ok:
            print(f'Inserted effect color: {effect}')
        else:
            print(f'Effect color {effect} already exists in the DB')
    