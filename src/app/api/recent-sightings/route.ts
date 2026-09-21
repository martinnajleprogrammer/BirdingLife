export async function GET() {
  const token = process.env.EBIRD_API_TOKEN;
  if (!token) {
    return Response.json({ error: 'Missing EBIRD_API_TOKEN' }, { status: 500 });
  }
  const res = await fetch('https://api.ebird.org/v2/data/obs/geo/recent?lat=-37.32&lng=-59.13&dist=25', {
    headers: {
      'Content-Type': 'application/json',
      'X-eBirdApiToken': token,
    },
  })
  if (!res.ok) {
    return Response.json({ error: `eBird API error: ${res.status}` }, { status: res.status });
  }

  const data = await res.json()
  return Response.json({ data })
}