/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path")

async function createContentPages(actions, graphql) {
  const result = await graphql(`
    {
      allSanityContentPage {
        edges {
          node {
            slug {
              current
            }
          }
        }
      }
    }
  `)
  const contentPages = result.data.allSanityContentPage.edges.map(({ node }) => node)

  contentPages.forEach(contentPage => {
    actions.createPage({
      path: contentPage.slug.current,
      component: path.resolve("./src/templates/contentPage.js"),
      context: {
        slug: contentPage.slug.current,
      },
    })
  })
}

async function createProjectPages(actions, graphql) {
  const result = await graphql(`
    {
      allSanityProject {
        edges {
          node {
            slug {
              current
            }
          }
        }
      }
    }
  `)
  const projects = result.data.allSanityProject.edges.map(({ node }) => node)

  projects.forEach(project => {
    actions.createPage({
      path: project.slug.current,
      component: path.resolve("./src/templates/project.js"),
      context: {
        slug: project.slug.current,
      },
    })
  })
}

exports.createPages = async ({ actions, graphql }) => {
  await createContentPages(actions, graphql);
  await createProjectPages(actions, graphql);
}
