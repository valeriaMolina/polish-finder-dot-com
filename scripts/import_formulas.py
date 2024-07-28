# author: Valeria Molina Recinos

import pandas as pd
import requests

# importing os module for environment variables
import os
# importing necessary functions from dotenv library
from dotenv import load_dotenv
# loading variables from .env file
load_dotenv() 

df = pd.read_csv('./notion_dumps/kat.csv')

# remove notion metadata
df['Brand'] = df['Brand'].str.replace(r'\s*\(.*?\)', '', regex=True).str.strip()

# remove rows with incomplete entries
df = df.dropna()

# print to verify
print(df)

url = os.getenv('SERVER')

# iterate through all brands and insert through an API
for formula in df['Formula']:
    # insert formula into DB
    endpoint = url + '/formulas/new'
    # headers = {
    #     'Authorization': 'Bearer ' + os.getenv('TOKEN')
    # }
    formulas = formula.split(',')
    for fname in formulas:
        body = {
            'formula': fname.strip()
        }
        r = requests.post(endpoint, data=body)
        # verify response
        if r.status_code == requests.codes.ok:
            print(f'Inserted formula: {fname}')
        else:
            print(f'Formula {fname} already exists in the DB')


