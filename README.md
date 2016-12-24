catalog is a minimal registry of tweet identifier datasets. If you'd like to add
a dataset please follow these instructions:

1. Open the [datasets.yml] file here on GitHub.
2. Click on the ![edit button] to edit it.
3. Create a new dataset entry by following the example of others entries.
4. Send a pull request to us!

If all of this sounds too complicated don't worry. You can also create an
issue in our [issue tracker] that minimally includes the URL for your dataset.
Someone on the team will then edit [datasets.yml] for you.

If you have ideas or suggestions about the metadata or want to help design the 
website please send along those pull requests and issues too.

## Develop

You can let GitHub Pages build the site for you, but if you want to run it
locally you'll need to install Ruby and then:

```
gem install bundler jekyll
git clone https://github.com/docnow/catalog.git
cd catalog
bundle exec jekyll serve
```

[datasets.yml]: https://github.com/DocNow/catalog/blob/master/_data/datasets.yml
[issue tracker]: https://github.com/DocNow/catalog/issues
[edit button]: https://raw.githubusercontent.com/DocNow/catalog/master/images/edit.png

