# Temidayo XYZ - Personal Portfolio

This is a modern, responsive, and highly optimized personal portfolio and professional services website built with **Next.js 15 (App Router)**, **React**, **Tailwind CSS v4**, and **Framer Motion**.

## Structure & Architecture

The application is built keeping in mind maximum performance and sleek, modern MacOS-inspired interaction patterns:

-   **`app/page.tsx`**: The core single-page application. Features interactive routing like `#works`, `#contact` (Cal.com integration), and `#pricing`.
-   **`app/layout.tsx`**: Contains the root HTML shell, global typography (Inter font), and strict, comprehensive SEO metadata configuration for optimal search rankings and Open Graph link unfurling on platforms like Twitter/X and LinkedIn.
-   **`components/faq.tsx`**: A modular accordion component for handling client questions to keep the main code readable.
-   **`public/`**: The static assets directory.

## Managing Your Assets

### Images and Logos
Because browsers and Next.js rigorously cache images to improve page load speed, any time you replace images, you might not see the changes immediately in your development preview. 

To use your own images seamlessly:
1.  **About Me Image**: Replace `public/temidayo.jpg` with your own portrait. It is set up to auto-crop gracefully using object-cover.
2.  **Website Logo**: Replace `public/logo.png` with your transparent PNG logo.
3.  **Website Open Graph Image**: Replace `public/og.jpg` with your OG image file. This displays flawlessly across all platforms.
4.  **Browser Favicon**: Replace `app/favicon.ico` with your favicon file. This defines the tab icon across all browsers.

*Note: If you ever change the image replacing the ones above while running a Dev Server and they don't reflect immediately, clear your browser cache (or open an Incognito window) and restart the development server.*

### Calendar Integration
Your booking widget maps natively to `temidayo/call` via Cal.com. To modify this, jump into the `app/page.tsx` file and locate the `<Cal .../>` component at the bottom, updating the `calLink` prop if your username changes.

## Deployment on Cloudflare Pages
This website is optimized to be deployed as a lighting-fast **Static HTML Export**, bypassing Serverless function costs or complexities. 

When deploying to Cloudflare Pages via GitHub:
1.  **Framework preset:** None / Custom
2.  **Build command:** `npm run build`
3.  **Build output directory:** `out`

## Development Commands

-   **`npm run dev`**: Start the local development server.
-   **`npm run build`**: Create a highly optimized static production build (outputs to the `out/` folder).
-   **`npm run lint`**: Analyze the code to catch errors.

Enjoy building something that stands out!
