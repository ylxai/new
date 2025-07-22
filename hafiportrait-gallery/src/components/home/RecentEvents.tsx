'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

// Contoh data acara terbaru
const recentEvents = [
  {
    id: 1,
    title: 'Pernikahan Andi & Budi',
    date: new Date('2023-12-15'),
    location: 'Gedung Serbaguna Jakarta',
    imageUrl: '/placeholder.jpg',
    slug: 'pernikahan-andi-budi',
  },
  {
    id: 2,
    title: 'Wisuda Universitas Indonesia',
    date: new Date('2023-11-20'),
    location: 'Balairung UI Depok',
    imageUrl: '/placeholder.jpg',
    slug: 'wisuda-universitas-indonesia',
  },
  {
    id: 3,
    title: 'Ulang Tahun Perusahaan XYZ',
    date: new Date('2023-10-10'),
    location: 'Hotel Mulia Jakarta',
    imageUrl: '/placeholder.jpg',
    slug: 'ulang-tahun-perusahaan-xyz',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function RecentEvents() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
            Portofolio
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Acara Terbaru
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Beberapa acara yang telah kami dokumentasikan baru-baru ini.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {recentEvents.map((event) => (
            <motion.div
              key={event.id}
              variants={item}
              className="flex flex-col rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <div className="flex-shrink-0 h-48 w-full relative bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-sm">Event Image Placeholder</span>
                {/* Uncomment when you have actual images */}
                {/* <Image
                  src={event.imageUrl}
                  alt={event.title}
                  fill
                  className="h-48 w-full object-cover"
                /> */}
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-600">
                    <time dateTime={event.date.toISOString()}>
                      {formatDate(event.date)}
                    </time>
                  </p>
                  <Link href={`/events/${event.slug}`} className="block mt-2">
                    <p className="text-xl font-semibold text-gray-900">{event.title}</p>
                    <p className="mt-3 text-base text-gray-500">{event.location}</p>
                  </Link>
                </div>
                <div className="mt-6">
                  <Link
                    href={`/events/${event.slug}`}
                    className="text-base font-medium text-blue-600 hover:text-blue-500"
                  >
                    Lihat Gallery
                    <span aria-hidden="true"> &rarr;</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <Link
            href="/events"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
          >
            Lihat Semua Acara
          </Link>
        </div>
      </div>
    </div>
  );
}