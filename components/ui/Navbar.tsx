import NextLink from 'next/link';

import { AppBar, Toolbar, Link, Typography, Box, Button, IconButton, Badge } from '@mui/material';
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';

export const Navbar = () => {
  const { asPath } = useRouter();

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

        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
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

        <IconButton>
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

        <Button>
          Menu
        </Button>
      </Toolbar>
    </AppBar>
  )
}
