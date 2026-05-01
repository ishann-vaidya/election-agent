import { NavLink } from 'react-router-dom';
import type { NavItem } from '../navigation';

type AppShellProps = {
  navItems: NavItem[];
  children: React.ReactNode;
};

export function AppShell({ navItems, children }: AppShellProps) {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner">
          <div className="brand-block">
            <div className="brand-mark">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div className="brand-copy">
              <div className="brand-name">ElectED 2.0</div>
              <div className="brand-subtitle">Civic guidance for India</div>
            </div>
          </div>

          <nav id="primary-nav" className="top-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? 'top-nav-link top-nav-link-active' : 'top-nav-link'
                }
              >
                <span className="nav-label">{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
