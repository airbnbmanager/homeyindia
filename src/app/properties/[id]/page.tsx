import { PROPERTIES } from "@/data/properties";
import PropertySettingsClient from "./PropertySettingsClient";

export async function generateStaticParams() {
  return PROPERTIES.map((p) => ({
    id: p.id,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolved = await params;
  return <PropertySettingsClient propertyId={resolved.id} />;
}
