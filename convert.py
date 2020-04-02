# A one-off script used to convert the old catalog YAML into separate Markdown files.

import re
import yaml
import slugify
import requests
import urllib.parse

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
    return {"start": dates[0].strftime('%Y-%m-%d'), "end": dates[1].strftime('%Y-%m-%d')}

emails = {
    "Ed Summers": "ehs@pobox.com",
    "Bergis Jules": "bergis.jules@gmail.com",
    "Nick Ruest": "ruestn@yorku.ca"
}

# a mapping of existing dataset urls to repository names
repos = {
    "archive.org": "Internet Archive",
    "d.library.unlv.edu": "University of Las Vegas",
    "datadryad.org:443": "Dryad",
    "dataverse.harvard.edu": "Harvard Dataverse",
    "dataverse.lib.virginia.edu": "University of Virginia Dataverse",
    "dataverse.library.ualberta.ca": "University of Alberta Dataverse",
    "dataverse.scholarsportal.info": "Scholars Portal Dataverse",
    "dfreelon.org": "dreelon.org",
    "digital.library.unt.edu": "University of North Texas",
    "figshare.com": "Figshare",
    "github.com": "GitHub",
    "ieee-dataport.org": "IEEE",
    "purr.purdue.edu": "Purdue University",
    "qufaculty.qu.edu.qa": "Qatar University",
    "ubdc.gla.ac.uk": "University of Glasgow",
    "www.docnow.io": "Documenting the Now",
    "www.microsoft.com": "Microsoft",
    "zenodo.org": "Zeonodo"
}

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

    d['creators'] = []
    for name in d['creator']:
        email = emails.get(name, None)
        d['creators'].append({'name': name, 'email': email})
    del d['creator']

    d['tweets'] = int(d['tweets'].replace(',', ''))

    title = slugify.slugify(d['title'])
    dt = d['added'].strftime('%Y%m%d')
    slug = "{}-{}".format(dt, title)
    path = "src/datasets/{}.md".format(slug)

    # d['slug'] = slug

    resp = requests.get(d['url'])
    host = urllib.parse.urlparse(resp.url).netloc
    d['repository'] = repos[host]

    meta = yaml.dump(d, default_flow_style=False)

    fh = open(path, 'w')
    fh.write('---\n')
    fh.write(meta)
    fh.write('---\n\n')
    fh.write(desc)

    print(slug)
