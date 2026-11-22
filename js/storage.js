/**
 * PARABOLearn - LocalStorage Helper
 * Mengelola penyimpanan lokal untuk data pengguna, hasil evaluasi, dan preferensi.
 */

const StorageKeys = {
  USER_NAME: 'parabolearn_user_name',
  LAST_EVALUATION: 'parabolearn_eval_last_result',
  EVALUATION_HISTORY: 'parabolearn_eval_history',
  SOUND_ENABLED: 'parabolearn_sound_enabled',
  COMPLETED_TOPICS: 'parabolearn_completed_topics'
};

const AppStorage = {
  getUserName() {
    return localStorage.getItem(StorageKeys.USER_NAME) || 'Siswa Kelas XI';
  },

  setUserName(name) {
    if (name && name.trim()) {
      localStorage.setItem(StorageKeys.USER_NAME, name.trim());
    }
  },

  getSoundEnabled() {
    const val = localStorage.getItem(StorageKeys.SOUND_ENABLED);
    return val === null ? true : val === 'true';
  },

  setSoundEnabled(enabled) {
    localStorage.setItem(StorageKeys.SOUND_ENABLED, String(enabled));
  },

  saveEvaluationResult(resultData) {
    try {
      const dataWithTimestamp = {
        ...resultData,
        timestamp: new Date().toISOString()
      };
      // Simpan hasil terakhir
      localStorage.setItem(StorageKeys.LAST_EVALUATION, JSON.stringify(dataWithTimestamp));

      // Simpan ke riwayat
      const history = this.getEvaluationHistory();
      history.unshift(dataWithTimestamp);
      if (history.length > 10) history.pop(); // Batasi 10 riwayat terakhir
      localStorage.setItem(StorageKeys.EVALUATION_HISTORY, JSON.stringify(history));

      return true;
    } catch (e) {
      console.error('Gagal menyimpan hasil evaluasi:', e);
      return false;
    }
  },

  getLastEvaluationResult() {
    try {
      const data = localStorage.getItem(StorageKeys.LAST_EVALUATION);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Gagal membaca hasil evaluasi:', e);
      return null;
    }
  },

  getEvaluationHistory() {
    try {
      const data = localStorage.getItem(StorageKeys.EVALUATION_HISTORY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  markTopicCompleted(topicId) {
    try {
      const raw = localStorage.getItem(StorageKeys.COMPLETED_TOPICS);
      const list = raw ? JSON.parse(raw) : [];
      if (!list.includes(topicId)) {
        list.push(topicId);
        localStorage.setItem(StorageKeys.COMPLETED_TOPICS, JSON.stringify(list));
      }
    } catch (e) {}
  },

  getCompletedTopics() {
    try {
      const raw = localStorage.getItem(StorageKeys.COMPLETED_TOPICS);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }
};

