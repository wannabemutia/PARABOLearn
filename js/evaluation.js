/**
 * PARABOLearn - Evaluation System (Evaluasi Pembelajaran)
 * 15 Soal Evaluasi Komprehensif Gerak Parabola Kelas XI SMA
 * Sesuai Capaian Pembelajaran (CP) dan Tujuan Pembelajaran (TP).
 */

const EvaluationQuestions = [
  {
    id: 1,
    question: "Karakteristik utama yang membedakan lintasan gerak parabola dari gerak lurus adalah...",
    options: [
      "Benda bergerak dengan kelajuan yang selalu tetap di setiap arah",
      "Lintasan berbentuk lengkung simetris akibat perpaduan GLB horizontal dan GLBB vertikal di bawah percepatan gravitasi",
      "Gaya gravitasi bekerja searah dengan kecepatan awal benda",
      "Percepatan benda selalu bertambah besar seiring bertambahnya waktu"
    ],
    correctIndex: 1,
    explanation: "Gerak parabola memiliki lintasan kurva lengkung berbentuk parabola yang terjadi karena gabungan gerak lurus beraturan (GLB) pada sumbu horizontal dan gerak lurus berubah beraturan (GLBB) pada sumbu vertikal akibat tarikan gravitasi bumi."
  },
  {
    id: 2,
    question: "Manakah pernyataan yang benar mengenai percepatan sebuah proyektil (benda gerak parabola) selama di udara jika hambatan udara diabaikan?",
    options: [
      "Percepatan horizontal berubah, percepatan vertikal nol",
      "Percepatannya konstan ke bawah sebesar g (ax = 0 dan ay = -g)",
      "Percepatan benda bernilai nol di titik tertinggi",
      "Percepatan berbanding lurus dengan massa proyektil"
    ],
    correctIndex: 1,
    explanation: "Sepanjang lintasannya, hanya gaya gravitasi bumi yang bekerja menarik ke bawah sehingga ay = -g, sedangkan pada arah horizontal tidak ada gaya (ax = 0). Percepatan total selalu konstan g mengarah ke bawah."
  },
  {
    id: 3,
    question: "Sebuah bola dilemparkan dengan kecepatan awal v₀ = 30 m/s pada sudut elevasi θ = 60°. Berapakah kecepatan awal benda pada arah horizontal (v₀x)? (sin 60° = ½√3; cos 60° = 0,5)",
    options: [
      "15 m/s",
      "15√3 m/s",
      "30 m/s",
      "25,9 m/s"
    ],
    correctIndex: 0,
    explanation: "Komponen kecepatan horizontal: v₀x = v₀ cos θ = 30 × cos 60° = 30 × 0,5 = 15 m/s."
  },
  {
    id: 4,
    question: "Berdasarkan soal nomor 3, berapakah komponen kecepatan awal bola pada arah vertikal (v₀y)?",
    options: [
      "15 m/s",
      "15√3 m/s (sekitar 25,98 m/s)",
      "30 m/s",
      "10 m/s"
    ],
    correctIndex: 1,
    explanation: "Komponen kecepatan vertikal: v₀y = v₀ sin θ = 30 × sin 60° = 30 × (½√3) = 15√3 m/s ≈ 25,98 m/s."
  },
  {
    id: 5,
    question: "Saat proyektil mencapai titik tertingginya (titik puncak), besar dan arah kecepatan total benda adalah...",
    options: [
      "Kecepatan bernilai nol dan benda diam sesaat",
      "Sama dengan kecepatan awal (v₀) berarah miring",
      "Sama dengan komponen kecepatan horizontal (v₀ cos θ) yang berarah mendatar",
      "Sama dengan percepatan gravitasi bumi"
    ],
    correctIndex: 2,
    explanation: "Di titik tertinggi, Vy = 0. Namun, benda tetap memiliki kecepatan horizontal Vx = v₀ cos θ, sehingga kecepatan total di puncak adalah v = √(Vx² + 0²) = v₀ cos θ dan arahnya mendatar."
  },
  {
    id: 6,
    question: "Sebuah peluru meriam ditembakkan dengan kecepatan awal 50 m/s dan sudut elevasi 30°. Jika g = 10 m/s², waktu yang dibutuhkan peluru untuk mencapai titik puncak adalah...",
    options: [
      "2,5 sekon",
      "5,0 sekon",
      "1,5 sekon",
      "4,33 sekon"
    ],
    correctIndex: 0,
    explanation: "v₀y = v₀ sin 30° = 50 × 0,5 = 25 m/s. Waktu menuju puncak: t_puncak = v₀y / g = 25 / 10 = 2,5 sekon."
  },
  {
    id: 7,
    question: "Merujuk pada peluru meriam di soal nomor 6, waktu total yang ditempuh peluru sejak ditembakkan hingga jatuh kembali ke tanah (bidang datar) adalah...",
    options: [
      "2,5 sekon",
      "5,0 sekon",
      "7,5 sekon",
      "10,0 sekon"
    ],
    correctIndex: 1,
    explanation: "Karena lintasan parabola simetris pada bidang datar, waktu total di udara adalah 2 kali waktu puncak: t_total = 2 × t_puncak = 2 × 2,5 s = 5,0 sekon."
  },
  {
    id: 8,
    question: "Sebuah panah melesat dengan kecepatan awal 20 m/s pada sudut elevasi 45°. Jika g = 10 m/s², berapakah tinggi maksimum (H maks) yang dicapai panah tersebut?",
    options: [
      "5 meter",
      "10 meter",
      "20 meter",
      "40 meter"
    ],
    correctIndex: 1,
    explanation: "v₀y = 20 × sin 45° = 20 × (½√2) = 10√2 m/s. H_maks = (v₀y)² / (2g) = (10√2)² / (2 × 10) = 200 / 20 = 10 meter."
  },
  {
    id: 9,
    question: "Berdasarkan panah pada soal nomor 8, berapakah jarak mendatar terjauh (R) yang dicapai panah sebelum menancap di tanah?",
    options: [
      "10 meter",
      "20 meter",
      "40 meter",
      "80 meter"
    ],
    correctIndex: 2,
    explanation: "R = (v₀² sin 2θ) / g = (20² × sin 90°) / 10 = (400 × 1) / 10 = 40 meter."
  },
  {
    id: 10,
    question: "Mengapa sudut elevasi 45° menghasilkan jangkauan terjauh pada kondisi tanah datar tanpa hambatan udara?",
    options: [
      "Karena nilai sin(2θ) mencapai nilai maksimum yaitu 1 saat 2θ = 90°",
      "Karena gaya gravitasi menjadi paling lemah pada sudut 45°",
      "Karena kecepatan horizontal dan vertikal mencapai nol bersamaan",
      "Karena massa benda menjadi seringan mungkin pada sudut tersebut"
    ],
    correctIndex: 0,
    explanation: "Pada rumus R = (v₀² sin 2θ) / g, nilai fungsi sinus berada dalam rentang -1 hingga 1. Nilai maksimum terjadi ketika sin(2θ) = 1, yaitu 2θ = 90° atau θ = 45°."
  },
  {
    id: 11,
    question: "Dua penembak mengarahkan peluru dengan kecepatan awal sama. Penembak A menggunakan sudut 15°, sedangkan Penembak B menggunakan sudut 75°. Hasil jangkauan horizontal kedua peluru adalah...",
    options: [
      "Penembak B menjangkau lebih jauh karena sudutnya lebih besar",
      "Penembak A menjangkau lebih jauh karena lintasannya lebih datar",
      "Kedua peluru jatuh pada jarak horizontal yang sama persis",
      "Peluru B tidak dapat mencapai tanah"
    ],
    correctIndex: 2,
    explanation: "Pasangan sudut yang saling berkomplemen (15° + 75° = 90°) menghasilkan jarak jangkauan yang sama karena sin(2 × 15°) = sin 30° = 0,5 dan sin(2 × 75°) = sin 150° = 0,5."
  },
  {
    id: 12,
    question: "Jika percepatan gravitasi di Bulan adalah 1/6 dari gravitasi di Bumi, maka proyektil yang diluncurkan dengan v₀ dan sudut sama di Bulan akan...",
    options: [
      "Mencapai tinggi dan jarak jangkauan 6 kali lebih besar dibanding di Bumi",
      "Mencapai tinggi 6 kali lebih kecil dibanding di Bumi",
      "Jatuh lebih cepat dibanding di Bumi",
      "Tidak mengalami lintasan lengkung"
    ],
    correctIndex: 0,
    explanation: "Karena H_maks ∝ 1/g dan R ∝ 1/g, penurunan gravitasi menjadi 1/6 kali semula akan menyebabkan ketinggian dan jangkauan horizontal bertambah menjadi 6 kali lebih besar."
  },
  {
    id: 13,
    question: "Dalam permainan bola basket, ketika seorang pemain melakukan tembakan 'three-point' dengan lintasan parabola melengkung tinggi, tujuan fisis utamanya adalah...",
    options: [
      "Membuat bola meluncur secepat mungkin menembus jaring",
      "Memperbesar sudut masuk bola terhadap ring basket sehingga peluang bola masuk keranjang lebih besar",
      "Menghilangkan pengaruh gaya gravitasi bumi",
      "Membuat kecepatan horizontal bola menjadi nol sebelum mencapai ring"
    ],
    correctIndex: 1,
    explanation: "Sudut elevasi yang cukup tinggi menghasilkan lintasan parabola melengkung ('arc') sehingga bola masuk ke ring dengan sudut curam (mendekati vertikal), memaksimalkan luas area bukaan ring yang tersedia bagi bola."
  },
  {
    id: 14,
    question: "Sebuah pesawat terbang mendatar dengan kecepatan 100 m/s pada ketinggian 500 m melepaskan paket bantuan (g = 10 m/s²). Bentuk lintasan paket jika dilihat oleh pengamat diam di tanah adalah...",
    options: [
      "Garis lurus vertikal ke bawah",
      "Garis lurus miring ke depan",
      "Setengah lintasan parabola lengkung ke depan",
      "Garis spiral melingkar"
    ],
    correctIndex: 2,
    explanation: "Paket bantuan memiliki kecepatan awal horizontal sama dengan pesawat (100 m/s) dan secara bertahap ditarik gravitasi ke bawah, sehingga membentuk kurva setengah parabola."
  },
  {
    id: 15,
    question: "Kesimpulan fisis yang paling tepat mengenai hubungan antara komponen horizontal dan komponen vertikal pada gerak parabola adalah...",
    options: [
      "Gerak vertikal menghambat laju gerak horizontal secara bertahap",
      "Kedua gerak berlangsung serentak namun saling independen (bebas satu sama lain), dihubungkan oleh variabel waktu (t)",
      "Gerak horizontal hanya terjadi setelah gerak vertikal selesai",
      "Nilai kecepatan horizontal selalu sama dengan kecepatan vertikal di setiap detik"
    ],
    correctIndex: 1,
    explanation: "Sesuai prinsip Galileo Galilei, komponen gerak horizontal (GLB) dan gerak vertikal (GLBB) saling bebas (independen) satu sama lain. Satu-satunya besaran fisis penghubung keduanya adalah parameter waktu (t)."
  }
];

