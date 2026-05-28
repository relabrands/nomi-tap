import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, limit, orderBy } from "firebase/firestore";
import { db } from "@/integrations/firebase/client";
import { ProfileView, type ProfileData, type SocialLink, type B2BLink } from "@/components/ProfileView";

export const Route = createFileRoute("/p/$slug")({
  head: ({ params }) => ({
    meta: [{ title: `${params.slug} — Nomi` }],
  }),
  component: PublicProfilePage,
});

function PublicProfilePage() {
  const { slug } = Route.useParams();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const qProfile = query(collection(db, "profiles"), where("slug", "==", slug), limit(1));
      const profileSnapshot = await getDocs(qProfile);
      
      if (profileSnapshot.empty) {
        setLoading(false);
        return;
      }
      
      const pDoc = profileSnapshot.docs[0];
      const p = { id: pDoc.id, ...pDoc.data() } as any;

      const qLinks = query(collection(db, "social_links"), where("profile_id", "==", p.id), orderBy("sort_order", "asc"));
      const linksSnapshot = await getDocs(qLinks);
      const links = linksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      setProfile({
        ...p,
        b2b_links: (p.b2b_links as B2BLink[]) ?? [],
        social_links: (links as SocialLink[]) ?? [],
      });
      setLoading(false);
    })();
  }, [slug]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="text-2xl font-semibold text-foreground">Perfil no encontrado</h1>
        <p className="mt-2 text-sm text-muted-foreground">No existe ninguna tarjeta con el slug "{slug}".</p>
        <Link to="/" className="mt-6 text-sm font-medium text-primary hover:underline">Ir al inicio</Link>
      </main>
    );
  }

  return <ProfileView profile={profile} />;
}
