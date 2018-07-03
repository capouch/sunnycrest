import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'

class BlogPostTemplate extends React.Component {
  render() {
    console.log(JSON.stringify(this.props.data))
    const post = this.props.data.mongodbOsconBlogposts.post.childMarkdownRemark
    console.log("Post data is: " + JSON.stringify(post))
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <div style={{ margin: "3rem auto", maxWidth: 600, "font-family": "Times New Roman" }}>
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
        <h1>{post.frontmatter.title}</h1>
        <p>
          {post.frontmatter.date}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr/>
      </div>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
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
