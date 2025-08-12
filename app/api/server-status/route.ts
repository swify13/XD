export async function GET() {
  try {
    const response = await fetch("https://mcapi.us/server/status?ip=stonemc.pl&port=25565", {
      next: { revalidate: 30 }, // Cache for 30 seconds
    })

    if (!response.ok) {
      throw new Error("Failed to fetch server status")
    }

    const data = await response.json()

    return Response.json({
      online: data.online,
      players: {
        online: data.players?.online || 0,
        max: data.players?.max || 100,
      },
      version: data.version || "Unknown",
      motd: data.motd || "StoneMC Server",
      ping: data.ping || 0,
    })
  } catch (error) {
    return Response.json({
      online: false,
      players: { online: 0, max: 100 },
      version: "Unknown",
      motd: "StoneMC Server",
      ping: 0,
    })
  }
}
