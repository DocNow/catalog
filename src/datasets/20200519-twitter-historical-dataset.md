---
title: Twitter Historical Dataset
url: 'https://doi.org/10.5281/zenodo.3833781'
repository: Zenodo
tweets: 1499896115
creators:
  - name: Daniel Gayo-Avello
    email: dani@uniovi.es
dates:
  - start: 2006-03-21T17:04:15.796Z
    end: 2009-07-31T16:04:15.808Z
published: 2016-11-24T17:02:00.000Z
added: 2020-05-19T16:02:55.382Z
subjects:
- Social Media
- History
- Twitter
- Politics
- Languages
notification: 'No'
optout: 'No'
contact: 'Yes'
threat: 'No'
collecting: 'No'
---
This dataset is distributed by Daniel Gayo-Avello, an associate professor at the Department of Computer Science in the University of Oviedo, for the sole purpose of non-commercial research and it just includes tweet ids.

The dataset contains tweet IDs for all the published tweets (in any language) between March 21, 2006 and July 31, 2009 thus comprising the first whole three years of Twitter from its creation, that is, about 1.5 billion tweets (see file *Twitter-historical-20060321-20090731.zip*).

It covers several defining issues in Twitter, such as the invention of hashtags, retweets and trending topics, and it includes tweets related to the 2008 US Presidential Elections, the first Obama’s inauguration speech or the 2009 Iran Election protests (one of the so-called Twitter Revolutions).

Finally, it does contain tweets in many major languages (mainly English, Portuguese, Japanese, Spanish, German and French) so it should be possible–at least in theory–to analyze international events from different cultural perspectives.

The dataset was completed in November 2016 and, therefore, the tweet IDs it contains were publicly available at that moment. This means that there could be tweets public during that period that do not appear in the dataset and also that a substantial part of tweets in the dataset has been deleted (or locked) since 2016.

To make easier to understand the decay of tweet IDs in the dataset a number of representative samples (99% confidence level and 0.5 confidence interval) are provided.

In general terms, 85.5% ±0.5 of the historical tweets are available as of May 19, 2020 (see file*Twitter-historical-20060321-20090731-sample.txt*). However, since the amount of tweets vary greatly throughout the period of three years covered in the dataset, additional representative samples are provided for 90-day intervals (see the file*90-day-samples.zip*).

In that regard, the ratio of publicly available tweets (as of May 19, 2020) is as follows:

* March 21, 2006 to June 18, 2006: 88.4% ±0.5 (from 5,512 tweets).
* June 18, 2006 to September 16, 2006: 82.7% ±0.5 (from 14,820 tweets).
* September 16, 2006 to December 15, 2006: 85.7% ±0.5 (from 107,975 tweets).
* December 15, 2006 to March 15, 2007: 88.2% ±0.5 (from 852,463 tweets).
* March 15, 2007 to June 13, 2007: 89.6% ±0.5 (from 6,341,665 tweets).
* June 13, 2007 to September 11, 2007: 88.6% ±0.5 (from 11,171,090 tweets).
* September 11, 2007 to December 10, 2007: 87.9% ±0.5 (from 15,545,532 tweets).
* December 10, 2007 to March 9, 2008: 89.0% ±0.5 (from 23,164,663 tweets).
* March 9, 2008 to June 7, 2008: 66.5% ±0.5 (from 56,416,772 tweets; see below for more details on this).
* June 7, 2008 to September 5, 2008: 78.3% ±0.5 (from 62,868,189 tweets; see below for more details on this).
* September 5, 2008 to December 4, 2008: 87.3% ±0.5 (from 89,947,498 tweets).
* December 4, 2008 to March 4, 2009: 86.9% ±0.5 (from 169,762,425 tweets).
* March 4, 2009 to June 2, 2009: 86.4% ±0.5 (from 474,581,170 tweets).
* June 2, 2009 to July 31, 2009: 85.7% ±0.5 (from 589,116,341 tweets).

The apparent drop in available tweets from March 9, 2008 to September 5, 2008 has an easy, although embarrassing, explanation.

At the moment of cleaning all the data to publish this dataset there seemed to be a gap between April 1, 2008 to July 7, 2008 (actually, the data was not missing but in a different backup). Since tweet IDs are easy to regenerate for that Twitter era (source code is provided in*generate-ids.m*) I simply produced all those that were created between those two dates. All those tweets actually existed but a number of them were obviously private and not crawlable. For those regenerated IDs the actual ratio of public tweets (as of May 19, 2020) is 62.3% ±0.5.

In other words, what you see in that period (April to July, 2008) is not actually a huge number of tweets having been deleted but the combination of deleted \*and\* non-public tweets (whose IDs should not be in the dataset for performance purposes when rehydrating the dataset).

Additionally, given that not everybody will need the whole period of time the earliest tweet ID for each date is provided in the file *date-tweet-id.tsv*.

For additional details regarding this dataset please see: Gayo-Avello, Daniel. (2016) *[How I Stopped Worrying about the Twitter Archive at the Library of Congress and Learned to Build a Little One for Myself](https://arxiv.org/abs/1611.08144)*. arXiv preprint arXiv:1611.08144.

**If you use this dataset in any way please cite that preprint** (in addition to the dataset itself).

If you need to contact me you can find me as [@PFCdgayo](https://twitter.com/pfcdgayo) in Twitter.
