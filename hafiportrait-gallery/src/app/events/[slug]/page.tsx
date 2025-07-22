'use client';

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

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
    photos: Array(12).fill(null).map((_, i) => ({
      id: i + 1,
      url: '/placeholder.jpg',
      caption: `Foto pernikahan ${i + 1}`,
      photographer: true, // foto dari fotografer
    })),
    guestPhotos: Array(8).fill(null).map((_, i) => ({
      id: i + 100,
      url: '/placeholder.jpg',
      caption: `Foto dari tamu ${i + 1}`,
      photographer: false, // foto dari tamu
      uploader: `Tamu ${i + 1}`,
    })),
  },
  {
    id: 2,
    title: 'Wisuda Universitas Indonesia',
    date: '20 November 2023',
    location: 'Balairung UI Depok',
    imageUrl: '/placeholder.jpg',
    slug: 'wisuda-universitas-indonesia',
    description: 'Dokumentasi acara wisuda Universitas Indonesia periode November 2023.',
    photos: Array(15).fill(null).map((_, i) => ({
      id: i + 1,
      url: '/placeholder.jpg',
      caption: `Foto wisuda ${i + 1}`,
      photographer: true,
    })),
    guestPhotos: Array(5).fill(null).map((_, i) => ({
      id: i + 100,
      url: '/placeholder.jpg',
      caption: `Foto dari tamu ${i + 1}`,
      photographer: false,
      uploader: `Tamu ${i + 1}`,
    })),
  },
  {
    id: 3,
    title: 'Konferensi Teknologi Jakarta 2023',
    slug: 'konferensi-teknologi-jakarta-2023',
    date: '5 Agustus 2023',
    location: 'Jakarta Convention Center',
    imageUrl: '/placeholder.jpg',
    description: 'Dokumentasi konferensi teknologi tahunan di Jakarta.',
    photos: Array(10).fill(null).map((_, i) => ({
      id: i + 1,
      url: '/placeholder.jpg',
      caption: `Foto konferensi ${i + 1}`,
      photographer: true,
    })),
    guestPhotos: Array(3).fill(null).map((_, i) => ({
      id: i + 100,
      url: '/placeholder.jpg',
      caption: `Foto dari peserta ${i + 1}`,
      photographer: false,
      uploader: `Peserta ${i + 1}`,
    })),
  },
];

type Props = {
  params: {
    slug: string;
  };
};

type Comment = {
  id: number;
  name: string;
  message: string;
  timestamp: string;
  likes: number;
  replies: Reply[];
};

type Reply = {
  id: number;
  name: string;
  message: string;
  timestamp: string;
  likes: number;
};

