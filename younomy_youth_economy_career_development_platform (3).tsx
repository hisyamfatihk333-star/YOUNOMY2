import React, { useState, useEffect, useMemo } from 'react';
import {
  LayoutDashboard,
  UserCheck,
  Compass,
  BookOpen,
  FlaskConical,
  Award,
  Briefcase,
  TrendingUp,
  HelpCircle,
  Settings,
  Bell,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  Share2,
  Download,
  ExternalLink,
  ChevronRight,
  ArrowRight,
  Building2,
  FileText,
  Sparkles,
  QrCode,
  Lock,
  Eye,
  EyeOff,
  RotateCcw,
  Users,
  Search,
  Filter,
  Check,
  X,
  Menu,
  MessageSquare,
  Calendar,
  Award as AwardIcon,
  Layers,
  Info,
  Printer,
  Send
} from 'lucide-react';

// ============================================================================
// INITIAL DEMO DATA (Saling Terhubung & Konsisten untuk Andi Pratama)
// ============================================================================
const INITIAL_STATE = {
  viewMode: 'landing', // 'landing' | 'seeker' | 'employer'
  activeTab: 'dashboard',
  employerTab: 'overview',
  notifications: [
    {
      id: 1,
      title: 'Selamat datang di YOUNOMY (DEMO)',
      desc: 'Lengkapi proyek Administrative Data Management untuk memvalidasi kompetensimu.',
      time: 'Baru saja',
      unread: true
    },
    {
      id: 2,
      title: 'Rekomendasi Jalur Karier Siap',
      desc: 'Kecocokan 72% ditemukan untuk posisi Junior Administrative Staff.',
      time: '1 jam lalu',
      unread: false
    }
  ],
  user: {
    name: 'Andi Pratama',
    age: 21,
    education: 'SMK Administrasi Perkantoran',
    major: 'Otomatisasi & Tata Kelola Perkantoran',
    city: 'Kota Malang, Jawa Timur',
    employmentStatus: 'Belum mempunyai pekerjaan tetap (Pencari Kerja Pertama)',
    experience: 'Belum mempunyai pengalaman kerja formal',
    targetField: 'Administrative Staff',
    socioEconomicNote: 'Membutuhkan akses pendampingan terstruktur untuk portofolio awal (Opsional)',
    assessmentCompleted: true,
    passportPrivacy: {
      showCity: true,
      showEducation: true,
      showSelfDeclared: true,
      showEvidence: true,
      showMentorNotes: true
    }
  },
  skills: [
    {
      id: 'excel',
      name: 'Microsoft Excel & Spreadsheet',
      category: 'Digital & Teknis',
      selfLevel: 2, // 1: Dasar, 2: Menengah, 3: Mahir
      validatedLevel: 1,
      status: 'Self-declared', // 'Self-declared' | 'Evidence submitted' | 'Mentor reviewed' | 'Assessed'
      source: 'Penilaian Mandiri Awal',
      updatedAt: '15 Nov 2026',
      requiredForTarget: 3
    },
    {
      id: 'data_proc',
      name: 'Pengolahan & Klasifikasi Data',
      category: 'Analitis',
      selfLevel: 1,
      validatedLevel: 1,
      status: 'Self-declared',
      source: 'Penilaian Mandiri Awal',
      updatedAt: '15 Nov 2026',
      requiredForTarget: 3
    },
    {
      id: 'reporting',
      name: 'Penyusunan Laporan Administrasi',
      category: 'Administrasi',
      selfLevel: 1,
      validatedLevel: 1,
      status: 'Self-declared',
      source: 'Penilaian Mandiri Awal',
      updatedAt: '15 Nov 2026',
      requiredForTarget: 3
    },
    {
      id: 'doc_admin',
      name: 'Administrasi & Pengarsipan Dokumen',
      category: 'Administrasi',
      selfLevel: 2,
      validatedLevel: 2,
      status: 'Mentor reviewed',
      source: 'Simulasi Tata Kelola Surat',
      updatedAt: '10 Nov 2026',
      requiredForTarget: 2
    },
    {
      id: 'comm',
      name: 'Komunikasi Profesional & Korespondensi',
      category: 'Komunikasi',
      selfLevel: 2,
      validatedLevel: 2,
      status: 'Mentor reviewed',
      source: 'Asesmen Komunikasi Dasar',
      updatedAt: '10 Nov 2026',
      requiredForTarget: 2
    },
    {
      id: 'collab',
      name: 'Kolaborasi Tim & Manajemen Waktu',
      category: 'Kolaborasi',
      selfLevel: 2,
      validatedLevel: 1,
      status: 'Self-declared',
      source: 'Penilaian Mandiri Awal',
      updatedAt: '15 Nov 2026',
      requiredForTarget: 2
    }
  ],
  trainings: [
    {
      id: 'tr-1',
      title: 'Microsoft Excel for Administrative Work',
      competency: 'Microsoft Excel & Spreadsheet',
      skillId: 'excel',
      level: 'Dasar ke Menengah',
      duration: '6 Jam (Mandiri + Praktik)',
      method: 'Modul Interaktif & Studi Kasus (Rujukan Mitra SkillHub / BLK)',
      partnerNote: 'Rujukan konseptual kurikulum vokasi — bukan integrasi sistem resmi',
      outcome: 'Mampu menggunakan fungsi IF, VLOOKUP/XLOOKUP, Pivot Table dasar, dan pembersihan data.',
      progress: 65,
      status: 'Sedang Berjalan', // 'Belum Mulai' | 'Sedang Berjalan' | 'Selesai'
      modules: [
        'Pengenalan Struktur Data & Format Tabel Standar',
        'Fungsi Logika (IF, COUNTIF, SUMIFS) untuk Rekapitulasi',
        'Lookup Data & Validasi Input Administrasi',
        'Menyusun Ringkasan Eksekutif Siap Cetak'
      ]
    },
    {
      id: 'tr-2',
      title: 'Basic Data Analysis & Reporting',
      competency: 'Penyusunan Laporan Administrasi',
      skillId: 'reporting',
      level: 'Dasar',
      duration: '4 Jam',
      method: 'Panduan Terstruktur & Template Praktik',
      partnerNote: 'Rujukan konseptual LPK Terverifikasi',
      outcome: 'Mampu mengelompokkan data mentah menjadi laporan ringkas yang mudah dibaca pimpinan.',
      progress: 0,
      status: 'Belum Mulai',
      modules: [
        'Prinsip Dasar Kebersihan Data (Data Hygiene)',
        'Teknik Pengelompokan Transaksi & Inventaris',
        'Visualisasi Grafik Sederhana & Narasi Laporan'
      ]
    },
    {
      id: 'tr-3',
      title: 'Digital Marketing Fundamentals',
      competency: 'Komunikasi Digital & Konten',
      skillId: 'comm',
      level: 'Dasar',
      duration: '5 Jam',
      method: 'Studi Kasus Kampanye UMKM',
      partnerNote: 'Rujukan konseptual ekosistem pelatihan digital',
      outcome: 'Memahami perencanaan kalender konten dan pembacaan metrik keterlibatan dasar.',
      progress: 0,
      status: 'Belum Mulai',
      modules: [
        'Riset Audiens & Persona Pelanggan',
        'Penyusunan Kalender Konten Bulanan',
        'Evaluasi Performa Konten Dasar'
      ]
    }
  ],
  projects: [
    {
      id: 'proj-admin-data',
      title: 'Administrative Data Management',
      category: 'Industry-Based Project',
      field: 'Administrative Staff',
      companyContext: 'Simulasi Kebutuhan Operasional — PT Nusantara Logistik Nusantara (DEMO DATA)',
      mentor: 'Rina Wijaya, S.E. (Asesor Praktik Administrasi - Demo)',
      deadline: 'Simulasi Mandiri (Estimasi 90 Menit)',
      status: 'Tersedia', // 'Tersedia' | 'Dalam Proses Review' | 'Perlu Revisi' | 'Lulus Asesmen Praktik'
      brief:
        'Perusahaan distribusi membutuhkan rekapitulasi 120 baris data pengiriman barang bulanan yang masih berantakan untuk dijadikan laporan mingguan bagi Kepala Gudang.',
      objectives: [
        'Membersihkan duplikasi dan menyeragamkan format tanggal/kode cabang.',
        'Mengelompokkan total pengiriman berdasarkan wilayah dan status pengiriman.',
        'Menyusun ringkasan laporan administrasi 1 halaman yang rapi dan bebas kesalahan hitung.'
      ],
      instructions: [
        'Unduh atau tinjau dataset simulasi pengiriman cabang Jawa Timur.',
        'Lakukan pengelompokan kategori (Terkirim, Tertunda, Retur) menggunakan rumus spreadsheet.',
        'Tuliskan ringkasan temuan utama dan lampirkan tautan/nama berkas hasil kerja Anda di bawah ini.'
      ],
      criteria: [
        { name: 'Ketepatan Pengolahan Data', weight: '35%', score: null },
        { name: 'Kerapian & Struktur Laporan', weight: '30%', score: null },
        { name: 'Ketepatan Mengikuti Instruksi', weight: '20%', score: null },
        { name: 'Ketepatan Waktu Penyelesaian', weight: '15%', score: null }
      ],
      submission: {
        fileName: '',
        summaryNote: '',
        submittedAt: null,
        mentorFeedback: ''
      },
      unlockedSkills: ['excel', 'data_proc', 'reporting']
    },
    {
      id: 'proj-sim-cs',
      title: 'Simulasi Penanganan Keluhan & Korespondensi Klien',
      category: 'Workplace Simulation',
      field: 'Administrative Staff',
      companyContext: 'Simulasi Layanan Pelanggan B2B (DEMO DATA)',
      mentor: 'Budi Santoso (Mentor Komunikasi Bisnis - Demo)',
      deadline: 'Simulasi 45 Menit',
      status: 'Lulus Asesmen Praktik',
      brief:
        'Menyusun balasan email resmi dan log pencatatan keluhan keterlambatan dokumen pengiriman secara empatik dan terstruktur.',
      objectives: [
        'Menggunakan struktur surat bisnis yang sopan dan jelas.',
        'Mencatat kronologi masalah ke dalam log administrasi.'
      ],
      instructions: ['Selesai dikerjakan pada tahap orientasi awal.'],
      criteria: [
        { name: 'Struktur & Etika Bahasa', weight: '50%', score: 'Baik (88/100)' },
        { name: 'Kelengkapan Pencatatan Log', weight: '50%', score: 'Baik (85/100)' }
      ],
      submission: {
        fileName: 'Log_Korespondensi_AndiPratama.pdf',
        summaryNote: 'Telah menyusun 3 draf balasan resmi dan tabel eskalasi keluhan.',
        submittedAt: '10 Nov 2026',
        mentorFeedback: 'Struktur komunikasi sangat sopan, alur eskalasi jelas dan mudah dipahami.'
      },
      unlockedSkills: ['comm', 'doc_admin']
    },
    {
      id: 'proj-skill-assess',
      title: 'Uji Praktik: Audit Kerapian Arsip Digital & Inventaris',
      category: 'Skill Assessment',
      field: 'Administrative Staff',
      companyContext: 'Standar Evaluasi Kompetensi Dasar YOUNOMY (DEMO DATA)',
      mentor: 'Tim Asesor YOUNOMY Lab',
      deadline: 'Simulasi 60 Menit',
      status: 'Tersedia',
      brief:
        'Menguji kecepatan dan ketelitian peserta dalam menamai ulang, mengklasifikasikan 50 dokumen digital, serta membuat indeks pencarian cepat.',
      objectives: [
        'Menerapkan standar penamaan file (Naming Convention) yang konsisten.',
        'Membuat daftar indeks dokumen berbasis spreadsheet.'
      ],
      instructions: [
        'Susun struktur folder logis (Tahun > Departemen > Jenis Dokumen).',
        'Unggah ringkasan indeks dokumen.'
      ],
      criteria: [
        { name: 'Konsistensi Penamaan', weight: '40%', score: null },
        { name: 'Kecepatan & Akurasi Indeks', weight: '60%', score: null }
      ],
      submission: {
        fileName: '',
        summaryNote: '',
        submittedAt: null,
        mentorFeedback: ''
      },
      unlockedSkills: ['doc_admin']
    }
  ],
  jobs: [
    {
      id: 'job-1',
      title: 'Junior Administrative Staff',
      company: 'PT Sentra Distribusi Mandiri (DEMO DATA)',
      location: 'Kota Malang (Hybrid)',
      type: 'Full-time / Entry Level',
      educationReq: 'Minimal SMK Administrasi / D3 semua jurusan',
      description:
        'Mendukung operasional administrasi harian cabang, rekapitulasi data pengiriman barang menggunakan spreadsheet, pengarsipan dokumen digital, dan penyusunan laporan mingguan.',
      tasks: [
        'Menginput dan memverifikasi data transaksi harian pada Microsoft Excel.',
        'Menyusun rekap laporan operasional mingguan untuk supervisor.',
        'Mengelola pengarsipan surat jalan dan dokumen vendor.'
      ],
      requiredSkills: [
        { skillId: 'excel', name: 'Microsoft Excel & Spreadsheet', minLevel: 2 },
        { skillId: 'data_proc', name: 'Pengolahan & Klasifikasi Data', minLevel: 2 },
        { skillId: 'reporting', name: 'Penyusunan Laporan Administrasi', minLevel: 2 },
        { skillId: 'doc_admin', name: 'Administrasi & Pengarsipan Dokumen', minLevel: 2 },
        { skillId: 'comm', name: 'Komunikasi Profesional & Korespondensi', minLevel: 2 }
      ],
      applicationStatus: 'Belum Dilamar', // 'Belum Dilamar' | 'Submitted' | 'Under Review' | 'Interview Invitation' | 'Accepted' | 'Rejected'
      employerNote: ''
    },
    {
      id: 'job-2',
      title: 'Digital Marketing Assistant',
      company: 'CV Kreasi Lokal Nusantara (DEMO DATA)',
      location: 'Kota Surabaya / Remote',
      type: 'Full-time / Entry Level',
      educationReq: 'SMK / D3 / S1 semua jurusan',
      description:
        'Membantu pengelolaan jadwal konten media sosial, pencatatan metrik kampanye bulanan, serta koordinasi komunikasi dengan kreator dan pelanggan.',
      tasks: [
        'Menyusun kalender konten mingguan.',
        'Merekap data interaksi dan jangkauan kampanye dalam spreadsheet.',
        'Membalas pertanyaan awal calon pelanggan di kanal digital.'
      ],
      requiredSkills: [
        { skillId: 'comm', name: 'Komunikasi Profesional & Korespondensi', minLevel: 2 },
        { skillId: 'excel', name: 'Microsoft Excel & Spreadsheet', minLevel: 2 },
        { skillId: 'collab', name: 'Kolaborasi Tim & Manajemen Waktu', minLevel: 2 }
      ],
      applicationStatus: 'Belum Dilamar',
      employerNote: ''
    },
    {
      id: 'job-3',
      title: 'Junior Data Analyst (Operations)',
      company: 'PT Mitra Analitika Ritel (DEMO DATA)',
      location: 'Jakarta Selatan / Remote',
      type: 'Magang Terstruktur / Junior Role',
      educationReq: 'SMK / D3 / S1 dengan minat pengolahan data',
      description:
        'Membantu tim operasional membersihkan data penjualan harian, membuat tabel ringkasan tren stok, dan menyajikan grafik sederhana.',
      tasks: [
        'Membersihkan data mentah transaksi ritel.',
        'Membuat pivot table dan grafik perbandingan stok bulanan.',
        'Mendokumentasikan anomali data untuk tim gudang.'
      ],
      requiredSkills: [
        { skillId: 'excel', name: 'Microsoft Excel & Spreadsheet', minLevel: 3 },
        { skillId: 'data_proc', name: 'Pengolahan & Klasifikasi Data', minLevel: 3 },
        { skillId: 'reporting', name: 'Penyusunan Laporan Administrasi', minLevel: 2 }
      ],
      applicationStatus: 'Belum Dilamar',
      employerNote: ''
    }
  ],
  consultations: [
    {
      id: 'cons-1',
      mentorName: 'Rina Wijaya, S.E.',
      mentorRole: 'Career & Administrative Transition Mentor (DEMO)',
      date: '12 Nov 2026',
      topic: 'Strategi Membuktikan Kemampuan Excel Tanpa Pengalaman Kerja Formal',
      issue:
        'Saya lulusan SMK Administrasi dan sudah melamar ke 8 tempat, tetapi belum pernah dipanggil wawancara karena CV saya kosong pengalaman kerja.',
      recommendations: [
        'Ganti fokus CV dari daftar riwayat kerja menjadi bukti proyek praktik terukur.',
        'Selesaikan proyek Administrative Data Management di Experience Lab untuk mendapat validasi mentor.',
        'Tautkan Transition Passport saat melamar agar HR melihat hasil pengolahan data nyata.',
        'Latih penjelasan 2 menit tentang cara Anda membersihkan dan merangkum data.'
      ],
      status: 'Selesai'
    }
  ],
  postPlacement: {
    hired: false,
    company: 'PT Sentra Distribusi Mandiri (DEMO DATA)',
    role: 'Junior Administrative Staff',
    milestone: 'Hari ke-30',
    jobFitRating: 'Sangat Sesuai (Kompetensi Excel & Laporan terpakai harian)',
    responsibilityGrowth: 'Mulai dipercaya menyusun rekapitulasi mingguan 3 cabang secara mandiri.',
    incomeChangePrivate: 'Meningkat dari Rp 0 (belum bekerja) menjadi upah standar entry-level daerah (Input sukarela & privat pengguna)'
  },
  activities: [
    {
      id: 'act-1',
      text: 'Menyelesaikan asesmen awal Transition Profile',
      time: '15 Nov 2026',
      type: 'profile'
    },
    {
      id: 'act-2',
      text: 'Mendapatkan status Mentor Reviewed pada Komunikasi Profesional',
      time: '10 Nov 2026',
      type: 'passport'
    }
  ],
  employerState: {
    shortlistedIds: [],
    interviewInvitedIds: [],
    rejectedIds: [],
    customJobs: []
  }
};

