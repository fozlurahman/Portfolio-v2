import React from 'react';
import config from '@config';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useLocation } from '@reach/router';
import { useStaticQuery, graphql } from 'gatsby';
import ogImage from '@images/og.png';

// https://www.gatsbyjs.com/docs/add-seo-component/

const Head = ({ title, description, image }) => {
  const { pathname } = useLocation();

  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            defaultTitle: title
            defaultDescription: description
            siteUrl
            defaultImage: image
            twitterUsername
          }
        }
      }
    `,
  );

  const { defaultTitle, defaultDescription, siteUrl, defaultImage, twitterUsername } =
    site.siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
  };

  return (
    <Helmet title={title} defaultTitle={seo.title} titleTemplate={`%s | ${defaultTitle}`}>
      <html lang="en" />

      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />

      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={`${config.siteUrl}${ogImage}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content="website" />
      <meta itemProp="image" content={`${config.siteUrl}${ogImage}`} />
      <meta name="twitter:image" content={`${config.siteUrl}${ogImage}`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterUsername} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      <meta name="google-site-verification" content="DCl7VAf9tcz6eD9gb67NfkNnJ1PKRNcg8qQiwpbx9Lk" />
    </Helmet>
  );
};

export default Head;

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};

Head.defaultProps = {
  title: null,
  description: null,
  image: null,
};