class EvaluationManager {
  constructor() {
    this.studentName = AppStorage.getUserName() || 'Meutya Khaerunnisa';
    this.currentIndex = 0;
    this.userAnswers = new Array(EvaluationQuestions.length).fill(null);
    this.startTime = null;
    this.durationMinutes = 25; // 25 menit durasi simulasi ujian
    this.timerInterval = null;
    this.isStarted = false;
    this.isFinished = false;

    this.initDOM();
  }

  initDOM() {
    // 1. Start Screen Elements
    this.startScreen = document.getElementById('eval-start-screen');
    this.examScreen = document.getElementById('eval-exam-screen');
    this.startBtn = document.getElementById('btn-start-eval');
    this.startNameInput = document.getElementById('eval-start-name');
    this.studentNameDisplay = document.getElementById('eval-student-name-display');

    if (this.startNameInput) {
      this.startNameInput.value = this.studentName;
      this.startNameInput.addEventListener('input', (e) => {
        const val = e.target.value.trim();
        if (val) {
          this.studentName = val;
          AppStorage.setUserName(val);
        }
      });
    }

    if (this.startBtn) {
      this.startBtn.addEventListener('click', () => this.startEvaluation());
    }

    // 2. Exam Screen Elements
    this.qTextEl = document.getElementById('eval-question-text');
    this.qNumEl = document.getElementById('eval-q-num');
    this.answeredCountEl = document.getElementById('eval-answered-count');
    this.progressFillEl = document.getElementById('eval-progress-fill');
    this.optionsContainer = document.getElementById('eval-options-container');
    this.paletteContainer = document.getElementById('eval-palette-container');
    this.timerEl = document.getElementById('eval-timer-display');

    this.prevBtn = document.getElementById('eval-prev-btn');
    this.nextBtn = document.getElementById('eval-next-btn');
    this.submitBtn = document.getElementById('eval-submit-btn');

    if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prevQuestion());
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextQuestion());
    if (this.submitBtn) this.submitBtn.addEventListener('click', () => this.confirmSubmit());

    // 3. Navigation safeguard when exam is in progress
    window.addEventListener('beforeunload', (e) => {
      if (this.isStarted && !this.isFinished) {
        e.preventDefault();
        e.returnValue = '';
      }
    });
  }

  startEvaluation() {
    if (this.startNameInput) {
      const typed = this.startNameInput.value.trim();
      if (typed) {
        this.studentName = typed;
        AppStorage.setUserName(typed);
      } else {
        this.studentName = 'Siswa Kelas XI';
        AppStorage.setUserName(this.studentName);
      }
    }

    if (this.studentNameDisplay) {
      this.studentNameDisplay.textContent = this.studentName;
    }

    // Switch screens
    if (this.startScreen) this.startScreen.style.display = 'none';
    if (this.examScreen) {
      this.examScreen.style.display = 'block';
      this.examScreen.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    this.isStarted = true;
    this.startTime = Date.now();
    this.startTimer();
    this.renderQuestion();
    this.renderPalette();

    if (window.SoundEffects) SoundEffects.playLaunch();
    if (window.Toast) Toast.show('Evaluasi dimulai! Selamat mengerjakan, semoga sukses!', 'info', 3000);
  }

  startTimer() {
    const totalSeconds = this.durationMinutes * 60;
    let elapsed = 0;

    this.timerInterval = setInterval(() => {
      elapsed++;
      const remaining = Math.max(0, totalSeconds - elapsed);
      const mins = Math.floor(remaining / 60);
      const secs = remaining % 60;

      if (this.timerEl) {
        this.timerEl.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      }

      if (remaining <= 0) {
        clearInterval(this.timerInterval);
        alert('Waktu pengerjaan evaluasi telah habis! Sistem akan mengumpulkan jawaban Anda secara otomatis.');
        this.finishEvaluation();
      }
    }, 1000);
  }

  renderPalette() {
    if (!this.paletteContainer) return;
    this.paletteContainer.innerHTML = '';

    EvaluationQuestions.forEach((_, idx) => {
      const btn = document.createElement('button');
      btn.className = 'palette-btn';
      btn.textContent = idx + 1;

      if (idx === this.currentIndex) btn.classList.add('active');
      if (this.userAnswers[idx] !== null) btn.classList.add('answered');

      btn.addEventListener('click', () => {
        this.currentIndex = idx;
        this.renderQuestion();
      });

      this.paletteContainer.appendChild(btn);
    });
  }

  renderQuestion() {
    const q = EvaluationQuestions[this.currentIndex];
    if (!q) return;

    if (this.qNumEl) this.qNumEl.textContent = `Soal No. ${this.currentIndex + 1} dari ${EvaluationQuestions.length}`;
    if (this.qTextEl) this.qTextEl.textContent = q.question;

    const answeredCount = this.userAnswers.filter(a => a !== null).length;
    if (this.answeredCountEl) {
      this.answeredCountEl.textContent = `Terjawab: ${answeredCount} / ${EvaluationQuestions.length}`;
    }
    if (this.progressFillEl) {
      const pct = (answeredCount / EvaluationQuestions.length) * 100;
      this.progressFillEl.style.width = `${pct}%`;
    }

    // Render options
    if (this.optionsContainer) {
      this.optionsContainer.innerHTML = '';
      const letters = ['A', 'B', 'C', 'D'];
      const selected = this.userAnswers[this.currentIndex];

      q.options.forEach((optText, idx) => {
        const item = document.createElement('div');
        item.className = 'option-item';
        if (selected === idx) item.classList.add('selected');

        item.innerHTML = `
          <span class="option-letter">${letters[idx]}</span>
          <span class="option-text">${optText}</span>
        `;

        item.addEventListener('click', () => {
          this.userAnswers[this.currentIndex] = idx;
          if (window.SoundEffects) SoundEffects.playClick();
          this.renderQuestion();
          this.renderPalette();
        });

        this.optionsContainer.appendChild(item);
      });
    }

    // Navigation buttons
    if (this.prevBtn) this.prevBtn.disabled = this.currentIndex === 0;
    if (this.nextBtn) {
      if (this.currentIndex === EvaluationQuestions.length - 1) {
        this.nextBtn.style.display = 'none';
        if (this.submitBtn) this.submitBtn.style.display = 'inline-flex';
      } else {
        this.nextBtn.style.display = 'inline-flex';
      }
    }

    this.renderPalette();
  }

  nextQuestion() {
    if (this.currentIndex < EvaluationQuestions.length - 1) {
      this.currentIndex++;
      this.renderQuestion();
    }
  }

  prevQuestion() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.renderQuestion();
    }
  }

  confirmSubmit() {
    const unanswered = this.userAnswers.filter(a => a === null).length;
    let msg = 'Apakah Anda yakin ingin menyelesaikan dan mengumpulkan evaluasi ini?';
    if (unanswered > 0) {
      msg = `Peringatan: Masih terdapat ${unanswered} soal yang belum Anda jawab. Tetap ingin mengumpulkan?`;
    }

    if (confirm(msg)) {
      this.finishEvaluation();
    }
  }

  finishEvaluation() {
    this.isFinished = true;
    if (this.timerInterval) clearInterval(this.timerInterval);

    // Calculate score
    let correctCount = 0;
    const detailedReview = [];

    EvaluationQuestions.forEach((q, idx) => {
      const userSelected = this.userAnswers[idx];
      const isCorrect = userSelected === q.correctIndex;
      if (isCorrect) correctCount++;

      detailedReview.push({
        id: q.id,
        question: q.question,
        options: q.options,
        userAnswer: userSelected,
        correctAnswer: q.correctIndex,
        isCorrect: isCorrect,
        explanation: q.explanation
      });
    });

    const totalQuestions = EvaluationQuestions.length;
    const incorrectCount = totalQuestions - correctCount;
    const scoreVal = Math.round((correctCount / totalQuestions) * 100);

    // Determine predicate
    let predicate = '';
    let predicateDesc = '';
    if (scoreVal >= 85) {
      predicate = 'Sangat Baik (Istimewa)';
      predicateDesc = 'Selamat! Anda telah menguasai konsep, komponen, besaran, dan analisis gerak parabola dengan sangat mendalam.';
    } else if (scoreVal >= 75) {
      predicate = 'Baik (Tuntas KKM)';
      predicateDesc = 'Bagus! Pemahaman Anda terhadap materi gerak parabola sudah tuntas dan melampaui kriteria ketuntasan minimal.';
    } else if (scoreVal >= 60) {
      predicate = 'Cukup';
      predicateDesc = 'Pemahaman Anda cukup baik, namun disarankan untuk memperdalam kembali materi komponen gerak dan analisis simulasi.';
    } else {
      predicate = 'Perlu Bimbingan & Remedial';
      predicateDesc = 'Disarankan untuk mempelajari ulang modul materi dan mencoba simulasi interaktif kembali untuk memperkuat konsep dasar.';
    }

    const elapsedSeconds = Math.round((Date.now() - this.startTime) / 1000);
    const durationFormatted = `${Math.floor(elapsedSeconds / 60)} menit ${elapsedSeconds % 60} detik`;

    const resultPayload = {
      studentName: this.studentName,
      score: scoreVal,
      correctCount: correctCount,
      incorrectCount: incorrectCount,
      totalQuestions: totalQuestions,
      percentage: scoreVal,
      predicate: predicate,
      predicateDesc: predicateDesc,
      duration: durationFormatted,
      review: detailedReview
    };

    AppStorage.saveEvaluationResult(resultPayload);

    // Redirect to hasil.html
    window.location.href = 'hasil.html';
  }
}

window.EvaluationManager = EvaluationManager;

