import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { ORDER_STATUS } from '../../lib/constants/order-status';

import Container from '../Container';
import { Flex, Grid } from '../Grid';
import { fadeIn } from '../StyledKeyframes';
import { P } from '../Text';

import RecurringContributionsCard from './RecurringContributionsCard';

import EmptyCollectivesSectionImageSVG from '../collective-page/images/EmptyCollectivesSectionImage.svg';

const CollectiveCardContainer = styled.div`
  animation: ${fadeIn} 0.2s;
`;

const filterContributions = (contributions, filterName) => {
  const isActive = ({ status }) => status === ORDER_STATUS.ACTIVE || status === ORDER_STATUS.ERROR;
  switch (filterName) {
    case 'ACTIVE':
      return contributions.filter(isActive);
    case 'MONTHLY':
      return contributions.filter(contrib => isActive(contrib) && contrib.frequency === 'MONTHLY');
    case 'YEARLY':
      return contributions.filter(contrib => isActive(contrib) && contrib.frequency === 'YEARLY');
    case 'CANCELLED':
      return contributions.filter(contrib => contrib.status === ORDER_STATUS.CANCELLED);
    default:
      return [];
  }
};

const RecurringContributionsContainer = ({ recurringContributions, filter, createNotification, account }) => {
  const displayedRecurringContributions = filterContributions(recurringContributions.nodes, filter);
  return (
    <Container mt={4}>
      {displayedRecurringContributions.length ? (
        <Grid
          gridGap={24}
          gridTemplateColumns={['1fr', '1fr 1fr', '1fr 1fr 1fr', 'repeat(4, 1fr)', 'repeat(5, 1fr)']}
          my={2}
        >
          {displayedRecurringContributions.map(contribution => (
            <CollectiveCardContainer key={contribution.id}>
              <RecurringContributionsCard
                collective={contribution.toAccount}
                status={contribution.status}
                contribution={contribution}
                position="relative"
                createNotification={createNotification}
                account={account}
                data-cy="recurring-contribution-card"
              />
            </CollectiveCardContainer>
          ))}
        </Grid>
      ) : (
        <Flex flexDirection="column" alignItems="center" py={4}>
          <img src={EmptyCollectivesSectionImageSVG} alt="" />
          <P color="black.600" fontSize="LeadParagraph" mt={5}>
            <FormattedMessage
              id="RecurringContributions.none"
              defaultMessage="No recurring contributions to see here! 👀"
            />
          </P>
        </Flex>
      )}
    </Container>
  );
};

RecurringContributionsContainer.propTypes = {
  recurringContributions: PropTypes.object.isRequired,
  filter: PropTypes.string.isRequired,
  createNotification: PropTypes.func,
  account: PropTypes.object.isRequired,
};

export default RecurringContributionsContainer;
