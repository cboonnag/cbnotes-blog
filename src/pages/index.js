import React from 'react'
import { graphql, Link } from 'gatsby'
import map from "lodash/fp/map"
import groupBy from "lodash/fp/groupBy"
import flow from "lodash/fp/flow"

import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';

import Layout from '../components/layout'
import './index.css';

const IndexPage = (props) => {
  const notes = props.data.allMarkdownRemark;
  const subjects = flow(
    groupBy(node => node.node.fields.slug.split('/')[1]),
    map(node => node), //using ES6 shorthand to generate the objects
    )(notes.edges);
  console.log(subjects);
  return (
    <Layout>
        <h2 style={{textAlign: 'center', fontFamily: 'Montserrat'}}>Contents</h2>
        <Accordion>
        {subjects.map((arr, i) => (
          <AccordionItem key={arr[0].node.fields.slug.split('/')[1]}>
            <AccordionItemTitle>{arr[0].node.fields.slug.split('/')[1].toUpperCase()}</AccordionItemTitle>
            {arr.map(({ node }, j) => (
              <AccordionItemBody key={node.frontmatter.title}>
                <Link to={node.fields.slug} className="link" >
                  <div className="post-list">
                    {node.frontmatter.title}
                  </div>
                </Link>
              </AccordionItemBody>
          ))}
          </AccordionItem>
        ))}
        </Accordion>
    </Layout>
  )
}


export default IndexPage
// change title to date if you want to sort by date 
export const query = graphql`
  query ListQuery {
    allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___title] }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
