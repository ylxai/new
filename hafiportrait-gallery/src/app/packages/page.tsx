import { Metadata } from 'next';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Paket Harga - Hafiportrait Gallery',
  description: 'Berbagai paket fotografi profesional untuk berbagai kebutuhan acara Anda',
};

// Contoh data paket
const packages = [
  {
    id: 1,
    name: 'Paket Basic',
    price: 'Rp 2.500.000',
    description: 'Paket fotografi dasar untuk acara kecil atau sederhana.',
    features: [
      '1 Fotografer',
      'Durasi 3 jam',
      '100 foto hasil edit',
      'Gallery online',
      'Penyimpanan 1 bulan',
    ],
    popular: false,
  },
  {
    id: 2,
    name: 'Paket Premium',
    price: 'Rp 5.000.000',
    description: 'Paket fotografi lengkap untuk acara pernikahan atau acara besar.',
    features: [
      '2 Fotografer',
      'Durasi 6 jam',
      '300 foto hasil edit',
      'Gallery online dengan fitur realtime',
      'Penyimpanan 3 bulan',
      'Album foto cetak 20 halaman',
      'Video highlight 3 menit',
    ],
    popular: true,
  },
  {
    id: 3,
    name: 'Paket Ultimate',
    price: 'Rp 8.000.000',
    description: 'Paket fotografi premium dengan layanan lengkap untuk acara eksklusif.',
    features: [
      '3 Fotografer',
      'Durasi 8 jam',
      '500 foto hasil edit',
      'Gallery online dengan fitur realtime',
      'Penyimpanan 6 bulan',
      'Album foto cetak 30 halaman',
      'Video highlight 5 menit',
      'Drone aerial shot',
      'Cetak foto 10R (5 pcs)',
    ],
    popular: false,
  },
];

export default function PackagesPage() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Paket Harga</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Pilih paket fotografi yang sesuai dengan kebutuhan acara Anda. Kami menawarkan berbagai
            paket dengan harga yang kompetitif dan kualitas terbaik.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-3">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className={`relative rounded-2xl ${pkg.popular ? 'bg-white ring-2 ring-blue-600 shadow-xl' : 'bg-white/60 ring-1 ring-gray-200 sm:mx-8 lg:mx-0'} p-8 ${index === 0 ? 'sm:rounded-t-none lg:rounded-tr-none lg:rounded-l-2xl' : index === packages.length - 1 ? 'sm:rounded-b-none lg:rounded-bl-none lg:rounded-r-2xl' : 'sm:rounded-none lg:rounded-none'}`}
            >
              {pkg.popular && (
                <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-3 py-1 text-center text-sm font-medium text-white">
                  Paling Populer
                </div>
              )}
              <div className="text-center">
                <h3 className="text-lg font-semibold leading-8 text-gray-900">{pkg.name}</h3>
                <p className="mt-4 text-sm leading-6 text-gray-600">{pkg.description}</p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">{pkg.price}</span>
                </p>
                <Button
                  variant={pkg.popular ? 'default' : 'outline'}
                  className={`mt-6 w-full ${pkg.popular ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' : ''}`}
                >
                  Pilih Paket
                </Button>
              </div>
              <div className="mt-8">
                <ul className="space-y-3 text-sm leading-6 text-gray-600">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex gap-x-3">
                      <svg
                        className="h-6 w-5 flex-none text-blue-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Package Section */}
        <div className="mt-24 text-center">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900">Butuh Paket Khusus?</h3>
          <p className="mt-4 text-lg text-gray-600">
            Kami juga menyediakan paket khusus yang dapat disesuaikan dengan kebutuhan acara Anda.
            Hubungi kami untuk konsultasi dan penawaran terbaik.
          </p>
          <div className="mt-6">
            <Button
              variant="outline"
              className="px-8 py-2.5"
            >
              Hubungi Kami
            </Button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900 text-center">Pertanyaan Umum</h3>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            <div className="pt-6">
              <dt className="text-lg font-semibold leading-7 text-gray-900">
                Apakah harga paket sudah termasuk pajak?
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Ya, semua harga yang tercantum sudah termasuk pajak dan biaya lainnya. Tidak ada biaya
                tambahan yang akan dikenakan.
              </dd>
            </div>
            <div className="pt-6">
              <dt className="text-lg font-semibold leading-7 text-gray-900">
                Berapa lama proses pengerjaan foto?
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Proses pengerjaan foto biasanya membutuhkan waktu 3-7 hari kerja tergantung pada
                jumlah foto dan tingkat kesibukan kami. Untuk paket Premium dan Ultimate, kami
                menyediakan beberapa foto preview yang dapat diakses secara realtime saat acara
                berlangsung.
              </dd>
            </div>
            <div className="pt-6">
              <dt className="text-lg font-semibold leading-7 text-gray-900">
                Apakah bisa request fotografer tertentu?
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Ya, Anda dapat request fotografer tertentu dengan tambahan biaya, tergantung pada
                ketersediaan fotografer tersebut. Silakan hubungi kami untuk informasi lebih lanjut.
              </dd>
            </div>
            <div className="pt-6">
              <dt className="text-lg font-semibold leading-7 text-gray-900">
                Bagaimana cara memesan paket fotografi?
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Anda dapat memesan paket fotografi dengan menghubungi kami melalui WhatsApp, email,
                atau mengisi form kontak di website kami. Kami akan menghubungi Anda untuk
                konfirmasi dan pembahasan lebih lanjut mengenai detail acara.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}