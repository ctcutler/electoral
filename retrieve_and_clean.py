from collections import namedtuple
import json
import os.path

from openpyxl import load_workbook
import requests

DATA_DIR = 'source_files/electorate-profiles-2016'
JS_FILE = 'states.js'
E_VOTES = {
    'Alabama': 9, 'Alaska': 3, 'Arizona': 11, 'Arkansas': 6, 'California': 55,
    'Colorado': 9, 'Connecticut': 7, 'Delaware': 3, 'District of Columbia': 3,
    'Florida': 29, 'Georgia': 16, 'Hawaii': 4, 'Idaho': 4, 'Illinois': 20,
    'Indiana': 11, 'Iowa': 6, 'Kansas': 6, 'Kentucky': 8, 'Louisiana': 8,
    'Maine': 4, 'Maryland': 10, 'Massachusetts': 11, 'Michigan': 16,
    'Minnesota': 10, 'Mississippi': 6, 'Missouri': 10, 'Montana': 3,
    'Nebraska': 5, 'Nevada': 6, 'New Hampshire': 4, 'New Jersey': 14,
    'New Mexico': 5, 'New York': 29, 'North Carolina': 15, 'North Dakota': 3,
    'Ohio': 18, 'Oklahoma': 7, 'Oregon': 7, 'Pennsylvania': 20,
    'Rhode Island': 4, 'South Carolina': 9, 'South Dakota': 3,
    'Tennessee': 11, 'Texas': 38, 'Utah': 6, 'Vermont': 3, 'Virginia': 13,
    'Washington': 12, 'West Virginia': 5, 'Wisconsin': 10, 'Wyoming': 3,
}
DataPoint = namedtuple('DataPoint', ['desc', 'value'])
DATA_POINTS = [
    DataPoint(desc='A3', value='B3'),
    DataPoint(desc='A5', value='B5'),
    DataPoint(desc='A6', value='B6'),
    DataPoint(desc='A7', value='B7'),
    DataPoint(desc='A8', value='B8'),
    DataPoint(desc='A10', value='B10'),
    DataPoint(desc='A11', value='B11'),
    DataPoint(desc='A13', value='B13'),
    DataPoint(desc='A14', value='B14'),
    DataPoint(desc='A15', value='B15'),
    DataPoint(desc='A16', value='B16'),
    DataPoint(desc='A17', value='B17'),
    DataPoint(desc='A18', value='B18'),
    DataPoint(desc='A19', value='B19'),
    DataPoint(desc='A21', value='B21'),
    DataPoint(desc='A22', value='B22'),
    DataPoint(desc='A23', value='B23'),
    DataPoint(desc='A24', value='B24'),
    DataPoint(desc='A25', value='B25'),
    DataPoint(desc='A26', value='B26'),
    DataPoint(desc='A27', value='B27'),
    DataPoint(desc='A28', value='B28'),
    DataPoint(desc='A29', value='B29'),
]

# urls found at: http://www.census.gov/data/tables/time-series/demo/voting-and-registration/electorate-profiles-2016.html
URL = 'http://www2.census.gov/programs-surveys/demo/tables/voting/{}.xlsx'

pop_counts = {}
for state, e_votes in E_VOTES.items():
    print(state)
    pop_counts[state] = { 'Electoral votes': e_votes }
    fn = os.path.join(DATA_DIR, state+'.xlsx')

    if not os.path.exists(fn):
        url = URL.format(state.replace(' ', ''))
        r = requests.get(url)
        with open(fn, 'wb') as f:
            f.write(r.content)

    wb = load_workbook(fn)
    ws = wb[wb.sheetnames[0]]
    for data_point in DATA_POINTS:
        desc = ws[data_point.desc].value
        value = ws[data_point.value].value
        pop_counts[state][desc] = value

with open(JS_FILE, 'w') as f:
    f.write('export const states = ')
    f.write(json.dumps(pop_counts, indent=2, sort_keys=True))
    f.write(';\n')