export default function EventPage({ params }: Props) {
  // State untuk tab aktif (foto fotografer atau foto tamu)
  const [activeTab, setActiveTab] = useState('photographer');
  // State untuk slideshow
  const [slideshowActive, setSlideshowActive] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  // State untuk QR code visibility
  const [showQRCode, setShowQRCode] = useState(false);
  
  // State untuk buku tamu
  const [guestName, setGuestName] = useState('');
  const [guestMessage, setGuestMessage] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  
  // Contoh data komentar
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      name: 'Budi Santoso',
      message: 'Acara yang sangat meriah! Terima kasih atas undangannya.',
      timestamp: '2 jam yang lalu',
      likes: 5,
      replies: [
        {
          id: 101,
          name: 'Andi Wijaya',
          message: 'Setuju, acaranya sangat berkesan!',
          timestamp: '1 jam yang lalu',
          likes: 2,
        },
      ],
    },
    {
      id: 2,
      name: 'Siti Rahayu',
      message: 'Dekorasi acaranya sangat indah! Siapa yang mendesainnya?',
      timestamp: '1 hari yang lalu',
      likes: 3,
      replies: [],
    },
  ]);
  
  // Fungsi untuk menambah komentar baru
  const addComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (guestName.trim() === '' || guestMessage.trim() === '') return;
    
    const newComment: Comment = {
      id: comments.length + 1,
      name: guestName,
      message: guestMessage,
      timestamp: 'Baru saja',
      likes: 0,
      replies: [],
    };
    
    setComments([newComment, ...comments]);
    setGuestName('');
    setGuestMessage('');
  };
  
  // Fungsi untuk menambah balasan
  const addReply = (commentId: number, e: React.FormEvent) => {
    e.preventDefault();
    if (replyText.trim() === '') return;
    
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [
            ...comment.replies,
            {
              id: Date.now(),
              name: 'Anda', // Bisa diganti dengan nama user yang login
              message: replyText,
              timestamp: 'Baru saja',
              likes: 0,
            },
          ],
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
    setReplyText('');
    setReplyingTo(null);
  };
  
  // Fungsi untuk like komentar
  const likeComment = (commentId: number) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, likes: comment.likes + 1 };
      }
      return comment;
    });
    
    setComments(updatedComments);
  };
  
  // Fungsi untuk like balasan
  const likeReply = (commentId: number, replyId: number) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        const updatedReplies = comment.replies.map(reply => {
          if (reply.id === replyId) {
            return { ...reply, likes: reply.likes + 1 };
          }
          return reply;
        });
        
        return { ...comment, replies: updatedReplies };
      }
      return comment;
    });
    
    setComments(updatedComments);
  };
  
  // Cari acara berdasarkan slug
  const event = events.find(event => event.slug === params.slug);
  
  // Jika acara tidak ditemukan
  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600">Acara tidak ditemukan</h1>
        <p className="mt-4">
          Maaf, acara yang Anda cari tidak ditemukan. Silakan kembali ke
          <Link href="/events" className="text-blue-600 hover:underline ml-1">
            daftar acara
          </Link>
          .
        </p>
      </div>
    );
  }
  
  // Gabungkan foto dari fotografer dan tamu
  const allPhotos = [...event.photos, ...event.guestPhotos];
  
  // Filter foto berdasarkan tab aktif
  const displayedPhotos = activeTab === 'photographer' 
    ? event.photos 
    : event.guestPhotos;
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header acara */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{event.title}</h1>
        <div className="mt-2 flex flex-wrap items-center text-gray-600">
          <span className="mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 inline mr-1 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {event.date}
          </span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 inline mr-1 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {event.location}
          </span>
        </div>
      </div>
      
      {/* Deskripsi acara */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Tentang Acara</h2>
        <p className="text-gray-700">{event.description}</p>
        
        {/* Tombol QR Code */}
        <div className="mt-4">
          <button
            onClick={() => setShowQRCode(!showQRCode)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
              />
            </svg>
            {showQRCode ? 'Sembunyikan QR Code' : 'Tampilkan QR Code'}
          </button>
        </div>
        
        {/* QR Code */}
        {showQRCode && (
          <div className="mt-4 p-4 border border-gray-200 rounded-md inline-block bg-white">
            <div className="text-center">
              <div className="bg-gray-200 w-48 h-48 mx-auto flex items-center justify-center">
                <span className="text-gray-500 text-sm">QR Code Placeholder</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">Scan untuk berbagi foto acara</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Galeri foto */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Galeri Foto</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setSlideshowActive(true)}
              className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Slideshow
            </button>
          </div>
        </div>
        
        {/* Tab untuk memilih foto */}
        <div className="border-b border-gray-200 mb-4">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('photographer')}
              className={`${activeTab === 'photographer' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Foto Fotografer ({event.photos.length})
            </button>
            <button
              onClick={() => setActiveTab('guests')}
              className={`${activeTab === 'guests' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Foto Tamu ({event.guestPhotos.length})
            </button>
          </nav>
        </div>
        
        {/* Grid foto */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {displayedPhotos.map((photo) => (
            <div key={photo.id} className="relative group">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
                <Image
                  src={photo.url}
                  alt={photo.caption}
                  width={300}
                  height={300}
                  className="object-cover group-hover:opacity-75 transition-opacity"
                />
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500 truncate">{photo.caption}</p>
                {!photo.photographer && (
                  <p className="text-xs text-gray-400">Oleh: {photo.photographer ? 'Fotografer' : 'Tamu'}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Slideshow modal */}
      {slideshowActive && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <div className="max-w-4xl w-full px-4">
            <div className="relative">
              <button
                onClick={() => setSlideshowActive(false)}
                className="absolute top-0 right-0 -mt-12 text-white hover:text-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              
              <div className="aspect-w-16 aspect-h-9 bg-gray-800">
                <Image
                  src={allPhotos[currentSlide].url}
                  alt={allPhotos[currentSlide].caption}
                  width={1200}
                  height={675}
                  className="object-contain"
                />
              </div>
              
              <div className="mt-4 flex justify-between items-center text-white">
                <button
                  onClick={() => setCurrentSlide((prev) => (prev === 0 ? allPhotos.length - 1 : prev - 1))}
                  className="p-2 rounded-full hover:bg-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                
                <div className="text-center">
                  <p className="text-sm">{allPhotos[currentSlide].caption}</p>
                  <p className="text-xs text-gray-400">
                    {currentSlide + 1} / {allPhotos.length}
                  </p>
                </div>
                
                <button
                  onClick={() => setCurrentSlide((prev) => (prev === allPhotos.length - 1 ? 0 : prev + 1))}
                  className="p-2 rounded-full hover:bg-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Komentar dan buku tamu */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Komentar</h2>
        
        {/* Daftar komentar */}
        <div className="space-y-6 mb-8">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
              <div className="flex justify-between items-start">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 font-medium">
                        {comment.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{comment.name}</p>
                    <p className="text-sm text-gray-500">{comment.timestamp}</p>
                  </div>
                </div>
                <button
                  onClick={() => likeComment(comment.id)}
                  className="inline-flex items-center text-sm text-gray-500 hover:text-blue-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    />
                  </svg>
                  {comment.likes}
                </button>
              </div>
              <div className="mt-2 text-sm text-gray-700">
                <p>{comment.message}</p>
              </div>
              
              {/* Balasan */}
              {comment.replies.length > 0 && (
                <div className="mt-4 pl-4 border-l-2 border-gray-100 space-y-4">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-500 font-medium text-xs">
                                {reply.name.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{reply.name}</p>
                            <p className="text-xs text-gray-500">{reply.timestamp}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => likeReply(comment.id, reply.id)}
                          className="inline-flex items-center text-xs text-gray-500 hover:text-blue-500"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                            />
                          </svg>
                          {reply.likes}
                        </button>
                      </div>
                      <div className="mt-1 text-sm text-gray-700 ml-11">
                        <p>{reply.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Form balasan */}
              {replyingTo === comment.id ? (
                <div className="mt-4 pl-4 border-l-2 border-gray-100">
                  <form onSubmit={(e) => addReply(comment.id, e)}>
                    <div className="flex">
                      <div className="flex-grow">
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="Tulis balasan..."
                          rows={2}
                        ></textarea>
                      </div>
                      <div className="ml-2 flex flex-col space-y-2">
                        <button
                          type="submit"
                          className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Kirim
                        </button>
                        <button
                          type="button"
                          onClick={() => setReplyingTo(null)}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Batal
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="mt-2">
                  <button
                    onClick={() => setReplyingTo(comment.id)}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Balas
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Guestbook Section */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="text-xl font-bold text-gray-900">Guestbook</h2>
          <p className="mt-2 text-gray-600">
            Tinggalkan pesan atau komentar untuk acara ini.
          </p>
          <form className="mt-4" onSubmit={addComment}>
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nama
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    autoComplete="name"
                    className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Pesan
                </label>
                <div className="mt-1">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={guestMessage}
                    onChange={(e) => setGuestMessage(e.target.value)}
                    className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                  ></textarea>
                </div>
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Kirim Pesan
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}