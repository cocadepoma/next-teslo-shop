import NextLink from 'next/link';

import { AppBar, Toolbar, Link, Typography, Box, Button, IconButton, Badge, InputAdornment, Input } from '@mui/material';
import { ClearAllOutlined, ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { UIContext } from '../../contexts';

export const Navbar = () => {
  const { asPath, push } = useRouter();
  const { toogleSideMenu } = useContext(UIContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const navigateTo = (url: string) => {
    push(`/category/${url}`);
    toogleSideMenu();
  };

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;

    push(`/search/${searchTerm}`);
  }

  return (
    <AppBar>
      <Toolbar>

        <NextLink href="/" passHref legacyBehavior>
          <Link display="flex" alignItems="center">
            <Typography variant="h6">Teslo</Typography>
            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
          </Link>
        </NextLink>

        <Box flex="1" />

        <Box className="fadeIn" sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }}>
          <NextLink href="/category/men" passHref legacyBehavior>
            <Link>
              <Button
                sx={{
                  mr: 1,
                  '&:hover': { backgroundColor: asPath === '/category/men' ? 'black' : 'rgba(0,0,0,0.1)' },
                  cursor: asPath === '/category/men' ? 'default' : 'pointer',
                }}
                color={asPath === '/category/men' ? 'primary' : 'info'}
              >
                Men
              </Button>
            </Link>
          </NextLink>

          <NextLink href="/category/women" passHref legacyBehavior>
            <Link>
              <Button
                sx={{
                  mr: 1,
                  '&:hover': { backgroundColor: asPath === '/category/women' ? 'black' : 'rgba(0,0,0,0.1)' },
                  cursor: asPath === '/category/women' ? 'default' : 'pointer',
                }}
                color={asPath === '/category/women' ? 'primary' : 'info'}
              >
                Women
              </Button>
            </Link>
          </NextLink>

          <NextLink href="/category/kids" passHref legacyBehavior>
            <Link>
              <Button
                sx={{
                  '&:hover': {
                    backgroundColor: asPath === '/category/kids' ? 'black' : 'rgba(0,0,0,0.1)',
                    cursor: asPath === '/category/kids' ? 'default' : 'pointer',
                  }
                }}
                color={asPath === '/category/kids' ? 'primary' : 'info'}
              >Kids</Button>
            </Link>
          </NextLink>
        </Box>

        <Box flex="1" />

        {
          isSearchVisible
            ? (
              <Input
                sx={{ display: { xs: 'none', sm: 'flex' } }}
                className="fadeIn"
                autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyUp={(e) => e.key === 'Enter' ? onSearchTerm() : null}
                type='text'
                placeholder="Find..."
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setIsSearchVisible(false)}
                      aria-label="toggle password visibility"
                    >
                      <ClearOutlined />
                    </IconButton>
                  </InputAdornment>
                }
              />
            )
            : (
              <IconButton
                className="fadeIn"
                onClick={() => setIsSearchVisible(true)}
                sx={{ display: { xs: 'none', sm: 'flex' } }}
              >
                <SearchOutlined />
              </IconButton>
            )
        }



        <IconButton
          sx={{ display: { xs: 'flex', sm: 'none' } }}
          onClick={toogleSideMenu}
        >
          <SearchOutlined />
        </IconButton>

        <NextLink href="/cart" passHref legacyBehavior>
          <Link>
            <IconButton>
              <Badge badgeContent="2" color="secondary">
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>

        <Button onClick={toogleSideMenu}>
          Menu
        </Button>
      </Toolbar>
    </AppBar>
  )
}
