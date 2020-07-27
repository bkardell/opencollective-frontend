import { gql } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';
import { isArray, pick } from 'lodash';

import { getCollectiveToEditQueryFields, getLoggedInUserQuery } from './queries';

const createCollectiveQuery = gql`
  mutation createCollective($collective: CollectiveInputType!) {
    createCollective(collective: $collective) {
      id
      name
      slug
      type
      website
      twitterHandle
      isIncognito
    }
  }
`;

const createCollectiveFromGithubQuery = gql`
  mutation createCollectiveFromGithub($collective: CollectiveInputType!) {
    createCollectiveFromGithub(collective: $collective) {
      id
      name
      slug
      type
      githubHandle
    }
  }
`;

/* eslint-disable graphql/template-strings, graphql/no-deprecated-fields, graphql/capitalized-type-name, graphql/named-operations */
const editCollectiveQuery = gql`
  mutation editCollective($collective: CollectiveInputType!) {
    editCollective(collective: $collective) {
      ${getCollectiveToEditQueryFields}
    }
  }
`;
/* eslint-enable graphql/template-strings, graphql/no-deprecated-fields, graphql/capitalized-type-name, graphql/named-operations */

const archiveCollectiveQuery = gql`
  mutation archiveCollective($id: Int!) {
    archiveCollective(id: $id) {
      id
      isArchived
    }
  }
`;

const unarchiveCollectiveQuery = gql`
  mutation unarchiveCollective($id: Int!) {
    unarchiveCollective(id: $id) {
      id
      isArchived
    }
  }
`;

export const createApplicationMutation = gql`
  mutation createApplication($application: ApplicationInput!) {
    createApplication(application: $application) {
      id
      type
      apiKey
    }
  }
`;

export const deleteApplicationMutation = gql`
  mutation deleteApplication($id: Int!) {
    deleteApplication(id: $id) {
      id
    }
  }
`;

export const addCreateCollectiveMutation = graphql(createCollectiveQuery, {
  props: ({ mutate }) => ({
    createCollective: async collective => {
      const CollectiveInputType = pick(collective, [
        'slug',
        'type',
        'name',
        'image',
        'description',
        'longDescription',
        'location',
        'twitterHandle',
        'githubHandle',
        'website',
        'tags',
        'startsAt',
        'endsAt',
        'timezone',
        'maxAmount',
        'currency',
        'quantity',
        'HostCollectiveId',
        'ParentCollectiveId',
        'isIncognito',
        'data',
        CollectiveInputType,
      ]);
      CollectiveInputType.tiers = (collective.tiers || []).map(tier =>
        pick(tier, ['type', 'name', 'description', 'amount', 'maxQuantity']),
      );
      CollectiveInputType.location = pick(collective.location, ['name', 'address', 'lat', 'long', 'country']);
      return await mutate({ variables: { collective: CollectiveInputType } });
    },
  }),
});

export const addCreateCollectiveFromGithubMutation = graphql(createCollectiveFromGithubQuery, {
  props: ({ mutate }) => ({
    createCollectiveFromGithub: async collective => {
      const CollectiveInputType = pick(collective, ['slug', 'type', 'name', 'description', 'githubHandle']);
      return await mutate({ variables: { collective: CollectiveInputType } });
    },
  }),
});

export const addEditCollectiveMutation = graphql(editCollectiveQuery, {
  props: ({ mutate }) => ({
    editCollective: async collective => {
      const CollectiveInputType = pick(collective, [
        'id',
        'type',
        'slug',
        'name',
        'company',
        'description',
        'longDescription',
        'tags',
        'expensePolicy',
        'website',
        'twitterHandle',
        'githubHandle',
        'location',
        'startsAt',
        'endsAt',
        'timezone',
        'maxAmount',
        'currency',
        'quantity',
        'ParentCollectiveId',
        'HostCollectiveId',
        'image',
        'backgroundImage',
        'settings',
        'hostFeePercent',
        'isActive',
      ]);

      if (isArray(collective.tiers)) {
        CollectiveInputType.tiers = collective.tiers.map(tier =>
          pick(tier, [
            'id',
            'type',
            'name',
            'description',
            'longDescription',
            'amount',
            'amountType',
            'interval',
            'maxQuantity',
            'longDescription',
            'presets',
            'minimumAmount',
            'goal',
            'button',
          ]),
        );
      }

      CollectiveInputType.location = pick(collective.location, ['name', 'address', 'lat', 'long', 'country']);
      return await mutate({ variables: { collective: CollectiveInputType } });
    },
  }),
});

export const addArchiveCollectiveMutation = graphql(archiveCollectiveQuery, {
  props: ({ mutate }) => ({
    archiveCollective: async id => {
      return await mutate({ variables: { id } });
    },
  }),
});

export const addUnarchiveCollectiveMutation = graphql(unarchiveCollectiveQuery, {
  props: ({ mutate }) => ({
    unarchiveCollective: async id => {
      return await mutate({ variables: { id } });
    },
  }),
});

export const addUpdateUserEmailMutation = graphql(
  gql`
    mutation updateUserEmail($email: String!) {
      updateUserEmail(email: $email) {
        id
        email
        emailWaitingForValidation
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      updateUserEmail: email => {
        return mutate({ variables: { email } });
      },
    }),
  },
);
