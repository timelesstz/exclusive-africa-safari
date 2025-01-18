export const images = {
  // Hero images
  heroes: {
    packages: '/images/heroes/packages-hero.jpg',
    destinations: '/images/heroes/destinations-hero.jpg',
    inquiry: '/images/heroes/inquiry-hero.jpg',
    blog: '/images/heroes/blog-hero.jpg',
  },

  // Featured destinations
  destinations: {
    serengeti: '/images/destinations/serengeti.jpg',
    okavango: '/images/destinations/okavango.jpg',
    masaiMara: '/images/destinations/masai-mara.jpg',
    tanzania: '/images/destinations/tanzania.jpg',
    kenya: '/images/destinations/kenya.jpg',
    botswana: '/images/destinations/botswana.jpg',
  },

  // Package images
  packages: {
    serengeti: '/images/packages/serengeti-1.jpg',
    arushaSerena: '/images/packages/arusha-serena.jpg',
    ngorongoroSerena: '/images/packages/ngorongoro-serena.jpg',
    migrationCamp: '/images/packages/migration-camp.jpg',
    okavango: '/images/packages/okavango-1.jpg',
    eagleIsland: '/images/packages/eagle-island.jpg',
    masaiMara: '/images/packages/masai-mara-1.jpg',
    nairobiSerena: '/images/packages/nairobi-serena.jpg',
    maraSerena: '/images/packages/mara-serena.jpg',
    victoriaFalls: '/images/packages/victoria-falls-1.jpg',
    victoriaFallsHotel: '/images/packages/victoria-falls-hotel.jpg',
    kruger: '/images/packages/kruger-1.jpg',
    lionSands: '/images/packages/lion-sands.jpg',
  },

  // Blog images
  blog: {
    safariSeasons: '/images/blog/safari-seasons.jpg',
    wildlifePhotography: '/images/blog/wildlife-photography.jpg',
    greatMigration: '/images/blog/great-migration.jpg',
    luxuryLodges: '/images/blog/luxury-lodges.jpg',
    culturalExperiences: '/images/blog/cultural-experiences.jpg',
  },
} as const

export type ImagePaths = typeof images 