# AV Sync

A web app that uses your phone's camera and mic to measure audio/video sync on a TV.

Point the phone at the screen while it plays the **Fire TV AV sync test** (a tone played at the same moment a blue dot appears). The app timestamps each blue flash (camera) and each tone onset (mic), pairs them, and reports the median offset.

## Run

    npm start        # serves on :8080
    npm test

Camera/mic access needs HTTPS or `localhost`. To use a phone, serve over HTTPS (e.g. a tunnel such as `cloudflared tunnel --url http://localhost:8080`) or deploy to any static host.

## Accuracy

- Video timestamps use `requestVideoFrameCallback` capture time (Chromium/Android). Safari doesn't expose capture time, so expect more jitter there.
- Audio is timestamped in the audio worklet (~3 ms blocks), corrected by `baseLatency`. Real mic/camera pipeline latency differs per phone and isn't measurable here, so treat results as roughly ±30 ms.
- Enter your distance to the TV to subtract sound travel time (~3 ms per metre).
- Detection is by colour (blue) and loudness onset, so keep the room quiet and the screen filling the frame.

## Deploy

Pushing to `main` runs tests and deploys to GitHub Pages (`.github/workflows/pages.yml`). One-time setup: repo **Settings → Pages → Source: GitHub Actions**. The site is then at https://shantanunaik23.github.io/Cake/.
