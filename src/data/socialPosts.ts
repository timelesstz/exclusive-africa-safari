import { images } from './images'

export const socialPosts = [
  {
    id: '1',
    platform: 'instagram',
    author: {
      name: 'Safari Adventures',
      username: 'safariadventures',
      image: images.blog.safariSeasons,
    },
    date: '2024-03-15',
    content: "Witnessing the Great Migration in the Serengeti! Over 2 million wildebeest and zebras making their annual journey. Truly a sight to behold! 🦓🦁 #SerengetiMigration #WildlifePhotography",
    media: {
      type: 'image',
      url: images.packages.serengeti1,
    },
    stats: {
      likes: 1243,
      comments: 89,
    },
    url: 'https://instagram.com/p/example1',
  },
  {
    id: '2',
    platform: 'facebook',
    author: {
      name: 'Exclusive Africa Safaris',
      username: 'exclusiveafricasafaris',
      image: images.blog.luxuryLodges,
    },
    date: '2024-03-14',
    content: "Experience luxury in the heart of the African bush at our carefully selected lodges. Private plunge pools, gourmet dining, and unforgettable wildlife encounters await! 🌟🐘 #LuxurySafari #AfricanLodges",
    media: {
      type: 'image',
      url: images.packages.lionSands,
    },
    stats: {
      likes: 856,
      comments: 42,
    },
    url: 'https://facebook.com/posts/example2',
  },
  {
    id: '3',
    platform: 'twitter',
    author: {
      name: 'Wildlife Photography',
      username: 'wildlifephotos',
      image: images.blog.wildlifePhotography,
    },
    date: '2024-03-13',
    content: "Tips for capturing the perfect wildlife shot: patience, understanding animal behavior, and being ready for the unexpected! Here's a stunning leopard we spotted in South Africa 📸 #WildlifePhotography",
    media: {
      type: 'image',
      url: images.packages.kruger1,
    },
    stats: {
      likes: 2156,
      comments: 134,
    },
    url: 'https://twitter.com/status/example3',
  },
  {
    id: '4',
    platform: 'instagram',
    author: {
      name: 'Cultural Safaris',
      username: 'culturalsafaris',
      image: images.blog.culturalExperiences,
    },
    date: '2024-03-12',
    content: "Immerse yourself in Maasai culture! Learn traditional dances, visit authentic villages, and experience the warmth of African hospitality. 🌍💃 #MaasaiCulture #CulturalExperience",
    media: {
      type: 'image',
      url: images.packages.masaiMara1,
    },
    stats: {
      likes: 967,
      comments: 73,
    },
    url: 'https://instagram.com/p/example4',
  },
  {
    id: '5',
    platform: 'facebook',
    author: {
      name: 'Victoria Falls Tours',
      username: 'victoriafallstours',
      image: images.packages.victoriaFalls1,
    },
    date: '2024-03-11',
    content: "The mighty Victoria Falls in all its glory! Join us for a guided tour of this natural wonder, followed by a sunset cruise on the Zambezi River. 🌅💦 #VictoriaFalls #ZambeziRiver",
    media: {
      type: 'image',
      url: images.packages.victoriaFalls1,
    },
    stats: {
      likes: 1432,
      comments: 95,
    },
    url: 'https://facebook.com/posts/example5',
  },
  {
    id: '6',
    platform: 'twitter',
    author: {
      name: 'Okavango Delta',
      username: 'okavangodelta',
      image: images.packages.okavango1,
    },
    date: '2024-03-10',
    content: "Glide through the pristine waterways of the Okavango Delta in a traditional mokoro canoe. Spot hippos, elephants, and countless bird species! 🛶🦛 #OkavangoDelta #BotswanaSafari",
    media: {
      type: 'image',
      url: images.packages.eagleIsland,
    },
    stats: {
      likes: 789,
      comments: 45,
    },
    url: 'https://twitter.com/status/example6',
  },
] as const 