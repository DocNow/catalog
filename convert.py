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

id = 0
for d in datasets:
    id += 1
    print(id, d['title'])

    desc = d['description']
    del d['description']

    if type(d['creator']) != list:
        d['creator'] = [d['creator']]

    if type(d['dates']) == list:
        d['dates'] = list(map(unpack_date, d['dates']))
    else:
        d['dates'] = [unpack_date(d['dates'])]

    meta = yaml.dump(d, default_flow_style=False)

    slug = slugify.slugify(d['title'])
    dt = d['added'].strftime('%Y%m%d')
    path = "src/datasets/{}-{}.md".format(dt, slug)
    fh = open(path, 'w')
    fh.write('---\n')
    fh.write(meta)
    fh.write('---\n\n')
    fh.write(desc)