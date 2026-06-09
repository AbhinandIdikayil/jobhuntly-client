import { useState, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquareText,
  FileText,
  Search,
  Building2,
  CircleUserRound,
  FilePlus2,
  ListChecks,
  House,
  ChevronLeft,
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';

interface props {
  handleDrawerClose: () => void;
  handleDrawerOpen?: () => void;
  open: boolean;
}

const mainNavItems = [
  { text: 'Dashboard', icon: House, link: '' },
  { text: 'Messages', icon: MessageSquareText, link: 'messages' },
  { text: 'Applications', icon: FileText, link: 'applications' },
  { text: 'Jobs', icon: Search, link: 'jobs' },
  { text: 'Companies', icon: Building2, link: 'companies' },
  { text: 'Profile', icon: CircleUserRound, link: 'profile' },
];

const bottomNavItems = [
  { text: 'Quiz', icon: ListChecks, link: 'quiz' },
  { text: 'Resume', icon: FilePlus2, link: 'resume' },
];

function SideDrawer({ handleDrawerClose, handleDrawerOpen, open }: props) {
  const [hovered, setHovered] = useState(false);
  const user = useSelector((state: RootState) => state?.user);
  const isExpanded = open || hovered;

  // const handleMouseEnter = useCallback(() => {
  //   if (!open) setHovered(true);
  // }, [open]);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
  }, []);

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={handleDrawerClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        // onMouseEnter={handleMous eEnter}
        onMouseLeave={handleMouseLeave}
        className={`
          fixed top-0 left-0 h-full z-50
          bg-white border-r border-zinc-200 shadow-[0_8px_30px_rgba(15,23,42,0.04)]
          flex flex-col
          overflow-visible
          max-lg:${open ? 'translate-x-0' : '-translate-x-full'}
          ${isExpanded ? 'w-[260px]' : 'w-[72px]'}
        `}
        style={{
          transition: 'width 280ms cubic-bezier(0.4, 0, 0.2, 1), transform 280ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        >
        <div className="flex h-full w-full flex-col overflow-hidden">
        {/* Logo area */}
        <div className="flex items-center h-[72px] px-5 border-b border-zinc-200 shrink-0 bg-white">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-indigo-600/10 flex items-center justify-center shrink-0">
              <span className="text-indigo-600 font-bold text-lg font-display">J</span>
            </div>
            <AnimatePresence>
              {isExpanded && (
                <motion.span
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.2, delay: 0.05 }}
                  className="text-[17px] font-display text-slate-800 whitespace-nowrap tracking-wide"
                >
                  JobHuntly
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Main nav */}
        <nav className="flex-1 flex flex-col py-4 px-3 overflow-y-auto overflow-x-hidden">
          <div className="flex flex-col gap-1">
            {mainNavItems.map((item) => (
              <NavLink
                key={item.text}
                to={`/Dashboard/${item.link}`}
                end={item.link === ''}
                className="sidebar-nav-link"
              >
                {({ isActive }) => (
                  <div
                    className={`
                      sidebar-nav-item relative flex items-center gap-3
                      px-3 py-2.5 rounded-lg cursor-pointer
                      ${isActive
                        ? 'bg-violet-100 text-indigo-600'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-zinc-50'
                      }
                    `}
                  >
                    <item.icon
                      size={20}
                      className={`sidebar-nav-icon shrink-0 ${isActive ? 'text-indigo-600' : 'text-slate-500'}`}
                      strokeWidth={isActive ? 2.2 : 1.8}
                    />
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.span
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -6 }}
                          transition={{ duration: 0.18, delay: 0.03 }}
                          className={`sidebar-nav-label text-[14px] font-medium whitespace-nowrap ${isActive ? 'text-indigo-600 font-semibold' : ''}`}
                        >
                          {item.text}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {/* Tooltip when collapsed */}
                    {!isExpanded && (
                      <div className="sidebar-tooltip">{item.text}</div>
                    )}

                    {/* Active indicator bar */}
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-indigo-600 rounded-r-full"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </div>
                )}
              </NavLink>
            ))}
          </div>

          {/* Divider */}
          <div className="my-4 mx-3 h-px bg-white/10" />

          {/* Bottom nav */}
          <div className="flex flex-col gap-1">
            {bottomNavItems.map((item) => (
              <NavLink
                key={item.text}
                to={`/Dashboard/${item.link}`}
                className="sidebar-nav-link"
              >
                {({ isActive }) => (
                  <div
                    className={`
                      sidebar-nav-item relative flex items-center gap-3
                      px-3 py-2.5 rounded-lg cursor-pointer
                      ${isActive
                        ? 'bg-violet-100 text-indigo-600'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-zinc-50'
                      }
                    `}
                  >
                    <item.icon
                      size={20}
                      className={`sidebar-nav-icon shrink-0 ${isActive ? 'text-indigo-600' : 'text-slate-500'}`}
                      strokeWidth={isActive ? 2.2 : 1.8}
                    />
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.span
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -6 }}
                          transition={{ duration: 0.18, delay: 0.03 }}
                          className={`sidebar-nav-label text-[14px] font-medium capitalize whitespace-nowrap ${isActive ? 'text-indigo-600 font-semibold' : ''}`}
                        >
                          {item.text}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {!isExpanded && (
                      <div className="sidebar-tooltip">{item.text}</div>
                    )}

                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active-bottom"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-indigo-600 rounded-r-full"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </div>
                )}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* User section at bottom */}
        <div className="border-t border-zinc-200 px-3 py-3 shrink-0 bg-white">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-zinc-100 flex items-center justify-center shrink-0 overflow-hidden">
              {user?.user?.image ? (
                <img
                  src={user.user.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <CircleUserRound size={20} className="text-slate-500" />
              )}
            </div>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.18, delay: 0.05 }}
                  className="flex flex-col min-w-0"
                >
                  <span className="text-[13px] font-medium text-slate-800 truncate">
                    {user?.user?.name || 'User'}
                  </span>
                  <span className="text-[11px] text-slate-500 truncate">
                    {user?.user?.email || ''}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        </div>

        {/* Desktop collapse toggle */}
        <button
          onClick={open ? handleDrawerClose : handleDrawerOpen}
          className={`
            hidden lg:flex absolute top-[22px] -right-3
            w-6 h-6 rounded-full
            bg-white border-2 border-zinc-200 shadow-sm
            items-center justify-center
            text-slate-500 hover:text-slate-800
            transition-colors duration-150
            opacity-100
          `}
        >
          <ChevronLeft size={14} className={`transition-transform duration-200 ${!open ? 'rotate-180' : ''}`} />
        </button>
      </motion.aside>
    </>
  );
}

export default SideDrawer;
