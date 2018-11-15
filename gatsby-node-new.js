const _ = require("lodash")
const Promise = require("bluebird")
const path = require("path")
const select = require(`unist-util-select`)
const fs = require(`fs-extra`)

exports.createPages = async ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  const { data } = await graphql(`
    {
    allMongodbOsconBlogposts {
      edges {
        node {
          id
          post {
            id
            post
          }
        }
      }
    }
  }
  `)
    const pages = []
    const blogPost = path.resolve("./src/templates/blog-post.js")
    for (const { node } of data.allMongodbOsconBlogposts.edges.node.post.post) {
      createPage({
        path: '/barn/',
        component: blogPost,
        context: {
          id: node.id,
        }
      })
    }
  }
