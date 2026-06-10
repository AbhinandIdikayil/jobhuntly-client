import { useMemo } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import {
  Building2,
  ChevronLeft,
  ClipboardList,
  LayoutGrid,
  MessageSquareText,
  Settings2,
  Users,
  CalendarClock,
} from "lucide-react";

import Header from "./Header";
import { RootState } from "src/redux/store";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const drawerWidth = 280;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  boxShadow: "none",
  backgroundColor: "transparent",
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1.5, 2),
  minHeight: 96,
  justifyContent: "space-between",
}));

interface Props {
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
  navLinks: string[];
  open: boolean;
}

const navItems = [
  { label: "Dashboard", icon: LayoutGrid, to: "" },
  { label: "Messages", icon: MessageSquareText, to: "messages" },
  { label: "All applicants", icon: Users, to: "applicants" },
  { label: "Job listing", icon: ClipboardList, to: "job-list" },
  { label: "My schedule", icon: CalendarClock, to: "schedules" },
];

function SideDrawer({ handleDrawerOpen, handleDrawerClose, navLinks, open }: Props) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const company = useSelector((state: RootState) => state?.user?.user);

  const drawerPaperSx = useMemo(
    () => ({
      width: isSmallScreen ? "100%" : drawerWidth,
      boxSizing: "border-box",
      borderRight: "1px solid rgba(28, 25, 23, 0.08)",
      background:
        "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(250,249,247,0.98) 100%)",
      backdropFilter: "blur(14px)",
      overflowX: "hidden",
    }),
    [isSmallScreen]
  );

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{ zIndex: 90 }}>
        <Header open={open} func={handleDrawerOpen} />
      </AppBar>

      <Drawer
        sx={{
          width: isSmallScreen ? "100%" : drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": drawerPaperSx,
          "& .MuiDrawer-paperAnchorLeft": {
            [theme.breakpoints.down("sm")]: {
              left: open ? 0 : "-100%",
            },
          },
        }}
        variant={isSmallScreen ? "temporary" : "persistent"}
        anchor="left"
        open={open}
      >
        <div className="flex h-full flex-col px-3 pb-4 pt-2">
          <DrawerHeader>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-900/15">
                {company?.images ? (
                  <img
                    loading="lazy"
                    src={company.images}
                    alt="Company logo"
                    className="h-12 w-12 rounded-2xl object-cover"
                  />
                ) : (
                  <Building2 className="h-5 w-5" />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold tracking-[0.28em] text-warm-text-tertiary uppercase">
                  Company space
                </p>
                <h2 className="truncate font-display text-2xl text-warm-text-primary">
                  {company?.name ?? "JobHuntly"}
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDrawerClose}
              className="grid h-10 w-10 place-items-center rounded-full border border-warm-border bg-white text-warm-text-primary transition-colors hover:bg-warm-surface"
              aria-label="Collapse sidebar"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          </DrawerHeader>


          <div className="mt-5 px-2">
            <p className="px-3 text-xs font-semibold tracking-[0.24em] text-warm-text-tertiary uppercase">
              Navigation
            </p>
            <List className="mt-3 space-y-2">
              {navItems.map(({ label, icon: Icon, to }, index) => {
                const target = navLinks[index] ?? to;
                return (
                  <ListItem key={label} disablePadding>
                    <NavLink
                      end={index === 0}
                      to={target}
                      className={({ isActive }) =>
                        [
                          "group block w-full rounded-[18px] border px-1.5 py-1 transition-all duration-200",
                          isActive
                            ? "border-amber-200 bg-amber-50 shadow-[0_12px_30px_rgba(180,83,9,0.10)]"
                            : "border-transparent hover:border-warm-border hover:bg-white hover:shadow-warm",
                        ].join(" ")
                      }
                    >
                      {({ isActive }) => (
                        <ListItemButton
                          disableRipple
                          sx={{
                            borderRadius: "14px",
                            px: 1.5,
                            py: 1.25,
                            width: "100%",
                            minHeight: 56,
                            bgcolor: "transparent",
                            "&:hover": { bgcolor: "transparent" },
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 40,
                              color: isActive ? "#b45309" : "#44403c",
                            }}
                          >
                            <Icon className="h-5 w-5" />
                          </ListItemIcon>
                          <ListItemText
                            primary={label}
                            primaryTypographyProps={{
                              className: isActive
                                ? "text-warm-text-primary font-semibold"
                                : "text-warm-text-primary font-medium",
                            }}
                          />
                          {isActive && (
                            <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                          )}
                        </ListItemButton>
                      )}
                    </NavLink>
                  </ListItem>
                );
              })}
            </List>
          </div>

          <div className="mt-4 px-2">
            <Divider
              sx={{
                borderColor: "rgba(28, 25, 23, 0.08)",
                mb: 2,
              }}
            />
            <p className="px-3 text-xs font-semibold tracking-[0.24em] text-warm-text-tertiary uppercase">
              Workspace
            </p>
            <List className="mt-3">
              <ListItem disablePadding>
                <NavLink
                  to="settings"
                  className={({ isActive }) =>
                    [
                      "group block w-full rounded-[18px] border px-1.5 py-1 transition-all duration-200",
                      isActive
                        ? "border-slate-900 bg-slate-950 shadow-[0_12px_30px_rgba(15,23,42,0.12)]"
                        : "border-transparent hover:border-warm-border hover:bg-white hover:shadow-warm",
                    ].join(" ")
                  }
                >
                  {({ isActive }) => (
                    <ListItemButton
                      disableRipple
                      sx={{
                        borderRadius: "14px",
                        px: 1.5,
                        py: 1.25,
                        width: "100%",
                        minHeight: 56,
                        bgcolor: "transparent",
                        "&:hover": { bgcolor: "transparent" },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 40,
                          color: isActive ? "#ffffff" : "#44403c",
                        }}
                      >
                        <Settings2 className="h-5 w-5" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Settings"
                        primaryTypographyProps={{
                          className: isActive
                            ? "text-white font-semibold"
                            : "text-warm-text-primary font-medium",
                        }}
                      />
                    </ListItemButton>
                  )}
                </NavLink>
              </ListItem>
            </List>
          </div>
        </div>
      </Drawer>
    </>
  );
}

export default SideDrawer;
