---
title: 2020 United States Presidential Election
url: https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/UCJUUZ
repository: Harvard Dataverse
tweets: 278326832
creators:
  - name: Laura Wrubel
    email: lwrubel@gwu.edu
  - name: Dan Kerchner
    email: kerchner@gwu.edu
dates:
  - start: 2007-10-24T04:00:00.000Z
    end: 2021-02-10T19:40:19.048Z
published: 2021-06-21T18:38:58.430Z
added: 2021-06-21T18:38:58.443Z
subjects:
  - Elections
  - Politics
  - United States
  - Government
notification: No
optout: "Content creators can get in touch with us at sfm@gwu.edu if they would
  like their tweet identifiers or tweets removed from collections. "
contact: sfm@gwu.edu
collecting: "GWU collects social media related to elections as part of support
  for campus research on elections, disinformation, and government. "
---
This dataset contains the tweet ids of 295,670,111 tweets related to the 2020 United States Presidential Election. They were collected during 2020 and 2021 from the Twitter API using [Social Feed Manager](https://gwu-libraries.github.io/sfm-ui).  The tweet ids are broken up into eleven collections. Each collection was collected either from the GET statuses/user_timeline method of the Twitter REST API or the POST statuses/filter method of the Twitter Stream API.  See each collection's README for dates of collection, accounts, and hashtags used in queries. The collections are:

* Democratic candidates (Twitter user timeline)
* Republican candidates (Twitter user timeline)
* Democratic candidates filter (Twitter filter)
* Republican candidates filter (Twitter filter)
* Election 2020 hashtags (Twitter filter)
* Democratic Convention (Twitter filter)
* Republican Convention (Twitter filter)
* First presidential debate (Twitter filter)
* Second presidential debate (Twitter filter)
* Vice Presidential debate (Twitter filter)
* Election Day (Twitter filter)

There is a README.txt file for each collection containing additional documentation on how it was collected.

For tweets collected from the Twitter filter stream, this is not a complete set of tweets that match the filter. Gaps may exist because:

* Twitter limits the number of tweets returned by the filter at any point in time.
* Social Feed Manager stops and starts the Twitter filter stream every 30 minutes.
* In Social Feed Manager, collecting is turned off while a user is making changes to the collection criteria.
* There were some operational issues, e.g., network interruptions and maintenance, during the collection period.

Because candidate user timelines were collected and Twitter provides roughly the most recent 3,200 tweets, user timeline collections may includes tweets as early as 2007.