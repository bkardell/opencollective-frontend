import React from 'react';
import PropTypes from 'prop-types';
import { Bars as MenuIcon } from '@styled-icons/fa-solid/Bars';
import themeGet from '@styled-system/theme-get';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { rotateMixin } from '../lib/constants/animations';
import theme from '../lib/theme';
import { Link } from '../server/pages';

import { Box, Flex } from './Grid';
import Hide from './Hide';
import SearchForm from './SearchForm';
import SearchIcon from './SearchIcon';
import { Span } from './Text';
import TopBarProfileMenu from './TopBarProfileMenu';
import { withUser } from './UserProvider';
// import Container from './Container';

const Logo = styled.img.attrs({
  src: '/static/images/opencollective-icon.svg',
  alt: 'Open Collective logo',
})`
  ${({ animate }) => (animate ? rotateMixin : null)};
`;

const SearchFormContainer = styled(Box)`
  max-width: 30rem;
  min-width: 10rem;
`;

const NavList = styled(Flex)`
  list-style: none;
  min-width: 20rem;
  text-align: right;
  align-items: center;
`;

const NavLinkContainer = styled(Box)`
  text-align: center;
`;
NavLinkContainer.defaultProps = {
  as: 'li',
  px: [1, 2, 3],
};

const NavLink = styled.a`
  color: ${themeGet('colors.black.800')};
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: -0.1px;
`;

class TopBar extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    loadingLoggedInUser: PropTypes.bool,
    showSearch: PropTypes.bool,
    menuItems: PropTypes.object,
  };

  static defaultProps = {
    className: '',
    showSearch: true,
    menuItems: {
      discover: true,
      docs: true,
      howItWorks: false,
      pricing: false,
    },
  };

  render() {
    const { showSearch, menuItems } = this.props;
    const defaultMenu = { discover: true, docs: true, howItWorks: false, pricing: false };
    const merged = { ...defaultMenu, ...menuItems };
    return (
      <Flex
        px={3}
        py={showSearch ? 2 : 3}
        alignItems="center"
        flexDirection="row"
        justifyContent="space-around"
        css={{ height: theme.sizes.navbarHeight, background: 'white' }}
      >
        <Link route="home" passHref>
          <Flex as="a" alignItems="center">
            <Logo width="32" height="32" />
            <Hide xs sm>
              <Box mx={2}>
                <img height="16px" src="/static/images/logotype.svg" alt="Open collective" />
              </Box>
            </Hide>
          </Flex>
        </Link>

        {showSearch && (
          <Flex ml={[null, null, null, null, 6]} justifyContent="center" flex="1 1 auto">
            <Hide xs sm md width={1}>
              <SearchFormContainer p={2}>
                <SearchForm />
              </SearchFormContainer>
            </Hide>
          </Flex>
        )}

        <Flex alignItems="center" justifyContent={['flex-end', 'space-between']} flex="1 1 auto">
          <Flex alignItems="center">
            <Hide lg>
              <Box mx={3}>
                <Link href="/search">
                  <Flex as="a">
                    <SearchIcon fill="#76777A" size={20} />
                  </Flex>
                </Link>
              </Box>
            </Hide>

            <Hide sm md lg>
              <Box mx={3}>
                <Link href="#footer">
                  <Flex as="a" alignItems="center">
                    <Span color="black.700" fontSize="12px" fontWeight="500" lineHeight="14px" mr="9px">
                      <FormattedMessage id="menu" defaultMessage="MENU" />
                    </Span>
                    <MenuIcon color="#4E5052" size={14} />
                  </Flex>
                </Link>
              </Box>
            </Hide>

            <Hide xs>
              <NavList as="ul" p={0} m={0} justifyContent="space-around" css="margin: 0;">
                {merged.discover && (
                  <NavLinkContainer>
                    <Link route="disco ver" passHref>
                      <NavLink>
                        <FormattedMessage id="menu.discover" defaultMessage="Discover" />
                      </NavLink>
                    </Link>
                  </NavLinkContainer>
                )}
                {merged.howItWorks && (
                  <NavLinkContainer>
                    <Link route="marketing" params={{ pageSlug: 'how-it-works' }} passHref>
                      <NavLink>
                        <FormattedMessage id="menu.howItWorks" defaultMessage="How it Works" />
                      </NavLink>
                    </Link>
                  </NavLinkContainer>
                )}
                {merged.pricing && (
                  <NavLinkContainer>
                    <Link route="pricing" passHref>
                      <NavLink>
                        <FormattedMessage id="menu.pricing" defaultMessage="Pricing" />
                      </NavLink>
                    </Link>
                  </NavLinkContainer>
                )}
                {merged.docs && (
                  <NavLinkContainer>
                    <NavLink href="https://docs.opencollective.com">
                      <FormattedMessage id="menu.docs" defaultMessage="Help & Docs" />
                    </NavLink>
                  </NavLinkContainer>
                )}
              </NavList>
            </Hide>
          </Flex>
          <TopBarProfileMenu />
        </Flex>
      </Flex>
    );
  }
}

export default withUser(TopBar);
