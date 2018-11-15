const _ = require("lodash")
const Promise = require("bluebird")
const path = require("path")
const select = require(`unist-util-select`)
const fs = require(`fs-extra`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const pages = []
    const blogPost = path.resolve("./src/templates/blog-post.js")
    resolve(
      graphql(
        `
        {
        # Strange query is the only one that works!!
        allMongodbOsconBlogposts {
          edges {
            node {
              id
              path
              post {
                id
                post
              }
            }
          }
        }
      }
    `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        _.each(result.data.allMongodbOsconBlogposts.edges, edge => {
          // console.log('Whoami? ' + JSON.stringify(edge))
          // console.log('We send: ' + edge.node.id)
          createPage({
            path: edge.node.path,
            component: blogPost,
            context: {
              id: edge.node.id
            }
          })
        })
      })
    )
  })
}
