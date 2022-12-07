import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"
import { useContext, useEffect, useState } from 'react';
import { AuthContext, UIContext } from "../../contexts";
import { useRouter } from "next/router";
import { useWindowDimensions } from "../../hooks";

export const SideMenu = () => {
  const { toogleSideMenu, isMenuOpen } = useContext(UIContext);
  const { isLoggedIn, user, logout } = useContext(AuthContext);

  const router = useRouter();
  const { width } = useWindowDimensions();

  const [searchTerm, setSearchTerm] = useState('');

  const navigateTo = (url: string) => {
    router.push(url);
    toogleSideMenu();
  };

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    toogleSideMenu();

    router.push(`/search/${searchTerm}`);
  };

  return (
    <Drawer
      onClose={toogleSideMenu}
      open={isMenuOpen}
      anchor='right'
      sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
    >
      <Box sx={{ width: 250, paddingTop: 2 }}>

        <List>

          {
            width <= 600 && (
              <ListItem>
                <Input
                  autoFocus
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyUp={(e) => e.key === 'Enter' ? onSearchTerm() : null}
                  type='text'
                  placeholder="Find..."
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={onSearchTerm}
                        aria-label="toggle password visibility"
                      >
                        <SearchOutlined />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </ListItem>
            )
          }

          {
            isLoggedIn && (
              <>
                <ListItem button>
                  <ListItemIcon>
                    <AccountCircleOutlined />
                  </ListItemIcon>
                  <ListItemText primary={'Profile'} />
                </ListItem>

                <ListItem button>
                  <ListItemIcon>
                    <ConfirmationNumberOutlined />
                  </ListItemIcon>
                  <ListItemText primary={'My Orders'} />
                </ListItem>
              </>
            )
          }

          <ListItem onClick={() => navigateTo('/category/men')} button sx={{ display: { xs: '', sm: 'none' } }}>
            <ListItemIcon>
              <MaleOutlined />
            </ListItemIcon>
            <ListItemText primary={'Men'} />
          </ListItem>

          <ListItem onClick={() => navigateTo('/category/women')} button sx={{ display: { xs: '', sm: 'none' } }}>
            <ListItemIcon>
              <FemaleOutlined />
            </ListItemIcon>
            <ListItemText primary={'Women'} />
          </ListItem>

          <ListItem onClick={() => navigateTo('/category/kids')} button sx={{ display: { xs: '', sm: 'none' } }}>
            <ListItemIcon>
              <EscalatorWarningOutlined />
            </ListItemIcon>
            <ListItemText primary={'Kids'} />
          </ListItem>

          {
            isLoggedIn

              ? (
                <ListItem button onClick={logout}>
                  <ListItemIcon>
                    <LoginOutlined />
                  </ListItemIcon>
                  <ListItemText primary={'Logout'} />
                </ListItem>
              )

              : (
                <ListItem button onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)}>
                  <ListItemIcon>
                    <VpnKeyOutlined />
                  </ListItemIcon>
                  <ListItemText primary={'Login'} />
                </ListItem>
              )
          }

          {
            isLoggedIn && user?.role === 'admin' && (
              <>
                {/* Admin */}
                <Divider />
                <ListSubheader>Admin Dashboard</ListSubheader>

                <ListItem button>
                  <ListItemIcon>
                    <CategoryOutlined />
                  </ListItemIcon>
                  <ListItemText primary={'Products'} />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <ConfirmationNumberOutlined />
                  </ListItemIcon>
                  <ListItemText primary={'Orders'} />
                </ListItem>

                <ListItem button>
                  <ListItemIcon>
                    <AdminPanelSettings />
                  </ListItemIcon>
                  <ListItemText primary={'Users'} />
                </ListItem>
              </>
            )
          }

        </List>
      </Box>
    </Drawer>
  )
}