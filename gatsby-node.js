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
}