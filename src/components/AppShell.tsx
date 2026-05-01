import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import type { NavItem } from '../navigation';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

type AppShellProps = {
  navItems: NavItem[];
  children: React.ReactNode;
};

export function AppShell({ navItems, children }: AppShellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navRailRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const navRail = navRailRef.current;

    if (!navRail) {
      return undefined;
    }

    let animationFrame = 0;
    let direction = 1;

    const tick = () => {
      const maxScrollTop = navRail.scrollHeight - navRail.clientHeight;

      if (maxScrollTop <= 0) {
        animationFrame = window.requestAnimationFrame(tick);
        return;
      }

      navRail.scrollTop += direction * 0.4;

      if (navRail.scrollTop >= maxScrollTop) {
        direction = -1;
      }

      if (navRail.scrollTop <= 0) {
        direction = 1;
      }

      animationFrame = window.requestAnimationFrame(tick);
    };

    const handleMouseEnter = () => {
      if (animationFrame === 0) {
        animationFrame = window.requestAnimationFrame(tick);
      }
    };

    const handleMouseLeave = () => {
      if (animationFrame !== 0) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    };

    navRail.addEventListener('mouseenter', handleMouseEnter);
    navRail.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      navRail.removeEventListener('mouseenter', handleMouseEnter);
      navRail.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrame !== 0) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <div className={`app-shell ${isCollapsed ? 'app-shell-collapsed' : ''}`}>
      <aside
        className={`sidebar ${isOpen ? 'sidebar-open' : ''} ${isCollapsed ? 'sidebar-collapsed' : ''}`}
      >
        <div className="brand-block brand-block-top">
          <div className="brand-mark">E</div>
          <div className="brand-copy">
            <div className="brand-name">ElectED 2.0</div>
            <div className="brand-subtitle">Civic guidance for real people</div>
          </div>
          <Button
            variant="ghost"
            className="collapse-toggle"
            aria-expanded={!isCollapsed}
            aria-label={isCollapsed ? 'Expand navigation' : 'Collapse navigation'}
            onClick={() => setIsCollapsed((value) => !value)}
          >
            {isCollapsed ? 'Expand' : 'Collapse'}
          </Button>
        </div>

        <div className="sidebar-note">
          <Badge tone="gold">Day 1 scaffold</Badge>
          <p>
            This first build sets up the app frame, shared styles, and route
            placeholders.
          </p>
        </div>

        <div className="nav-rail" ref={navRailRef}>
          <nav id="primary-nav" className="nav-list" aria-label="Primary">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? 'nav-link nav-link-active' : 'nav-link'
                }
                onClick={() => setIsOpen(false)}
              >
                <span className="nav-label">{item.label}</span>
                <span className="nav-hint">{item.hint}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="sidebar-footer">
          <Button variant="secondary" fullWidth>
            Firebase setup next
          </Button>
        </div>
      </aside>

      <div className="mobile-header">
        <div>
          <div className="mobile-title">ElectED 2.0</div>
          <div className="mobile-subtitle">Plan, learn, and act</div>
        </div>
        <Button
          variant="ghost"
          aria-controls="primary-nav"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
            Menu
          </Button>
      </div>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">Project dashboard</p>
            <h1>Build the civic companion in clean, testable pieces.</h1>
          </div>
          <Badge tone="blue">React + TypeScript + Vite</Badge>
        </header>

        {children}
      </main>
    </div>
  );
}
