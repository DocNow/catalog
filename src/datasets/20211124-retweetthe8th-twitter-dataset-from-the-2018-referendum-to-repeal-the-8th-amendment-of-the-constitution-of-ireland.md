---
title: "#retweetthe8th: 2018 Referendum to repeal the 8th Amendment of the Constitution of Ireland"
url: https://zenodo.org/record/3842013#.YZ5iUvGnzUr
repository: Zenodo
tweets: 2108784
creators:
  - name: Emmet Ó Briain
    email: emmet@quiddity.ie
  - name: Jennifer Foster
dates:
  - start: 2018-03-09T00:00:00.000Z
    end: 2018-05-29T23:00:00.000Z
published: 2021-11-24T16:02:59.542Z
added: 2021-11-24T16:02:59.567Z
subjects:
  - Ireland
  - Politics
  - Abortion
collecting: "See: archivingthe8th.ucd.ie"
---

This dataset contains the tweet ids of 2,108,782 tweets related to the referendum to repeal the 8th Amendment of the Constitution of Ireland and replace it with the Thirty-sixth Amendment of the Constitution of Ireland on May 25, 2018. 

They were collected between March 9th, 2018 and May 30th, 2018 from the Twitter filter stream API using [twarc](https://github.com/docnow/twarc). The set of terms that were used for the search were: #repealthe8th, #together4yes, #8thref, #savethe8th, #hometovote, #togetherforyes, #repealedthe8th, #loveboth, #voteyes, #voteno, #lovebothvoteno, #repealtheeighth.

Note that the terms changed during the course of data collection and that the searches were not exhaustive.

The Twitter API *statuses/lookup* method supports retrieving the complete tweet
for a tweet id (known as hydrating). Twarc and Hydrator can also be used to
hydrate tweets.

Per Twitter’s Developer Policy, tweet ids may be publicly shared for academic purposes; tweets may not.

There are several practical reasons to leave the retweets, as it allows researchers to trace important tweets and their dissemination. 

However, for researchers that might be interested in NLP tasks for which retweets are not required, a set of 411,213 tweet ids without their retweets is also included in the zip file.

Questions about this dataset can be sent to Emmet Ó Briain
[emmet@quiddity.ie](mailto:emmet@quiddity.ie).
