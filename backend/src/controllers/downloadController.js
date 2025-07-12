const ytdl = require('@distube/ytdl-core');
const delay = ms => new Promise(res => setTimeout(res, ms));

// --- In-Memory Queue State ---
const downloadQueue = [];
let isProcessingQueue = false; // Flag to ensure only one item is processed at a time

// --- Function to process the queue ---
const processQueue = async () => {
    if (isProcessingQueue || downloadQueue.length === 0) {
        return; // Already processing or nothing in queue
    }

    isProcessingQueue = true; // Set flag to indicate processing has started

    while (downloadQueue.length > 0) {
        const { req, res, attempt } = downloadQueue.shift(); // Get the next item from the queue

        console.log(`Processing download for URL: ${req.query.url} (Attempt: ${attempt})`);

        try {
            // Apply a delay before making the ytdl.getInfo call
            // This is crucial for rate limiting. Experiment with this value.
            await delay(3000); // 3 seconds delay between actual YouTube interactions

            const videoUrl = req.query.url;
            const format = req.query.format;

            const info = await ytdl.getInfo(videoUrl);
            const title = info.videoDetails.title.replace(/[^\w\s]/gi, '');

            res.header('Content-Disposition', `attachment; filename="${title}.${format}"`);

            if (format === "mp3") {
                ytdl(videoUrl, {
                    format: 'mp3',
                    quality: "highestaudio"
                }).pipe(res);
            } else {
                ytdl(videoUrl, {
                    format: format,
                    quality: 'highest'
                }).pipe(res);
            }

            // Note: res.end() or a similar signal isn't typically needed here
            // because .pipe(res) will handle closing the response stream.
            // If the client disconnects before the download starts,
            // the piped stream might error, which would be caught by the outer try-catch.

        } catch (err) {
            console.error(`Error processing download for ${req.query.url}:`, err.message);

            // Handle specific ytdl-core errors, like 429
            if (err.statusCode === 429 || err.message.includes('Status code: 429')) {
                console.warn(`Rate limit hit for ${req.query.url}. Re-queuing and adding more delay.`);
                // If it's a 429, re-queue the request for a later attempt with increased delay
                // Or you might want a max_attempts logic here.
                if (attempt < 3) { // Limit retry attempts
                    downloadQueue.unshift({ req, res, attempt: attempt + 1 }); // Add back to front of queue
                    await delay(5000 * (attempt + 1)); // Exponential backoff for retry
                } else {
                    res.status(500).json({ error: "Failed to download video after multiple attempts due to rate limiting." });
                }
            } else {
                res.status(500).json({ error: "Failed to download video: " + err.message });
            }
        }
        // Add a delay between processing each item in the queue
        // This is important to give YouTube's servers a break.
        await delay(2000); // Wait 2 seconds before picking the next item
    }

    isProcessingQueue = false; // Reset flag after queue is empty
    console.log("Queue processing finished.");
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