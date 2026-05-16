"use client";

import {
  useState,
  useCallback,
  useEffect,
  type ReactNode,
  type CSSProperties,
} from "react";
import { Moon, Sun, Search, User } from "lucide-react";
import { useTheme } from "next-themes";
import { createPortal } from "react-dom";

// ─── Types ────────────────────────────────────────────────────────────────────

export type Theme = "light" | "dark";

export interface AppBarProps {
  /** Logo to display in the AppBar */
  logo?: ReactNode;
  /** Application name */
  appName?: string;
  /** If provided, renders a search input */
  onSearch?: (query: string) => void;
  /** User avatar image URL or element */
  userAvatar?: ReactNode;
  /** User name to display */
  userName?: string;
}

export interface ThemeToggleProps {
  /** Variant of the top bar. Default: "default" */
  variant?: "default" | "appbar" | "icon";
  /** Content for the app bar when variant is "appbar" */
  appBarProps?: AppBarProps;
  /** Starting theme. Default: "light" */
  defaultTheme?: Theme;
  /** Height of the top bar in px. Default: 44 for default, 60 for appbar */
  barHeight?: number;
  /** Diameter of the icon button in px. Default: 36 */
  buttonSize?: number;
  /** Curtain animation duration in ms. Default: 550 */
  duration?: number;
  /** Called after each theme change completes */
  onThemeChange?: (theme: Theme) => void;
  /** Page content rendered below the bar */
  children?: ReactNode;
}

// ─── Design tokens ────────────────────────────────────────────────────────────

