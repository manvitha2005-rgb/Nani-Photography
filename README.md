# Nani Photography Clickz website (Next.js + Framer Motion + Lucide)

## Setup
1. Install Node 18+.
2. `npm install`
3. `npm run dev` then open http://localhost:3000

## Your photos
Photos are in `public/images/<folder>/` and are listed in the `IMG` object in `lib/data.js`.
To add a photo: copy the JPG into the right folder, then add its filename to that category's list in `lib/data.js`.
Categories with an empty list (weddings, receptions, events, family) show labelled placeholders.
Resize photos to about 1400px on the long edge before adding them.
Also add `public/images/og.jpg` (1200x630) for social sharing previews.

## Edit content
- Phone, WhatsApp, Instagram, services: `lib/data.js`
- About text and other copy: `components/Site.js`
- Colours and layout: `app/globals.css`
- Domain for SEO: `app/layout.js` (`metadataBase`)

## Deploy on Vercel
1. Push this folder to a GitHub repository.
2. At vercel.com choose Add New > Project, import the repo, keep defaults, click Deploy.
3. Add your custom domain under Project > Settings > Domains, then update `metadataBase`.
