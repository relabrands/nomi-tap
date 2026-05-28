import { useState } from "react";
import { Mail, MessageCircle, Linkedin, Globe, UserPlus, Calendar, Twitter, Instagram, Youtube, Github, Phone, Link as LinkIcon, ExternalLink, Share2 } from "lucide-react";
import { NomiLogo } from "./NomiLogo";
import { LeadCaptureModal } from "./LeadCaptureModal";

export type SocialLink = { id?: string; type: string; label: string; url: string };
export type B2BLink = { label: string; url: string };

export interface ProfileData {
  id: string;
  slug: string;
  name: string;
  title: string | null;
  bio: string | null;
  avatar_url: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  calendly_url: string | null;
  b2b_links: B2BLink[];
  social_links: SocialLink[];
}

const ICONS: Record<string, typeof Mail> = {
  email: Mail,
  whatsapp: MessageCircle,
  linkedin: Linkedin,
  website: Globe,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  github: Github,
  phone: Phone,
  other: LinkIcon,
};

function buildVCard(p: ProfileData): string {
  const lines = ["BEGIN:VCARD", "VERSION:3.0", `FN:${p.name}`];
  if (p.title) lines.push(`TITLE:${p.title}`);
  if (p.email) lines.push(`EMAIL;TYPE=WORK:${p.email}`);
  if (p.phone) lines.push(`TEL;TYPE=CELL:${p.phone}`);
  if (p.website) lines.push(`URL:${p.website}`);
  if (p.bio) lines.push(`NOTE:${p.bio.replace(/\n/g, "\\n")}`);
  lines.push("END:VCARD");
  return lines.join("\n");
}

export function ProfileView({ profile }: { profile: ProfileData }) {
  const [leadOpen, setLeadOpen] = useState(false);

  const downloadVCard = () => {
    const blob = new Blob([buildVCard(profile)], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${profile.slug}.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try { await navigator.share({ title: profile.name, url: shareUrl }); } catch {}
    } else {
      await navigator.clipboard.writeText(shareUrl);
    }
  };

  return (
    <main className="min-h-screen w-full bg-background px-5 py-10 sm:py-14">
      <div className="mx-auto flex w-full max-w-md flex-col items-center">
        {/* Hero */}
        <section className="flex flex-col items-center text-center">
          <div
            className="relative h-28 w-28 overflow-hidden rounded-full bg-secondary ring-1 ring-border"
            style={{ boxShadow: "var(--shadow-avatar)" }}
          >
            {profile.avatar_url ? (
              <img src={profile.avatar_url} alt={profile.name} className="h-full w-full object-cover" loading="eager" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-3xl font-semibold text-muted-foreground">
                {profile.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <h1 className="mt-5 text-[28px] font-bold leading-tight tracking-tight text-foreground">{profile.name}</h1>
          {profile.title && (
            <p className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
              {profile.title} <NomiLogo />
            </p>
          )}
        </section>

        {/* Primary CTA */}
        <button
          onClick={downloadVCard}
          className="group mt-8 flex w-full items-center justify-center gap-2.5 rounded-2xl bg-primary px-6 py-4 text-[15px] font-semibold text-primary-foreground shadow-[0_8px_24px_-10px_oklch(0.66_0.17_142/0.6)] transition-all duration-200 hover:bg-[color:var(--primary-hover)] hover:shadow-[0_10px_28px_-8px_oklch(0.66_0.17_142/0.7)] active:scale-[0.985]"
        >
          <UserPlus className="h-5 w-5" strokeWidth={2.2} />
          Guardar Contacto
        </button>

        {/* Bio */}
        {profile.bio && (
          <section className="mt-9 w-full">
            <p className="text-center text-[15px] leading-relaxed text-muted-foreground">{profile.bio}</p>
          </section>
        )}

        {/* Social icons */}
        {profile.social_links.length > 0 && (
          <section className="mt-9 grid w-full grid-cols-4 gap-3">
            {profile.social_links.map((s) => {
              const Icon = ICONS[s.type] ?? LinkIcon;
              return (
                <a
                  key={s.id ?? s.url}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-2"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-card text-foreground/70 transition-all duration-200 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[0_6px_18px_-8px_oklch(0.66_0.17_142/0.55)] group-active:scale-95">
                    <Icon className="h-[22px] w-[22px]" strokeWidth={1.8} />
                  </span>
                  <span className="text-[11px] font-medium text-muted-foreground">{s.label}</span>
                </a>
              );
            })}
          </section>
        )}

        {/* Secondary CTA */}
        {profile.calendly_url && (
          <a
            href={profile.calendly_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 flex w-full items-center justify-center gap-2.5 rounded-2xl border-2 border-primary bg-card px-6 py-3.5 text-[15px] font-semibold text-primary transition-all duration-200 hover:bg-primary hover:text-primary-foreground active:scale-[0.985]"
          >
            <Calendar className="h-5 w-5" strokeWidth={2.2} />
            Agendar Reunión
          </a>
        )}

        {/* Lead capture (ghost) */}
        <button
          onClick={() => setLeadOpen(true)}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-primary/40 bg-transparent px-6 py-3 text-[14px] font-medium text-primary transition-all duration-200 hover:border-primary hover:bg-primary/5 active:scale-[0.985]"
        >
          <Share2 className="h-4 w-4" strokeWidth={2} />
          Compartir mis datos contigo
        </button>

        {/* B2B Featured Links */}
        {profile.b2b_links.length > 0 && (
          <section className="mt-10 flex w-full flex-col gap-2.5">
            {profile.b2b_links.map((b, i) => (
              <a
                key={i}
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-between rounded-xl border border-border bg-card px-5 py-3.5 text-[14px] font-medium text-foreground/80 transition-all duration-200 hover:border-primary/40 hover:text-foreground hover:shadow-sm"
              >
                <span>{b.label}</span>
                <ExternalLink className="h-4 w-4 text-muted-foreground" strokeWidth={1.8} />
              </a>
            ))}
          </section>
        )}

        {/* Footer */}
        <footer className="mt-14 flex items-center gap-1.5 text-[11px] font-medium tracking-wide text-muted-foreground/70">
          Powered by <NomiLogo /> <span className="font-semibold text-muted-foreground">Nomi</span>
        </footer>
      </div>

      <LeadCaptureModal
        open={leadOpen}
        onClose={() => setLeadOpen(false)}
        profileId={profile.id}
        recipientName={profile.name}
      />
    </main>
  );
}
