---
added: 2018-11-14 23:01:43+00:00
creators:
- Thomas Padilla
- Miranda Barrie
- Tammi Kim
dates:
- end: 2017-10-07
  start: 2017-09-29
published: 2018-11-14
slug: 20181114-2017-shooting-in-las-vegas
subjects:
- Las Vegas
- Mass Shooting
title: 2017 Shooting in Las Vegas
tweets: 14108104
url: http://d.library.unlv.edu/digital/collection/p17304coll5/id/20087/rec/1
---

This dataset contains 14,108,104 tweets that document the mass shooting that occurred in Las Vegas, Nevada on September 1, 2017. Data were gathered via concurrent queries to the Twitter search API for all tweets containing the term "vegas", occurring September 29 - October 7 before 5:00 PM PT. Because of the volume, and the fact that the tweets were being recorded after the event, but within the 7 day time window of the search API, the data was collected by limiting the search to a particular day, for example, "vegas until:2017-10-03", "vegas until:2017-10-04", "vegas until:2017-10-05", etc. The resulting JSON data was then deduplicated using twarc's deduplicate.py utility, the identifers were then sorted chronologically.
