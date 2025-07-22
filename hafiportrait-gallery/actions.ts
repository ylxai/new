'use server';

import { z } from 'zod';
import { prisma } from './prisma/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Skema validasi menggunakan Zod
const EventSchema = z.object({
    id: z.string(),
    name: z.string().min(3, { message: 'Nama event minimal 3 karakter.' }),
    eventCode: z
        .string()
        .min(3, { message: 'Kode event minimal 3 karakter.' })
        .regex(/^[a-z0-9-]+$/, {
            message: 'Kode event hanya boleh berisi huruf kecil, angka, dan tanda hubung (-).',
        }),
    date: z.coerce.date({ message: 'Format tanggal tidak valid.' }),
    description: z.string().optional(),
});

const CreateEvent = EventSchema.omit({ id: true });

export type State = {
    errors?: {
        name?: string[];
        eventCode?: string[];
        date?: string[];
    };
    message?: string | null;
};

export async function createEvent(prevState: State, formData: FormData) {
    const validatedFields = CreateEvent.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Gagal membuat event. Silakan periksa kembali isian Anda.',
        };
    }

    const { name, eventCode, date, description } = validatedFields.data;

    await prisma.event.create({ data: { name, eventCode, date, description } });

    revalidatePath('/admin/events'); // Membersihkan cache dan memuat ulang data di halaman daftar event
    redirect('/admin/events'); // Arahkan kembali ke halaman daftar event
}