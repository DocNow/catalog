---
added: 2020-03-31 14:35:43-05:45
creators:
- email: null
  name: Juan M Banda
- email: null
  name: Ramya Tekumalla
- email: null
  name: Guanyu Wang
- email: null
  name: Jingyuan Yu
- email: null
  name: Tuo Liu
- email: null
  name: Yuning Ding
- email: null
  name: Gerardo Chowell
dates:
- end: '2020-03-31'
  start: '2020-01-01'
published: 2020-03-31
repository: Zeonodo
subjects:
- Covid-19
- Coronavirus
title: A Twitter Dataset of 100+ million tweets related to COVID-19
tweets: 101400452
url: https://doi.org/10.5281/zenodo.3723939
---

Due to the relevance of the COVID-19 global pandemic, we are releasing our dataset of tweets acquired from the Twitter Stream related to COVID-19 chatter. The first 9 weeks of data (from January 1st, 2020 to March 11th, 2020) contain very low tweet counts as we filtered other data we were collecting for other research purposes, however, one can see the dramatic increase as the awareness for the virus spread. Dedicated data gathering started from March 11th to March 30th which yielded over 4 million tweets a day.  We have added additional data provided by our new collaborators from January 27th to February 27th, to provide extra longitudinal coverage.The data collected from the stream captures all languages, but the higher prevalence are:  English, Spanish, and French. We include two different  files.
Full-dataset.tsv contains all the 100 million tweet ids where as full_dataset-clean.tsv contains only original tweets (with no retweets.) For NLP tasks we provide the top 1000 frequent terms in frequent_terms.csv, the top 1000 bigrams in frequent_bigrams.csv, and the top 1000 trigrams in frequent_trigrams.csv.  Some general statistics per day are included for both datasets in the statistics-full_dataset.tsv and statistics-full_dataset-clean.tsv files.