// Kandidat fiktif pendamping untuk memperkaya Employer Portal selain Andi Pratama
const OTHER_DEMO_CANDIDATES = [
  {
    id: 'cand-siti',
    name: 'Siti Nurhaliza (DEMO DATA)',
    age: 22,
    education: 'D3 Manajemen Pemasaran',
    city: 'Kab. Sidoarjo',
    targetField: 'Digital Marketing Assistant',
    matchScore: 84,
    validatedCount: 3,
    projectsCount: 2,
    passportStatus: 'Verified Portfolio Ready',
    summary: 'Lulusan baru dengan bukti simulasi kalender konten dan analisis kampanye UMKM.',
    skills: [
      { name: 'Komunikasi Profesional & Korespondensi', level: 'Menengah', status: 'Assessed' },
      { name: 'Microsoft Excel & Spreadsheet', level: 'Menengah', status: 'Mentor reviewed' },
      { name: 'Perencanaan Konten Digital', level: 'Menengah', status: 'Assessed' }
    ],
    evidence: [
      {
        title: 'Simulasi Kalender Konten & Evaluasi Kampanye Produk Lokal',
        mentor: 'Dimas Prakoso (Mentor Digital Marketing - Demo)',
        result: 'Lulus Asesmen Praktik (89/100)',
        notes: 'Mampu menyusun jadwal 30 hari dan membaca metrik CTR dasar dengan tepat.'
      }
    ]
  },
  {
    id: 'cand-rizky',
    name: 'Rizky Maulana (DEMO DATA)',
    age: 20,
    education: 'SMK Teknik Komputer & Jaringan',
    city: 'Kota Batu',
    targetField: 'Junior Data Analyst',
    matchScore: 76,
    validatedCount: 2,
    projectsCount: 1,
    passportStatus: 'In Progress',
    summary: 'Memiliki ketelitian tinggi pada pengolahan angka dan logika formula spreadsheet.',
    skills: [
      { name: 'Pengolahan & Klasifikasi Data', level: 'Menengah', status: 'Mentor reviewed' },
      { name: 'Microsoft Excel & Spreadsheet', level: 'Menengah', status: 'Mentor reviewed' },
      { name: 'Penyusunan Laporan Administrasi', level: 'Dasar', status: 'Self-declared' }
    ],
    evidence: [
      {
        title: 'Pembersihan Dataset Inventaris Gudang 500 Baris',
        mentor: 'Rina Wijaya, S.E. (Asesor - Demo)',
        result: 'Lulus Simulasi (84/100)',
        notes: 'Akurasi formula sangat baik, perlu peningkatan pada narasi ringkasan laporan.'
      }
    ]
  }
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================
const levelLabel = (lvl) => {
  if (lvl === 1) return 'Dasar';
  if (lvl === 2) return 'Menengah';
  if (lvl >= 3) return 'Mahir / Siap Kerja';
  return 'Pemula';
};

const statusBadgeStyle = (status) => {
  switch (status) {
    case 'Assessed':
    case 'Lulus Asesmen Praktik':
    case 'Accepted':
    case 'Selesai':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'Mentor reviewed':
    case 'Interview Invitation':
      return 'bg-teal-50 text-teal-800 border-teal-200';
    case 'Evidence submitted':
    case 'Dalam Proses Review':
    case 'Submitted':
    case 'Under Review':
    case 'Sedang Berjalan':
      return 'bg-amber-50 text-amber-800 border-amber-200';
    case 'Perlu Revisi':
    case 'Rejected':
      return 'bg-rose-50 text-rose-700 border-rose-200';
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200';
  }
};

// ============================================================================
// MAIN COMPONENT: App
// ============================================================================
export default function App() {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem('younomy_prototype_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore storage errors
    }
    return INITIAL_STATE;
  });

  const [toast, setToast] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifPanel, setShowNotifPanel] = useState(false);

  // Modal states
  const [selectedJobModal, setSelectedJobModal] = useState(null); // { job, mode: 'detail' | 'gap' | 'apply' }
  const [selectedTrainingModal, setSelectedTrainingModal] = useState(null);
  const [activeProjectModal, setActiveProjectModal] = useState(null);
  const [showPassportPreviewModal, setShowPassportPreviewModal] = useState(false);
  const [showSharePassportModal, setShowSharePassportModal] = useState(false);
  const [selectedCandidateModal, setSelectedCandidateModal] = useState(null);
  const [showDemoGuideModal, setShowDemoGuideModal] = useState(false);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('younomy_prototype_v1', JSON.stringify(state));
    } catch (e) {
      // ignore
    }
  }, [state]);

  const notify = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  const resetDemo = () => {
    localStorage.removeItem('younomy_prototype_v1');
    setState(INITIAL_STATE);
    setSelectedJobModal(null);
    setSelectedTrainingModal(null);
    setActiveProjectModal(null);
    setShowPassportPreviewModal(false);
    setShowSharePassportModal(false);
    setSelectedCandidateModal(null);
    notify('Data demonstrasi berhasil dikembalikan ke kondisi awal Andi Pratama.', 'info');
  };

  // Dynamic Calculations (Connected State across entire app)
  const metrics = useMemo(() => {
    const validatedSkills = state.skills.filter(
      (s) => s.status === 'Mentor reviewed' || s.status === 'Assessed'
    );
    const completedProjects = state.projects.filter(
      (p) => p.status === 'Lulus Asesmen Praktik'
    );
    const completedTrainings = state.trainings.filter((t) => t.status === 'Selesai');
    const submittedApps = state.jobs.filter((j) => j.applicationStatus !== 'Belum Dilamar');
    const interviews = state.jobs.filter(
      (j) => j.applicationStatus === 'Interview Invitation' || j.applicationStatus === 'Accepted'
    );

    // Calculate readiness percentage
    const skillPoints = state.skills.reduce((acc, s) => {
      const weight =
        s.status === 'Assessed'
          ? 1
          : s.status === 'Mentor reviewed'
          ? 0.85
          : s.status === 'Evidence submitted'
          ? 0.65
          : 0.4;
      return acc + (s.validatedLevel / 3) * weight;
    }, 0);
    const readiness = Math.min(
      100,
      Math.round((skillPoints / state.skills.length) * 85 + completedProjects.length * 7.5)
    );

    return {
      validatedCount: validatedSkills.length,
      totalSkills: state.skills.length,
      completedProjectsCount: completedProjects.length,
      totalProjects: state.projects.length,
      completedTrainingsCount: completedTrainings.length,
      submittedAppsCount: submittedApps.length,
      interviewsCount: interviews.length,
      readiness
    };
  }, [state.skills, state.projects, state.trainings, state.jobs]);

  // Calculate dynamic job match percentage
  const calculateJobMatch = (job) => {
    let earned = 0;
    let total = 0;
    job.requiredSkills.forEach((req) => {
      total += req.minLevel;
      const userSkill = state.skills.find((s) => s.skillId === req.skillId || s.id === req.skillId);
      if (userSkill) {
        const effectiveLvl = Math.max(userSkill.validatedLevel, userSkill.selfLevel * 0.85);
        const validationBonus =
          userSkill.status === 'Assessed' || userSkill.status === 'Mentor reviewed' ? 1 : 0.85;
        earned += Math.min(req.minLevel, effectiveLvl * validationBonus);
      }
    });
    return Math.min(98, Math.round((earned / total) * 100));
  };

  // ==========================================================================
  // HANDLERS FOR END-TO-END DEMO FLOWS
  // ==========================================================================

  // Flow A: Update Profile & Self Assessment
  const handleSaveProfile = (updatedUser, updatedSkills) => {
    setState((prev) => ({
      ...prev,
      user: { ...prev.user, ...updatedUser, assessmentCompleted: true },
      skills: updatedSkills,
      activities: [
        {
          id: `act-${Date.now()}`,
          text: 'Memperbarui Transition Profile & hasil pemetaan kompetensi mandiri',
          time: 'Baru saja',
          type: 'profile'
        },
        ...prev.activities
      ]
    }));
    notify('Profil kompetensi berhasil disimpan! Rekomendasi karier & passport diperbarui.');
  };

  // Flow B: Training Progress & Completion
  const handleCompleteTraining = (trainingId) => {
    const tr = state.trainings.find((t) => t.id === trainingId);
    if (!tr) return;

    setState((prev) => ({
      ...prev,
      trainings: prev.trainings.map((t) =>
        t.id === trainingId ? { ...t, progress: 100, status: 'Selesai' } : t
      ),
      skills: prev.skills.map((s) =>
        s.id === tr.skillId
          ? {
              ...s,
              selfLevel: Math.min(3, s.selfLevel + 1),
              updatedAt: 'Hari ini'
            }
          : s
      ),
      activities: [
        {
          id: `act-${Date.now()}`,
          text: `Menyelesaikan pelatihan "${tr.title}" di Skill Bridge`,
          time: 'Baru saja',
          type: 'training'
        },
        ...prev.activities
      ]
    }));
    notify(
      `Pelatihan "${tr.title}" selesai! Lanjutkan ke Experience Lab untuk membuktikan praktik.`
    );
  };

  // Flow C: Submit Project in Experience Lab & Simulate Mentor Evaluation -> Updates Transition Passport!
  const handleSubmitProject = (projectId, fileName, summaryNote) => {
    const proj = state.projects.find((p) => p.id === projectId);
    if (!proj) return;

    // Step 1: Set to 'Dalam Proses Review' & update skills to 'Evidence submitted'
    setState((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              status: 'Dalam Proses Review',
              submission: {
                ...p.submission,
                fileName: fileName || 'Laporan_Administrasi_AndiPratama.xlsx',
                summaryNote,
                submittedAt: 'Hari ini'
              }
            }
          : p
      ),
      skills: prev.skills.map((s) =>
        proj.unlockedSkills.includes(s.id)
          ? {
              ...s,
              status: s.status === 'Assessed' ? 'Assessed' : 'Evidence submitted',
              updatedAt: 'Hari ini'
            }
          : s
      ),
      activities: [
        {
          id: `act-${Date.now()}`,
          text: `Mengirim hasil proyek "${proj.title}" untuk ditinjau mentor`,
          time: 'Baru saja',
          type: 'lab'
        },
        ...prev.activities
      ]
    }));

    notify('Hasil proyek terkirim! Simulasi peninjauan mentor sedang berjalan...', 'info');
  };

  // Simulate Mentor Approval (instant button or auto-simulation)
  const handleSimulateMentorEvaluation = (projectId) => {
    const proj = state.projects.find((p) => p.id === projectId);
    if (!proj) return;

    setState((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              status: 'Lulus Asesmen Praktik',
              criteria: p.criteria.map((c, idx) => ({
                ...c,
                score: idx === 0 ? 'Baik (90/100)' : idx === 1 ? 'Baik (88/100)' : 'Baik (92/100)'
              })),
              submission: {
                ...p.submission,
                fileName: p.submission.fileName || 'Rekap_Data_Pengiriman_AndiPratama.xlsx',
                summaryNote:
                  p.submission.summaryNote ||
                  'Dataset 120 baris telah dibersihkan, dikelompokkan per wilayah, dan dirangkum dalam laporan 1 halaman.',
                submittedAt: p.submission.submittedAt || 'Hari ini',
                mentorFeedback:
                  'Ketepatan pengolahan data sangat baik, rumus bersih tanpa error, dan struktur laporan siap digunakan supervisor.'
              }
            }
          : p
      ),
      skills: prev.skills.map((s) =>
        proj.unlockedSkills.includes(s.id)
          ? {
              ...s,
              selfLevel: Math.max(s.selfLevel, 2),
              validatedLevel: Math.max(s.validatedLevel, 2),
              status: 'Assessed',
              source: `Rubrik Praktik: ${proj.title}`,
              updatedAt: 'Hari ini'
            }
          : s
      ),
      notifications: [
        {
          id: Date.now(),
          title: 'Kompetensi Tervalidasi di Transition Passport!',
          desc: `Proyek "${proj.title}" lulus evaluasi mentor. Bukti kompetensi otomatis ditambahkan.`,
          time: 'Baru saja',
          unread: true
        },
        ...prev.notifications
      ],
      activities: [
        {
          id: `act-${Date.now() + 1}`,
          text: `Lulus evaluasi mentor pada "${proj.title}" — Transition Passport diperbarui`,
          time: 'Baru saja',
          type: 'passport'
        },
        ...prev.activities
      ]
    }));

    notify(
      'Evaluasi selesai! Status kompetensi di Transition Passport berubah menjadi "Assessed".'
    );
  };

  // Flow D: Apply to Job with Explicit Consent
  const handleApplyJob = (jobId) => {
    const job = state.jobs.find((j) => j.id === jobId);
    if (!job) return;

    setState((prev) => ({
      ...prev,
      jobs: prev.jobs.map((j) =>
        j.id === jobId ? { ...j, applicationStatus: 'Submitted' } : j
      ),
      activities: [
        {
          id: `act-${Date.now()}`,
          text: `Mengirim Transition Passport untuk posisi ${job.title} di ${job.company}`,
          time: 'Baru saja',
          type: 'job'
        },
        ...prev.activities
      ]
    }));
    setSelectedJobModal(null);
    notify(
      `Lamaran & Transition Passport terkirim ke ${job.company}! Coba buka Employer Demo untuk melihat perspektif perusahaan.`
    );
  };

  // Flow E: Employer Action on Andi Pratama (Connected to Seeker View!)
  const handleEmployerDecision = (decision) => {
    // decision: 'shortlist' | 'interview' | 'reject'
    setState((prev) => {
      const targetJobId = prev.jobs[0].id;
      let newAppStatus = prev.jobs[0].applicationStatus;
      let feedbackMsg = '';

      if (decision === 'interview') {
        newAppStatus = 'Interview Invitation';
        feedbackMsg =
          'Undangan wawancara demonstrasi dikirim berdasarkan bukti proyek Administrative Data Management pada Transition Passport.';
      } else if (decision === 'reject') {
        newAppStatus = 'Rejected';
        feedbackMsg = 'Belum sesuai kebutuhan saat ini (Simulasi Demo).';
      } else if (decision === 'shortlist') {
        newAppStatus = newAppStatus === 'Belum Dilamar' ? 'Under Review' : newAppStatus;
      }

      return {
        ...prev,
        jobs: prev.jobs.map((j) =>
          j.id === targetJobId
            ? { ...j, applicationStatus: newAppStatus, employerNote: feedbackMsg }
            : j
        ),
        employerState: {
          ...prev.employerState,
          shortlistedIds:
            decision === 'shortlist'
              ? Array.from(new Set([...prev.employerState.shortlistedIds, 'andi']))
              : prev.employerState.shortlistedIds,
          interviewInvitedIds:
            decision === 'interview'
              ? Array.from(new Set([...prev.employerState.interviewInvitedIds, 'andi']))
              : prev.employerState.interviewInvitedIds,
          rejectedIds:
            decision === 'reject'
              ? Array.from(new Set([...prev.employerState.rejectedIds, 'andi']))
              : prev.employerState.rejectedIds
        },
        notifications:
          decision === 'interview'
            ? [
                {
                  id: Date.now(),
                  title: 'Undangan Wawancara Demonstrasi!',
                  desc: 'PT Sentra Distribusi Mandiri mengundang Anda wawancara setelah meninjau Transition Passport.',
                  time: 'Baru saja',
                  unread: true
                },
                ...prev.notifications
              ]
            : prev.notifications,
        activities: [
          {
            id: `act-${Date.now()}`,
            text:
              decision === 'interview'
                ? 'Menerima Undangan Wawancara dari PT Sentra Distribusi Mandiri (DEMO)'
                : decision === 'shortlist'
                ? 'Masuk daftar Shortlist perusahaan mitra demonstrasi'
                : 'Pembaruan status seleksi dari portal perusahaan',
            time: 'Baru saja',
            type: 'job'
          },
          ...prev.activities
        ]
      };
    });

    if (decision === 'interview') {
      notify('Undangan wawancara demonstrasi berhasil dikirim ke Andi Pratama!');
    } else if (decision === 'shortlist') {
      notify('Kandidat Andi Pratama ditambahkan ke Shortlist.');
    } else {
      notify('Status kandidat diperbarui.', 'info');
    }
  };

  // ==========================================================================
  // RENDER: LANDING PAGE VIEW
  // ==========================================================================
  if (state.viewMode === 'landing') {
    return (
      <div className="min-h-screen bg-[#F7F9FC] text-[#273444] font-sans selection:bg-[#16A6A1]/20">
        {/* Top Demo Banner */}
        <div className="bg-[#142D4E] text-white text-xs py-2 px-4 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#16A6A1] text-white font-semibold tracking-wide uppercase text-[10px]">
              Prototype ASF 2026
            </span>
            <span className="text-slate-200">
              Ekosistem Pendampingan Transisi Sekolah ke Kerja — Seluruh entitas & lowongan adalah{' '}
              <strong className="text-white">DEMO DATA</strong>.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowDemoGuideModal(true)}
              className="underline hover:text-[#16A6A1] transition-colors font-medium"
            >
              Panduan Uji Juri (3 Menit)
            </button>
            <button
              onClick={() => setState((prev) => ({ ...prev, viewMode: 'employer' }))}
              className="bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded text-white font-medium transition-colors"
            >
              Employer Demo →
            </button>
          </div>
        </div>

        {/* Navigation Header */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-[#E8EDF3]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#142D4E] flex items-center justify-center text-white font-bold text-lg shadow-sm">
                Y
              </div>
              <div>
                <span className="font-bold text-lg tracking-tight text-[#142D4E]">YOUNOMY</span>
                <span className="hidden sm:inline-block ml-2 text-xs text-slate-500 border-l border-slate-200 pl-2">
                  Youth Economy & Career Development
                </span>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
              <a href="#masalah" className="hover:text-[#142D4E]">
                Permasalahan
              </a>
              <a href="#cara-kerja" className="hover:text-[#142D4E]">
                Cara Kerja
              </a>
              <a href="#inovasi" className="hover:text-[#142D4E]">
                Transition Passport
              </a>
              <a href="#manfaat" className="hover:text-[#142D4E]">
                Ekosistem
              </a>
            </nav>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setState((prev) => ({ ...prev, viewMode: 'employer' }))}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[#E8EDF3] text-sm font-medium text-[#142D4E] hover:bg-slate-50 transition-colors"
              >
                <Building2 className="w-4 h-4 text-[#16A6A1]" />
                Employer Demo
              </button>
              <button
                onClick={() =>
                  setState((prev) => ({ ...prev, viewMode: 'seeker', activeTab: 'dashboard' }))
                }
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#142D4E] hover:bg-[#1d3f6b] text-white text-sm font-semibold shadow-sm transition-colors"
              >
                Mulai Perjalanan
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-16 md:pt-20 md:pb-24">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#16A6A1]" />
                <span>Inovasi Transisi Sekolah ke Kerja • Berbasis Bukti Kompetensi</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#142D4E] leading-tight tracking-tight">
                Your Skills Deserve to Be Seen.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Bangun kompetensi, buktikan kemampuan praktis melalui simulasi kerja nyata, dan
                miliki <strong className="text-[#142D4E]">Transition Passport</strong> yang dapat
                dinilai langsung oleh pemberi kerja.
              </p>

              <p className="text-xs sm:text-sm text-slate-500 bg-white border border-[#E8EDF3] rounded-lg p-3.5">
                <strong className="text-[#142D4E]">Prinsip YOUNOMY:</strong> Bukan portal lowongan
                biasa dan bukan sekadar kursus daring. Kami mendampingi pencari kerja pertama
                mengonversi potensi pendidikan menjadi bukti kerja yang terverifikasi.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() =>
                    setState((prev) => ({ ...prev, viewMode: 'seeker', activeTab: 'dashboard' }))
                  }
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#16A6A1] hover:bg-[#138f8a] text-white font-semibold text-base shadow-sm transition-all"
                >
                  Mulai Perjalanan (Akun Demo Andi)
                  <ArrowRight className="w-5 h-5" />
                </button>
                <a
                  href="#cara-kerja"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#142D4E] border border-[#E8EDF3] font-semibold text-base transition-all"
                >
                  Lihat Cara Kerja
                </a>
              </div>
            </div>

            {/* Interactive Preview Card of Transition Passport */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-[#E8EDF3] shadow-lg overflow-hidden">
                <div className="bg-[#142D4E] p-5 text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#16A6A1] flex items-center justify-center font-bold text-lg">
                      AP
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-base">Andi Pratama</h3>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-white/15 uppercase tracking-wider">
                          Demo
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">
                        SMK Administrasi Perkantoran • Target: Admin Staff
                      </p>
                    </div>
                  </div>
                  <QrCode className="w-8 h-8 text-teal-300 opacity-90" />
                </div>

                <div className="p-5 space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-500 uppercase tracking-wider">
                      YOUNOMY Transition Passport
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-teal-50 text-teal-800 font-semibold border border-teal-200">
                      ID: YNM-2026-0841
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    <div className="p-3 rounded-xl bg-[#F7F9FC] border border-[#E8EDF3] flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-[#142D4E]">
                          Administrasi & Pengarsipan
                        </p>
                        <p className="text-xs text-slate-500">Bukti: Simulasi Tata Kelola Surat</p>
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                        Mentor Reviewed
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#F7F9FC] border border-[#E8EDF3] flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-[#142D4E]">
                          Microsoft Excel & Pengolahan Data
                        </p>
                        <p className="text-xs text-slate-500">
                          Siap diuji di Experience & Evidence Lab
                        </p>
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                        Siap Praktik
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      setState((prev) => ({
                        ...prev,
                        viewMode: 'seeker',
                        activeTab: 'passport'
                      }))
                    }
                    className="w-full py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#142D4E] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    Buka Transition Passport Interaktif
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: The Problem */}
        <section id="masalah" className="bg-white border-y border-[#E8EDF3] py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#16A6A1]">
                Latar Belakang Masalah
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#142D4E] mt-1">
                Paradoks Pencari Kerja Pertama di Indonesia
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2">
                Lulusan muda membutuhkan pengalaman untuk diterima bekerja, namun tidak memiliki
                ruang terpercaya untuk membuktikan kemampuannya sebelum direkrut.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-[#F7F9FC] border border-[#E8EDF3] space-y-3">
                <div className="text-3xl font-extrabold text-[#142D4E]">16,42%</div>
                <h3 className="font-bold text-base text-[#142D4E]">
                  Tingkat Pengangguran Terbuka (TPT) Pemuda Usia 15–24 Tahun
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Kelompok usia muda memiliki tingkat pengangguran jauh lebih tinggi dibanding
                  rata-rata nasional akibat hambatan transisi dari pendidikan ke dunia kerja.
                </p>
                <p className="text-[11px] text-slate-500 pt-2 border-t border-[#E8EDF3]">
                  Sumber: Badan Pusat Statistik (BPS), Keadaan Ketenagakerjaan Indonesia (2024).
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#F7F9FC] border border-[#E8EDF3] space-y-3">
                <div className="text-3xl font-extrabold text-[#142D4E]">9,01%</div>
                <h3 className="font-bold text-base text-[#142D4E]">
                  TPT Lulusan Sekolah Menengah Kejuruan (SMK)
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Lulusan vokasi tetap menjadi penyumbang TPT tertinggi antarjenjang pendidikan
                  karena kesenjangan antara kompetensi kelas dan standar tugas industri.
                </p>
                <p className="text-[11px] text-slate-500 pt-2 border-t border-[#E8EDF3]">
                  Sumber: Badan Pusat Statistik (BPS), Sakernas Agustus 2024.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#F7F9FC] border border-[#E8EDF3] space-y-3">
                <div className="text-3xl font-extrabold text-[#16A6A1]">Bukti Praktis</div>
                <h3 className="font-bold text-base text-[#142D4E]">
                  Ketiadaan Portofolio Tervalidasi bagi Pemuda Rentan
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Dalam ilustrasi ekosistem YOUNOMY (DEMO DATA), pencari kerja pertama sering
                  gagal pada tahap seleksi berkas karena klaim keterampilan pada CV tidak disertai
                  bukti kerja yang dapat diverifikasi HR.
                </p>
                <p className="text-[11px] text-slate-500 pt-2 border-t border-[#E8EDF3]">
                  Konteks Desain YOUNOMY (2026) — Analisis Hambatan Pencari Kerja Pertama.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: How YOUNOMY Works */}
        <section id="cara-kerja" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#16A6A1]">
              Alur Ekosistem Terintegrasi
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#142D4E] mt-1">
              Bagaimana YOUNOMY Mendampingi Transisi Kerja
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                step: '01',
                title: 'Transition Profile',
                desc: 'Pemetaan kompetensi awal & identifikasi kesenjangan kesiapan kerja.'
              },
              {
                step: '02',
                title: 'Skill Bridge',
                desc: 'Rekomendasi pelatihan terarah berdasarkan celah kompetensi jabatan.'
              },
              {
                step: '03',
                title: 'Experience Lab',
                desc: 'Mengerjakan proyek simulasi industri yang dievaluasi mentor.'
              },
              {
                step: '04',
                title: 'Transition Passport',
                desc: 'Dokumentasi bukti kompetensi tervalidasi yang siap dibagikan.'
              },
              {
                step: '05',
                title: 'Employer Connect',
                desc: 'Pencocokan transparan dengan perusahaan berdasarkan bukti kerja.'
              }
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white p-5 rounded-2xl border border-[#E8EDF3] flex flex-col justify-between space-y-4"
              >
                <div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#142D4E] text-white">
                    Tahap {item.step}
                  </span>
                  <h3 className="font-bold text-base text-[#142D4E] mt-3">{item.title}</h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4 & 5: Main Innovation & Benefits */}
        <section id="inovasi" className="bg-[#142D4E] text-white py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#16A6A1]">
                  Pusat Inovasi YOUNOMY
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold">
                  Experience & Evidence Lab + Transition Passport
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Alih-alih membiarkan pencari kerja pertama bersaing menggunakan CV kosong,
                  YOUNOMY menyediakan laboratorium simulasi tugas industri. Setiap hasil karya
                  yang dinilai mentor otomatis tercatat ke dalam <strong>Transition Passport</strong>{' '}
                  dengan status validasi yang jelas dan transparan.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-xl bg-white/10">
                    <div className="font-bold text-teal-300">4 Tingkat Validasi</div>
                    <p className="text-slate-300 mt-1">
                      Membedakan klaim mandiri, unggahan bukti, tinjauan mentor, dan rubrik asesmen.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/10">
                    <div className="font-bold text-teal-300">Kendali Privasi Penuh</div>
                    <p className="text-slate-300 mt-1">
                      Pengguna memilih sendiri data mana yang diizinkan dilihat perusahaan.
                    </p>
                  </div>
                </div>
              </div>

              <div id="manfaat" className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    role: 'Bagi Pencari Kerja Muda',
                    point:
                      'Memperoleh portofolio praktik tervalidasi dan panduan langkah demi langkah menuju pekerjaan pertama.'
                  },
                  {
                    role: 'Bagi Perusahaan & HR',
                    point:
                      'Menilai kemampuan praktis kandidat pemula secara objektif melalui bukti proyek nyata.'
                  },
                  {
                    role: 'Bagi Lembaga Pendidikan',
                    point:
                      'Memetakan kesenjangan kompetensi lulusan terhadap kebutuhan standar industri daerah.'
                  },
                  {
                    role: 'Bagi Lembaga Pelatihan (BLK/LPK)',
                    point:
                      'Menjadi rujukan peningkatan keterampilan yang terhubung langsung dengan proyek pembuktian.'
                  }
                ].map((b) => (
                  <div key={b.role} className="p-5 rounded-2xl bg-white/5 border border-white/10">
                    <h4 className="font-bold text-sm text-[#16A6A1]">{b.role}</h4>
                    <p className="text-xs text-slate-200 mt-2 leading-relaxed">{b.point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold">Mulai Buktikan Kompetensimu.</h3>
                <p className="text-xs text-slate-300 mt-1">
                  Coba langsung perjalanan Andi Pratama atau tinjau kandidat dari sisi Perusahaan.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                <button
                  onClick={() =>
                    setState((prev) => ({ ...prev, viewMode: 'seeker', activeTab: 'dashboard' }))
                  }
                  className="flex-1 sm:flex-initial px-6 py-3 rounded-xl bg-[#16A6A1] hover:bg-[#138f8a] text-white font-semibold text-sm transition-colors"
                >
                  Masuk Aplikasi Pencari Kerja
                </button>
                <button
                  onClick={() => setState((prev) => ({ ...prev, viewMode: 'employer' }))}
                  className="flex-1 sm:flex-initial px-6 py-3 rounded-xl bg-white text-[#142D4E] hover:bg-slate-100 font-semibold text-sm transition-colors"
                >
                  Masuk Employer Portal
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Guide Modal */}
        {showDemoGuideModal && (
          <DemoGuideModal onClose={() => setShowDemoGuideModal(false)} />
        )}
      </div>
    );
  }

  // ==========================================================================
  // RENDER: EMPLOYER PORTAL VIEW (Fitur 8)
  // ==========================================================================
  if (state.viewMode === 'employer') {
    return (
      <EmployerPortalView
        state={state}
        setState={setState}
        metrics={metrics}
        calculateJobMatch={calculateJobMatch}
        handleEmployerDecision={handleEmployerDecision}
        selectedCandidateModal={selectedCandidateModal}
        setSelectedCandidateModal={setSelectedCandidateModal}
        notify={notify}
        toast={toast}
        resetDemo={resetDemo}
      />
    );
  }

  // ==========================================================================
  // RENDER: JOB SEEKER MAIN WEB APPLICATION (10 Menu Utama)
  // ==========================================================================
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'profile', label: 'Transition Profile', icon: UserCheck },
    { id: 'pathway', label: 'Career Pathway', icon: Compass },
    { id: 'skillbridge', label: 'Skill Bridge', icon: BookOpen },
    { id: 'lab', label: 'Experience Lab', icon: FlaskConical, highlight: true },
    { id: 'passport', label: 'Transition Passport', icon: Award, highlight: true },
    { id: 'employer_connect', label: 'Employer Connect', icon: Briefcase },
    { id: 'tracker', label: 'Progress Tracker', icon: TrendingUp },
    { id: 'navigator', label: 'Bantuan & Navigator', icon: HelpCircle },
    { id: 'settings', label: 'Pengaturan Profil', icon: Settings }
  ];

  const unreadNotifCount = state.notifications.filter((n) => n.unread).length;

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#273444] flex flex-col">
      {/* Top Demo & Mode Switcher Bar */}
      <div className="bg-[#142D4E] text-white text-xs px-4 py-1.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 truncate">
          <span className="px-1.5 py-0.5 rounded bg-[#16A6A1] text-[10px] font-bold uppercase shrink-0">
            DEMO MODE
          </span>
          <span className="truncate text-slate-200">
            Akun Simulasi: <strong>{state.user.name}</strong> • Seluruh perusahaan & lowongan
            adalah data demonstrasi.
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowDemoGuideModal(true)}
            className="hidden sm:inline-block px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[11px] font-medium"
          >
            Alur Demo Juri
          </button>
          <button
            onClick={() => setState((prev) => ({ ...prev, viewMode: 'employer' }))}
            className="px-2.5 py-0.5 rounded bg-[#16A6A1] hover:bg-[#138f8a] text-white text-[11px] font-semibold flex items-center gap-1"
          >
            <Building2 className="w-3 h-3" />
            Employer Demo
          </button>
          <button
            onClick={resetDemo}
            title="Reset Data Demo"
            className="p-1 rounded hover:bg-white/10 text-slate-300 hover:text-white"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* App Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-[#E8EDF3] h-16 px-4 lg:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#142D4E] hover:bg-slate-100"
            aria-label="Buka Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            onClick={() => setState((prev) => ({ ...prev, viewMode: 'landing' }))}
            className="flex items-center gap-2.5 text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-[#142D4E] flex items-center justify-center text-white font-bold">
              Y
            </div>
            <div>
              <div className="font-bold text-base text-[#142D4E] leading-none">YOUNOMY</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Transition Ecosystem</div>
            </div>
          </button>
        </div>

        {/* Center Quick Status Pill (Desktop) */}
        <div className="hidden md:flex items-center gap-2 bg-[#F7F9FC] border border-[#E8EDF3] px-3 py-1.5 rounded-full text-xs">
          <span className="text-slate-500">Status Passport:</span>
          <span className="font-semibold text-[#142D4E]">
            {metrics.validatedCount}/{metrics.totalSkills} Kompetensi Tervalidasi
          </span>
          <button
            onClick={() => setState((prev) => ({ ...prev, activeTab: 'passport' }))}
            className="text-[#16A6A1] font-semibold hover:underline ml-1"
          >
            Lihat →
          </button>
        </div>

        {/* Right User & Notifications */}
        <div className="flex items-center gap-2 sm:gap-3 relative">
          <button
            onClick={() => {
              setShowNotifPanel(!showNotifPanel);
              setState((prev) => ({
                ...prev,
                notifications: prev.notifications.map((n) => ({ ...n, unread: false }))
              }));
            }}
            className="relative p-2 rounded-lg hover:bg-slate-100 text-slate-600"
            aria-label="Notifikasi"
          >
            <Bell className="w-5 h-5" />
            {unreadNotifCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#16A6A1]" />
            )}
          </button>

          {showNotifPanel && (
            <div className="absolute right-0 top-12 w-80 bg-white rounded-xl border border-[#E8EDF3] shadow-xl p-3 z-50">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E8EDF3]">
                <span className="text-xs font-bold text-[#142D4E]">Notifikasi Aktivitas</span>
                <button
                  onClick={() => setShowNotifPanel(false)}
                  className="text-xs text-slate-400 hover:text-slate-600"
                >
                  Tutup
                </button>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {state.notifications.map((n) => (
                  <div key={n.id} className="p-2.5 rounded-lg bg-[#F7F9FC] text-xs space-y-1">
                    <div className="font-semibold text-[#142D4E]">{n.title}</div>
                    <p className="text-slate-600">{n.desc}</p>
                    <div className="text-[10px] text-slate-400">{n.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => setState((prev) => ({ ...prev, activeTab: 'profile' }))}
            className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full border border-[#E8EDF3] hover:bg-slate-50"
          >
            <div className="w-7 h-7 rounded-full bg-[#142D4E] text-white text-xs font-bold flex items-center justify-center">
              {state.user.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)}
            </div>
            <span className="text-xs font-semibold text-[#142D4E] hidden sm:inline">
              {state.user.name}
            </span>
          </button>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-white border-r border-[#E8EDF3] p-4 justify-between">
          <div className="space-y-1">
            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Menu Utama
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = state.activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setState((prev) => ({ ...prev, activeTab: item.id }))}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    active
                      ? 'bg-[#142D4E] text-white shadow-sm'
                      : 'text-slate-600 hover:bg-[#F7F9FC] hover:text-[#142D4E]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`w-4 h-4 ${
                        active
                          ? 'text-[#16A6A1]'
                          : item.highlight
                          ? 'text-[#16A6A1]'
                          : 'text-slate-400'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.highlight && !active && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200">
                      Inti
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="p-3.5 rounded-xl bg-[#F7F9FC] border border-[#E8EDF3] space-y-2">
            <div className="text-xs font-bold text-[#142D4E]">Perspektif Pemberi Kerja</div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Lihat bagaimana HR menilai Transition Passport milik Andi Pratama.
            </p>
            <button
              onClick={() => setState((prev) => ({ ...prev, viewMode: 'employer' }))}
              className="w-full py-2 rounded-lg bg-white border border-[#E8EDF3] hover:border-[#16A6A1] text-xs font-semibold text-[#142D4E] transition-colors"
            >
              Buka Employer Portal →
            </button>
          </div>
        </aside>

        {/* Mobile Drawer Navigation */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-slate-900/40"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative w-72 max-w-[85vw] bg-white h-full p-4 overflow-y-auto flex flex-col justify-between z-10">
              <div>
                <div className="flex items-center justify-between pb-4 mb-3 border-b border-[#E8EDF3]">
                  <span className="font-bold text-[#142D4E]">Navigasi YOUNOMY</span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg hover:bg-slate-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = state.activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setState((prev) => ({ ...prev, activeTab: item.id }));
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium ${
                          active ? 'bg-[#142D4E] text-white' : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 text-[#16A6A1]" />
                          <span>{item.label}</span>
                        </div>
                        {item.highlight && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-50 text-teal-800 font-semibold">
                            Inovasi Inti
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setState((prev) => ({ ...prev, viewMode: 'employer' }));
                }}
                className="mt-4 w-full py-3 rounded-xl bg-[#16A6A1] text-white text-sm font-semibold"
              >
                Beralih ke Employer Demo
              </button>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-10 max-w-full overflow-x-hidden">
          {state.activeTab === 'dashboard' && (
            <DashboardTab
              state={state}
              metrics={metrics}
              calculateJobMatch={calculateJobMatch}
              navigate={(tab) => setState((prev) => ({ ...prev, activeTab: tab }))}
            />
          )}

          {state.activeTab === 'profile' && (
            <TransitionProfileTab
              user={state.user}
              skills={state.skills}
              onSave={handleSaveProfile}
              navigate={(tab) => setState((prev) => ({ ...prev, activeTab: tab }))}
            />
          )}

          {state.activeTab === 'pathway' && (
            <CareerPathwayTab
              jobs={state.jobs}
              skills={state.skills}
              calculateJobMatch={calculateJobMatch}
              onOpenJobModal={(job, mode) => setSelectedJobModal({ job, mode })}
              navigate={(tab) => setState((prev) => ({ ...prev, activeTab: tab }))}
            />
          )}

          {state.activeTab === 'skillbridge' && (
            <SkillBridgeTab
              trainings={state.trainings}
              skills={state.skills}
              onOpenDetail={(tr) => setSelectedTrainingModal(tr)}
              onComplete={handleCompleteTraining}
              navigate={(tab) => setState((prev) => ({ ...prev, activeTab: tab }))}
            />
          )}

          {state.activeTab === 'lab' && (
            <ExperienceLabTab
              projects={state.projects}
              onSelectProject={(proj) => setActiveProjectModal(proj)}
              onSubmitProject={handleSubmitProject}
              onSimulateEvaluation={handleSimulateMentorEvaluation}
              navigate={(tab) => setState((prev) => ({ ...prev, activeTab: tab }))}
            />
          )}

          {state.activeTab === 'passport' && (
            <TransitionPassportTab
              state={state}
              metrics={metrics}
              onOpenPreview={() => setShowPassportPreviewModal(true)}
              onOpenShare={() => setShowSharePassportModal(true)}
              onUpdatePrivacy={(newPrivacy) => {
                setState((prev) => ({
                  ...prev,
                  user: { ...prev.user, passportPrivacy: newPrivacy }
                }));
                notify('Pengaturan privasi Transition Passport diperbarui.');
              }}
              navigate={(tab) => setState((prev) => ({ ...prev, activeTab: tab }))}
            />
          )}

          {state.activeTab === 'employer_connect' && (
            <EmployerConnectTab
              jobs={state.jobs}
              skills={state.skills}
              calculateJobMatch={calculateJobMatch}
              onOpenJobModal={(job, mode) => setSelectedJobModal({ job, mode })}
              navigate={(tab) => setState((prev) => ({ ...prev, activeTab: tab }))}
              switchToEmployer={() => setState((prev) => ({ ...prev, viewMode: 'employer' }))}
            />
          )}

          {state.activeTab === 'tracker' && (
            <ProgressTrackerTab
              state={state}
              metrics={metrics}
              onUpdatePostPlacement={(updates) => {
                setState((prev) => ({
                  ...prev,
                  postPlacement: { ...prev.postPlacement, ...updates }
                }));
                notify('Data pemantauan pasca-penempatan (sukarela & privat) disimpan.');
              }}
            />
          )}

          {state.activeTab === 'navigator' && (
            <TransitionNavigatorTab
              consultations={state.consultations}
              onAddConsultation={(topic, issue) => {
                setState((prev) => ({
                  ...prev,
                  consultations: [
                    {
                      id: `cons-${Date.now()}`,
                      mentorName: 'Rina Wijaya, S.E.',
                      mentorRole: 'Career & Administrative Transition Mentor (DEMO)',
                      date: 'Hari ini (Terjadwal)',
                      topic,
                      issue,
                      recommendations: [
                        'Meninjau kembali kesesuaian bukti proyek pada Transition Passport dengan deskripsi jabatan.',
                        'Menjadwalkan sesi simulasi wawancara berbasis portofolio berdurasi 20 menit.'
                      ],
                      status: 'Terjadwal'
                    },
                    ...prev.consultations
                  ]
                }));
                notify('Permintaan pendampingan berhasil dikirim ke Transition Navigator!');
              }}
            />
          )}

          {state.activeTab === 'settings' && (
            <SettingsTab
              user={state.user}
              onUpdatePrivacy={(newPrivacy) => {
                setState((prev) => ({
                  ...prev,
                  user: { ...prev.user, passportPrivacy: newPrivacy }
                }));
                notify('Preferensi privasi & aksesibilitas disimpan.');
              }}
              onResetDemo={resetDemo}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation (Prioritas Mobile-First untuk Fitur Inti) */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t border-[#E8EDF3] grid grid-cols-5 h-16">
        {[
          { id: 'dashboard', label: 'Beranda', icon: LayoutDashboard },
          { id: 'profile', label: 'Profil', icon: UserCheck },
          { id: 'lab', label: 'Exp. Lab', icon: FlaskConical },
          { id: 'passport', label: 'Passport', icon: Award },
          { id: 'employer_connect', label: 'Peluang', icon: Briefcase }
        ].map((item) => {
          const Icon = item.icon;
          const active = state.activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setState((prev) => ({ ...prev, activeTab: item.id }))}
              className={`flex flex-col items-center justify-center gap-1 text-[11px] font-medium ${
                active ? 'text-[#142D4E] font-bold' : 'text-slate-500'
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? 'text-[#16A6A1]' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* ====================================================================
          MODALS (Interaksi Detail, Analisis Kesenjangan, Apply & Consent, Passport)
          ==================================================================== */}
      {selectedJobModal && (
        <JobActionModal
          modalData={selectedJobModal}
          user={state.user}
          skills={state.skills}
          metrics={metrics}
          matchScore={calculateJobMatch(selectedJobModal.job)}
          onClose={() => setSelectedJobModal(null)}
          onApply={handleApplyJob}
          onGoToLab={() => {
            setSelectedJobModal(null);
            setState((prev) => ({ ...prev, activeTab: 'lab' }));
          }}
          onGoToSkillBridge={() => {
            setSelectedJobModal(null);
            setState((prev) => ({ ...prev, activeTab: 'skillbridge' }));
          }}
        />
      )}

      {selectedTrainingModal && (
        <TrainingDetailModal
          training={selectedTrainingModal}
          onClose={() => setSelectedTrainingModal(null)}
          onComplete={(id) => {
            handleCompleteTraining(id);
            setSelectedTrainingModal(null);
          }}
        />
      )}

      {activeProjectModal && (
        <ProjectWorkspaceModal
          project={
            state.projects.find((p) => p.id === activeProjectModal.id) || activeProjectModal
          }
          onClose={() => setActiveProjectModal(null)}
          onSubmit={handleSubmitProject}
          onSimulateEval={handleSimulateMentorEvaluation}
          onGoToPassport={() => {
            setActiveProjectModal(null);
            setState((prev) => ({ ...prev, activeTab: 'passport' }));
          }}
        />
      )}

      {showPassportPreviewModal && (
        <PassportPrintableModal
          state={state}
          metrics={metrics}
          onClose={() => setShowPassportPreviewModal(false)}
          onNotify={notify}
        />
      )}

      {showSharePassportModal && (
        <SharePassportModal
          user={state.user}
          onUpdatePrivacy={(newPrivacy) => {
            setState((prev) => ({
              ...prev,
              user: { ...prev.user, passportPrivacy: newPrivacy }
            }));
          }}
          onClose={() => setShowSharePassportModal(false)}
          onNotify={notify}
        />
      )}

      {showDemoGuideModal && <DemoGuideModal onClose={() => setShowDemoGuideModal(false)} />}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-20 lg:bottom-6 right-4 left-4 sm:left-auto sm:w-96 z-50 bg-[#142D4E] text-white px-4 py-3 rounded-xl shadow-lg border border-white/10 flex items-start gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-[#16A6A1] shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed flex-1">{toast.message}</div>
          <button onClick={() => setToast(null)} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// TAB 1: DASHBOARD UTAMA PENGGUNA
// ============================================================================
function DashboardTab({ state, metrics, calculateJobMatch, navigate }) {
  const adminProject = state.projects.find((p) => p.id === 'proj-admin-data');
  const isProjectDone = adminProject?.status === 'Lulus Asesmen Praktik';

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white rounded-2xl border border-[#E8EDF3] p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
              Pencari Kerja Pertama • {state.user.education}
            </span>
            <span className="text-xs text-slate-400">DEMO DATA</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#142D4E]">
            Selamat datang, {state.user.name}!
          </h1>
          <p className="text-sm text-slate-600">
            Bangun bukti kompetensimu dan persiapkan langkah menuju pekerjaan pertamamu.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 shrink-0">
          <button
            onClick={() => navigate('passport')}
            className="px-4 py-2.5 rounded-xl bg-[#142D4E] hover:bg-[#1c3e6b] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm"
          >
            <Award className="w-4 h-4 text-[#16A6A1]" />
            Buka Transition Passport
          </button>
        </div>
      </div>

      {/* Ringkasan Perkembangan (4 Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8EDF3] space-y-2">
          <div className="text-xs font-medium text-slate-500">Kesiapan Profil</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#142D4E]">
            {metrics.readiness}%
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#16A6A1] transition-all duration-500"
              style={{ width: `${metrics.readiness}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-500">Target: {state.user.targetField}</div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8EDF3] space-y-2">
          <div className="text-xs font-medium text-slate-500">Kompetensi Tervalidasi</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#16A6A1]">
            {metrics.validatedCount}
            <span className="text-base font-semibold text-slate-400">/{metrics.totalSkills}</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Ditinjau mentor atau lulus rubrik praktik
          </p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8EDF3] space-y-2">
          <div className="text-xs font-medium text-slate-500">Proyek Praktik Selesai</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#142D4E]">
            {metrics.completedProjectsCount}
            <span className="text-base font-semibold text-slate-400">/{metrics.totalProjects}</span>
          </div>
          <p className="text-[11px] text-slate-500">Experience & Evidence Lab</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8EDF3] space-y-2">
          <div className="text-xs font-medium text-slate-500">Status Peluang Kerja</div>
          <div className="text-lg sm:text-xl font-bold text-[#142D4E] pt-1">
            {state.jobs[0].applicationStatus === 'Belum Dilamar'
              ? 'Siap Melamar'
              : state.jobs[0].applicationStatus}
          </div>
          <p className="text-[11px] text-slate-500">
            {metrics.submittedAppsCount} lamaran demonstrasi terkirim
          </p>
        </div>
      </div>

      {/* Recommended Next Step (Dynamic Guidance) */}
      <div className="bg-white rounded-2xl border-l-4 border-l-[#16A6A1] border border-[#E8EDF3] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#16A6A1]">
            <Sparkles className="w-4 h-4" />
            Langkah Berikutnya yang Direkomendasikan
          </div>
          {!isProjectDone ? (
            <>
              <h3 className="font-bold text-base text-[#142D4E]">
                Lengkapi proyek praktik "Administrative Data Management" di Experience Lab
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Hasil asesmen awal menunjukkan kemampuan Microsoft Excel & penyusunan laporan Anda
                masih berstatus <em>Self-declared</em>. Selesaikan proyek praktik untuk mendapatkan
                bukti tervalidasi di Transition Passport.
              </p>
            </>
          ) : state.jobs[0].applicationStatus === 'Belum Dilamar' ? (
            <>
              <h3 className="font-bold text-base text-[#142D4E]">
                Transition Passport Anda sudah diperbarui! Ajukan ke perusahaan mitra demonstrasi.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Bukti pengolahan data dan laporan Anda kini berstatus <strong>Assessed</strong>.
                Buka Employer Connect untuk membagikan passport Anda.
              </p>
            </>
          ) : (
            <>
              <h3 className="font-bold text-base text-[#142D4E]">
                Lamaran Anda telah terkirim! Simulasikan penilaian HR melalui Employer Demo.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Status saat ini: <strong>{state.jobs[0].applicationStatus}</strong>. Pantau
                perkembangan lengkap pada Progress Tracker.
              </p>
            </>
          )}
        </div>

        <button
          onClick={() =>
            navigate(
              !isProjectDone
                ? 'lab'
                : state.jobs[0].applicationStatus === 'Belum Dilamar'
                ? 'employer_connect'
                : 'tracker'
            )
          }
          className="shrink-0 px-5 py-3 rounded-xl bg-[#16A6A1] hover:bg-[#138f8a] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2"
        >
          {!isProjectDone
            ? 'Mulai Proyek Praktik'
            : state.jobs[0].applicationStatus === 'Belum Dilamar'
            ? 'Buka Employer Connect'
            : 'Lihat Progress Tracker'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            id: 'pathway',
            title: 'Career Pathway',
            sub: 'Cek kecocokan jabatan',
            icon: Compass
          },
          {
            id: 'skillbridge',
            title: 'Skill Bridge',
            sub: 'Tutup celah keterampilan',
            icon: BookOpen
          },
          {
            id: 'lab',
            title: 'Experience Lab',
            sub: 'Simulasi & bukti kerja',
            icon: FlaskConical
          },
          {
            id: 'passport',
            title: 'Transition Passport',
            sub: 'Portofolio tervalidasi',
            icon: Award
          }
        ].map((q) => {
          const Icon = q.icon;
          return (
            <button
              key={q.id}
              onClick={() => navigate(q.id)}
              className="p-4 rounded-2xl bg-white border border-[#E8EDF3] hover:border-[#16A6A1] text-left transition-all group"
            >
              <div className="w-9 h-9 rounded-xl bg-[#F7F9FC] group-hover:bg-teal-50 flex items-center justify-center mb-3">
                <Icon className="w-5 h-5 text-[#142D4E] group-hover:text-[#16A6A1]" />
              </div>
              <div className="font-bold text-sm text-[#142D4E]">{q.title}</div>
              <div className="text-xs text-slate-500 mt-0.5">{q.sub}</div>
            </button>
          );
        })}
      </div>

      {/* Recommended Careers & Recent Activity */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E8EDF3] p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-base text-[#142D4E]">Rekomendasi Jalur Karier</h2>
              <p className="text-xs text-slate-500">
                Dihitung berdasarkan kecocokan kompetensi & syarat jabatan (DEMO DATA)
              </p>
            </div>
            <button
              onClick={() => navigate('pathway')}
              className="text-xs font-semibold text-[#16A6A1] hover:underline"
            >
              Semua Jalur →
            </button>
          </div>

          <div className="space-y-3">
            {state.jobs.map((job) => {
              const match = calculateJobMatch(job);
              return (
                <div
                  key={job.id}
                  className="p-4 rounded-xl bg-[#F7F9FC] border border-[#E8EDF3] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#142D4E]">{job.title}</span>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                        Kecocokan {match}%
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      {job.company} • {job.location}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate('pathway')}
                    className="px-3.5 py-2 rounded-lg bg-white border border-[#E8EDF3] hover:border-[#142D4E] text-xs font-semibold text-[#142D4E] shrink-0"
                  >
                    Analisis Celah
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E8EDF3] p-5 space-y-4">
          <h2 className="font-bold text-base text-[#142D4E]">Aktivitas Terbaru</h2>
          <div className="space-y-3">
            {state.activities.slice(0, 5).map((act) => (
              <div key={act.id} className="flex items-start gap-3 text-xs">
                <div className="w-2 h-2 rounded-full bg-[#16A6A1] mt-1.5 shrink-0" />
                <div>
                  <p className="text-[#273444] font-medium leading-relaxed">{act.text}</p>
                  <span className="text-[11px] text-slate-400">{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// TAB 2: TRANSITION PROFILE (Pemetaan Kompetensi & Kesiapan Kerja)
// ============================================================================
function TransitionProfileTab({ user, skills, onSave, navigate }) {
  const [formData, setFormData] = useState({ ...user });
  const [localSkills, setLocalSkills] = useState(skills);

  useEffect(() => {
    setLocalSkills(skills);
  }, [skills]);

  const handleSelfLevelChange = (skillId, newLevel) => {
    setLocalSkills((prev) =>
      prev.map((s) => (s.id === skillId ? { ...s, selfLevel: Number(newLevel) } : s))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData, localSkills);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#16A6A1]">
            Fitur 1 • Pemetaan Awal
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-[#142D4E]">Transition Profile</h1>
          <p className="text-sm text-slate-600">
            Identifikasi profil kompetensi dan kesiapan kerja tanpa mengumpulkan data identitas
            sensitif (tanpa NIK/alamat rinci).
          </p>
        </div>
        <button
          onClick={() => navigate('pathway')}
          className="px-4 py-2.5 rounded-xl bg-white border border-[#E8EDF3] hover:border-[#142D4E] text-xs font-semibold text-[#142D4E] self-start"
        >
          Lihat Rekomendasi Karier →
        </button>
      </div>

      {/* Disclaimer Ethics Notice */}
      <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
        <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong>Catatan Prinsip Penilaian:</strong> Hasil pemetaan di bawah ini merupakan{' '}
          <strong>rekomendasi awal</strong> untuk membantu pendampingan, bukan keputusan otomatis
          mengenai kelayakan seseorang bekerja. Sistem membedakan secara tegas antara{' '}
          <em>Penilaian Mandiri (Self-declared)</em> dan <em>Kompetensi Tervalidasi</em>.
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-12 gap-6">
        {/* Left: Data Pengguna */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E8EDF3] p-5 space-y-4">
          <h2 className="font-bold text-base text-[#142D4E] border-b border-[#E8EDF3] pb-3">
            A. Data Profil Dasar (DEMO DATA)
          </h2>

          <div className="space-y-3 text-sm">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg border border-[#E8EDF3] focus:outline-none focus:border-[#16A6A1]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Usia</label>
                <input
                  type="number"
                  min="17"
                  max="30"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                  className="w-full px-3.5 py-2 rounded-lg border border-[#E8EDF3] focus:outline-none focus:border-[#16A6A1]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Domisili (Kota/Kab)
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-[#E8EDF3] focus:outline-none focus:border-[#16A6A1]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Pendidikan Terakhir & Jurusan
              </label>
              <input
                type="text"
                value={formData.education}
                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg border border-[#E8EDF3] focus:outline-none focus:border-[#16A6A1]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Status Pekerjaan Saat Ini
              </label>
              <select
                value={formData.employmentStatus}
                onChange={(e) => setFormData({ ...formData, employmentStatus: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg border border-[#E8EDF3] bg-white focus:outline-none focus:border-[#16A6A1]"
              >
                <option value="Belum mempunyai pekerjaan tetap (Pencari Kerja Pertama)">
                  Belum mempunyai pekerjaan tetap (Pencari Kerja Pertama)
                </option>
                <option value="Lulusan baru / Fresh graduate mencari kerja">
                  Lulusan baru / Fresh graduate mencari kerja
                </option>
                <option value="Pekerja informal / paruh waktu">
                  Pekerja informal / paruh waktu
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Pengalaman Kerja Formal
              </label>
              <input
                type="text"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg border border-[#E8EDF3] focus:outline-none focus:border-[#16A6A1]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Bidang Pekerjaan yang Diminati
              </label>
              <select
                value={formData.targetField}
                onChange={(e) => setFormData({ ...formData, targetField: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg border border-[#E8EDF3] bg-white focus:outline-none focus:border-[#16A6A1]"
              >
                <option value="Administrative Staff">Administrative Staff</option>
                <option value="Digital Marketing Assistant">Digital Marketing Assistant</option>
                <option value="Junior Data Analyst">Junior Data Analyst</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Hambatan Akses / Catatan Pendampingan (Opsional & Privat)
              </label>
              <textarea
                rows={2}
                value={formData.socioEconomicNote}
                onChange={(e) => setFormData({ ...formData, socioEconomicNote: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg border border-[#E8EDF3] text-xs focus:outline-none focus:border-[#16A6A1]"
              />
            </div>
          </div>
        </div>

        {/* Right: Asesmen Kompetensi & Visualisasi Perbandingan */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E8EDF3] p-5 space-y-5">
          <div className="border-b border-[#E8EDF3] pb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="font-bold text-base text-[#142D4E]">
                B. Asesmen Mandiri vs Kompetensi Tervalidasi
              </h2>
              <p className="text-xs text-slate-500">
                Sesuaikan tingkat kemampuan awal Anda (1 = Dasar, 2 = Menengah, 3 = Mahir)
              </p>
            </div>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-sm bg-slate-300 inline-block" /> Klaim Mandiri
              </span>
              <span className="flex items-center gap-1 text-teal-800 font-semibold">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#16A6A1] inline-block" /> Tervalidasi
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {localSkills.map((skill) => {
              const isValidated =
                skill.status === 'Mentor reviewed' || skill.status === 'Assessed';
              return (
                <div
                  key={skill.id}
                  className="p-4 rounded-xl bg-[#F7F9FC] border border-[#E8EDF3] space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="font-bold text-sm text-[#142D4E]">{skill.name}</div>
                      <div className="text-[11px] text-slate-500">
                        Kategori: {skill.category} • Sumber: {skill.source}
                      </div>
                    </div>
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${statusBadgeStyle(
                        skill.status
                      )}`}
                    >
                      {skill.status}
                    </span>
                  </div>

                  {/* Dual Visual Bars: Self vs Validated */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600">
                        Penilaian Mandiri: <strong>{levelLabel(skill.selfLevel)}</strong>
                      </span>
                      <div className="flex gap-1">
                        {[1, 2, 3].map((lvl) => (
                          <button
                            type="button"
                            key={lvl}
                            onClick={() => handleSelfLevelChange(skill.id, lvl)}
                            className={`px-2.5 py-1 rounded text-xs font-semibold border transition-colors ${
                              skill.selfLevel === lvl
                                ? 'bg-[#142D4E] text-white border-[#142D4E]'
                                : 'bg-white text-slate-600 border-[#E8EDF3] hover:bg-slate-100'
                            }`}
                          >
                            {lvl === 1 ? 'Dasar' : lvl === 2 ? 'Menengah' : 'Mahir'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-slate-400 transition-all"
                        style={{ width: `${(skill.selfLevel / 3) * 100}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-teal-800 font-medium">
                        Bukti Tervalidasi:{' '}
                        <strong>
                          {isValidated
                            ? levelLabel(skill.validatedLevel)
                            : 'Belum divalidasi praktik'}
                        </strong>
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#16A6A1] transition-all"
                        style={{
                          width: `${isValidated ? (skill.validatedLevel / 3) * 100 : 12}%`
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-slate-500">
              Menyimpan profil akan memperbarui Dashboard dan Career Pathway secara otomatis.
            </p>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#142D4E] hover:bg-[#1d3f6b] text-white text-sm font-semibold shadow-sm"
            >
              Simpan Profil & Pemetaan
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

// ============================================================================
// TAB 3: MARKET-MATCHED CAREER PATHWAY
// ============================================================================
function CareerPathwayTab({ jobs, skills, calculateJobMatch, onOpenJobModal, navigate }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#16A6A1]">
            Fitur 2 • Pencocokan Berbasis Kompetensi
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-[#142D4E]">
            Market-Matched Career Pathway
          </h1>
          <p className="text-sm text-slate-600">
            Rekomendasi jalur karier dihitung dari kombinasi profil kompetensi Anda dan persyaratan
            jabatan perusahaan (bukan sekadar minat).
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-200/70 text-slate-700 self-start">
          DEMO DATA • Bukan Lowongan Aktif
        </span>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {jobs.map((job) => {
          const matchScore = calculateJobMatch(job);
          const matchedSkills = [];
          const gapSkills = [];

          job.requiredSkills.forEach((req) => {
            const userSkill = skills.find((s) => s.id === req.skillId);
            const currentLvl = userSkill ? userSkill.validatedLevel : 0;
            const isValidated =
              userSkill &&
              (userSkill.status === 'Assessed' || userSkill.status === 'Mentor reviewed');

            if (currentLvl >= req.minLevel && isValidated) {
              matchedSkills.push(req.name);
            } else {
              gapSkills.push({
                name: req.name,
                reason: !isValidated
                  ? 'Baru klaim mandiri, perlu bukti praktik'
                  : `Tingkat saat ini (${levelLabel(currentLvl)}) di bawah syarat (${levelLabel(
                      req.minLevel
                    )})`
              });
            }
          });

          return (
            <div
              key={job.id}
              className="bg-white rounded-2xl border border-[#E8EDF3] p-5 flex flex-col justify-between space-y-5 shadow-sm"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-semibold text-[#16A6A1]">
                      {job.educationReq}
                    </span>
                    <h2 className="font-bold text-lg text-[#142D4E] mt-0.5">{job.title}</h2>
                    <p className="text-xs text-slate-500">{job.company}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xl font-extrabold text-[#142D4E]">{matchScore}%</div>
                    <div className="text-[10px] text-slate-500">Kecocokan</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#16A6A1] transition-all duration-500"
                    style={{ width: `${matchScore}%` }}
                  />
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{job.description}</p>

                {/* Matched vs Gap */}
                <div className="space-y-2.5 pt-2 border-t border-[#E8EDF3]">
                  <div>
                    <div className="text-[11px] font-bold text-emerald-700 uppercase">
                      Kompetensi Sudah Terbukti ({matchedSkills.length})
                    </div>
                    {matchedSkills.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {matchedSkills.map((m) => (
                          <span
                            key={m}
                            className="text-[11px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200"
                          >
                            ✓ {m}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 mt-1">
                        Belum ada kompetensi tervalidasi yang memenuhi standar penuh.
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="text-[11px] font-bold text-amber-800 uppercase">
                      Kesenjangan Kompetensi ({gapSkills.length})
                    </div>
                    {gapSkills.length > 0 ? (
                      <ul className="mt-1.5 space-y-1">
                        {gapSkills.map((g) => (
                          <li key={g.name} className="text-xs text-slate-600">
                            • <strong className="text-[#142D4E]">{g.name}:</strong> {g.reason}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-emerald-700 font-medium mt-1">
                        Seluruh kompetensi utama sudah tervalidasi!
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-3 border-t border-[#E8EDF3]">
                <button
                  onClick={() => onOpenJobModal(job, 'gap')}
                  className="w-full py-2.5 rounded-xl bg-[#142D4E] hover:bg-[#1d3f6b] text-white text-xs font-semibold transition-colors"
                >
                  Analisis Kesenjangan Kompetensi
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onOpenJobModal(job, 'detail')}
                    className="py-2 rounded-lg bg-[#F7F9FC] hover:bg-slate-200 text-[#142D4E] text-xs font-semibold"
                  >
                    Lihat Detail
                  </button>
                  <button
                    onClick={() => navigate('skillbridge')}
                    className="py-2 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs font-semibold"
                  >
                    Bangun Jalur Karier
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// TAB 4: SKILL BRIDGE (Pengembangan Keterampilan Terarah)
// ============================================================================
function SkillBridgeTab({ trainings, onOpenDetail, onComplete, navigate }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#16A6A1]">
            Fitur 3 • Peningkatan Keterampilan Terarah
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-[#142D4E]">Skill Bridge</h1>
          <p className="text-sm text-slate-600">
            Pelatihan direkomendasikan secara spesifik untuk menutup kesenjangan kompetensi sebelum
            Anda membuktikannya di Experience Lab.
          </p>
        </div>
        <button
          onClick={() => navigate('lab')}
          className="px-4 py-2.5 rounded-xl bg-[#16A6A1] text-white text-xs font-semibold self-start"
        >
          Lanjut ke Experience Lab →
        </button>
      </div>

      <div className="p-4 rounded-xl bg-white border border-[#E8EDF3] text-xs text-slate-600 flex items-start gap-3">
        <Info className="w-4 h-4 text-[#16A6A1] shrink-0 mt-0.5" />
        <div>
          <strong>Catatan Rujukan Ekosistem:</strong> Modul pelatihan pada Skill Bridge dapat
          dirujuk melalui mitra pelatihan vokasi seperti <strong>SkillHub</strong>,{' '}
          <strong>Balai Latihan Kerja (BLK)</strong>, atau <strong>LPK terverifikasi</strong>.
          Data di bawah adalah simulasi interaktif (bukan integrasi sistem pemerintah secara
          langsung).
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {trainings.map((tr) => (
          <div
            key={tr.id}
            className="bg-white rounded-2xl border border-[#E8EDF3] p-5 flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {tr.level}
                </span>
                <span
                  className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${statusBadgeStyle(
                    tr.status
                  )}`}
                >
                  {tr.status}
                </span>
              </div>

              <h2 className="font-bold text-base text-[#142D4E]">{tr.title}</h2>
              <div className="text-xs text-[#16A6A1] font-semibold">
                Target Kompetensi: {tr.competency}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{tr.outcome}</p>

              <div className="text-[11px] text-slate-500 space-y-1 pt-2 border-t border-[#E8EDF3]">
                <div>Durasi: {tr.duration}</div>
                <div>Metode: {tr.method}</div>
              </div>

              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Progres Modul</span>
                  <span className="font-bold text-[#142D4E]">{tr.progress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#16A6A1] transition-all duration-300"
                    style={{ width: `${tr.progress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-[#E8EDF3]">
              <button
                onClick={() => onOpenDetail(tr)}
                className="w-full py-2.5 rounded-xl bg-[#142D4E] hover:bg-[#1d3f6b] text-white text-xs font-semibold"
              >
                {tr.status === 'Selesai' ? 'Lihat Materi & Hasil' : 'Mulai Pembelajaran'}
              </button>
              {tr.status !== 'Selesai' && (
                <button
                  onClick={() => onComplete(tr.id)}
                  className="w-full py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold"
                >
                  Tandai Selesai (Simulasi)
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// TAB 5: EXPERIENCE & EVIDENCE LAB (INOVASI UTAMA PEMBUKTIAN KOMPETENSI)
// ============================================================================
function ExperienceLabTab({
  projects,
  onSelectProject,
  onSubmitProject,
  onSimulateEvaluation,
  navigate
}) {
  const [filterCategory, setFilterCategory] = useState('Semua');

  const filteredProjects =
    filterCategory === 'Semua'
      ? projects
      : projects.filter((p) => p.category === filterCategory);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#142D4E] text-white rounded-2xl p-6 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="px-2.5 py-1 rounded bg-[#16A6A1] text-white text-xs font-bold uppercase tracking-wider">
            Fitur Inovasi Utama #1
          </span>
          <button
            onClick={() => navigate('passport')}
            className="text-xs font-semibold text-teal-300 hover:underline flex items-center gap-1"
          >
            Lihat Dampak di Transition Passport →
          </button>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold">Experience & Evidence Lab</h1>
        <p className="text-xs sm:text-sm text-slate-200 max-w-3xl leading-relaxed">
          Ruang pembuktian kompetensi praktis bagi pencari kerja pertama. Setiap tugas simulasi
          yang diselesaikan dan dievaluasi mentor otomatis masuk ke{' '}
          <strong>Transition Passport</strong> sebagai bukti kemampuan tervalidasi.
        </p>

        {/* Ethical Guardrail */}
        <div className="p-3 rounded-xl bg-white/10 text-[11px] text-slate-200">
          <strong>Transparansi Status:</strong> Proyek di bawah ini adalah{' '}
          <em>Simulasi Praktik & Asesmen Berbasis Rubrik</em>, bukan klaim pengalaman kerja formal
          berbayar. Apabila terdapat proyek kolaboratif komersial, ketentuan perlindungan &
          kompensasi peserta dicantumkan secara eksplisit.
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap items-center gap-2">
        {['Semua', 'Industry-Based Project', 'Workplace Simulation', 'Skill Assessment'].map(
          (cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                filterCategory === cat
                  ? 'bg-[#142D4E] text-white border-[#142D4E]'
                  : 'bg-white text-slate-600 border-[#E8EDF3] hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          )
        )}
      </div>

      {/* Project Cards */}
      <div className="grid lg:grid-cols-3 gap-6">
        {filteredProjects.map((proj) => {
          const isFeatured = proj.id === 'proj-admin-data';
          return (
            <div
              key={proj.id}
              className={`bg-white rounded-2xl border p-5 flex flex-col justify-between space-y-5 ${
                isFeatured
                  ? 'border-[#16A6A1] ring-2 ring-[#16A6A1]/15 shadow-md'
                  : 'border-[#E8EDF3]'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold text-[#16A6A1] uppercase">
                    {proj.category}
                  </span>
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${statusBadgeStyle(
                      proj.status
                    )}`}
                  >
                    {proj.status}
                  </span>
                </div>

                <h2 className="font-bold text-lg text-[#142D4E]">{proj.title}</h2>
                <p className="text-xs text-slate-500">{proj.companyContext}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{proj.brief}</p>

                <div className="p-3 rounded-xl bg-[#F7F9FC] border border-[#E8EDF3] space-y-1.5 text-xs">
                  <div className="font-semibold text-[#142D4E]">Kompetensi yang Divalidasi:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.unlockedSkills.map((sk) => (
                      <span
                        key={sk}
                        className="px-2 py-0.5 rounded bg-white border border-[#E8EDF3] text-[11px] font-medium text-slate-700"
                      >
                        {sk === 'excel'
                          ? 'Microsoft Excel'
                          : sk === 'data_proc'
                          ? 'Pengolahan Data'
                          : sk === 'reporting'
                          ? 'Penyusunan Laporan'
                          : sk === 'comm'
                          ? 'Komunikasi Bisnis'
                          : 'Administrasi Dokumen'}
                      </span>
                    ))}
                  </div>
                  <div className="text-[11px] text-slate-500 pt-1">Evaluator: {proj.mentor}</div>
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-[#E8EDF3]">
                <button
                  onClick={() => onSelectProject(proj)}
                  className="w-full py-3 rounded-xl bg-[#142D4E] hover:bg-[#1d3f6b] text-white text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <FlaskConical className="w-4 h-4 text-[#16A6A1]" />
                  {proj.status === 'Lulus Asesmen Praktik'
                    ? 'Lihat Hasil Rubrik & Bukti'
                    : proj.status === 'Dalam Proses Review'
                    ? 'Lihat Status Review Mentor'
                    : 'Buka Workspace & Kerjakan'}
                </button>

                {proj.status === 'Dalam Proses Review' && (
                  <button
                    onClick={() => onSimulateEvaluation(proj.id)}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold"
                  >
                    Simulasikan Penilaian Mentor Sekarang →
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// TAB 6: TRANSITION PASSPORT (PUSAT INOVASI & BUKTI KOMPETENSI)
// ============================================================================
function TransitionPassportTab({
  state,
  metrics,
  onOpenPreview,
  onOpenShare,
  onUpdatePrivacy,
  navigate
}) {
  const { user, skills, projects, trainings } = state;
  const completedProjects = projects.filter((p) => p.status === 'Lulus Asesmen Praktik');
  const completedTrainings = trainings.filter((t) => t.status === 'Selesai');

  return (
    <div className="space-y-6">
      {/* Top Action Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-[#16A6A1] text-white text-[11px] font-bold uppercase">
              Pusat Inovasi YOUNOMY
            </span>
            <span className="text-xs text-slate-500">Portofolio Kompetensi Tervalidasi</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#142D4E] mt-1">
            Transition Passport
          </h1>
          <p className="text-sm text-slate-600">
            Rekam jejak bukti kompetensi praktis yang dapat diverifikasi perusahaan dengan kendali
            privasi penuh di tangan Anda.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={onOpenPreview}
            className="px-3.5 py-2.5 rounded-xl bg-white border border-[#E8EDF3] hover:border-[#142D4E] text-xs font-semibold text-[#142D4E] flex items-center gap-1.5"
          >
            <Eye className="w-4 h-4 text-[#16A6A1]" />
            Preview & Cetak PDF
          </button>
          <button
            onClick={onOpenShare}
            className="px-4 py-2.5 rounded-xl bg-[#16A6A1] hover:bg-[#138f8a] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
          >
            <Share2 className="w-4 h-4" />
            Share Passport
          </button>
          <button
            onClick={() => navigate('profile')}
            className="px-3.5 py-2.5 rounded-xl bg-[#142D4E] text-white text-xs font-semibold"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Main Digital Passport Document Card */}
      <div className="bg-white rounded-2xl border-2 border-[#142D4E]/15 shadow-md overflow-hidden">
        {/* Passport Identity Header */}
        <div className="bg-[#142D4E] text-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#16A6A1] text-white font-extrabold text-2xl flex items-center justify-center shrink-0 shadow">
              AP
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold">{user.name}</h2>
                <span className="px-2 py-0.5 rounded bg-white/15 text-[11px] font-semibold">
                  ID: YNM-2026-0841 (DEMO)
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200">
                {user.education} • {user.city}
              </p>
              <p className="text-xs text-teal-300 font-medium">
                Target Jalur Karier: {user.targetField} • Kesiapan Profil: {metrics.readiness}%
              </p>
            </div>
          </div>

          <button
            onClick={onOpenPreview}
            className="bg-white/10 hover:bg-white/20 p-3 rounded-xl flex items-center gap-3 text-left transition-colors self-start sm:self-center"
          >
            <QrCode className="w-10 h-10 text-teal-300 shrink-0" />
            <div className="text-[11px]">
              <div className="font-bold text-white">QR Verifikasi Demo</div>
              <div className="text-slate-300">Klik untuk tampilan publik</div>
            </div>
          </button>
        </div>

        {/* 4 Status Validation Legend */}
        <div className="bg-[#F7F9FC] px-6 py-3.5 border-b border-[#E8EDF3] flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="font-bold text-[#142D4E]">Keterangan Tingkat Validasi:</span>
          <div className="flex flex-wrap gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              1. Self-declared (Klaim Mandiri)
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
              2. Evidence submitted (Bukti Terkirim)
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
              3. Mentor reviewed (Ditinjau Mentor)
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              4. Assessed (Lulus Rubrik Praktik)
            </span>
          </div>
        </div>

        {/* Passport Body */}
        <div className="p-6 space-y-8">
          {/* Section B: Peta Kompetensi & Status Validasi */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-[#142D4E]">
                Matriks Kompetensi & Status Validasi
              </h3>
              <span className="text-xs text-slate-500">
                *Validasi mentor bukan pengganti sertifikasi profesi BNSP/resmi
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              {skills.map((s) => (
                <div
                  key={s.id}
                  className="p-4 rounded-xl border border-[#E8EDF3] bg-[#F7F9FC]/60 flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="font-bold text-sm text-[#142D4E]">{s.name}</div>
                    <div className="text-xs text-slate-600">
                      Tingkat Kemampuan:{' '}
                      <strong>
                        {levelLabel(
                          s.status === 'Assessed' || s.status === 'Mentor reviewed'
                            ? s.validatedLevel
                            : s.selfLevel
                        )}
                      </strong>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Sumber: {s.source} ({s.updatedAt})
                    </div>
                  </div>
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border shrink-0 ${statusBadgeStyle(
                      s.status
                    )}`}
                  >
                    {s.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section C & D: Bukti Keterampilan & Riwayat Proyek Praktik */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-[#142D4E]">
                Bukti Keterampilan & Evaluasi Proyek Praktik ({completedProjects.length})
              </h3>
              <button
                onClick={() => navigate('lab')}
                className="text-xs font-semibold text-[#16A6A1] hover:underline"
              >
                + Tambah Bukti di Experience Lab
              </button>
            </div>

            <div className="space-y-3">
              {completedProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/30 space-y-2"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-bold uppercase text-[#16A6A1]">
                        {proj.category}
                      </span>
                      <h4 className="font-bold text-sm text-[#142D4E]">{proj.title}</h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                      ✓ {proj.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700">
                    <strong>Kontribusi & Hasil:</strong> {proj.submission.summaryNote}
                  </p>
                  <div className="text-xs text-slate-600 bg-white p-3 rounded-lg border border-[#E8EDF3]">
                    <strong>Catatan Evaluator ({proj.mentor}):</strong> "
                    {proj.submission.mentorFeedback}"
                  </div>
                  <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span>Berkas Bukti: {proj.submission.fileName}</span>
                    <span>Tanggal Validasi: {proj.submission.submittedAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sertifikat Pelatihan Pendukung */}
          <div className="space-y-3">
            <h3 className="font-bold text-base text-[#142D4E]">
              Riwayat Pembelajaran Pendukung ({completedTrainings.length})
            </h3>
            {completedTrainings.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-3">
                {completedTrainings.map((t) => (
                  <div
                    key={t.id}
                    className="p-3.5 rounded-xl border border-[#E8EDF3] bg-[#F7F9FC] flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-xs text-[#142D4E]">{t.title}</div>
                      <div className="text-[11px] text-slate-500">{t.partnerNote}</div>
                    </div>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Selesai
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-[#F7F9FC] border border-[#E8EDF3] text-xs text-slate-500 flex items-center justify-between">
                <span>Belum ada modul Skill Bridge yang ditandai selesai.</span>
                <button
                  onClick={() => navigate('skillbridge')}
                  className="text-[#16A6A1] font-semibold hover:underline"
                >
                  Buka Skill Bridge →
                </button>
              </div>
            )}
          </div>

          {/* Privacy Consent Control Box */}
          <div className="p-4 rounded-xl bg-[#F7F9FC] border border-[#E8EDF3] space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#142D4E]">
              <Lock className="w-4 h-4 text-[#16A6A1]" />
              Kendali Privasi & Persetujuan Data (Dapat Dicabut Kapan Saja)
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
              {[
                { key: 'showCity', label: 'Tampilkan Kota Domisili' },
                { key: 'showEducation', label: 'Tampilkan Riwayat Pendidikan' },
                { key: 'showEvidence', label: 'Tampilkan Bukti Proyek Lab' },
                { key: 'showMentorNotes', label: 'Tampilkan Catatan Mentor' }
              ].map((item) => (
                <label
                  key={item.key}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-[#E8EDF3] cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={user.passportPrivacy[item.key]}
                    onChange={(e) =>
                      onUpdatePrivacy({
                        ...user.passportPrivacy,
                        [item.key]: e.target.checked
                      })
                    }
                    className="accent-[#16A6A1]"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// TAB 7: EMPLOYER CONNECT (Lowongan Terarah & Lamaran Berbasis Passport)
// ============================================================================
function EmployerConnectTab({
  jobs,
  skills,
  calculateJobMatch,
  onOpenJobModal,
  switchToEmployer
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredJobs = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#16A6A1]">
            Fitur 6 • Penghubung Pemberi Kerja
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-[#142D4E]">Employer Connect</h1>
          <p className="text-sm text-slate-600">
            Lamar posisi entry-level dengan melampirkan bukti kompetensi dari Transition Passport
            Anda.
          </p>
        </div>

        <button
          onClick={switchToEmployer}
          className="px-4 py-2.5 rounded-xl bg-[#142D4E] hover:bg-[#1d3f6b] text-white text-xs font-semibold flex items-center gap-2 self-start"
        >
          <Building2 className="w-4 h-4 text-[#16A6A1]" />
          Coba Sudut Pandang Perusahaan (Employer Demo)
        </button>
      </div>

      {/* Explicit Demo Warning */}
      <div className="p-3.5 rounded-xl bg-slate-100 border border-[#E8EDF3] text-xs text-slate-700 flex items-center justify-between gap-3">
        <span>
          <strong>Label Transparansi:</strong> Seluruh perusahaan dan peluang di bawah ini adalah{' '}
          <strong>DEMO DATA</strong> untuk simulasi alur lamaran dan penilaian kandidat.
        </span>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        <input
          type="text"
          placeholder="Cari posisi atau perusahaan mitra demonstrasi..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#E8EDF3] text-sm focus:outline-none focus:border-[#16A6A1]"
        />
      </div>

      {/* Job Listings */}
      <div className="space-y-4">
        {filteredJobs.map((job) => {
          const match = calculateJobMatch(job);
          const isApplied = job.applicationStatus !== 'Belum Dilamar';

          return (
            <div
              key={job.id}
              className="bg-white rounded-2xl border border-[#E8EDF3] p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-5"
            >
              <div className="space-y-2.5 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-bold">
                    Kecocokan Kompetensi: {match}%
                  </span>
                  <span className="text-xs text-slate-500">
                    {job.type} • {job.location}
                  </span>
                  {isApplied && (
                    <span
                      className={`px-2.5 py-0.5 rounded-full border text-xs font-semibold ${statusBadgeStyle(
                        job.applicationStatus
                      )}`}
                    >
                      Status: {job.applicationStatus}
                    </span>
                  )}
                </div>

                <h2 className="text-lg font-bold text-[#142D4E]">{job.title}</h2>
                <div className="text-xs font-semibold text-slate-600">{job.company}</div>
                <p className="text-xs text-slate-600 leading-relaxed">{job.description}</p>

                {job.employerNote && (
                  <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-900">
                    <strong>Pesan dari Perusahaan (Demo):</strong> {job.employerNote}
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {job.requiredSkills.map((req) => {
                    const userSkill = skills.find((s) => s.id === req.skillId);
                    const ok =
                      userSkill &&
                      (userSkill.status === 'Assessed' || userSkill.status === 'Mentor reviewed');
                    return (
                      <span
                        key={req.skillId}
                        className={`text-[11px] px-2.5 py-0.5 rounded-md border ${
                          ok
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-slate-50 text-slate-600 border-slate-200'
                        }`}
                      >
                        {ok ? '✓ ' : '○ '}
                        {req.name}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
                <button
                  onClick={() => onOpenJobModal(job, 'apply')}
                  className={`px-5 py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 ${
                    isApplied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#16A6A1] hover:bg-[#138f8a] text-white shadow-sm'
                  }`}
                >
                  {isApplied ? 'Lamaran Terkirim (Lihat Ringkasan)' : 'Apply dengan Passport'}
                </button>
                <button
                  onClick={() => onOpenJobModal(job, 'detail')}
                  className="px-5 py-2.5 rounded-xl bg-[#F7F9FC] hover:bg-slate-200 text-[#142D4E] text-xs font-semibold"
                >
                  Detail Posisi & Alasan Kecocokan
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// TAB 8: PROGRESS TRACKER (Pemantauan Transisi hingga Pasca-Penempatan)
// ============================================================================
function ProgressTrackerTab({ state, metrics, onUpdatePostPlacement }) {
  const { user, projects, jobs, postPlacement } = state;
  const adminProjectDone = projects.some((p) => p.status === 'Lulus Asesmen Praktik');
  const anyApplied = jobs.some((j) => j.applicationStatus !== 'Belum Dilamar');
  const anyInterviewOrAccepted =
    jobs.some(
      (j) => j.applicationStatus === 'Interview Invitation' || j.applicationStatus === 'Accepted'
    ) || postPlacement.hired;

  const milestones = [
    { step: 1, title: 'Profil kompetensi selesai', done: user.assessmentCompleted },
    { step: 2, title: 'Jalur karier ditentukan', done: Boolean(user.targetField) },
    {
      step: 3,
      title: 'Pelatihan terarah dijalankan',
      done: metrics.completedTrainingsCount > 0 || adminProjectDone
    },
    { step: 4, title: 'Proyek praktik dikirim', done: adminProjectDone },
    { step: 5, title: 'Kompetensi divalidasi mentor', done: metrics.validatedCount >= 3 },
    { step: 6, title: 'Transition Passport siap dibagikan', done: metrics.validatedCount >= 2 },
    { step: 7, title: 'Lamaran dikirim ke perusahaan', done: anyApplied },
    {
      step: 8,
      title: 'Undangan wawancara / mendapatkan pekerjaan',
      done: anyInterviewOrAccepted
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#16A6A1]">
          Fitur 7 • Pemantauan Perjalanan
        </span>
        <h1 className="text-xl sm:text-2xl font-bold text-[#142D4E]">Progress Tracker</h1>
        <p className="text-sm text-slate-600">
          Pantau seluruh tahapan transisi dari pemetaan kompetensi awal hingga kesiapan kerja.
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: 'Skill Tervalidasi', val: metrics.validatedCount },
          { label: 'Proyek Selesai', val: metrics.completedProjectsCount },
          { label: 'Modul Selesai', val: metrics.completedTrainingsCount },
          { label: 'Lamaran Terkirim', val: metrics.submittedAppsCount },
          { label: 'Undangan Wawancara', val: metrics.interviewsCount },
          {
            label: 'Status Transisi',
            val: postPlacement.hired ? 'Bekerja (Demo)' : 'Dalam Proses'
          }
        ].map((st) => (
          <div key={st.label} className="bg-white p-4 rounded-2xl border border-[#E8EDF3]">
            <div className="text-[11px] text-slate-500">{st.label}</div>
            <div className="text-lg font-extrabold text-[#142D4E] mt-1">{st.val}</div>
          </div>
        ))}
      </div>

      {/* 8-Step Timeline */}
      <div className="bg-white rounded-2xl border border-[#E8EDF3] p-5 sm:p-6 space-y-4">
        <h2 className="font-bold text-base text-[#142D4E]">
          Peta Perjalanan Transisi Menuju Pekerjaan Pertama
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {milestones.map((m) => (
            <div
              key={m.step}
              className={`p-4 rounded-xl border ${
                m.done
                  ? 'bg-emerald-50/50 border-emerald-200'
                  : 'bg-[#F7F9FC] border-[#E8EDF3] opacity-80'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500">Tahap {m.step}</span>
                {m.done ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Clock className="w-4 h-4 text-slate-400" />
                )}
              </div>
              <div className="font-bold text-xs text-[#142D4E] leading-snug">{m.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Post-Placement Retention & Adaptation Monitoring (Hari ke-30, 90, 180) */}
      <div className="bg-white rounded-2xl border border-[#E8EDF3] p-5 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-bold text-base text-[#142D4E]">
              Pemantauan Adaptasi Pasca-Penempatan (Hari ke-30, 90, 180)
            </h2>
            <p className="text-xs text-slate-500">
              Aktifkan simulasi jika pengguna telah memperoleh pekerjaan pertama untuk memantau
              keberlanjutan kerja.
            </p>
          </div>
          <button
            onClick={() => onUpdatePostPlacement({ hired: !postPlacement.hired })}
            className={`px-4 py-2 rounded-xl text-xs font-semibold ${
              postPlacement.hired
                ? 'bg-emerald-600 text-white'
                : 'bg-[#142D4E] text-white hover:bg-[#1d3f6b]'
            }`}
          >
            {postPlacement.hired
              ? '✓ Mode Bekerja Aktif (Klik untuk Nonaktifkan)'
              : 'Simulasikan Memperoleh Pekerjaan'}
          </button>
        </div>

        {postPlacement.hired ? (
          <div className="space-y-4 pt-2 border-t border-[#E8EDF3]">
            <div className="flex gap-2">
              {['Hari ke-30', 'Hari ke-90', 'Hari ke-180'].map((ms) => (
                <button
                  key={ms}
                  onClick={() => onUpdatePostPlacement({ milestone: ms })}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border ${
                    postPlacement.milestone === ms
                      ? 'bg-[#16A6A1] text-white border-[#16A6A1]'
                      : 'bg-[#F7F9FC] text-slate-700 border-[#E8EDF3]'
                  }`}
                >
                  {ms}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-600 mb-1">
                  Kesesuaian Pekerjaan dengan Kompetensi
                </label>
                <input
                  type="text"
                  value={postPlacement.jobFitRating}
                  onChange={(e) => onUpdatePostPlacement({ jobFitRating: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#E8EDF3]"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-600 mb-1">
                  Perkembangan Tanggung Jawab Kerja
                </label>
                <input
                  type="text"
                  value={postPlacement.responsibilityGrowth}
                  onChange={(e) =>
                    onUpdatePostPlacement({ responsibilityGrowth: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[#E8EDF3]"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block font-semibold text-slate-600 mb-1">
                  Catatan Perubahan Penghasilan (Sukarela & Privat — Data Input Pengguna, Bukan
                  Klaim Dampak Otomatis)
                </label>
                <input
                  type="text"
                  value={postPlacement.incomeChangePrivate}
                  onChange={(e) =>
                    onUpdatePostPlacement({ incomeChangePrivate: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[#E8EDF3] bg-[#F7F9FC]"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-[#F7F9FC] text-xs text-slate-500">
            Pemantauan hari ke-30, ke-90, dan ke-180 akan muncul setelah Anda menandai status
            pekerjaan pertama dalam simulasi.
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// TAB 9: TRANSITION NAVIGATOR (Pendampingan Mentor & Akses Inklusif)
// ============================================================================
function TransitionNavigatorTab({ consultations, onAddConsultation }) {
  const [topic, setTopic] = useState('Persiapan Wawancara Berbasis Portofolio');
  const [issue, setIssue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!issue.trim()) return;
    onAddConsultation(topic, issue);
    setIssue('');
  };

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#16A6A1]">
          Fitur Pendukung • Pendampingan Manusiawi
        </span>
        <h1 className="text-xl sm:text-2xl font-bold text-[#142D4E]">Transition Navigator</h1>
        <p className="text-sm text-slate-600">
          Layanan konsultasi mentor bagi pencari kerja pertama yang membutuhkan arahan portofolio,
          wawancara, maupun pendampingan aksesibilitas/literasi digital.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Form Pengajuan Konsultasi */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E8EDF3] p-5 space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-[#E8EDF3]">
            <div className="w-11 h-11 rounded-full bg-[#142D4E] text-white font-bold flex items-center justify-center">
              RW
            </div>
            <div>
              <div className="font-bold text-sm text-[#142D4E]">Rina Wijaya, S.E.</div>
              <div className="text-xs text-slate-500">
                Mentor Transisi Administrasi & Karier (DEMO)
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-600 mb-1">Topik Pendampingan</label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#E8EDF3] bg-white"
              >
                <option value="Persiapan Wawancara Berbasis Portofolio">
                  Persiapan Wawancara Berbasis Portofolio
                </option>
                <option value="Penyesuaian Transition Passport dengan Lowongan">
                  Penyesuaian Transition Passport dengan Lowongan
                </option>
                <option value="Bantuan Aksesibilitas / Koneksi Terbatas">
                  Bantuan Aksesibilitas / Koneksi Terbatas (Pendampingan Offline/Low-Bandwidth)
                </option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-600 mb-1">
                Ceritakan Kendala yang Dihadapi
              </label>
              <textarea
                rows={4}
                required
                placeholder="Contoh: Saya sudah memiliki 2 bukti proyek, bagaimana cara menjelaskannya saat HR menanyakan pengalaman kerja?"
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#E8EDF3]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#16A6A1] hover:bg-[#138f8a] text-white font-semibold flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Ajukan Konsultasi
            </button>
          </form>
        </div>

        {/* Riwayat & Skenario Rekomendasi Mentor */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="font-bold text-base text-[#142D4E]">
            Riwayat & Rekomendasi Pendampingan
          </h2>
          {consultations.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-2xl border border-[#E8EDF3] p-5 space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-bold text-sm text-[#142D4E]">{c.topic}</span>
                <span
                  className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${statusBadgeStyle(
                    c.status
                  )}`}
                >
                  {c.status} • {c.date}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#F7F9FC] text-xs text-slate-700">
                <strong>Kendala Peserta:</strong> "{c.issue}"
              </div>

              <div className="space-y-1.5">
                <div className="text-xs font-bold text-[#16A6A1]">
                  Rekomendasi Langkah dari {c.mentorName}:
                </div>
                <ul className="space-y-1 text-xs text-slate-600">
                  {c.recommendations.map((rec, i) => (
                    <li key={i}>• {rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// TAB 10: PENGATURAN PROFIL, PRIVASI & RESET DEMO
// ============================================================================
function SettingsTab({ user, onUpdatePrivacy, onResetDemo }) {
  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#142D4E]">
          Pengaturan Privasi, Etika & Reset Demo
        </h1>
        <p className="text-sm text-slate-600">
          Kelola persetujuan pembagian data dan kontrol simulasi prototipe.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-[#E8EDF3] p-5 space-y-4">
        <h2 className="font-bold text-base text-[#142D4E]">Perlindungan Data Pemuda Rentan</h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          YOUNOMY tidak menyimpan NIK, alamat rumah rinci, maupun rekam medis/finansial sensitif.
          Anda memegang kendali penuh untuk membuka atau mencabut izin informasi yang tampil pada
          Transition Passport.
        </p>

        <div className="space-y-2 text-xs">
          {[
            { key: 'showCity', label: 'Izinkan perusahaan melihat Domisili Kabupaten/Kota' },
            { key: 'showEducation', label: 'Izinkan perusahaan melihat Pendidikan Terakhir' },
            {
              key: 'showSelfDeclared',
              label: 'Tampilkan kompetensi yang masih berstatus Self-declared'
            },
            {
              key: 'showEvidence',
              label: 'Tampilkan berkas hasil proyek dari Experience & Evidence Lab'
            },
            { key: 'showMentorNotes', label: 'Tampilkan catatan evaluasi mentor' }
          ].map((item) => (
            <label
              key={item.key}
              className="flex items-center justify-between p-3 rounded-xl bg-[#F7F9FC] border border-[#E8EDF3] cursor-pointer"
            >
              <span className="font-medium text-[#142D4E]">{item.label}</span>
              <input
                type="checkbox"
                checked={user.passportPrivacy[item.key]}
                onChange={(e) =>
                  onUpdatePrivacy({
                    ...user.passportPrivacy,
                    [item.key]: e.target.checked
                  })
                }
                className="w-4 h-4 accent-[#16A6A1]"
              />
            </label>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E8EDF3] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-sm text-[#142D4E]">Reset Data Demonstrasi</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Kembalikan progres Andi Pratama ke kondisi awal untuk demonstrasi ulang di hadapan
            juri.
          </p>
        </div>
        <button
          onClick={onResetDemo}
          className="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold flex items-center gap-2 shrink-0"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Semua Data Demo
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// EMPLOYER PORTAL VIEW (Fitur 8 — Sudut Pandang Perusahaan / HR)
// ============================================================================
function EmployerPortalView({
  state,
  setState,
  metrics,
  calculateJobMatch,
  handleEmployerDecision,
  selectedCandidateModal,
  setSelectedCandidateModal,
  notify,
  toast,
  resetDemo
}) {
  const [newJobTitle, setNewJobTitle] = useState('');
  const [newJobDesc, setNewJobDesc] = useState('');
  const [newJobSkill, setNewJobSkill] = useState('Microsoft Excel & Spreadsheet');

  const andiMatch = calculateJobMatch(state.jobs[0]);
  const andiCandidate = {
    id: 'andi',
    name: `${state.user.name} (DEMO DATA)`,
    age: state.user.age,
    education: state.user.education,
    city: state.user.passportPrivacy.showCity ? state.user.city : 'Disembunyikan oleh Kandidat',
    targetField: state.user.targetField,
    matchScore: andiMatch,
    validatedCount: metrics.validatedCount,
    projectsCount: metrics.completedProjectsCount,
    passportStatus:
      metrics.completedProjectsCount >= 2 ? 'Verified Portfolio Ready' : 'Active Builder',
    summary:
      'Lulusan SMK Administrasi Perkantoran dengan bukti proyek praktik terdokumentasi di YOUNOMY Experience Lab.',
    skills: state.skills
      .filter((s) => state.user.passportPrivacy.showSelfDeclared || s.status !== 'Self-declared')
      .map((s) => ({
        name: s.name,
        level: levelLabel(
          s.status === 'Assessed' || s.status === 'Mentor reviewed'
            ? s.validatedLevel
            : s.selfLevel
        ),
        status: s.status
      })),
    evidence: state.projects
      .filter((p) => p.status === 'Lulus Asesmen Praktik')
      .map((p) => ({
        title: p.title,
        mentor: p.mentor,
        result: p.status,
        notes: state.user.passportPrivacy.showMentorNotes
          ? p.submission.mentorFeedback
          : 'Catatan mentor dibatasi privasi kandidat.'
      })),
    applicationStatus: state.jobs[0].applicationStatus
  };

  const allCandidates = [andiCandidate, ...OTHER_DEMO_CANDIDATES];

  const handleCreateCustomJob = (e) => {
    e.preventDefault();
    if (!newJobTitle.trim()) return;
    setState((prev) => ({
      ...prev,
      employerState: {
        ...prev.employerState,
        customJobs: [
          {
            id: `cjob-${Date.now()}`,
            title: newJobTitle,
            desc: newJobDesc,
            skill: newJobSkill
          },
          ...prev.employerState.customJobs
        ]
      }
    }));
    setNewJobTitle('');
    setNewJobDesc('');
    notify('Kebutuhan pekerjaan demonstrasi berhasil dibuat & dicocokkan dengan kandidat!');
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#273444]">
      {/* Employer Top Bar */}
      <div className="bg-[#142D4E] text-white px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#16A6A1] flex items-center justify-center font-bold">
            Y
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm sm:text-base">
                YOUNOMY Employer Portal
              </span>
              <span className="px-2 py-0.5 rounded bg-white/15 text-[10px] font-bold uppercase">
                Employer Demo
              </span>
            </div>
            <div className="text-[11px] text-slate-300">
              PT Sentra Distribusi Mandiri (DEMO DATA) • Rekrutmen Berbasis Bukti Kompetensi
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setState((prev) => ({ ...prev, viewMode: 'seeker' }))}
            className="px-3.5 py-2 rounded-xl bg-[#16A6A1] hover:bg-[#138f8a] text-white text-xs font-semibold"
          >
            ← Kembali ke Akun Pencari Kerja (Andi)
          </button>
          <button
            onClick={resetDemo}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"
            title="Reset Demo"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Employer Sub-Navigation */}
      <div className="bg-white border-b border-[#E8EDF3] px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex gap-4 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview & Candidate Matching' },
            { id: 'builder', label: 'Job Requirement Builder' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setState((prev) => ({ ...prev, employerTab: t.id }))}
              className={`py-3.5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap ${
                state.employerTab === t.id
                  ? 'border-[#16A6A1] text-[#142D4E]'
                  : 'border-transparent text-slate-500 hover:text-[#142D4E]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
        {state.employerTab === 'overview' ? (
          <>
            {/* Overview Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-[#E8EDF3]">
                <div className="text-xs text-slate-500">Kandidat Demonstrasi</div>
                <div className="text-2xl font-extrabold text-[#142D4E] mt-1">
                  {allCandidates.length}
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-[#E8EDF3]">
                <div className="text-xs text-slate-500">Memiliki Transition Passport</div>
                <div className="text-2xl font-extrabold text-[#16A6A1] mt-1">100%</div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-[#E8EDF3]">
                <div className="text-xs text-slate-500">Shortlisted</div>
                <div className="text-2xl font-extrabold text-[#142D4E] mt-1">
                  {state.employerState.shortlistedIds.length}
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-[#E8EDF3]">
                <div className="text-xs text-slate-500">Undangan Wawancara</div>
                <div className="text-2xl font-extrabold text-emerald-600 mt-1">
                  {state.employerState.interviewInvitedIds.length}
                </div>
              </div>
            </div>

            {/* Candidate Explorer & Matching */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="font-bold text-lg text-[#142D4E]">
                    Candidate Explorer & Matching (Posisi: Junior Administrative Staff)
                  </h2>
                  <p className="text-xs text-slate-500">
                    Kandidat diurutkan berdasarkan bukti kompetensi tervalidasi, bukan sekadar
                    lamanya pengalaman kerja formal.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {allCandidates.map((cand) => {
                  const isAndi = cand.id === 'andi';
                  return (
                    <div
                      key={cand.id}
                      className={`bg-white rounded-2xl border p-5 space-y-4 ${
                        isAndi ? 'border-[#16A6A1] shadow-sm' : 'border-[#E8EDF3]'
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-bold text-base text-[#142D4E]">{cand.name}</h3>
                            <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-bold">
                              Kecocokan {cand.matchScore}%
                            </span>
                            {isAndi && (
                              <span
                                className={`px-2.5 py-0.5 rounded-full border text-xs font-semibold ${statusBadgeStyle(
                                  cand.applicationStatus
                                )}`}
                              >
                                Status Lamaran: {cand.applicationStatus}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500">
                            {cand.education} • {cand.city} • {cand.validatedCount} Kompetensi
                            Tervalidasi • {cand.projectsCount} Bukti Proyek
                          </p>
                          <p className="text-xs text-slate-600 pt-1">{cand.summary}</p>
                        </div>

                        <div className="flex flex-wrap gap-2 shrink-0">
                          <button
                            onClick={() => setSelectedCandidateModal(cand)}
                            className="px-3.5 py-2 rounded-xl bg-[#142D4E] text-white text-xs font-semibold"
                          >
                            View Transition Passport
                          </button>
                          {isAndi && (
                            <>
                              <button
                                onClick={() => handleEmployerDecision('shortlist')}
                                className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-semibold"
                              >
                                Shortlist
                              </button>
                              <button
                                onClick={() => handleEmployerDecision('interview')}
                                className="px-3.5 py-2 rounded-xl bg-[#16A6A1] hover:bg-[#138f8a] text-white text-xs font-semibold"
                              >
                                Invite Interview
                              </button>
                              <button
                                onClick={() => handleEmployerDecision('reject')}
                                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700 text-xs font-semibold"
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Explanation of Match */}
                      <div className="p-3 rounded-xl bg-[#F7F9FC] border border-[#E8EDF3] text-xs text-slate-600">
                        <strong className="text-[#142D4E]">Alasan Rekomendasi Sistem:</strong>{' '}
                        Kandidat memiliki {cand.projectsCount} bukti proyek praktik tervalidasi
                        yang relevan dengan administrasi dokumen dan pengolahan spreadsheet.
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          /* Job Requirement Builder */
          <div className="grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 bg-white rounded-2xl border border-[#E8EDF3] p-5 space-y-4">
              <h2 className="font-bold text-base text-[#142D4E]">
                Job Requirement Builder (DEMO DATA)
              </h2>
              <form onSubmit={handleCreateCustomJob} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Nama Jabatan</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Staf Administrasi Gudang"
                    value={newJobTitle}
                    onChange={(e) => setNewJobTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#E8EDF3]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">
                    Kompetensi Praktis Utama yang Dibutuhkan
                  </label>
                  <select
                    value={newJobSkill}
                    onChange={(e) => setNewJobSkill(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#E8EDF3] bg-white"
                  >
                    <option value="Microsoft Excel & Spreadsheet">
                      Microsoft Excel & Spreadsheet
                    </option>
                    <option value="Pengolahan & Klasifikasi Data">
                      Pengolahan & Klasifikasi Data
                    </option>
                    <option value="Administrasi & Pengarsipan Dokumen">
                      Administrasi & Pengarsipan Dokumen
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">
                    Deskripsi Tugas Singkat
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Jelaskan tugas harian tanpa mensyaratkan pengalaman kerja bertahun-tahun..."
                    value={newJobDesc}
                    onChange={(e) => setNewJobDesc(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#E8EDF3]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#142D4E] text-white font-semibold"
                >
                  Simpan Kebutuhan Pekerjaan Demo
                </button>
              </form>
            </div>

            <div className="lg:col-span-6 bg-white rounded-2xl border border-[#E8EDF3] p-5 space-y-3">
              <h2 className="font-bold text-base text-[#142D4E]">
                Kebutuhan Aktif Perusahaan (DEMO DATA)
              </h2>
              <div className="p-4 rounded-xl bg-[#F7F9FC] border border-[#E8EDF3] text-xs space-y-1">
                <div className="font-bold text-[#142D4E]">Junior Administrative Staff</div>
                <p className="text-slate-600">
                  Syarat Utama: Bukti pengolahan data spreadsheet & laporan administrasi.
                </p>
              </div>
              {state.employerState.customJobs.map((cj) => (
                <div
                  key={cj.id}
                  className="p-4 rounded-xl bg-teal-50/50 border border-teal-200 text-xs space-y-1"
                >
                  <div className="font-bold text-[#142D4E]">{cj.title}</div>
                  <div className="text-teal-800 font-medium">Kompetensi: {cj.skill}</div>
                  <p className="text-slate-600">{cj.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Candidate Transition Passport Detail Modal */}
      {selectedCandidateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5">
            <div className="flex items-start justify-between border-b border-[#E8EDF3] pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase text-[#16A6A1]">
                  Tinjauan Transition Passport Kandidat
                </span>
                <h3 className="text-lg font-bold text-[#142D4E]">
                  {selectedCandidateModal.name}
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedCandidateModal.education} • {selectedCandidateModal.city}
                </p>
              </div>
              <button
                onClick={() => setSelectedCandidateModal(null)}
                className="p-1.5 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase text-slate-500">
                Kompetensi yang Dibagikan Kandidat
              </h4>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {selectedCandidateModal.skills.map((sk, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#F7F9FC] border border-[#E8EDF3] flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-[#142D4E]">{sk.name}</div>
                      <div className="text-slate-500">Tingkat: {sk.level}</div>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full border text-[10px] font-semibold ${statusBadgeStyle(
                        sk.status
                      )}`}
                    >
                      {sk.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase text-slate-500">
                Bukti Proyek Praktik & Evaluasi Mentor
              </h4>
              {selectedCandidateModal.evidence.map((ev, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-200 text-xs space-y-1.5"
                >
                  <div className="font-bold text-[#142D4E]">{ev.title}</div>
                  <div className="text-emerald-700 font-semibold">{ev.result}</div>
                  <p className="text-slate-600">{ev.notes}</p>
                  <div className="text-[11px] text-slate-500">Evaluator: {ev.mentor}</div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#E8EDF3] flex justify-end gap-2">
              {selectedCandidateModal.id === 'andi' && (
                <button
                  onClick={() => {
                    handleEmployerDecision('interview');
                    setSelectedCandidateModal(null);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#16A6A1] text-white text-xs font-semibold"
                >
                  Kirim Undangan Wawancara Demo
                </button>
              )}
              <button
                onClick={() => setSelectedCandidateModal(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 text-xs font-semibold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 right-4 left-4 sm:left-auto sm:w-96 z-50 bg-[#142D4E] text-white px-4 py-3 rounded-xl shadow-lg flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#16A6A1] shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed flex-1">{toast.message}</div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// MODAL COMPONENTS
// ============================================================================

// 1. Project Workspace Modal (Experience & Evidence Lab)
function ProjectWorkspaceModal({ project, onClose, onSubmit, onSimulateEval, onGoToPassport }) {
  const [fileName, setFileName] = useState(
    project.submission.fileName || 'Laporan_Administrasi_Pengiriman_AndiPratama.xlsx'
  );
  const [summaryNote, setSummaryNote] = useState(
    project.submission.summaryNote ||
      'Telah membersihkan 120 baris data pengiriman cabang, mengelompokkan status Terkirim/Tertunda/Retur menggunakan fungsi SUMIFS & COUNTIF, serta menyusun ringkasan laporan 1 halaman.'
  );

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(project.id, fileName, summaryNote);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5">
        <div className="flex items-start justify-between border-b border-[#E8EDF3] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase text-[#16A6A1]">
                {project.category}
              </span>
              <span
                className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${statusBadgeStyle(
                  project.status
                )}`}
              >
                {project.status}
              </span>
            </div>
            <h3 className="text-xl font-bold text-[#142D4E] mt-1">{project.title}</h3>
            <p className="text-xs text-slate-500">{project.companyContext}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Brief & Instructions */}
        <div className="grid md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-[#F7F9FC] border border-[#E8EDF3] space-y-2">
            <div className="font-bold text-[#142D4E]">Brief & Tujuan Tugas</div>
            <p className="text-slate-600 leading-relaxed">{project.brief}</p>
            <ul className="space-y-1 text-slate-700 pt-1">
              {project.objectives.map((o, i) => (
                <li key={i}>• {o}</li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-[#F7F9FC] border border-[#E8EDF3] space-y-2">
            <div className="font-bold text-[#142D4E]">Rubrik Penilaian Mentor</div>
            <div className="space-y-1.5">
              {project.criteria.map((c, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded border border-[#E8EDF3]"
                >
                  <span>
                    {c.name} ({c.weight})
                  </span>
                  <span className="font-bold text-[#16A6A1]">{c.score || 'Menunggu'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Submission or Evaluation Result */}
        {project.status === 'Lulus Asesmen Praktik' ? (
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3 text-xs">
            <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Lulus Asesmen Praktik — Bukti Masuk ke Transition Passport!
            </div>
            <p className="text-emerald-900">
              <strong>Umpan Balik Evaluator ({project.mentor}):</strong> "
              {project.submission.mentorFeedback}"
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={onGoToPassport}
                className="px-5 py-2.5 rounded-xl bg-[#142D4E] text-white font-semibold"
              >
                Lihat Bukti di Transition Passport →
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-white border border-emerald-200 text-emerald-900 font-semibold"
              >
                Tutup
              </button>
            </div>
          </div>
        ) : project.status === 'Dalam Proses Review' ? (
          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-3 text-xs">
            <div className="font-bold text-amber-900 text-sm">
              Pekerjaan Terkirim — Menunggu Penilaian Mentor
            </div>
            <p className="text-amber-800">
              Berkas <strong>{project.submission.fileName}</strong> sedang ditinjau menggunakan
              rubrik praktik. Untuk demonstrasi, Anda dapat langsung menjalankan hasil evaluasi
              mentor di bawah ini.
            </p>
            <button
              onClick={() => onSimulateEval(project.id)}
              className="px-5 py-2.5 rounded-xl bg-[#16A6A1] hover:bg-[#138f8a] text-white font-semibold"
            >
              Simulasikan Hasil Evaluasi Mentor (Lulus) →
            </button>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-3 text-xs border-t border-[#E8EDF3] pt-4">
            <div className="font-bold text-sm text-[#142D4E]">
              Kirim Hasil Pekerjaan Praktik (Simulasi Upload)
            </div>
            <div>
              <label className="block font-semibold text-slate-600 mb-1">
                Nama Berkas / Tautan Hasil Kerja
              </label>
              <input
                type="text"
                required
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#E8EDF3]"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-600 mb-1">
                Ringkasan Pengerjaan & Metode yang Digunakan
              </label>
              <textarea
                rows={3}
                required
                value={summaryNote}
                onChange={(e) => setSummaryNote(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#E8EDF3]"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-100 font-semibold"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#16A6A1] hover:bg-[#138f8a] text-white font-semibold flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Submit Project
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// 2. Job Action Modal (Detail, Gap Analysis, & Consent-based Application)
function JobActionModal({
  modalData,
  user,
  skills,
  matchScore,
  onClose,
  onApply,
  onGoToLab,
  onGoToSkillBridge
}) {
  const { job, mode } = modalData;
  const [consentChecked, setConsentChecked] = useState(true);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5">
        <div className="flex items-start justify-between border-b border-[#E8EDF3] pb-4">
          <div>
            <span className="text-xs font-bold text-[#16A6A1]">
              {mode === 'apply'
                ? 'Konfirmasi Berbagi Transition Passport'
                : mode === 'gap'
                ? 'Analisis Kesenjangan Kompetensi'
                : 'Detail Posisi (DEMO DATA)'}
            </span>
            <h3 className="text-lg font-bold text-[#142D4E] mt-0.5">{job.title}</h3>
            <p className="text-xs text-slate-500">
              {job.company} • Kecocokan Kompetensi: {matchScore}%
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Competency Comparison Table */}
        <div className="space-y-2.5">
          <div className="text-xs font-bold text-[#142D4E]">
            Perbandingan Syarat Pekerjaan vs Kompetensi Anda:
          </div>
          {job.requiredSkills.map((req) => {
            const us = skills.find((s) => s.id === req.skillId);
            const isValidated = us && (us.status === 'Assessed' || us.status === 'Mentor reviewed');
            return (
              <div
                key={req.skillId}
                className="p-3 rounded-xl bg-[#F7F9FC] border border-[#E8EDF3] flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-[#142D4E]">{req.name}</div>
                  <div className="text-slate-500">
                    Syarat: {levelLabel(req.minLevel)} • Status Anda:{' '}
                    {us ? `${levelLabel(us.validatedLevel)} (${us.status})` : 'Belum ada'}
                  </div>
                </div>
                {isValidated && us.validatedLevel >= req.minLevel ? (
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                    Sesuai
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 font-semibold border border-amber-200">
                    Perlu Bukti
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Tasks */}
        <div className="text-xs space-y-1.5">
          <div className="font-bold text-[#142D4E]">Contoh Tugas Sehari-hari:</div>
          <ul className="space-y-1 text-slate-600">
            {job.tasks.map((t, i) => (
              <li key={i}>• {t}</li>
            ))}
          </ul>
        </div>

        {/* Apply with Consent Section */}
        {mode === 'apply' ? (
          <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-200 space-y-3 text-xs">
            <div className="font-bold text-[#142D4E]">
              Ringkasan Data Transition Passport yang Akan Dibagikan:
            </div>
            <ul className="text-slate-700 space-y-1">
              <li>• Nama & Pendidikan: {user.name} ({user.education})</li>
              <li>• Domisili: {user.passportPrivacy.showCity ? user.city : 'Disembunyikan'}</li>
              <li>• Matriks Kompetensi Tervalidasi & Bukti Proyek Experience Lab</li>
              <li>• Tanpa NIK, tanpa nomor identitas sensitif, dan tanpa data ekonomi privat.</li>
            </ul>

            <label className="flex items-start gap-2 pt-2 cursor-pointer font-medium text-[#142D4E]">
              <input
                type="checkbox"
                checked={consentChecked}
                onChange={(e) => setConsentChecked(e.target.checked)}
                className="mt-0.5 accent-[#16A6A1]"
              />
              <span>
                Saya menyetujui pembagian informasi Transition Passport di atas kepada{' '}
                {job.company} (Simulasi Demo) dan memahami saya dapat mencabut izin kapan saja.
              </span>
            </label>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-white border border-[#E8EDF3] font-semibold"
              >
                Batal
              </button>
              <button
                disabled={!consentChecked}
                onClick={() => onApply(job.id)}
                className="px-5 py-2.5 rounded-xl bg-[#16A6A1] disabled:opacity-50 text-white font-semibold"
              >
                Setujui & Kirim Lamaran
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap justify-end gap-2 pt-3 border-t border-[#E8EDF3]">
            <button
              onClick={onGoToSkillBridge}
              className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-semibold text-[#142D4E]"
            >
              Tingkatkan di Skill Bridge
            </button>
            <button
              onClick={onGoToLab}
              className="px-4 py-2 rounded-xl bg-[#142D4E] text-white text-xs font-semibold"
            >
              Buktikan di Experience Lab
            </button>
            <button
              onClick={() => onApply(job.id)}
              className="px-4 py-2 rounded-xl bg-[#16A6A1] text-white text-xs font-semibold"
            >
              Lamar dengan Passport
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// 3. Training Detail Modal
function TrainingDetailModal({ training, onClose, onComplete }) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4">
        <div className="flex items-start justify-between border-b border-[#E8EDF3] pb-3">
          <div>
            <span className="text-xs font-bold text-[#16A6A1]">{training.level}</span>
            <h3 className="text-lg font-bold text-[#142D4E]">{training.title}</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">{training.outcome}</p>

        <div className="space-y-2 text-xs">
          <div className="font-bold text-[#142D4E]">Tahapan Pembelajaran:</div>
          {training.modules.map((m, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-[#F7F9FC] border border-[#E8EDF3] flex items-center gap-2.5"
            >
              <span className="w-5 h-5 rounded-full bg-[#142D4E] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                {idx + 1}
              </span>
              <span>{m}</span>
            </div>
          ))}
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-[#E8EDF3] text-[11px] text-slate-500">
          {training.partnerNote}
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button onClick={onClose} className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-semibold">
            Tutup
          </button>
          {training.status !== 'Selesai' && (
            <button
              onClick={() => onComplete(training.id)}
              className="px-5 py-2 rounded-xl bg-[#16A6A1] text-white text-xs font-semibold"
            >
              Selesaikan Modul Pembelajaran
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// 4. Printable / Public Preview Modal of Transition Passport
function PassportPrintableModal({ state, metrics, onClose, onNotify }) {
  const { user, skills, projects } = state;
  const completedProjects = projects.filter((p) => p.status === 'Lulus Asesmen Praktik');

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E8EDF3] pb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-[#142D4E] text-white text-xs font-bold">
              YOUNOMY TRANSITION PASSPORT
            </span>
            <span className="text-xs text-slate-500">Pratinjau Siap Cetak / Verifikasi HR</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                window.print();
                onNotify('Dialog cetak / simpan PDF browser dibuka.');
              }}
              className="px-3.5 py-2 rounded-xl bg-[#16A6A1] text-white text-xs font-semibold flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              Download PDF / Cetak
            </button>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Clean Certificate / Passport Sheet */}
        <div className="border-2 border-[#142D4E] rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-[#E8EDF3] pb-4">
            <div>
              <h2 className="text-2xl font-extrabold text-[#142D4E]">{user.name}</h2>
              <p className="text-xs text-slate-600 mt-1">
                {user.passportPrivacy.showEducation ? user.education : 'Pendidikan: Privat'} •{' '}
                {user.passportPrivacy.showCity ? user.city : 'Domisili: Privat'}
              </p>
              <p className="text-xs font-semibold text-[#16A6A1] mt-1">
                Bidang Target: {user.targetField} • Kesiapan Profil: {metrics.readiness}%
              </p>
            </div>
            <div className="text-right">
              <QrCode className="w-14 h-14 text-[#142D4E] ml-auto" />
              <div className="text-[10px] font-mono text-slate-500 mt-1">YNM-2026-0841</div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#142D4E]">
              Ringkasan Kompetensi Tervalidasi
            </h3>
            <div className="grid sm:grid-cols-2 gap-2 text-xs">
              {skills.map((s) => (
                <div
                  key={s.id}
                  className="p-2.5 rounded-lg bg-[#F7F9FC] border border-[#E8EDF3] flex justify-between"
                >
                  <span className="font-medium">{s.name}</span>
                  <span className="font-bold text-[#142D4E]">{s.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#142D4E]">
              Portofolio Proyek Praktik Terverifikasi Mentor
            </h3>
            {completedProjects.map((p) => (
              <div key={p.id} className="p-3 rounded-lg bg-[#F7F9FC] border border-[#E8EDF3] text-xs">
                <div className="font-bold text-[#142D4E]">{p.title}</div>
                <p className="text-slate-600 mt-1">{p.submission.summaryNote}</p>
                {user.passportPrivacy.showMentorNotes && (
                  <p className="text-teal-800 italic mt-1">
                    Evaluator ({p.mentor}): "{p.submission.mentorFeedback}"
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="text-[10px] text-slate-400 border-t border-[#E8EDF3] pt-3 flex justify-between">
            <span>Dokumen Demonstrasi YOUNOMY (ASF 2026) — Bukan Sertifikat Profesi BNSP</span>
            <span>Terverifikasi dalam Ekosistem YOUNOMY</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 5. Share Passport Modal
function SharePassportModal({ user, onUpdatePrivacy, onClose, onNotify }) {
  const demoLink = 'https://younomy.demo.app/passport/YNM-2026-0841?mode=verified-view';

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#E8EDF3] pb-3">
          <h3 className="font-bold text-base text-[#142D4E]">Bagikan Transition Passport</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-600">
          Atur informasi yang diizinkan terlihat oleh perusahaan sebelum menyalin tautan publik
          demonstrasi.
        </p>

        <div className="space-y-2 text-xs">
          {[
            { key: 'showCity', label: 'Tampilkan Kota Domisili' },
            { key: 'showEducation', label: 'Tampilkan Pendidikan Terakhir' },
            { key: 'showEvidence', label: 'Tampilkan Hasil Proyek Experience Lab' },
            { key: 'showMentorNotes', label: 'Tampilkan Ulasan Mentor' }
          ].map((item) => (
            <label
              key={item.key}
              className="flex items-center justify-between p-2.5 rounded-lg bg-[#F7F9FC] border border-[#E8EDF3]"
            >
              <span>{item.label}</span>
              <input
                type="checkbox"
                checked={user.passportPrivacy[item.key]}
                onChange={(e) =>
                  onUpdatePrivacy({
                    ...user.passportPrivacy,
                    [item.key]: e.target.checked
                  })
                }
                className="accent-[#16A6A1]"
              />
            </label>
          ))}
        </div>

        <div className="p-3 rounded-xl bg-slate-100 text-xs font-mono text-slate-700 break-all">
          {demoLink}
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-semibold">
            Tutup
          </button>
          <button
            onClick={() => {
              onNotify('Tautan publik Transition Passport (DEMO) berhasil disalin!');
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-[#16A6A1] text-white text-xs font-semibold"
          >
            Salin Tautan Publik
          </button>
        </div>
      </div>
    </div>
  );
}

// 6. Demo Guide Modal for Judges (3-4 Minute Storyline)
function DemoGuideModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#E8EDF3] pb-3">
          <span className="font-bold text-base text-[#142D4E]">
            Panduan Demonstrasi End-to-End (3–4 Menit)
          </span>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <ol className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
          <li>
            <strong className="text-[#142D4E]">1. Masalah (Dashboard Andi):</strong> Andi Pratama
            adalah lulusan SMK Administrasi yang memiliki kemampuan dasar tetapi belum punya
            pengalaman kerja formal.
          </li>
          <li>
            <strong className="text-[#142D4E]">2. Diagnosis (Transition Profile):</strong> Sistem
            membedakan kompetensi yang baru <em>Self-declared</em> (Excel & Laporan) dengan yang
            sudah tervalidasi.
          </li>
          <li>
            <strong className="text-[#142D4E]">3. Intervensi (Experience Lab):</strong> Buka
            proyek <em>Administrative Data Management</em>, kirim hasil kerja, dan klik{' '}
            <em>Simulasikan Hasil Evaluasi Mentor</em>.
          </li>
          <li>
            <strong className="text-[#142D4E]">4. Pusat Inovasi (Transition Passport):</strong>{' '}
            Lihat bagaimana status kompetensi otomatis berubah menjadi <strong>Assessed</strong>{' '}
            lengkap dengan bukti karya.
          </li>
          <li>
            <strong className="text-[#142D4E]">5. Hasil (Employer Connect & Employer Demo):</strong>{' '}
            Lamar lowongan dengan persetujuan privasi, lalu klik <strong>Employer Demo</strong> di
            pojok kanan atas untuk mengundang Andi wawancara.
          </li>
        </ol>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#142D4E] text-white text-xs font-semibold"
          >
            Mulai Mencoba Prototipe
          </button>
        </div>
      </div>
    </div>
  );
}