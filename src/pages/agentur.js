import React from 'react';
import PropTypes from 'prop-types';

import { getSiteHeader } from '../layouts';
import { Member, Stage } from '../components/molecules';
import { MediumTeaser } from '../components/organisms';

const Agency = ({ data }) => {
  const stageData = data.allStagesJson.edges[0].node;

  return (<div>
    {getSiteHeader(stageData.siteTitle, stageData.siteDescription)}

    <Stage
      modifiers={['gradient', 'right-highlighted']}
      image={{
        src: stageData.imageSrc.childImageSharp.original.src,
        alt: stageData.imageAlt,
      }}
      title={
        <h1 dangerouslySetInnerHTML={{ __html: stageData.title }} />
      }
    >
      {stageData.contentBlocks.map(block =>
        <p key={block.id}>{block.value}</p>,
      )}
    </Stage>

    <div className="container">
      <div className="row">
        {data.allMembersJson.edges.map(({ node }) =>
          (<Member
            key={node.name}
            name={node.name}
            job={node.job}
            image={{
              src: node.img.childImageSharp.original.src,
              alt: node.name,
            }}
            education={node.education}
            links={node.links}
          >
            <p dangerouslySetInnerHTML={{ __html: node.description }} />
          </Member>),
          )}
      </div>
    </div>

    <MediumTeaser posts={data.allMediumPost} />
  </div>);
};

Agency.propTypes = {
  data: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Agency;

export const pageQuery = graphql`
  query AgencyQuery {
    allMediumPost(limit: 2, sort: { fields: [createdAt], order: DESC }) {
      edges {
        node {
          id
          title
          uniqueSlug
          author {
            name
          }
          virtuals {
            subtitle
            previewImage {
              imageId
            }
          }
        }
      }
    }
    allMembersJson {
      edges {
        node {
          img {
            childImageSharp {
              original {
                src
              }
            }
          }
          job
          name
          education
          description
          links {
            text
            url
          }
        }
      }
    }
    allStagesJson(filter: {siteTitle: {eq: "Agentur"}}) {
      edges {
        node {
          id
          siteTitle
          siteDescription
          title
          contentBlocks {
            id
            value
          }
          imageSrc {
            childImageSharp {
              original {
                src
              }
            }
          }
          imageAlt
        }
      }
    }
  }
`;
