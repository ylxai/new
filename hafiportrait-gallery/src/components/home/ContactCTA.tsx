'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export default function ContactCTA() {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-500">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="lg:w-0 lg:flex-1"
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Siap untuk mengabadikan momen berharga Anda?</span>
            <span className="block text-blue-100">Hubungi kami sekarang.</span>
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-blue-100">
            Konsultasikan kebutuhan fotografi Anda dengan tim kami. Kami siap memberikan
            solusi terbaik untuk acara Anda.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-8 flex lg:mt-0 lg:flex-shrink-0"
        >
          <div className="inline-flex rounded-md shadow">
            <Button
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
            >
              Hubungi Kami
            </Button>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <Button
              variant="outline"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-transparent border-white hover:bg-blue-700"
            >
              Lihat Paket
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}