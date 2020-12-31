---
title: SolarWinds
url: 'https://archive.org/details/solarwinds-tweet-ids'
repository: Internet Archive
tweets: 364170
creators:
  - name: Ed Summers
dates:
  - start: 2020-12-10T19:47:59.193Z
    end: 2020-12-19T19:47:59.217Z
published: 2020-12-30T19:47:05.059Z
added: 2020-12-30T19:47:05.104Z
subjects:
  - Cybersecurity
  - Russia
  - United States
notification: ''
optout: ''
---
This dataset contains 364,170 identifiers for tweets containing the keyword "solarwinds" that were sent between December 10 and December 19, 2020. On December 13 the US Department of Homeland Security released [Emergency Directive 21-01](https://cyber.dhs.gov/ed/21-01/) which ordered all federal agencies to immediately disconnect and power down any computers running the SolarWinds Orion software. On the same day news broke that hackers, most likely working for Russia, had compromised computer systems at the US Treasury and Commerce Departments using an exploit in Orion's software updates.

Tweets were collected from Twitter's Search API using [twarc](https://github.com/docnow/twarc). Collection started at 2020-12-18 19:20:50 EST and finished at 2020-12-19 23:16:13 EST.

In addition to the tweet identifiers (ids.txt) the dataset includes a file urls.csv which is a count of URLs linked to from the tweets. The URLs were unshortened using the [unshrtn](https://github.com/docnow/unshrtn) utility.