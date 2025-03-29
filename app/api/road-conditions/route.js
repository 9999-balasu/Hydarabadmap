
export async function GET(req) {
    const mockRoadConditions = [
      { id: 1, road: "Highway", condition: "Smooth", lat: 17.385, lng: 78.4867 },
      { id: 2, road: "City Street", condition: "Potholes", lat: 17.3905, lng: 78.4879 }
    ];
  
    return new Response(JSON.stringify({ status: "success", roads: mockRoadConditions }), {
      headers: { "Content-Type": "application/json" },
    });
  }
  