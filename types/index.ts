export type MobileApp = {
  about: string;
  appDetails: {
    id: string;
    lastUpdated: string;
    requirements: string;
    size: string;
    stage: string;
    version: string;
  };
  backgroundColor: {
    css: string;
  };
  dowlandApk: string;
  githubUrl: string;
  description: {
    html: string;
  };
  createdAt: string;
  images: {
    id: string;
    image: {
      url: string;
    };
  }[];
  keyFeatures: {
    id: string;
    keyFeatures: string;
  }[];
  languages: {
    id: string;
    languages: string;
  }[];
  title: string;
};

export type MobileCategory = {
  name: string;
  slug: string;
  id: string;
};