const TOKENS: Record<Theme, Record<string, string>> = {
  light: {
    pageBg: "hsl(45 20% 98%)",
    pageText: "hsl(20 14% 12%)",
    barBg: "hsl(45 20% 98%)",
    barText: "hsl(20 14% 12%)",
    barBorder: "hsl(20 10% 88%)",
    btnBg: "hsl(45 10% 90%)",
    btnText: "hsl(20 14% 12%)",
    btnRing: "hsl(12 76% 51%)",
    inputBg: "hsl(20 10% 88%)",
    inputText: "hsl(20 14% 12%)",
  },
  dark: {
    pageBg: "hsl(20 14% 6%)",
    pageText: "hsl(45 10% 95%)",
    barBg: "hsl(20 14% 6%)",
    barText: "hsl(45 10% 95%)",
    barBorder: "hsl(20 14% 15%)",
    btnBg: "hsl(20 14% 12%)",
    btnText: "hsl(45 10% 95%)",
    btnRing: "hsl(12 76% 51%)",
    inputBg: "hsl(20 14% 15%)",
    inputText: "hsl(45 10% 95%)",
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

type CurtainPhase = "idle" | "falling" | "rising";

const EASING = "cubic-bezier(0.76, 0, 0.24, 1)";

export function ThemeToggle({
  variant = "default",
  appBarProps,
  defaultTheme = "light",
  barHeight: explicitBarHeight,
  buttonSize = 36,
  duration = 550,
  onThemeChange,
  children,
}: ThemeToggleProps) {
  const isAppBar = variant === "appbar";
  const isIcon = variant === "icon";
  const barHeight = explicitBarHeight ?? (isAppBar ? 60 : 44);

  const { setTheme: setNextTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<CurtainPhase>("idle");
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [curtainColor, setCurtainColor] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);


  const effectiveTheme: Theme = (
    mounted ? (resolvedTheme === "dark" ? "dark" : "light") : defaultTheme
  ) as Theme;

  const t = TOKENS[effectiveTheme];

  const toggle = useCallback(() => {
    if (phase !== "idle") return;
    const next: Theme = effectiveTheme === "light" ? "dark" : "light";
    setCurtainColor(TOKENS[next].pageBg);
    setPhase("falling");

    setTimeout(() => {
      setNextTheme(next);
      onThemeChange?.(next);

      setPhase("rising");
      setTimeout(() => setPhase("idle"), duration + 60);
    }, duration);
  }, [phase, effectiveTheme, duration, onThemeChange, setNextTheme]);

  // ── Derived styles ──────────────────────────────────────────────────────────

  const pageStyle: CSSProperties = {
    minHeight: "100vh",
    paddingTop: barHeight,
    background: t.pageBg,
    color: t.pageText,
    transition: "background 0.3s ease, color 0.3s ease",
  };

  const barStyle: CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: barHeight,
    background: t.barBg,
    color: t.barText,
    borderBottom: `1px solid ${t.barBorder}`,
    overflow: "visible",
    zIndex: 9998,
    transition: "background 0.3s ease, border-color 0.3s ease, color 0.3s ease",
    display: isAppBar ? "flex" : "block",
    alignItems: "center",
    justifyContent: "space-between",
    padding: isAppBar ? "0 24px" : "0",
    fontFamily: "system-ui, -apple-system, sans-serif",
  };

  const btnScale = pressed ? 0.96 : hovered ? 1.1 : 1;
  const btnStyle: CSSProperties = {
    position: isAppBar || isIcon ? "relative" : "absolute",
    bottom: isAppBar || isIcon ? "auto" : -(buttonSize / 2),
    left: isAppBar || isIcon ? "auto" : "50%",
    transform: isAppBar || isIcon ? `scale(${btnScale})` : `translateX(-50%) scale(${btnScale})`,
    width: buttonSize,
    height: buttonSize,
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: t.btnBg,
    color: t.btnText,
    boxShadow: `0 0 0 1.5px ${t.btnRing}`,
    zIndex: 9999,
    outline: "none",
    transition:
      "background 0.3s ease, color 0.3s ease, transform 0.15s ease, box-shadow 0.3s ease",
    marginLeft: isAppBar ? "16px" : "0",
    flexShrink: 0,
  };

  const curtainStyle: CSSProperties = {
    position: "fixed",
    inset: 0,
    background: curtainColor,
    transformOrigin: "top",
    transform: phase === "falling" ? "scaleY(1)" : "scaleY(0)",
    transition: `transform ${duration}ms ${EASING}`,
    zIndex: 9997,
    pointerEvents: "none",
  };

  const appBarSectionStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  };

  const iconSize = Math.round(buttonSize * 0.45);

  if (isIcon) {
    return (
      <>
        {mounted && createPortal(<div aria-hidden="true" style={curtainStyle} />, document.body)}
        <button
          style={btnStyle}
          onClick={toggle}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => {
            setHovered(false);
            setPressed(false);
          }}
          onMouseDown={() => setPressed(true)}
          onMouseUp={() => setPressed(false)}
          aria-label={effectiveTheme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          aria-pressed={effectiveTheme === "dark"}
        >
          {effectiveTheme === "light" ? (
            <Moon size={iconSize} className="text-blue-400" />
          ) : (
            <Sun size={iconSize} className="text-amber-500" />
          )}
        </button>
      </>
    );
  }

  return (
    <div style={pageStyle}>
      {/* Curtain overlay */}
      {mounted && createPortal(<div aria-hidden="true" style={curtainStyle} />, document.body)}

      {/* Fixed top bar */}
      <div style={barStyle}>
        {isAppBar && (
          <div style={{ ...appBarSectionStyle, flex: 1 }}>
            {appBarProps?.logo && (
              <div style={{ display: "flex", alignItems: "center" }}>
                {appBarProps.logo}
              </div>
            )}
            {appBarProps?.appName && (
              <span style={{ fontWeight: 600, fontSize: "1.1rem", letterSpacing: "-0.01em" }}>
                {appBarProps.appName}
              </span>
            )}
          </div>
        )}

        {isAppBar && appBarProps?.onSearch && (
          <div style={{ ...appBarSectionStyle, flex: 1, justifyContent: "center" }}>
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "320px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={{ position: "absolute", left: "12px", display: "flex", opacity: 0.6 }}>
                <Search size={14} />
              </div>
              <input
                type="text"
                placeholder="Search..."
                onChange={(e) => appBarProps.onSearch?.(e.target.value)}
                style={{
                  width: "100%",
                  height: "36px",
                  padding: "0 16px 0 36px",
                  borderRadius: "18px",
                  border: "none",
                  outline: "none",
                  background: t.inputBg,
                  color: t.inputText,
                  fontSize: "0.9rem",
                  transition: "background 0.3s ease, color 0.3s ease",
                }}
              />
            </div>
          </div>
        )}

        {isAppBar && (
          <div style={{ ...appBarSectionStyle, flex: 1, justifyContent: "flex-end" }}>
            {appBarProps?.userName && (
              <span style={{ fontSize: "0.9rem", opacity: 0.9 }}>
                {appBarProps.userName}
              </span>
            )}
            {appBarProps?.userAvatar !== undefined ? (
              appBarProps.userAvatar
            ) : (
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: t.inputBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: t.inputText,
                }}
              >
                <User size={18} />
              </div>
            )}

            {/* Toggle Button in AppBar */}
            <button
              style={btnStyle}
              onClick={toggle}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => {
                setHovered(false);
                setPressed(false);
              }}
              onMouseDown={() => setPressed(true)}
              onMouseUp={() => setPressed(false)}
              aria-label={effectiveTheme === "light" ? "Switch to dark mode" : "Switch to light mode"}
              aria-pressed={effectiveTheme === "dark"}
            >
              {effectiveTheme === "light" ? (
                <Moon size={iconSize} className="text-blue-400" />
              ) : (
                <Sun size={iconSize} className="text-amber-500" />
              )}
            </button>
          </div>
        )}

        {!isAppBar && (
          // Default layout: just the button hanging out
          <button
            style={btnStyle}
            onClick={toggle}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => {
              setHovered(false);
              setPressed(false);
            }}
            onMouseDown={() => setPressed(true)}
            onMouseUp={() => setPressed(false)}
            aria-label={effectiveTheme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            aria-pressed={effectiveTheme === "dark"}
          >
            {effectiveTheme === "light" ? (
              <Moon size={iconSize} className="text-blue-400" />
            ) : (
              <Sun size={iconSize} className="text-amber-500" />
            )}
          </button>
        )}
      </div>

      {/* Page content */}
      {children}
    </div>
  );
}
