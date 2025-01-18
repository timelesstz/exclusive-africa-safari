'use client'

import { useState } from 'react'
import { PlayIcon } from '@heroicons/react/24/solid'
import Lightbox from 'yet-another-react-lightbox'
import Video from 'yet-another-react-lightbox/plugins/video'
import 'yet-another-react-lightbox/styles.css'

interface VideoItem {
  thumbnail: string
  title: string
  description: string
  videoUrl: string
  duration: string
}

interface VideoGalleryProps {
  videos: VideoItem[]
  title: string
}

export default function VideoGallery({ videos, title }: VideoGalleryProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [videoIndex, setVideoIndex] = useState(0)

  const lightboxVideos = videos.map(video => ({
    type: 'video',
    poster: video.thumbnail,
    sources: [
      {
        src: video.videoUrl,
        type: 'video/mp4',
      },
    ],
  }))

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <div 
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden group cursor-pointer"
            onClick={() => {
              setVideoIndex(index)
              setIsOpen(true)
            }}
          >
            <div className="relative aspect-video">
              {/* Thumbnail */}
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <PlayIcon className="w-6 h-6 text-orange-600" />
                </div>
                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/75 rounded text-white text-sm">
                  {video.duration}
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-medium text-gray-900 mb-1">{video.title}</h3>
              <p className="text-sm text-gray-600">{video.description}</p>
            </div>
          </div>
        ))}
      </div>

      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        index={videoIndex}
        slides={lightboxVideos}
        plugins={[Video]}
        carousel={{
          finite: videos.length <= 1,
        }}
        render={{
          buttonPrev: videos.length <= 1 ? () => null : undefined,
          buttonNext: videos.length <= 1 ? () => null : undefined,
        }}
      />
    </div>
  )
} 