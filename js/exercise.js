/**
 * PARABOLearn - Exercise System (Latihan Soal)
 * 10 Soal Pilihan Ganda Interaktif dengan Umpan Balik Langsung dan Pembahasan Konseptual.
 */

const ExerciseQuestions = [
  {
    id: 1,
    question: "Gerak parabola merupakan perpaduan antara dua jenis gerak lurus yang saling independen, yaitu...",
    options: [
      "GLB pada sumbu horizontal (X) dan GLBB pada sumbu vertikal (Y)",
      "GLBB pada sumbu horizontal (X) dan GLB pada sumbu vertikal (Y)",
      "GLB pada kedua sumbu gerak",
      "GLBB dipercepat beraturan pada kedua sumbu gerak"
    ],
    correctIndex: 0,
    explanation: "Gerak parabola terbentuk dari GLB (kecepatan horizontal konstan karena tanpa percepatan) dan GLBB pada sumbu vertikal yang dipengaruhi percepatan gravitasi bumi (g)."
  },
  {
    id: 2,
    question: "Komponen kecepatan benda pada arah horizontal (Vx) sepanjang lintasannya adalah...",
    options: [
      "Selalu berubah secara teratur akibat gaya gesek",
      "Bernilai nol saat benda berada di titik puncak tertinggi",
      "Selalu konstan karena percepatan pada arah horizontal adalah nol (ax = 0)",
      "Mengalami percepatan searah dengan percepatan gravitasi bumi"
    ],
    correctIndex: 2,
    explanation: "Karena hambatan udara diabaikan dan tidak ada gaya yang bekerja pada arah horizontal, ax = 0 sehingga komponen kecepatan horizontal Vx = v₀ cos θ nilainya tetap konstan sepanjang gerak."
  },
  {
    id: 3,
    question: "Pada titik tertinggi lintasannya (puncak parabola), pernyataan yang benar tentang besaran fisik benda adalah...",
    options: [
      "Kecepatan total benda bernilai nol (v = 0)",
      "Komponen kecepatan vertikal bernilai nol (Vy = 0), tetapi kecepatan horizontal tetap ada (Vx ≠ 0)",
      "Percepatan gravitasi bernilai nol (g = 0)",
      "Energi kinetik benda mencapai nilai maksimum"
    ],
    correctIndex: 1,
    explanation: "Di titik tertinggi, benda berhenti sesaat hanya pada arah vertikal sehingga Vy = 0. Namun, benda masih tetap bergerak mendatar dengan kecepatan horizontal Vx = v₀ cos θ."
  },
  {
    id: 4,
    question: "Sebuah bola ditendang dengan kecepatan awal 20 m/s pada sudut elevasi 30°. Jika percepatan gravitasi g = 10 m/s², berapakah komponen kecepatan awal arah vertikal (v₀y)?",
    options: [
      "10 m/s",
      "17,3 m/s",
      "20 m/s",
      "5 m/s"
    ],
    correctIndex: 0,
    explanation: "Komponen kecepatan vertikal dihitung dengan rumus: v₀y = v₀ sin θ = 20 × sin 30° = 20 × 0,5 = 10 m/s."
  },
  {
    id: 5,
    question: "Pada kondisi ideal tanpa hambatan udara di permukaan datar, sudut elevasi manakah yang menghasilkan jarak horizontal maksimum (R terjauh)?",
    options: [
      "30°",
      "45°",
      "60°",
      "90°"
    ],
    correctIndex: 1,
    explanation: "Rumus jarak jangkauan adalah R = (v₀² sin 2θ) / g. Nilai sinus bernilai maksimum (yaitu 1) saat sudutnya 90°, yang berarti 2θ = 90° sehingga θ = 45°."
  },
  {
    id: 6,
    question: "Sebuah peluru ditembakkan dengan kecepatan awal 40 m/s dan sudut elevasi 30° (g = 10 m/s²). Waktu yang dibutuhkan peluru untuk mencapai titik tertinggi adalah...",
    options: [
      "1,0 sekon",
      "2,0 sekon",
      "3,0 sekon",
      "4,0 sekon"
    ],
    correctIndex: 1,
    explanation: "v₀y = v₀ sin 30° = 40 × 0,5 = 20 m/s. Waktu menuju puncak: t_puncak = v₀y / g = 20 / 10 = 2,0 sekon."
  },
  {
    id: 7,
    question: "Dua benda ditembakkan dengan kecepatan awal sama besar (v₀), satu pada sudut 30° dan yang lain pada sudut 60°. Hubungan jarak jangkauan horizontal kedua benda pada bidang datar adalah...",
    options: [
      "Benda dengan sudut 60° menjangkau dua kali lebih jauh",
      "Benda dengan sudut 30° menjangkau lebih jauh",
      "Kedua benda mencapai jarak horizontal yang persis sama karena sin(2 × 30°) = sin(2 × 60°)",
      "Jarak jangkauan tidak dapat ditentukan tanpa massa benda"
    ],
    correctIndex: 2,
    explanation: "Sudut yang saling berpenyiku (jumlahnya 90°, seperti 30° dan 60°) memiliki nilai sin(2θ) yang sama: sin(60°) = sin(120°) = ½√3. Oleh karena itu, jangkauan horizontalnya identik."
  },
  {
    id: 8,
    question: "Sebuah batu dilempar dengan kecepatan 10 m/s dan sudut 45° (g = 10 m/s²). Ketinggian maksimum (H maks) yang dicapai batu tersebut adalah...",
    options: [
      "1,25 meter",
      "2,5 meter",
      "5,0 meter",
      "10 meter"
    ],
    correctIndex: 1,
    explanation: "v₀y = 10 × sin 45° = 10 × (½√2) = 5√2 m/s. H_maks = (v₀y)² / (2g) = (5√2)² / (2 × 10) = 50 / 20 = 2,5 meter."
  },
  {
    id: 9,
    question: "Manakah fenomena berikut yang BUKAN merupakan contoh gerak parabola dalam kehidupan sehari-hari?",
    options: [
      "Lintasan bola basket yang dilempar melengkung menuju ring",
      "Semburan air dari selang pemadam kebakaran yang diarahkan miring",
      "Buah kelapa yang jatuh bebas secara tegak lurus dari pohonnya",
      "Lintasan bola yang ditendang melambung oleh penjaga gawang"
    ],
    correctIndex: 2,
    explanation: "Buah kelapa yang jatuh tegak lurus ke bawah adalah Gerak Jatuh Bebas (GLBB 1 dimensi), bukan gerak parabola yang berdimensi 2 (kombinasi X dan Y)."
  },
  {
    id: 10,
    question: "Jika kecepatan awal benda dijadikan 2 kali lipat dari semula (dengan sudut elevasi tetap), maka jarak jangkauan maksimum benda akan menjadi...",
    options: [
      "2 kali lebih jauh",
      "4 kali lebih jauh",
      "Tetap sama",
      "8 kali lebih jauh"
    ],
    correctIndex: 1,
    explanation: "Jarak jangkauan R sebanding dengan kuadrat kecepatan awal (R ∝ v₀²). Jika v₀ dikalikan 2, maka R menjadi 2² = 4 kali lebih jauh."
  }
];

