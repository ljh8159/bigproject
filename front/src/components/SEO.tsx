import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import React from "react";

interface SEOProps {
  title: string;
  description?: string;
  jsonLd?: Record<string, any> | Record<string, any>[];
}

const SEO: React.FC<SEOProps> = ({ title, description, jsonLd }) => {
  const location = useLocation();
  const canonical = `${window.location.origin}${location.pathname}`;

  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={canonical} />
      {/* OpenGraph */}
      <meta property="og:title" content={title} />
      {description && (
        <meta property="og:description" content={description} />
      )}
      <meta property="og:type" content="website" />
      {/* Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd])}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
