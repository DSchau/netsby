import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'
// import ArticleList from '../components/ArticleList'
import Layout from '../components/Layout'
import tachyons from 'tachyons-components'

const PageContainer = tachyons('div')`
blog ph3 ph0-ns pv4-ns
`
const PageHeaderContainer = tachyons('div')`
wrap dt bb b--light-gray pb4 pt4 pt5-ns
`
const PageHeadingsContainer = tachyons('div')`
fl w-100 w-50-ns tl
`
const PageHeadings = tachyons('h2')`
f3 fw6 dark-gray mb1 mt0
`
const PageSubHeadings = tachyons('p')`
mid-gray mt0
`
const PageDescriptions = tachyons('div')`
fl w-100 w-50-ns lh-copy mb0
`
const SectionArticles = tachyons('div')`
w-100 dt mt4
`
const ArticleWrapper = tachyons('div')`
wrap
`

const PaginationLink = props => {
  if (!props.test) {
    return (
      <Link to={`/blog/${props.url}`} className='button is-rounded'>
        {props.text}
      </Link>
    )
  } else {
    return (
      <span disabled className='button is-rounded'>
        {props.text}
      </span>
    )
  }
}

const BlogIndexPage = ({ pageContext }) => {

    const { group, index, first, last, pageCount } = pageContext
    const previousUrl = index - 1 === 1 ? '' : (index - 1).toString()
    const nextUrl = (index + 1).toString() + '/'

    return (
      <Layout>
        <Helmet
          titleTemplate="Blog · Ajmal Afif">
          <meta name='description' content='I enjoy writing down and reflect on my experience. My goal is to write more about design, frontend and anything in between.' />
          <meta name="twitter:title" content="Blog · Ajmal Afif" />
          <meta name="twitter:description" content='I enjoy writing down and reflect on my experience. My goal is to write more about design, frontend and anything in between.' />
          <meta property="og:title" content="Blog · Ajmal Afif" />
          <meta property="og:description" content='I enjoy writing down and reflect on my experience. My goal is to write more about design, frontend and anything in between.' />
      </Helmet>
        <PageContainer>
          <PageHeaderContainer>
            <PageHeadingsContainer>
              <PageHeadings>
                Blog
              </PageHeadings>
              <PageSubHeadings>
                Personal learnings & thoughts
              </PageSubHeadings>
            </PageHeadingsContainer>
            <PageDescriptions>
              I enjoy writing down and reflect on my experience. My goal is to write more about design, frontend and anything in between.
            </PageDescriptions>
          </PageHeaderContainer>
          <SectionArticles>
            <ArticleWrapper>
            <h4>{group}</h4>
            {/* {this.prop.allMarkdownRemark.edges.map(({ node }) => (
            <div className="w-70-ns mb4 mb5-ns" key={node.id}>
            <h3 className="lh-title mb2 blue mt0">
              <Link className="link fw6" to={node.fields.slug}>
                {node.frontmatter.title}
              </Link>
            </h3>
            <p className="lh-copy mt1 mb2">
              {node.excerpt}
            </p>
            <p className='mb2 mt3'>
            <Link className="link mid-gray" to={node.fields.slug}>
            Continue reading →
            </Link>
            </p>
            <small className="mid-gray lh-copy">{node.frontmatter.date}{node.frontmatter.author}</small>
            </div>
            ))} */}
              {/* <ArticleList posts={group} /> */}
              {/* <section className='section'>
                <div className='buttons is-centered'>
                  <h4>{pageCount} Pages</h4>
                  <PaginationLink test={first} url={previousUrl} text='Previous Page' />
                  <PaginationLink test={last} url={nextUrl} text='Next Page' />
                </div>
              </section> */}
            </ArticleWrapper>
          </SectionArticles>
        </PageContainer>
      </Layout>
    )
}

BlogIndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default BlogIndexPage

export const pageQuery = graphql`
  query blogPageQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "blog-post" } }}
    ) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          fields {
            slug
          }
          frontmatter {
            title
            description
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
