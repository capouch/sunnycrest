import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Layout from "../components/layout"

class BlogPostTemplate extends React.Component {
  render() {
    { /* console.log(JSON.stringify(this.props.data)) */ }
    let post = this.props.data.mongodbOsconBlogposts.post.childMarkdownRemark
    { /* console.log("Post data is: " + JSON.stringify(post)) */ }

    { /* 4/21/23 Try this regex to fix Markdown bug relative to jpg path 
    let body = post.html
    const regex = "\./IMAGES"
    let html = body.replace(regex,"/IMAGES")
    post = {...post, html} */ }

    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <div style={{ margin: "3rem auto", maxWidth: 600, "fontFamily": "Times New Roman" }}>
        <Layout>
          <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
          <h1>{post.frontmatter.title}</h1>
          <p>
            {post.frontmatter.date}
          </p>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          <hr/>
        </Layout>
      </div>
    )
  }
}

export default BlogPostTemplate

export const dbQuery = graphql`
  query BlogPostByPath($id: String!) {
    site {
      siteMetadata {
        title
        author
        }
      }
      mongodbOsconBlogposts(id: { eq: $id }) {
        id
        path
        post {
          childMarkdownRemark {
            html
            frontmatter {
              title
            }
          }
        }
      }
  }
`
