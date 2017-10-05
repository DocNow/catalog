This directory is for uploading tweet id datasets if you don't want to host them
in an external repository. We do not consider GitHub to be a repository, however
we recognize there are situations where it might be useful to distribute the
tweet identifiers here.

If you want to place your identifiers here make sure it is named using this
scheme:

    {uuid}.csv.gz

The file should be gzip compressed, use the csv file extension and have a unique
UUID assigned to it.

The metadata for the datasets should reference the dataset on the web at:

    http://www.docnow.io/catalog/datasets/{uuid}.csv.gz

If you have difficulty with any of these things just send a pull request with
the ids in a file and we will take care of it for you.