class ExerciseManager {
  constructor() {
    this.currentIndex = 0;
    this.userAnswers = new Array(ExerciseQuestions.length).fill(null);
    this.score = 0;

    this.initDOM();
    this.renderQuestion();
  }

  initDOM() {
    this.qTextEl = document.getElementById('exercise-question-text');
    this.qNumEl = document.getElementById('exercise-q-num');
    this.progressFillEl = document.getElementById('exercise-progress-fill');
    this.optionsContainer = document.getElementById('exercise-options-container');
    this.feedbackEl = document.getElementById('exercise-feedback');
    this.prevBtn = document.getElementById('exercise-prev-btn');
    this.nextBtn = document.getElementById('exercise-next-btn');

    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prevQuestion());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.nextQuestion());
    }
  }

  renderQuestion() {
    const q = ExerciseQuestions[this.currentIndex];
    if (!q) return;

    if (this.qNumEl) this.qNumEl.textContent = `Soal ${this.currentIndex + 1} dari ${ExerciseQuestions.length}`;
    if (this.progressFillEl) {
      const pct = ((this.currentIndex + 1) / ExerciseQuestions.length) * 100;
      this.progressFillEl.style.width = `${pct}%`;
    }

    if (this.qTextEl) this.qTextEl.textContent = q.question;

    // Reset feedback
    if (this.feedbackEl) {
      this.feedbackEl.className = 'quiz-feedback';
      this.feedbackEl.innerHTML = '';
    }

    // Render options
    if (this.optionsContainer) {
      this.optionsContainer.innerHTML = '';
      const letters = ['A', 'B', 'C', 'D'];
      const currentSelected = this.userAnswers[this.currentIndex];

      q.options.forEach((optText, idx) => {
        const item = document.createElement('div');
        item.className = 'option-item';
        if (currentSelected !== null) {
          if (idx === q.correctIndex) item.classList.add('correct');
          else if (idx === currentSelected) item.classList.add('incorrect');
        }

        item.innerHTML = `
          <span class="option-letter">${letters[idx]}</span>
          <span class="option-text">${optText}</span>
        `;

        item.addEventListener('click', () => {
          if (this.userAnswers[this.currentIndex] === null) {
            this.handleAnswer(idx);
          }
        });

        this.optionsContainer.appendChild(item);
      });

      // Show existing feedback if already answered
      if (currentSelected !== null) {
        this.displayFeedback(currentSelected === q.correctIndex, q.explanation);
      }
    }

    // Update buttons
    if (this.prevBtn) this.prevBtn.disabled = this.currentIndex === 0;
    if (this.nextBtn) {
      if (this.currentIndex === ExerciseQuestions.length - 1) {
        this.nextBtn.textContent = 'Selesai & Lihat Skor';
      } else {
        this.nextBtn.textContent = 'Soal Berikutnya →';
      }
    }
  }

  handleAnswer(selectedIdx) {
    const q = ExerciseQuestions[this.currentIndex];
    this.userAnswers[this.currentIndex] = selectedIdx;
    const isCorrect = selectedIdx === q.correctIndex;

    if (isCorrect) {
      if (window.SoundEffects) SoundEffects.playCorrect();
    } else {
      if (window.SoundEffects) SoundEffects.playIncorrect();
    }

    this.renderQuestion();
  }

  displayFeedback(isCorrect, explanation) {
    if (!this.feedbackEl) return;
    this.feedbackEl.className = `quiz-feedback show ${isCorrect ? 'callout-success' : 'callout-warning'}`;
    this.feedbackEl.innerHTML = `
      <div class="feedback-title">
        <span>${isCorrect ? '✅ Jawaban Benar!' : '❌ Jawaban Kurang Tepat'}</span>
      </div>
      <p><strong>Pembahasan:</strong> ${explanation}</p>
    `;
  }

  nextQuestion() {
    if (this.currentIndex < ExerciseQuestions.length - 1) {
      this.currentIndex++;
      this.renderQuestion();
    } else {
      this.showSummaryModal();
    }
  }

  prevQuestion() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.renderQuestion();
    }
  }

  showSummaryModal() {
    let correctCount = 0;
    ExerciseQuestions.forEach((q, idx) => {
      if (this.userAnswers[idx] === q.correctIndex) correctCount++;
    });
    const finalScore = (correctCount / ExerciseQuestions.length) * 100;

    const modal = document.getElementById('exercise-summary-modal');
    if (modal) {
      document.getElementById('summary-score').textContent = Math.round(finalScore);
      document.getElementById('summary-correct').textContent = correctCount;
      document.getElementById('summary-incorrect').textContent = ExerciseQuestions.length - correctCount;
      modal.style.display = 'flex';
      if (window.SoundEffects) SoundEffects.playFanfare();
    }
  }
}

window.ExerciseManager = ExerciseManager;

