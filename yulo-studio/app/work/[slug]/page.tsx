import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudy from "@/components/CaseStudy";
import PageChrome from "@/components/PageChrome";
import SiteFooter from "@/components/SiteFooter";
import { getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const title = `${project.name} — ${project.tagline} | Yulo Studio`;
  return {
    title,
    description: project.intro,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title,
      description: project.intro,
      type: "article",
      url: `/work/${project.slug}`,
      images: [{ url: project.images.hero }],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <main className="min-h-screen bg-bg-warm">
      <PageChrome />
      <CaseStudy project={project} next={next} />
      <SiteFooter />
    </main>
  );
}
