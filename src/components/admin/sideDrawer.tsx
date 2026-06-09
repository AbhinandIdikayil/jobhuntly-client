import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { MdOutlineArrowBackIos } from "react-icons/md";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { TbBuildingSkyscraper } from "react-icons/tb";
import { PiUsersThreeDuotone } from "react-icons/pi";
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './Header';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import { HiMenuAlt3 } from "react-icons/hi";
import { IoSettingsOutline } from 'react-icons/io5';
import { Box, Factory, HousePlus, LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/redux/store';
import { logout } from 'src/redux/actions/userAction';


interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(4, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

interface props {
  handleDrawerOpen: () => void,
  handleDrawerClose: () => void,
  navLinks: string[],
  open: boolean
}


function SideDrawer({ handleDrawerOpen, handleDrawerClose, navLinks, open }: props) {

  const dispatch: AppDispatch = useDispatch()
  function handleAdminLogout() {
    try {
      dispatch(logout(null)).unwrap()
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{ zIndex: 90 }}>

        <Header open={open} func={handleDrawerOpen} />

      </AppBar>
      {!open && (
        <button
          type="button"
          onClick={handleDrawerOpen}
          aria-label="Open sidebar"
          className="fixed left-3 top-[88px] z-[100] flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-slate-600 shadow-md transition-all duration-150 hover:text-slate-900 hover:shadow-lg"
        >
          <HiMenuAlt3 size={22} />
        </button>
      )}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#f4f4f4'
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <MdOutlineArrowBackIos onClick={handleDrawerClose} />
        </DrawerHeader>
        <Divider />
        <List>
          {['Company request', 'All companies', 'All users', 'Category', 'Sector', 'Skills'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <NavLink className={'sidebar-link'} end to={navLinks[index]}>
                <ListItemButton sx={{ width: drawerWidth-1 }}>
                  <ListItemIcon>
                    {
                      text == 'Company request' && <TbBuildingSkyscraper size={30} /> ||
                      text == 'All companies' && <PiUsersThreeDuotone size={30} /> ||
                      text == 'All users' && <PiUsersThreeDuotone size={30} /> ||
                      text == 'Category' && <HousePlus size={30} /> ||
                      text == 'Sector' && <Factory size={30} /> ||
                      text == 'Skills' && <Box size={30} />
                    }
                  </ListItemIcon>
                  <ListItemText className='' primary={text} />
                </ListItemButton>
              </NavLink>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Settings'].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <IoSettingsOutline size={30} />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List>
          <ListItem onClick={handleAdminLogout} key={'Logout'} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LogOut size={30} />
              </ListItemIcon>
              <ListItemText primary={'Logout'} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  )
}

export default SideDrawer
