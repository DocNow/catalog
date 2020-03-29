module.exports = {
  siteMetadata: {
    title: `DocNow Tweet Catalog`,
    description: `A catalog of tweet identifier datasets`,
    author: `Documenting the Now`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-json`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `datasets`,
        path: `${__dirname}/src/datasets`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    }
  ]
}