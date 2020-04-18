const fs = require('fs')
const RSS = require('rss')
const path = require('path')

exports.createPages = async ({ actions: { createPage }, graphql, pathPrefix }) => {
  await makeDatasets(createPage, graphql, pathPrefix)
}

async function makeDatasets(createPage, graphql, pathPrefix) {
  const results = await graphql(`
    query {
      allMarkdownRemark(
        sort: {
          order: DESC,
          fields: frontmatter___added
        }
      ) {
        nodes {
          frontmatter {
            title
            creators {
              name
              email
            }
            added
            published
            dates {
              start
              end
            }
            repository
            subjects
            tweets
            url
          }
          html
          parent {
            ... on File {
              id
              name
            }
          }
        }
      }
    }
  `)

  const datasets = []
  for (let dataset of results.data.allMarkdownRemark.nodes) {
    console.log(dataset.parent.name)
    const context = {
      ...dataset.frontmatter,
      slug: dataset.parent.name,
      description: dataset.html
    }
    createPage({
      path: `/datasets/${context.slug}/`,
      component: require.resolve(`./src/templates/dataset.js`),
      context: context
    })
    datasets.push(context)
  }
  fs.writeFileSync(`static/data/datasets.json`, JSON.stringify(datasets, null, 2))
  writeRss(datasets)
}

function writeRss(datasets) {
  const feed = new RSS({
    title: `Documenting the Now Tweet Catalog`,
    description: `A clearinhouse for Twitter datasets`,
    feed_url: `https://catalog.docnow.io/feed.xml`,
    site_url: `https://catalog.docnow.io`,
    image_url: `https://catalog.docnow.io/images/docnow.png`,
  })

  datasets.forEach(dataset => {
    const url = `https://catalog.docnow.io/datasets/${dataset.slug}/`
    const description = `${dataset.description}<p>This dataset is published at ${dataset.url}</p>`
    feed.item({
      title: dataset.title,
      date: dataset.addedDate,
      description: description,
      url: url,
    })
  })

  // write out the podcast url
  fs.writeFileSync('./static/feed.xml', feed.xml())
}