from collections import namedtuple
import os.path

from openpyxl import load_workbook
import requests

DATA_DIR = 'source_files/electorate-profiles-2016'
STATES = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia',
    'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
    'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
    'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina',
    'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas',
    'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin',
    'Wyoming',
]
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

for state in STATES:
    print(state)
    fn = os.path.join(DATA_DIR, state+'.xlsx')

    if not os.path.exists(fn):
        url = URL.format(state.replace(' ', ''))
        r = requests.get(url)
        with open(fn, 'wb') as f:
            f.write(r.content)

    wb = load_workbook(fn)
    ws = wb[wb.sheetnames[0]]
    pop_counts = {}
    for data_point in DATA_POINTS:
        desc = ws[data_point.desc].value
        value = ws[data_point.value].value
        pop_counts[desc] = value
    print(pop_counts)
