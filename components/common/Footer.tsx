import { Globe, Mail, Share2, Video } from "lucide-react";
import Link from "next/link";

const linkColumns = [
  [
    "Audio Description",
    "Help Center",
    "Gift Cards",
    "Media Center",
  ],
  [
    "Investor Relations",
    "Jobs",
    "Terms of Use",
    "Privacy",
  ],
  [
    "Cookie Preferences",
    "Corporate Information",
    "Contact Us",
    "Legal Notices",
  ],
  [
    "Speed Test",
    "Legal Guarantee",
    "Ad Choices",
    "FAQ",
  ],
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-surface-lowest px-6 py-12 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex gap-4 text-muted">
          <Share2 className="h-5 w-5 cursor-pointer hover:text-white" />
          <Globe className="h-5 w-5 cursor-pointer hover:text-white" />
          <Mail className="h-5 w-5 cursor-pointer hover:text-white" />
          <Video className="h-5 w-5 cursor-pointer hover:text-white" />
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm text-muted-dim md:grid-cols-4">
          {linkColumns.map((column, i) => (
            <ul key={i} className="space-y-3">
              {column.map((label) => (
                <li key={label}>
                  <Link href="#" className="hover:underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
        <button
          type="button"
          className="mt-8 rounded border border-muted-dim px-3 py-1.5 text-sm text-muted hover:border-white hover:text-white"
        >
          Service Code
        </button>
        <p className="mt-4 text-xs text-muted-dim">
          © 1997-2024 CineStream, Inc.
        </p>
      </div>
    </footer>
  );
}
