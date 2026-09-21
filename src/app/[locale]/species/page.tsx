import Filter from '../../../components/Filter'
export const metadata = { title: "Species | Pampas Birding Guide" };
import { species } from '../../../data/species';

export default function SpeciesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Species checklist</h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        Coming soon: a photo-led checklist of colorful bird species found around Tandil and the
        pampa grassland, filterable by habitat and season.
      </p>
      <Filter items={species} />
    </div>
  );
}
