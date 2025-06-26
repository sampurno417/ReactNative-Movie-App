export async function torrentUrlToMagnet(torrentUrl: string): Promise<string | null> {
    console.log("📦 Calling backend /magnet with URL:", torrentUrl);

    try {
        const res = await fetch(`https://tor-stream-api.onrender.com/magnet?torrent=${encodeURIComponent(torrentUrl)}`);
        if (!res.ok) {
            console.error("❌ Backend responded with status:", res.status);
            return null;
        }

        const json = await res.json();
        console.log("✅ Received magnet link:", json.magnet);
        return json?.magnet || null;
    } catch (error) {
        console.error("❌ Failed to fetch magnet from backend:", error);
        return null;
    }
}
