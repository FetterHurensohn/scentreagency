import * as prismic from '@prismicio/client';
import * as prismicNext from '@prismicio/next';
import sm from '../slicemachine.config.json';

export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || sm.repositoryName;

const routes: prismic.ClientConfig['routes'] = [
  { type: 'page', path: '/', uid: 'home' },
  { type: 'page', path: '/:uid' },
  { type: 'case_study', path: '/case-study/:uid' },
];

export const createClient = (config: prismicNext.CreateClientConfig = {}) => {
  const client = prismic.createClient(repositoryName, {
    routes,
    fetchOptions:
      process.env.NODE_ENV === 'production'
        ? { next: { tags: ['prismic'] }, cache: 'force-cache' }
        : { next: { revalidate: 5 } },
    ...config,
  });

  prismicNext.enableAutoPreviews({ client });

  return client;
};
