# Name It Right: Brand Name Worksheet landing page

Static page in `public/` plus a small Express server with one endpoint, `POST /api/subscribe`, that adds the person to Kit.

## Run it

```bash
npm install
cp .env.example .env     # fill in KIT_API_KEY, KIT_FORM_ID, KIT_TAG_ID
npm start                # http://localhost:3000
```

Node 18 or newer (the server uses the built-in `fetch`).

## Already have a Node site?

- **Express:** copy `public/` into your static folder and copy the `/api/subscribe` route from `server.js`.
- **Next.js:** put `public/` contents in your `public/` folder (or port the markup into a page), and move the route into `app/api/subscribe/route.js`. The front end only needs `POST /api/subscribe` to accept JSON `{ first_name, email, website }` and return 200 on success.

## Kit setup (free plan works)

1. Create a Kit form for the worksheet. In its settings, turn on the incentive email and put the worksheet PDF link in it. That email is what delivers the PDF.
2. Create a tag `brand-name` and note its id.
3. Settings > Developer: copy the v3 API key into `.env`.
4. Test with your own email. If the incentive email doesn't fire for API sign-ups on your account, send BRAND NAME Email 1 from n8n instead (trigger on the new subscriber).

Emails 2 and 3 stay as the Friday broadcasts to the `brand-name` tag (see Profuzion-Email-Sequences.md).

## Fonts

Drop the licensed files into `public/fonts/` (names in `public/fonts/README.txt`). Until then the page uses Permanent Marker and Inter from Google Fonts as stand-ins.

## What moves

- Staggered load-in on the hero, brush swoosh paints under "right."
- Hero glow and the 3D booklet follow the pointer (desktop only).
- Brush ticker strip, pauses on hover.
- Stats count up, sections fade in as you scroll (only content below the fold, so nothing is hidden at load).
- Seven-step timeline fills yellow and lights each step as you scroll.
- Header turns frosted after scrolling and shows a "Get the worksheet" button once the form is off screen.
- Floating-label inputs, inline validation, a shake on errors, a loading spinner, then an animated check and the "Check your inbox" state with the call link.
- FAQ accordion, magnetic primary buttons, scroll progress bar.
- All motion turns off for people with "reduce motion" set.
