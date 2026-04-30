import type { Metadata } from 'next';
import RegionHub from '@/components/RegionHub';
import { citiesByRegion, REGION_DATA } from '@/data/cities';

const REGION = 'bayern' as const;

export const metadata: Metadata = {
  title: REGION_DATA[REGION].metaTitle,
  description: REGION_DATA[REGION].metaDescription,
  alternates: { canonical: `https://skytech-solutions.de/standorte/${REGION}` },
  openGraph: {
    title: REGION_DATA[REGION].metaTitle,
    description: REGION_DATA[REGION].metaDescription,
    url: `https://skytech-solutions.de/standorte/${REGION}`,
  },
};

export default function BayernPage() {
  return <RegionHub region={REGION} cities={citiesByRegion(REGION)} info={REGION_DATA[REGION]} />;
}
