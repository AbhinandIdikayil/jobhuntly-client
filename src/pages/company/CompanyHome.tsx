import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import SideDrawer from '../../components/company/SideDrawer';
import { getCompany } from 'src/redux/actions/companyAction';
import { useDispatch} from 'react-redux';
import { AppDispatch } from 'src/redux/store';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    // padding: theme.spacing(3,1,0,1),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
    [theme.breakpoints.down('sm')]: {
        marginLeft: 0,
        width: '100%',
        padding: theme.spacing(2),
    },
}));


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function CompanyHome() {
    const [open, setOpen] = React.useState(true);
    const dispatch: AppDispatch = useDispatch()

    const handleDrawerOpen = React.useCallback(() => {
        setOpen(true);
    }, [])

    const handleDrawerClose = React.useCallback(() => {
        setOpen(false);
    }, []);

    const fetchCompany = async () => {
        try {
            await dispatch(getCompany()).unwrap();
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        const checkUserRole = async () => {
            try {
                await fetchCompany();
            } catch (error) {
                // Optionally handle any errors here
            }
        };

        checkUserRole();
    }, [])

    const navLinks = ['', 'messages', 'applicants', 'job-list', 'schedules']

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--surface)' }}>
            <SideDrawer
                open={open}
                navLinks={navLinks}
                handleDrawerOpen={handleDrawerOpen}
                handleDrawerClose={handleDrawerClose}
            />
            <Main open={open} style={{ backgroundColor: 'transparent' }}>
                <DrawerHeader>
                </DrawerHeader>


                <Outlet context={{ open }} />

            </Main>
        </Box>
    );
}
