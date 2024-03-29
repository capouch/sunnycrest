module.exports = {
  siteMetadata: {
    title: "Sunny Crest",
    author: "Brian Capouch",
    description: "A site dedicated to the restoration of Sunny Crest"
  },
  pathPrefix: '/',
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          "gatsby-remark-copy-linked-files",
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Sunny Crest Farm",
        short_name: "SunnyCrest",
        start_url: "/",
        background_color: "#f7f0eb",
        theme_color: "#a2466c",
        display: "minimal-ui",
        icons: [
          {
            // Everything in /static will be copied to an equivalent
            // directory in /public during development and build, so
            // assuming your favicons are in /static/favicons,
            // you can reference them here
            src: `/favicons/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/favicons/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    {
    resolve: `gatsby-plugin-offline`,
    },
    {
    resolve: `gatsby-source-mongodb`,
    options: {
      dbName: `oscon`,
      collection: `blogposts`,
      server: { address: 'www.scene-history.org', port: 45569 },
      auth: { user: process.env.SERVER_USER, password: process.env.SERVER_PW },
      map: { blogposts: { post: `text/markdown` } },
    },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
  ],
}
