# PARABOLearn: Explore the Motion, Understand the Physics!

> **Multimedia Pembelajaran Interaktif Berbasis Web pada Materi Gerak Parabola untuk Siswa Kelas XI SMA**  
> Dikembangkan berdasarkan Proposal Penelitian & Pengembangan Multimedia Pembelajaran dengan model **ADDIE** *(Analysis, Design, Development, Implementation, Evaluation)*.

---

## 📌 Identitas Pengembang
- **Nama Pengembang:** Meutya Khaerunnisa
- **NIM:** 240209501076
- **Kelas:** PTIK E 24
- **Program Studi:** Pendidikan Teknik Informatika dan Komputer (PTIK)
- **Jurusan:** Teknik Informatika dan Elektro
- **Fakultas:** Fakultas Teknik, Universitas Negeri Makassar
- **Mata Kuliah:** Multimedia Pembelajaran

---

## 🎯 Capaian & Tujuan Pembelajaran (CP & TP)
### Capaian Pembelajaran (CP)
Peserta didik mampu memahami konsep gerak pada benda berdasarkan hubungan antara besaran-besaran fisika serta menerapkan konsep dan prinsip gerak untuk menjelaskan dan menyelesaikan permasalahan dalam kehidupan sehari-hari (menganalisis hubungan kecepatan awal, sudut elevasi, waktu tempuh, tinggi maksimum, dan jarak jangkauan).

### Tujuan Pembelajaran (TP)
1. Menjelaskan pengertian dan karakteristik gerak parabola.
2. Mengidentifikasi komponen gerak horizontal ($v_x$ - GLB) dan vertikal ($v_y$ - GLBB).
3. Menganalisis pengaruh kecepatan awal ($v_0$) dan sudut elevasi ($\theta$) terhadap bentuk lintasan.
4. Menghitung waktu tempuh puncak ($t_{\text{puncak}}$), waktu total ($t_{\text{total}}$), ketinggian maksimum ($H_{\text{maks}}$), dan jarak jangkauan ($R$).
5. Membuktikan secara eksperimen virtual bahwa sudut elevasi $45^\circ$ menghasilkan jarak jangkauan terjauh pada bidang datar.
6. Menerapkan konsep gerak parabola dalam menyelesaikan persoalan nyata kehidupan sehari-hari.

---

## 💻 Teknologi & Arsitektur Pengembangan
- **Struktur Halaman:** Standar semantik **HTML5**.
- **Desain & Gaya Visual:** **CSS3 Modern** dengan skema warna Biru (Utama), Putih (Dasar), Cyan (Aksen), dan Ungu (Pendukung).
- **Logika & Fisika:** **Vanilla JavaScript (ES6+)** tanpa ketergantungan library pihak ketiga (*zero dependencies*).
- **Grafika Dinamis:** **HTML5 Canvas 2D API** beresolusi tinggi (*Retina/High-DPI aware*) dengan siklus render 60 FPS `requestAnimationFrame`.
- **Sintesis Audio:** **Web Audio API** untuk efek suara interaktif tanpa perlu file eksternal.
- **Penyimpanan Lokal:** **HTML5 LocalStorage API** untuk menyimpan nama siswa, hasil evaluasi, dan preferensi audio.

---

## 🧭 Alur Pembelajaran Sistematis
Pembelajaran dirancang berurutan mengikuti alur instruksional:
```
Beranda ──> Petunjuk ──> Materi (1-5) ──> Komponen Gerak ──> Besaran & Rumus
   └──> Animasi 60 FPS ──> Simulasi Laboratorium (Utama) ──> Contoh Soal
           └──> Latihan Mandiri (10 Soal) ──> Evaluasi Akhir (15 Soal) ──> Hasil & Review
```

---

