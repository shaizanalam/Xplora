# BUGS NOT FIXED (CRITICAL)

This file tracks critical bugs discovered during the pre-launch QA audit that cannot be fixed right now.

## 1. Dead Formspree Endpoints
- **Location:** `src/pages/ContactPage.jsx` & `src/pages/RegisterPage.jsx`
- **Issue:** The forms are pointing to `https://formspree.io/f/YOUR_FORM_ID`. Submissions are currently going nowhere.
- **Fix Required:** Replace `YOUR_FORM_ID` with a valid Formspree endpoint, or switch to a different provider.

## 2. Massive Video Assets (>100MB)
- **Location:** `/public` directory
- **Issue:** The video assets (`bg.mp4` at 25MB, `hero-phosphor.mp4` at 38MB, and `download-1.mp4` at 38MB) are far too large for a production website.
- **Impact:** Significant impact on load times, mobile data usage, and Lighthouse performance scores.
- **Fix Required:** Compress these assets (e.g., using Handbrake or ffmpeg to H.265/WebM), or remove unused/duplicate videos.
