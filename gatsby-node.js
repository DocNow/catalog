const fs = require('fs')
const path = require('path')

exports.createPages = async ({ actions: { createPage }, graphql, pathPrefix }) => {
  await makeDatasets(createPage, graphql, pathPrefix)
}

async function makeDatasets(createPage, graphql, pathPrefix) {
  const results = await graphql(`
    query {
      allMarkdownRemark {
        nodes {
          frontmatter {
            slug
            title
            creator
            added
            published
            dates {
              start
              end
            }
            tweets
            tags
            url
          }
          html
        }
      }
    }
  `)

  const datasets = []
  for (let dataset of results.data.allMarkdownRemark.nodes) {
    const context = {
      ...dataset.frontmatter,
      description: dataset.html
    }
    createPage({
      path: `/datasets/${dataset.frontmatter.slug}/`,
      component: require.resolve(`./src/templates/dataset.js`),
      context: context
    })
    datasets.push(context)
  }
  fs.writeFileSync(`static/data/datasets.json`, JSON.stringify(datasets, null, 2))
}