const ytdl = require('@distube/ytdl-core');
const delay = ms => new Promise(res => setTimeout(res, ms));

// --- In-Memory Queue State ---
const downloadQueue = [];
let isProcessingQueue = false; // Flag to ensure only one item is processed at a time

const processQueue = async () => {
    // ... (rest of the function)

    while (downloadQueue.length > 0) {
        const { req, res, attempt } = downloadQueue.shift();

        try {
            // Try a longer delay before ytdl.getInfo
            await delay(7000); // Increased to 7 seconds

            const videoUrl = req.query.url;
            const format = req.query.format;

            const info = await ytdl.getInfo(videoUrl);
            // ... (rest of the try block)

        } catch (err) {
            console.error(`Error processing download for ${req.query.url}:`, err.message);

            if (err.statusCode === 429 || (err.message && err.message.includes('Status code: 429'))) {
                console.warn(`Rate limit hit for ${req.query.url}. Re-queuing and adding more delay.`);
                if (attempt < 3) {
                    downloadQueue.unshift({ req, res, attempt: attempt + 1 });
                    // Exponential backoff for retry, even longer
                    await delay(10000 * (attempt + 1)); // Increased base delay for retry
                } else {
                    if (!res.headersSent) {
                        res.status(500).json({ error: "Failed to download video after multiple attempts due to persistent rate limiting." });
                    }
                }
            } else {
                if (!res.headersSent) {
                    res.status(500).json({ error: "Failed to download video: " + err.message });
                }
            }
        }
        // Delay between processing each item in the queue
        await delay(5000); // Increased to 5 seconds between items
    }

    // ... (rest of the function)
};


const downloadVideo = async (req, res) => {
    const videoUrl = req.query.url;
    const format = req.query.format;

    if (!videoUrl) {
        return res.status(400).json({ error: 'URL is required' });
    }

    // Add the download request to the queue
    downloadQueue.push({ req, res, attempt: 1 });
    console.log(`Added ${videoUrl} to download queue. Current queue size: ${downloadQueue.length}`);

    // Inform the client that the request has been queued
    // The actual download will start later when its turn comes.
    // This is where your frontend needs to show a "preparing" or "queued" state.
    // For a real-time update, you'd ideally use WebSockets, but for
    // simple cases, just letting the client know it's in progress is a start.
    // However, since `res` is part of the queued item, we can't send an
    // initial status code and then later pipe the download.
    // This setup assumes the client will wait for the download to start (which is typical for a direct download).
    // If the client times out, the download will fail.
    // For long waits, you might need a different approach (e.g., generate a link and redirect later).

    // Start processing the queue if it's not already running
    processQueue();

    // The frontend axios.get call expects a response.
    // In this queueing model, the *actual* download response is sent when the item is processed.
    // This means the initial API call from the frontend (`axios.get(`${API_URL}/api/download`)`)
    // will stay open until the download begins or an error occurs.
    // This is okay for direct downloads, but beware of client-side timeouts.
};


// If you have a separate downloadMp3 endpoint and want it to use the same queue logic:
const downloadMp3 = async (req, res) => {
    // This function can be simplified or removed if downloadVideo handles both mp3/mp4
    req.query.format = 'mp3'; // Force format to mp3 for this endpoint
    await downloadVideo(req, res); // Use the same queuing logic
};


module.exports = { downloadVideo, downloadMp3 };