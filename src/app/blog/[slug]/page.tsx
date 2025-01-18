'use client'

import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { 
  FacebookShareButton, 
  TwitterShareButton, 
  LinkedinShareButton 
} from 'react-share'
import { 
  CalendarIcon, 
  ClockIcon,
  TagIcon,
  UserIcon,
  ShareIcon
} from '@heroicons/react/24/outline'
import { images } from '@/data/images'

// This would typically come from an API or CMS
const blogPosts = {
  'best-time-for-safari': {
    title: 'The Best Time to Go on an African Safari',
    content: `
      <h2>Choosing the Right Time for Your Safari Adventure</h2>
      <p>Planning the perfect African safari involves careful consideration of seasonal variations across different regions. Each season offers unique wildlife viewing opportunities and experiences.</p>
      
      <h3>Peak Season (June to October)</h3>
      <p>This is generally considered the best time for wildlife viewing across most safari destinations:</p>
      <ul>
        <li>Dry season means animals gather around water sources</li>
        <li>Less vegetation makes wildlife easier to spot</li>
        <li>Perfect conditions for photography</li>
        <li>Minimal rainfall and comfortable temperatures</li>
      </ul>

      <h3>Green Season (November to May)</h3>
      <p>While less popular, the green season offers unique advantages:</p>
      <ul>
        <li>Lush landscapes perfect for photography</li>
        <li>Bird watching at its best</li>
        <li>Lower rates and fewer tourists</li>
        <li>Many animals give birth during this period</li>
      </ul>

      <h2>Best Times by Destination</h2>
      
      <h3>Serengeti & Masai Mara</h3>
      <p>The best time to visit depends on what you want to see:</p>
      <ul>
        <li>December to March: Southern Serengeti (wildebeest calving)</li>
        <li>July to October: Northern Serengeti & Masai Mara (river crossings)</li>
      </ul>

      <h3>Botswana</h3>
      <p>Peak season varies by region:</p>
      <ul>
        <li>May to October: Best for Okavango Delta</li>
        <li>July to October: Prime time for Chobe National Park</li>
      </ul>
    `,
    image: images.blog.safariSeasons,
    author: 'Sarah Johnson',
    date: 'March 15, 2024',
    category: 'Travel Tips',
    readTime: '5 min read',
    relatedPosts: ['wildlife-photography-tips', 'great-migration-guide']
  },
  'wildlife-photography-tips': {
    title: 'Essential Wildlife Photography Tips for Safari',
    content: `
      <h2>Mastering Wildlife Photography on Safari</h2>
      <p>Capturing stunning wildlife photographs requires preparation, patience, and the right techniques. Here's your comprehensive guide to safari photography.</p>

      <h3>Essential Equipment</h3>
      <ul>
        <li>Camera body with good low-light performance</li>
        <li>Telephoto lens (at least 300mm)</li>
        <li>Fast memory cards</li>
        <li>Extra batteries and charger</li>
        <li>Lens cleaning kit</li>
      </ul>

      <h3>Camera Settings</h3>
      <p>Optimal settings for wildlife photography:</p>
      <ul>
        <li>Aperture priority mode (f/4 - f/8)</li>
        <li>High shutter speed (minimum 1/1000 for action)</li>
        <li>Auto ISO with maximum limit</li>
        <li>Continuous autofocus mode</li>
        <li>Burst shooting mode</li>
      </ul>

      <h3>Composition Tips</h3>
      <p>Create more engaging wildlife photos:</p>
      <ul>
        <li>Focus on the eyes</li>
        <li>Leave space for movement</li>
        <li>Include environmental context</li>
        <li>Use the rule of thirds</li>
        <li>Capture behavior and interaction</li>
      </ul>

      <h3>Best Times for Photography</h3>
      <p>Take advantage of optimal lighting conditions:</p>
      <ul>
        <li>Early morning golden hour</li>
        <li>Late afternoon golden hour</li>
        <li>Overcast days for even lighting</li>
      </ul>
    `,
    image: images.blog.wildlifePhotography,
    author: 'Michael Chen',
    date: 'March 10, 2024',
    category: 'Photography',
    readTime: '6 min read',
    relatedPosts: ['best-time-for-safari', 'great-migration-guide']
  },
  'great-migration-guide': {
    title: 'Complete Guide to the Great Migration',
    content: `
      <h2>Understanding the Great Migration</h2>
      <p>The Great Migration is one of nature's most spectacular events, where over two million wildebeest, zebras, and gazelles make their annual journey through the Serengeti-Mara ecosystem.</p>

      <h3>The Migration Cycle</h3>
      <p>The migration follows a clockwise circuit through Tanzania and Kenya:</p>
      <ul>
        <li>December to March: Southern Serengeti (calving season)</li>
        <li>April to May: Central and Western Serengeti</li>
        <li>June to July: Northern Serengeti</li>
        <li>August to October: Masai Mara</li>
        <li>November: Return to Southern Serengeti</li>
      </ul>

      <h3>Best Viewing Locations</h3>
      <p>Key areas for witnessing different aspects of the migration:</p>
      <ul>
        <li>Ndutu Area: Calving season (February)</li>
        <li>Western Corridor: River crossings (May-June)</li>
        <li>Kogatende: Mara River crossings (July-August)</li>
        <li>Masai Mara: Large herds and predator action (August-October)</li>
      </ul>

      <h3>Planning Your Trip</h3>
      <p>Tips for a successful migration safari:</p>
      <ul>
        <li>Book well in advance (12-18 months recommended)</li>
        <li>Stay at mobile camps that follow the migration</li>
        <li>Plan for at least 3-4 days in each location</li>
        <li>Consider combining multiple areas</li>
      </ul>
    `,
    image: images.blog.greatMigration,
    author: 'David Kimani',
    date: 'March 5, 2024',
    category: 'Wildlife',
    readTime: '7 min read',
    relatedPosts: ['best-time-for-safari', 'wildlife-photography-tips']
  },
  'luxury-safari-lodges': {
    title: 'Top 10 Luxury Safari Lodges in Africa',
    content: `
      <h2>Experience Ultimate Safari Luxury</h2>
      <p>Discover Africa's most exclusive safari lodges that combine exceptional wildlife viewing with world-class comfort and service.</p>

      <h3>Tanzania</h3>
      <p>Legendary lodges in the Serengeti:</p>
      <ul>
        <li>Singita Sasakwa Lodge: Colonial grandeur with infinity pools</li>
        <li>Four Seasons Safari Lodge: Modern luxury in the heart of Serengeti</li>
        <li>andBeyond Ngorongoro Crater Lodge: Opulent crater-rim living</li>
      </ul>

      <h3>Botswana</h3>
      <p>Delta and desert luxury:</p>
      <ul>
        <li>Mombo Camp: The "Place of Plenty" in the Okavango Delta</li>
        <li>Jack's Camp: Vintage safari elegance in the Makgadikgadi</li>
        <li>Zarafa Camp: Intimate luxury in the Selinda Reserve</li>
      </ul>

      <h3>South Africa</h3>
      <p>Premium private reserve experiences:</p>
      <ul>
        <li>Royal Malewane: Award-winning spa and expert guiding</li>
        <li>Singita Lebombo: Contemporary design meets wilderness</li>
        <li>Lion Sands Ivory Lodge: Ultra-luxurious river views</li>
      </ul>

      <h3>Kenya</h3>
      <p>Classic safari elegance:</p>
      <ul>
        <li>Angama Mara: Floating above the Great Rift Valley</li>
        <li>Giraffe Manor: Unique wildlife interactions in Nairobi</li>
        <li>Segera Retreat: Art and conservation in Laikipia</li>
      </ul>
    `,
    image: images.blog.luxuryLodges,
    author: 'Emily Thompson',
    date: 'March 1, 2024',
    category: 'Accommodation',
    readTime: '8 min read',
    relatedPosts: ['best-time-for-safari', 'cultural-experiences']
  },
  'cultural-experiences': {
    title: 'Cultural Experiences on Safari',
    content: `
      <h2>Beyond Wildlife: Cultural Encounters in Africa</h2>
      <p>Enrich your safari experience by immersing yourself in the vibrant cultures and traditions of local communities.</p>

      <h3>Maasai Experiences in Kenya & Tanzania</h3>
      <p>Connect with the iconic Maasai people:</p>
      <ul>
        <li>Village visits and traditional dances</li>
        <li>Warrior training experiences</li>
        <li>Beadwork and craft workshops</li>
        <li>Bush walks with Maasai guides</li>
      </ul>

      <h3>San Bushmen Heritage in Botswana</h3>
      <p>Learn from Africa's first people:</p>
      <ul>
        <li>Traditional hunting techniques</li>
        <li>Bush survival skills</li>
        <li>Ancient rock art interpretation</li>
        <li>Medicinal plant knowledge</li>
      </ul>

      <h3>Community Projects</h3>
      <p>Support local initiatives:</p>
      <ul>
        <li>School visits and education programs</li>
        <li>Women's cooperatives and craft centers</li>
        <li>Conservation projects</li>
        <li>Agricultural initiatives</li>
      </ul>

      <h3>Cultural Highlights</h3>
      <p>Additional experiences to consider:</p>
      <ul>
        <li>Traditional cooking classes</li>
        <li>Local market visits</li>
        <li>Music and dance performances</li>
        <li>Storytelling sessions</li>
      </ul>
    `,
    image: images.blog.culturalExperiences,
    author: 'Grace Mwangi',
    date: 'February 25, 2024',
    category: 'Culture',
    readTime: '6 min read',
    relatedPosts: ['luxury-safari-lodges', 'best-time-for-safari']
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug]

  if (!post) {
    notFound()
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gray-900">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 pb-16 w-full">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {post.title}
              </h1>
              <div className="flex flex-wrap gap-6 text-gray-300">
                <div className="flex items-center gap-2">
                  <UserIcon className="w-5 h-5" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-5 h-5" />
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TagIcon className="w-5 h-5" />
                  <span>{post.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <article className="lg:col-span-2">
            <div 
              className="prose prose-lg max-w-none bg-white rounded-xl p-8 shadow-sm"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {/* Author Bio */}
            <div className="mt-12 bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">About the Author</h3>
              <div className="flex items-start gap-4">
                <Image
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    post.author
                  )}&background=orange&color=fff`}
                  alt={post.author}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
                <div>
                  <h4 className="font-medium">{post.author}</h4>
                  <p className="text-gray-600 mt-2">
                    An experienced travel writer and safari expert with a passion for African wildlife and conservation.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Share Buttons */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <ShareIcon className="w-5 h-5" />
                Share this Article
              </h3>
              <div className="flex gap-4">
                <FacebookShareButton url={shareUrl} className="hover:opacity-80">
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                    Facebook
                  </div>
                </FacebookShareButton>
                <TwitterShareButton url={shareUrl} className="hover:opacity-80">
                  <div className="bg-sky-500 text-white px-4 py-2 rounded-lg">
                    Twitter
                  </div>
                </TwitterShareButton>
                <LinkedinShareButton url={shareUrl} className="hover:opacity-80">
                  <div className="bg-blue-700 text-white px-4 py-2 rounded-lg">
                    LinkedIn
                  </div>
                </LinkedinShareButton>
              </div>
            </div>

            {/* Related Posts */}
            {post.relatedPosts && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {post.relatedPosts.map((slug) => {
                    const relatedPost = blogPosts[slug]
                    if (!relatedPost) return null
                    
                    return (
                      <Link
                        key={slug}
                        href={`/blog/${slug}`}
                        className="block group"
                      >
                        <div className="relative h-32 mb-2 rounded-lg overflow-hidden">
                          <Image
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                        <h4 className="font-medium group-hover:text-orange-600 transition-colors">
                          {relatedPost.title}
                        </h4>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Newsletter */}
            <div className="bg-orange-50 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-gray-600 mb-4">
                Get the latest safari tips and stories delivered to your inbox.
              </p>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent mb-4"
              />
              <button className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                Subscribe
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
} 