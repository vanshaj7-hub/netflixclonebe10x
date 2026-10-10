"use client";

import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useScrollThreshold } from "@/hooks/useScrollThreshold";
import { useMediaCatalog } from "@/hooks/useMediaList";
import { cn } from "@/lib/cn";
import { useUserMediaStore } from "@/stores/userMediaStore";
import {
  Bell,
  ChevronDown,
  Search,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/browse/tv", label: "TV Shows" },
  { href: "/browse/movies", label: "Movies" },
  { href: "/browse/latest", label: "New & Popular" },
  { href: "/browse/my-list", label: "My List" },
  { href: "/browse/original-audio", label: "Browse by Languages" },
];

const notifications = [
  { id: 1, title: "New season of Solar Wardens is now streaming" },
  { id: 2, title: "Trailer drop: Protocol Ascension" },
  { id: 3, title: "Added to your list: Neon Eclipse" },
];

export function Navbar() {
  const scrolled = useScrollThreshold(50);
  const pathname = usePathname();
  const router = useRouter();
  const activeProfile = useUserMediaStore((s) => s.activeProfile);
  const setActiveProfile = useUserMediaStore((s) => s.setActiveProfile);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebouncedValue(searchQuery, 300);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  const searchRef = useRef<HTMLDivElement>(null);
  const { data: catalogData } = useMediaCatalog();

  const suggestions =
    debouncedQuery.length > 0
      ? (catalogData?.items ?? [])
          .filter((item) =>
            item.title.toLowerCase().includes(debouncedQuery.toLowerCase()),
          )
          .slice(0, 6)
      : [];

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target as Node)
      ) {
        if (!searchQuery) setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [searchQuery]);

  if (pathname.startsWith("/watch/")) {
    return null;
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 z-50 w-full transition-colors duration-200",
        scrolled
          ? "bg-surface-lowest"
          : "bg-gradient-to-b from-black/80 to-transparent backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1920px] items-center gap-6 px-4 md:px-10">
        <Link
          href="/"
          className="text-2xl font-black tracking-tight text-primary"
        >
          CINESTREAM
        </Link>
        <nav className="hidden items-center gap-4 lg:flex">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm transition-colors hover:text-white",
                  active ? "font-bold text-white" : "text-muted",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <div ref={searchRef} className="relative flex items-center">
            {searchOpen && (
              <input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchQuery.trim()) {
                    router.push(
                      `/browse/search?q=${encodeURIComponent(searchQuery.trim())}`,
                    );
                    setSearchOpen(false);
                  }
                }}
                placeholder="Titles, genres..."
                className="w-40 border-b border-white bg-black/40 py-1 pr-8 pl-2 text-sm text-white outline-none md:w-56"
              />
            )}
            <button
              type="button"
              aria-label="Search"
              onClick={() => setSearchOpen((v) => !v)}
              className="rounded p-2 text-white hover:bg-white/10"
            >
              {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </button>
            {searchOpen && suggestions.length > 0 && (
              <div className="absolute top-full right-0 mt-2 w-64 rounded bg-black/95 py-2 shadow-xl">
                {suggestions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="block w-full px-4 py-2 text-left text-sm hover:bg-white/10"
                    onClick={() => {
                      router.push(`/browse/search?q=${encodeURIComponent(item.title)}`);
                      setSearchOpen(false);
                      setSearchQuery("");
                    }}
                  >
                    {item.title}{" "}
                    <span className="text-muted-dim">({item.year})</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <button
              type="button"
              aria-label="Notifications"
              onClick={() => {
                setNotifOpen((v) => !v);
                setUnreadCount(0);
              }}
              className="relative rounded p-2 text-white hover:bg-white/10"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
              )}
            </button>
            {notifOpen && (
              <div className="absolute top-full right-0 mt-2 w-72 rounded bg-zinc-900 p-3 shadow-xl">
                <p className="mb-2 text-sm font-semibold">Notifications</p>
                <ul className="space-y-2 text-sm text-muted">
                  {notifications.map((n) => (
                    <li key={n.id} className="rounded bg-white/5 p-2">
                      {n.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileOpen((v) => !v)}
              className="flex items-center gap-1 rounded p-1 hover:bg-white/10"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded bg-primary text-white">
                <User className="h-4 w-4" />
              </span>
              <ChevronDown className="hidden h-4 w-4 text-white sm:block" />
            </button>
            {profileOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 rounded bg-black/95 py-2 text-sm shadow-xl">
                <p className="border-b border-white/10 px-4 py-2 font-semibold">
                  {activeProfile}
                </p>
                {["Alex", "Jordan", "Kids"].map((profile) => (
                  <button
                    key={profile}
                    type="button"
                    className="block w-full px-4 py-2 text-left hover:bg-white/10"
                    onClick={() => {
                      setActiveProfile(profile);
                      setProfileOpen(false);
                    }}
                  >
                    Switch to {profile}
                  </button>
                ))}
                <Link href="#" className="block px-4 py-2 hover:bg-white/10">
                  Account Settings
                </Link>
                <Link href="#" className="block px-4 py-2 hover:bg-white/10">
                  Help Center
                </Link>
                <button
                  type="button"
                  className="block w-full px-4 py-2 text-left hover:bg-white/10"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
