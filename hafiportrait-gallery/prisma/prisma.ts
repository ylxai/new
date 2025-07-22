import { PrismaClient } from '@prisma/client';  

// Deklarasikan variabel global untuk menyimpan cache koneksi Psrc/app/
├── page.tsx (Halaman utama dengan navbar dan branding)
├── admin/
│   ├── dashboard/
│   ├── photos/
│   ├── packages/
│   └── events/
├── event/
│   └── [eventCode]/
│       ├── page.tsx
│       ├── gallery/
│       └── guestbook/
└── auth/
    ├── login/
    └── register/risma
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Cek apakah sudah ada koneksi di cache, jika tidak, buat koneksi baru.
// Ini mencegah pembuatan koneksi berulang kali saat hot-reloading di development.
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;