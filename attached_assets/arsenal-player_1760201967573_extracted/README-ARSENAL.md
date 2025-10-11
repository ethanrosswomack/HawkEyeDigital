# Arsenal Player (no-build)

**Deploy:** Upload this folder to the repo (or set it as the Pages output).

Provide your own `/tracks/manifest.json` with objects like:
```json
{ "title":"Song Title", "artist":"Hawk Eye the Rapper", "mp3Url":"https://<r2-custom-domain>/<path>.mp3", "lyricsUrl":"/tracks/song.lrc" }
```

## R2
- Use a Cloudflare R2 bucket behind a custom domain.
- CORS allow GET from `https://arsenal.reincarnated2resist.com`.
- Set `Content-Type: audio/mpeg` on MP3 objects; support Range requests.
