# A one-off script used to convert the old catalog YAML into separate Markdown files.

import re
import yaml
import slugify

from datetime import date, datetime
from dateutil.parser import parse

datasets = yaml.load(open('static/data/datasets.yml'), Loader=yaml.Loader)
datasets.sort(key=lambda d: d['added'])

def json_serial(obj):
    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    raise TypeError ("Type %s not serializable" % type(obj))

def unpack_date(s):
    dates = s.split(' - ')
    dates = list(map(lambda d: parse(d).date(), dates))
    return {"start": dates[0], "end": dates[1]}

for d in datasets:

    desc = d['description']
    del d['description']

    if type(d['creator']) != list:
        d['creator'] = [d['creator']]

    if type(d['dates']) == list:
        d['dates'] = list(map(unpack_date, d['dates']))
    else:
        d['dates'] = [unpack_date(d['dates'])]

    subjects = []
    for tag in d['tags']:
        subjects.append(' '.join([t.capitalize() for t in tag.split()]))
    d['subjects'] = subjects
    del d['tags']

    d['creators'] = d['creator']
    del d['creator']

    d['tweets'] = int(d['tweets'].replace(',', ''))

    title = slugify.slugify(d['title'])
    dt = d['added'].strftime('%Y%m%d')
    slug = "{}-{}".format(dt, title)
    path = "src/datasets/{}.md".format(slug)

    d['slug'] = slug
    meta = yaml.dump(d, default_flow_style=False)

    fh = open(path, 'w')
    fh.write('---\n')
    fh.write(meta)
    fh.write('---\n\n')
    fh.write(desc)

    print(slug)