## 📂 Struktur Direktori Proyek
```text
PARABOLearn/
├── index.html                           # Halaman Beranda (Landing Page & Hero)
├── pages/
│   ├── petunjuk.html                    # Petunjuk Penggunaan Multimedia
│   ├── materi.html                      # 5 Modul Materi Pokok Terstruktur
│   ├── komponen.html                    # Visualisasi Interaktif Vektor Vx & Vy
│   ├── besaran.html                     # Besaran Fisika & Kalkulator Rumus Mandiri
│   ├── animasi.html                     # Animasi Canvas Gerak Parabola 60 FPS
│   ├── simulasi.html                    # Laboratorium Virtual Interaktif (FITUR UTAMA)
│   ├── contoh-soal.html                 # Contoh Soal Kontekstual & Langkah Pembahasan
│   ├── latihan.html                     # 10 Latihan Soal dengan Umpan Balik Instan
│   ├── evaluasi.html                    # 15 Soal Evaluasi Berwaktu & Skor Otomatis
│   └── hasil.html                       # Laporan Hasil Belajar & Review Kunci Jawaban
├── css/
│   ├── style.css                        # Design System, Tipografi, Komponen, Canvas UI
│   └── responsive.css                   # Responsivitas Laptop, Tablet, & Smartphone
├── js/
│   ├── main.js                          # Navigasi, Audio Synthesizer, & Toast Notifikasi
│   ├── animation.js                     # Engine Animasi Canvas Parabola
│   ├── simulation.js                    # Physics Engine Simulasi & Komparasi Multi-Lintasan
│   ├── exercise.js                      # Pengelola Latihan 10 Soal & Pembahasan
│   ├── evaluation.js                    # Pengelola Evaluasi 15 Soal & Timer Ujian
│   └── storage.js                       # Helper LocalStorage
├── assets/
│   ├── logo/
│   │   └── logo.svg                     # Logo Vektor Resmi PARABOLearn
│   └── images/
│       ├── hero-parabola.svg            # Ilustrasi Vektor Hero Section
│       ├── sepak-bola.svg               # Ilustrasi Penerapan: Tendangan Sepak Bola
│       ├── bola-basket.svg              # Ilustrasi Penerapan: Tembakan Basket
│       ├── selang-air.svg               # Ilustrasi Penerapan: Pancaran Selang Air
│       └── meriam.svg                   # Ilustrasi Penerapan: Lintasan Peluru Meriam
└── README.md                            # Dokumentasi Lengkap Proyek
```

---

## 🚀 Cara Menjalankan Website Secara Lokal

Karena proyek ini menggunakan pendekatan murni *vanilla web standards*, Anda dapat menjalankannya dengan sangat mudah:

### Cara 1: Buka Langsung di Web Browser
1. Buka folder proyek `PARABOLearn`.
2. Klik ganda file `index.html` menggunakan browser modern (Google Chrome, Microsoft Edge, Mozilla Firefox, atau Safari).
3. Website akan langsung aktif dan berfungsi penuh secara offline tanpa memerlukan koneksi internet!

### Cara 2: Menjalankan Menggunakan Local Web Server (Direkomendasikan)
Jika ingin menggunakan server lokal:
- Menggunakan ekstensi **Live Server** di VS Code: Klik kanan `index.html` lalu pilih **"Open with Live Server"**.
- Atau menggunakan Python di terminal/PowerShell:
  ```bash
  cd "d:\MUTIA_UNM\campus\SEMESTER 5\Multimedia Pembelajaran\PARABOLearn"
  python -m http.server 8000
  ```
  Lalu buka peramban pada alamat `http://localhost:8000`.

---

## ✨ Fitur-Fitur Utama PARABOLearn

1. **Laboratorium Virtual (Simulasi Interaktif):**
   - Slider kecepatan awal ($v_0$) $5 - 80\text{ m/s}$.
   - Slider sudut elevasi ($\theta$) $0^\circ - 90^\circ$ dengan rotasi visual moncong meriam real-time.
   - Pilihan gravitasi ($g$ Bumi $9,8\text{ m/s}^2$, Bulan $1,62\text{ m/s}^2$, Mars $3,71\text{ m/s}^2$, Jupiter $24,79\text{ m/s}^2$).
   - Fitur **Simpan Lintasan (Bandingkan)** untuk membandingkan lintasan berbagai sudut secara visual.
   - **Interactive Curve Probe:** Sorot kursor ke kurva untuk melihat nilai $(t, x, y, v_x, v_y)$ di setiap titik!
2. **Visualisasi Komponen Vektor:**
   - Menampilkan independensi sumbu horizontal (GLB) dan sumbu vertikal (GLBB).
   - Scrubber penjelajah fase terbang proyektil ($0\%$ hingga $100\%$).
3. **Kalkulator Rumus Fisika:**
   - Menghitung $t_{\text{puncak}}$, $t_{\text{total}}$, $H_{\text{maks}}$, dan $R$ dengan langkah aritmetika transparan.
4. **Latihan Mandiri (10 Soal):**
   - Umpan balik benar/salah seketika dan pembahasan konsep mendalam.
5. **Evaluasi Terstandar (15 Soal):**
   - Waktu mundur (*countdown timer*), navigasi palet nomor soal, penyimpanan jawaban sementara, penilaian otomatis, predikat ketuntasan, dan lembar cetak laporan (PDF).

