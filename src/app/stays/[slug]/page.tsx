import { UNIQUE_HAVEN_PROPERTIES } from "@/data/properties";
import PropertyDetailClient from "./PropertyDetailClient";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return UNIQUE_HAVEN_PROPERTIES.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolved = await params;
  const prop = UNIQUE_HAVEN_PROPERTIES.find((p) => p.slug === resolved.slug);
  if (!prop) return { title: "Stay Not Found | Homey India" };

  return {
    title: `${prop.name} | The Unique Haven Homes`,
    description: prop.description,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const resolved = await params;
  const prop = UNIQUE_HAVEN_PROPERTIES.find((p) => p.slug === resolved.slug);
  if (!prop) notFound();

  return <PropertyDetailClient prop={prop} />;
}
