import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { CustomAppBar, DrawerHeader, drawerWidth } from './NavBar.styles';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import SettingsIcon from '@mui/icons-material/Settings';
import keycloak from '../../auth/keycloak';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserInfo } from '../../store/userSlice';
import { useEffect, useState } from 'react';

function NavBar({ currentPage, setCurrentPage }) {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const userInfo = useSelector((state) => state.user.userInfo);
    const dispatch = useDispatch();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        keycloak.logout().then(() => {
        });
        dispatch(clearUserInfo());
    };

    const menuItems = ['Boutique', 'Transaction', 'Statistiques', 'Paramètres'];

    const getInitials = (name) => {
        if (!name) return '';
        const nameParts = name.split(' ');
        const initials = nameParts.map(part => part[0]).join('');
        return initials.toUpperCase();
    };

    const userInitials = userInfo ? getInitials(`${userInfo.firstName} ${userInfo.lastName}`) : 'U';

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <CustomAppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={[
                            {
                                mr: 2,
                            },
                            open && { display: 'none' },
                        ]}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {menuItems[currentPage]}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton
                        color="inherit"
                        onClick={handleMenuOpen}
                    >
                        <Avatar>{userInitials}</Avatar>
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </CustomAppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {menuItems.map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton onClick={() => { setCurrentPage(index); handleDrawerClose() }}>
                                <ListItemIcon>
                                    {(() => {
                                        switch (index) {
                                            case 0:
                                                return <ShoppingBagIcon />;
                                            case 1:
                                                return <ReceiptLongIcon />;
                                            case 2:
                                                return <LeaderboardIcon />;
                                            case 3:
                                                return <SettingsIcon />;
                                            default:
                                                return <ShoppingBagIcon />;
                                        }
                                    })()}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
}

export default NavBar;
