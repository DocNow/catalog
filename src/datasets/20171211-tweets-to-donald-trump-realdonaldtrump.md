---
title: Tweets to Donald Trump (@realDonaldTrump)
url: http://dx.doi.org/10.5683/SP/8BAVQM
repository: Scholars Portal Dataverse
tweets: 362464578
creators:
  - email: ruestn@yorku.ca
    name: Nick Ruest
dates:
  - end: 2017-06-21
    start: 2017-05-07
  - end: 2021-01-20T05:00:00.000Z
    start: 2017-06-23
published: 2017-12-10T00:00:00.000Z
added: 2017-12-11T07:40:01.000Z
subjects:
  - American Politics
  - Politics
  - Trump
---
362,464,578 tweet ids for tweets directed at Donald Trump (@realDonaldTrump), collected with [Documenting the Now's](http://www.docnow.io/) twarc. Tweets can be “[rehydrated](https://medium.com/on-archivy/on-forgetting-e01a2b95272)” with Documenting the Now’s [twarc](https://github.com/DocNow/twarc), or [Hydrator.](https://github.com/DocNow/hydrator)

`twarc hydrate to_realdonaldtrump_20210120_ids.txt > to_realdonaldtrump_20210120.jsonl`.

Collection notes:

* Tweets from May 7, 2017 - October 16, 2018 of the dataset used a combination of the Filter (Streaming) API and Search API.
* The Filter API failed on June 21, 2017.
* From June 23, 2017 forward only the Search API was used to collect.
* Collection was done every 5 days on a cron job, and periodically deduplicated.
* There is a data gap from `Tue Jul 28 13:53:50 +0000 2020` through `Thu Aug 06 09:36:23 +0000 2020` due to a collection error.

This dataset also includes a number of derivative csv files from the original `jsonl` collected. This includes:

* A user csv file created with [jq](https://stedolan.github.io/jq/) (see below).
* [twut userInfo](https://github.com/archivesunleashed/twut/blob/main/docs/usage.md#extract-user-information)
* [twut language](https://github.com/archivesunleashed/twut/blob/main/docs/usage.md#extract-tweet-language)
* [twut times](https://github.com/archivesunleashed/twut/blob/main/docs/usage.md#extract-tweet-times)
* [twut sources](https://github.com/archivesunleashed/twut/blob/main/docs/usage.md#extract-tweet-sources)
* [twut hashtags](https://github.com/archivesunleashed/twut/blob/main/docs/usage.md#extract-hashtags)
* [twut urls](https://github.com/archivesunleashed/twut/blob/main/docs/usage.md#extract-urls)
* [twut animatedGifUrls](https://github.com/archivesunleashed/twut/blob/main/docs/usage.md#extract-animated-gif-urls)
* [twut imageUrls](https://github.com/archivesunleashed/twut/blob/main/docs/usage.md#extract-image-urls)
* [twut mediaUrls](https://github.com/archivesunleashed/twut/blob/main/docs/usage.md#extract-media-urls)
* [twut videoUrls](https://github.com/archivesunleashed/twut/blob/main/docs/usage.md#extract-video-urls)

User csv:

`jq -r '[.id_str, .created_at, .user.screen_name, .retweeted_status != null] | @csv' to_realdonaldtrump_20190130.jsonl > to_realdonaldtrump_20190130_users.jsonl`