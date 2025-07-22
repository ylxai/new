import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Gallery - Hafiportrait Gallery',
  description: 'Galeri foto dari berbagai acara yang telah didokumentasikan oleh Hafiportrait Gallery',
};

// Contoh data foto
const photos = Array(24)
  .fill(null)
  .map((_, i) => ({
    id: i + 1,
    url: '/placeholder.jpg',
    caption: `Photo ${i + 1}`,
    category: i % 3 === 0 ? 'wedding' : i % 3 === 1 ? 'graduation' : 'event',
  }));

export default function GalleryPage() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Gallery</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Koleksi foto terbaik dari berbagai acara yang telah kami dokumentasikan.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="mt-8 flex justify-center space-x-4">
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Semua
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Pernikahan
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Wisuda
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Event
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative overflow-hidden rounded-lg group cursor-pointer"
            >
              <div className="aspect-[4/3] bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-sm">Photo Placeholder</span>
                {/* Uncomment when you have actual images */}
                {/* <Image
                  src={photo.url}
                  alt={photo.caption}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                /> */}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="text-white font-medium">{photo.caption}</h3>
                <p className="text-white/80 text-sm capitalize">{photo.category}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-12 text-center">
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}