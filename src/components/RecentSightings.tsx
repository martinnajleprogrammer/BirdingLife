'use client'
import useFetch from "@/hooks/useFetch";

export type Sighting = {
  subId: string;
  speciesCode: string;
  comName: string;
  sciName: string;
  locName: string;
  obsDt: string;
  howMany?: number;
};

const RecentSightings = () => {

  const { data, error, loading } = useFetch<{ data: Sighting[] }>(
    process.env.NEXT_PUBLIC_RECENT_SIGHTINGS_API_URL ?? ''
  )

  if (loading) {
    return <p>Loading watched species...</p>;
  }

  if (error) {
    return <p>Something went wrong: {error}</p>;
  }

  const sightings = data?.data ?? [];

  if (sightings.length === 0) {
    return <p>No recent sightings found nearby.</p>;
  }

  return (
    <ul>
      {sightings.map((sighting) => (
        <li key={sighting.subId}>
          <strong>{sighting.comName}</strong> ({sighting.sciName}) — {sighting.locName}, {sighting.obsDt}
        </li>
      ))}
    </ul>
  );
};
export default RecentSightings;