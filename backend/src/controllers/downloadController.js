const ytdl = require('@distube/ytdl-core');

const downloadVideo = async (req,res)=>{
    console.log("here")
    const videoUrl = req.query.url;
    const format = req.query.format;

    if(!videoUrl){
        return res.status(400).json({error:'URL is required'});
    }

    try{
        const info = await ytdl.getInfo(videoUrl);
        const title = info.videoDetails.title.replace(/[^\w\s]/gi, '')

        res.header('Content-Disposition', `attachment; filename="${title}.${format}"`);
        if(format == "mp3"){
            ytdl(videoUrl,{
            format: 'mp3',
            quality:"highestaudio"

        }).pipe(res);
        }
        else{
        ytdl(videoUrl,{
            format: format,
            quality: 'highest'

        }).pipe(res);
    }
    }catch(err){
        console.error(err);
        res.status(500).json({error:"Faioed to download video"})
    }
}


const downloadMp3 = async(req,res)=>{
        const videoUrl = req.query.url;

    if(!videoUrl){
        return res.status(400).json({error:'URL is required'});
    }

    try{
        const info = await ytdl.getInfo(videoUrl);
        const title = info.videoDetails.title.replace(/[^\w\s]/gi, '')

        res.header('Content-Disposition', `attachment; filename="${title}.mp3"`);

       
    }catch(err){
        console.error(err);
        res.status(500).json({error:"Faioed to download video"})
    }
}



module.exports = {downloadVideo, downloadMp3}