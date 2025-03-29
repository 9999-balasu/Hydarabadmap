/*export async function GET() {
  const mockData = [
    { lat: 17.3850, lng: 78.4867 }, 
    { lat: 17.3905, lng: 78.4879 },
    { lat: 17.3950, lng: 78.4892 },
    { lat: 17.4000, lng: 78.4920 },
    { lat: 17.4050, lng: 78.4950 }
  ];
  return Response.json(mockData);
}*/




export async function GET() {
  return Response.json([
    { lat: 17.3850, lng: 78.4867 }, 
    { lat: 17.3905, lng: 78.4879 },
    { lat: 17.3950, lng: 78.4892 },
    { lat: 17.4000, lng: 78.4920 },
    { lat: 17.4050, lng: 78.4950 }
  ]);
}


  