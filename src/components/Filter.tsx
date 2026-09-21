'use client'
import useDebounce from "@/hooks/useDebounce";
import { useMemo, useState } from "react";
import type { Specie } from '../data/species';
type FilterProps = { items: Specie[] };

const Filter = ({ items }: FilterProps) => {


  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [activeFilter, setActiveFilter] = useState<keyof Specie>("habitat");

  const filteredItems = useMemo(() => items.filter((specie) =>
    specie[activeFilter].toLowerCase().includes(debouncedSearch.toLowerCase())
  ), [activeFilter, debouncedSearch, items]);

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <label htmlFor="species-search" className="sr-only">
            Search species
          </label>
          <input
            id="species-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full rounded-md border border-primary/20 bg-white/60 px-3 py-2 text-sm text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <div>
          <label htmlFor="species-filter-field" className="sr-only">
            Filter by
          </label>
          <select
            id="species-filter-field"
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value as keyof Specie)}
            className="rounded-md border border-primary/20 bg-white/60 px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="habitat">Habitat</option>
            <option value="color">Color</option>
          </select>
        </div>
      </div>
      <ul>
        {filteredItems.map((specie: Specie) => (
          <li key={specie.name} className="p-2 bg-amber-50 bg-radial">
            <div className="font-medium text-zinc-600">Name: <span className="text-primary font-semibold">{specie.name}</span>
            </div>
            <div className="font-medium text-zinc-600">
              Common Name: <span className="text-pretty font-normal">{specie.commonName}</span>
            </div>
            <div className="font-medium text-zinc-600">
              Habitat: <span className="text-pretty font-normal">{specie.habitat}</span>
            </div>
            <div className="font-medium text-zinc-600">
              Color: <span className="text-pretty font-normal">{specie.color}</span>
            </div>
          </li>
        ))}
      </ul>
    </>)
}
export default Filter;
