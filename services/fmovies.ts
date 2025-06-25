// services/fmovies.ts

export const getStreamingLink = async (title: string, year?: string): Promise<string | null> => {
    try {
        const cleanTitle = title.replace(/[:\-]/g, "").trim(); // remove special chars
        const query = `${cleanTitle} ${year || ""}`.trim(); // e.g. "Iron Man 2008"

        console.log("🔍 Searching Fmovies for:", query);

        const searchRes = await fetch(
            `https://fmovies-api.vercel.app/search?keyword=${encodeURIComponent(query)}`
        );
        const searchData = await searchRes.json();

        if (!searchData?.data || searchData.data.length === 0) {
            console.warn(`⚠️ No match found on Fmovies for: ${query}`);
            return null;
        }

        const fmovieLink = searchData.data[0].link;
        if (!fmovieLink) return null;

        const detailsRes = await fetch(
            `https://fmovies-api.vercel.app/details?link=${encodeURIComponent(fmovieLink)}`
        );
        const detailsData = await detailsRes.json();

        const streamUrl = detailsData?.sources?.[0]?.file;
        return streamUrl || null;
    } catch (error) {
        console.error("❌ Error fetching Fmovies stream link:", error);
        return null;
    }
};
