# Exclusive Africa Safaris

A modern, interactive website built with Next.js 15 for showcasing exclusive African safari experiences.

## Features

- Modern, responsive design
- Interactive safari package browsing
- Custom Next.js-based admin CMS
- Blog section for travel tips and wildlife conservation
- SEO optimized with proper metadata and schema markup
- Mobile-first approach

## Tech Stack

- **Framework:** Next.js 15
- **Styling:** Tailwind CSS
- **UI Components:** Headless UI
- **Icons:** Heroicons
- **Animations:** Framer Motion
- **State Management:** React Query
- **Authentication:** NextAuth.js
- **Image Optimization:** Next.js Image component with Cloudinary
- **Maps Integration:** Mapbox/Google Maps API

## Getting Started

1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with the following variables:
   ```
   # Add your environment variables here
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/src
  /app             # Next.js 15 app directory
  /components      # Reusable React components
  /lib            # Utility functions and configurations
  /styles         # Global styles and Tailwind config
/public           # Static assets
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
