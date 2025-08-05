import { MobileApp, MobileCategory } from "@/types";
import request, { gql } from "graphql-request";
import { cache } from "react";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!;

export const getMobileApps = cache(async (): Promise<MobileApp[]> => {
  const query = gql`
    query MyQuery {
      mobileApps {
        about
        appDetails {
          ... on AppDetails {
            id
            lastUpdated
            requirements
            size
            stage
            version
          }
        }
        backgroundColor {
          css
        }
        dowlandApk
        githubUrl
        description {
          html
        }
        createdAt
        images {
          ... on Images {
            id
            image {
              url(transformation: {})
            }
          }
        }
        keyFeatures {
          ... on KeyFeatures {
            id
            keyFeatures
          }
        }
        languages {
          ... on Languages {
            id
            languages
          }
        }
        title
      }
    }
  `;

  const result = await request<{ mobileApps: MobileApp[] }>(graphqlAPI, query);
  return result.mobileApps;
});

export const getMobileCategories = cache(
  async (): Promise<MobileCategory[]> => {
    const query = gql`
      query MyQuery {
        categories {
          name
          slug
          id
        }
      }
    `;

    const result = await request<{ categories: MobileCategory[] }>(
      graphqlAPI,
      query
    );
    return result.categories;
  }
);
