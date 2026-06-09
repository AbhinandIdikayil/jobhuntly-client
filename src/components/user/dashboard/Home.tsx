import * as React from 'react';
import { Outlet } from 'react-router-dom';
import SideDrawer from './SideDrawer';
import Header from './Header';

function useIsMobile(breakpoint = 1024) {
    const [isMobile, setIsMobile] = React.useState(
        () => typeof window !== 'undefined' && window.innerWidth < breakpoint
    );

    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [breakpoint]);

    return isMobile;
}

export default function DashboardHome() {
    const [open, setOpen] = React.useState(true);
    const isMobile = useIsMobile();

    const handleDrawerOpen = React.useCallback(() => {
        setOpen(true);
    }, []);

    const handleDrawerClose = React.useCallback(() => {
        setOpen(false);
    }, []);

    // On mobile, sidebar overlays (no margin push). On desktop, it pushes.
    const sidebarWidth = isMobile ? 0 : (open ? 260 : 72);

    return (
        <div className="flex h-screen bg-warm-surface overflow-hidden">
            {/* Sidebar */}
            <SideDrawer
                open={open}
                handleDrawerClose={handleDrawerClose}
                handleDrawerOpen={handleDrawerOpen}
            />

            {/* Main content area */}
            <div
                className="flex-1 flex flex-col min-w-0 overflow-hidden"
                style={{
                    marginLeft: `${sidebarWidth}px`,
                    transition: 'margin-left 280ms cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            >
                {/* Header */}
                <Header func={handleDrawerOpen} open={open} />

                {/* Page content */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-6">
                    <Outlet context={{ open }} />
                </main>
            </div>
        </div>
    );
}
