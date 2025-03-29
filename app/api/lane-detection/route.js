export async function GET(req) {
    const laneData = {
      status: "success",
      lanes: [
        { id: 1, type: "Main Road", condition: "Clear", lat: 17.3850, lng: 78.4867 },
        { id: 2, type: "Side Road", condition: "Under Construction", lat: 17.3905, lng: 78.4879 },
      ],
    };
  
    return Response.json(laneData);
  }
  