'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

// Contoh data testimoni
const testimonials = [
  {
    id: 1,
    content:
      'Hafiportrait memberikan layanan yang luar biasa. Fotografer mereka sangat profesional dan hasil fotonya memuaskan. Sangat merekomendasikan!',
    author: {
      name: 'Sarah Wijaya',
      role: 'Bride',
      imageUrl: '/placeholder-avatar.jpg',
    },
  },
  {
    id: 2,
    content:
      'Kami sangat senang dengan hasil foto wisuda kami. Tim Hafiportrait sangat ramah dan membantu kami mendapatkan momen terbaik.',
    author: {
      name: 'Reza Mahendra',
      role: 'Graduate',
      imageUrl: '/placeholder-avatar.jpg',
    },
  },
  {
    id: 3,
    content:
      'Acara ulang tahun perusahaan kami didokumentasikan dengan sangat baik. Fitur gallery realtime sangat membantu para tamu untuk langsung mengakses foto-foto acara.',
    author: {
      name: 'Dian Sastro',
      role: 'Event Organizer',
      imageUrl: '/placeholder-avatar.jpg',
    },
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

export default function Testimonials() {
  return (
    <div className="py-12 bg-gradient-to-r from-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
            Testimoni
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Apa Kata Klien Kami
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Beberapa testimoni dari klien yang telah menggunakan jasa fotografi kami.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={item}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col h-full"
            >
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 h-12 w-12 relative rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-xs">Avatar</span>
                    {/* Uncomment when you have actual images */}
                    {/* <Image
                      src={testimonial.author.imageUrl}
                      alt={testimonial.author.name}
                      fill
                      className="h-12 w-12 rounded-full object-cover"
                    /> */}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {testimonial.author.name}
                    </h3>
                    <p className="text-sm text-gray-500">{testimonial.author.role}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <svg
                    className="h-8 w-8 text-gray-200"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                  >
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="mt-2 text-base text-gray-500">{testimonial.content}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="ml-2 text-sm text-gray-500">5.0 / 5.0</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}