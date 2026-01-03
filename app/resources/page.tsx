import { getCombinedResources } from "@/lib/fetchResources";
import ResourcesClient from "@/components/Resources/ResourcesClient";

export default async function ResourcesPage() {
  // fetch data on the server (combines static TS file + Google Sheet)
  const allResources = await getCombinedResources();
  return <ResourcesClient initialResources={allResources} />;
}