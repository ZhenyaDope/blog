export type UseForm = {
  title: string;
  description: string;
  body: string;
};

export type EditData = {
  article: {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: Array<string>;
  };
  token: string | number;
};
