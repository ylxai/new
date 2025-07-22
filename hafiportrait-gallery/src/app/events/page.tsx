import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events - Hafiportrait Gallery',
  description: 'Daftar acara yang telah didokumentasikan oleh Hafiportrait Gallery',
};

// Contoh data acara
const events = [
  {
    id: 1,
    title: 'Pernikahan Andi & Budi',
    date: '15 Desember 2023',
    location: 'Gedung Serbaguna Jakarta',
    imageUrl: '/placeholder.jpg',
    slug: 'pernikahan-andi-budi',
    description: 'Dokumentasi pernikahan Andi dan Budi di Gedung Serbaguna Jakarta.',
  },
  {
    id: 2,
    title: 'Wisuda Universitas Indonesia',
    date: '20 November 2023',
    location: 'Balairung UI Depok',
    imageUrl: '/placeholder.jpg',
    slug: 'wisuda-universitas-indonesia',
    description: 'Dokumentasi acara wisuda Universitas Indonesia periode November 2023.',
  },
  {
    id: 3,
    title: 'Ulang Tahun Perusahaan XYZ',
    date: '10 Oktober 2023',
    location: 'Hotel Mulia Jakarta',
    imageUrl: '/placeholder.jpg',
    slug: 'ulang-tahun-perusahaan-xyz',
    description: 'Dokumentasi acara ulang tahun ke-10 Perusahaan XYZ.',
  },
  {
    id: 4,
    title: 'Konser Amal Peduli Bencana',
    date: '5 September 2023',
    location: 'Lapangan Senayan Jakarta',
    imageUrl: '/placeholder.jpg',
    slug: 'konser-amal-peduli-bencana',
    description: 'Dokumentasi konser amal untuk korban bencana alam.',
  },
  {
    id: 5,
    title: 'Seminar Nasional Pendidikan',
    date: '15 Agustus 2023',
    location: 'Convention Center Jakarta',
    imageUrl: '/placeholder.jpg',
    slug: 'seminar-nasional-pendidikan',
    description: 'Dokumentasi seminar nasional pendidikan yang dihadiri oleh para pakar pendidikan.',
  },
  {
    id: 6,
    title: 'Festival Kuliner Nusantara',
    date: '20 Juli 2023',
    location: 'Senayan City Jakarta',
    imageUrl: '/placeholder.jpg',
    slug: 'festival-kuliner-nusantara',
    description: 'Dokumentasi festival kuliner nusantara yang menampilkan berbagai makanan khas daerah.',
  },
];

export default function EventsPage() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Events</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Daftar acara yang telah kami dokumentasikan.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {events.map((event) => (
            <article key={event.id} className="flex flex-col items-start justify-between overflow-hidden rounded-lg shadow-lg">
              <div className="relative w-full h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-sm">Event Image Placeholder</span>
                {/* Uncomment when you have actual images */}
                {/* <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="absolute inset-0 h-full w-full object-cover"
                /> */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-gray-900/0"></div>
              </div>
              <div className="max-w-xl p-6">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={event.date} className="text-gray-500">
                    {event.date}
                  </time>
                  <span className="relative z-10 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600">
                    {event.location}
                  </span>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <a href={`/events/${event.slug}`}>
                      <span className="absolute inset-0"></span>
                      {event.title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{event.description}</p>
                </div>
                <div className="mt-4">
                  <a
                    href={`/events/${event.slug}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    Lihat Gallery
                    <span aria-hidden="true"> &rarr;</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}