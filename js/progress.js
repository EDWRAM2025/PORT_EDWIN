// ===================================
// PROGRESS TRACKING SYSTEM
// ===================================

class ProgressTracker {
    constructor() {
        this.storage = window.localStorage;
        this.storageKey = 'ery_course_progress';
        this.progress = this.loadProgress();
        this.init();
    }

    // Load progress from localStorage
    loadProgress() {
        const saved = this.storage.getItem(this.storageKey);
        return saved ? JSON.parse(saved) : {
            unidad1: { completed: [], progress: 0 },
            unidad2: { completed: [], progress: 0 },
            unidad3: { completed: [], progress: 0 },
            unidad4: { completed: [], progress: 0 }
        };
    }

    // Save progress to localStorage
    saveProgress() {
        this.storage.setItem(this.storageKey, JSON.stringify(this.progress));
    }

    // Mark lesson as completed
    completeLesson(unit, lessonId) {
        if (!this.progress[unit].completed.includes(lessonId)) {
            this.progress[unit].completed.push(lessonId);
            this.updateUnitProgress(unit);
            this.saveProgress();
            this.updateUI();
            return true;
        }
        return false;
    }

    // Mark lesson as incomplete
    uncompleteLesson(unit, lessonId) {
        const index = this.progress[unit].completed.indexOf(lessonId);
        if (index > -1) {
            this.progress[unit].completed.splice(index, 1);
            this.updateUnitProgress(unit);
            this.saveProgress();
            this.updateUI();
            return true;
        }
        return false;
    }

    // Toggle lesson completion
    toggleLesson(unit, lessonId) {
        if (this.isCompleted(unit, lessonId)) {
            return this.uncompleteLesson(unit, lessonId);
        } else {
            return this.completeLesson(unit, lessonId);
        }
    }

    // Check if lesson is completed
    isCompleted(unit, lessonId) {
        return this.progress[unit].completed.includes(lessonId);
    }

    // Update unit progress percentage
    updateUnitProgress(unit) {
        const totalLessons = this.getTotalLessons(unit);
        const completedLessons = this.progress[unit].completed.length;
        this.progress[unit].progress = totalLessons > 0
            ? Math.round((completedLessons / totalLessons) * 100)
            : 0;
    }

    // Get total lessons for a unit (default 4 weeks with 1 lesson each)
    getTotalLessons(unit) {
        const lessonsPerUnit = {
            unidad1: 4,
            unidad2: 4,
            unidad3: 4,
            unidad4: 4
        };
        return lessonsPerUnit[unit] || 4;
    }

    // Get unit progress
    getUnitProgress(unit) {
        return this.progress[unit];
    }

    // Get overall progress
    getOverallProgress() {
        const units = Object.keys(this.progress);
        const totalProgress = units.reduce((sum, unit) => sum + this.progress[unit].progress, 0);
        return Math.round(totalProgress / units.length);
    }

    // Update UI elements
    updateUI() {
        // Update progress in unit cards
        document.querySelectorAll('.unit-card').forEach(card => {
            const unitLink = card.getAttribute('href');
            if (unitLink) {
                const unitMatch = unitLink.match(/unidad(\d+)/);
                if (unitMatch) {
                    const unitKey = `unidad${unitMatch[1]}`;
                    const progressEl = card.querySelector('.unit-progress');
                    if (progressEl) {
                        const progress = this.progress[unitKey].progress;
                        progressEl.textContent = `${progress}% completado`;

                        // Add visual indicator
                        if (progress === 100) {
                            progressEl.innerHTML = `<span class="badge badge-success">✓ Completado</span>`;
                        } else if (progress > 0) {
                            progressEl.innerHTML = `<span class="badge badge-info">${progress}% en progreso</span>`;
                        }
                    }
                }
            }
        });

        // Update progress bars and check for 100%
        document.querySelectorAll('.progress-bar').forEach(bar => {
            const unit = bar.dataset.unit;
            if (unit && this.progress[unit]) {
                const progress = this.progress[unit].progress;
                bar.style.width = `${progress}%`;

                // Show trophy celebration at 100%
                if (progress === 100 && this.progress[unit].completed.length > 0) {
                    this.showTrophyCelebration(unit);
                }
            }
        });

        // Update checkboxes
        document.querySelectorAll('.lesson-checkbox').forEach(checkbox => {
            const unit = checkbox.dataset.unit;
            const lessonId = checkbox.dataset.lessonId;
            if (unit && lessonId) {
                checkbox.checked = this.isCompleted(unit, lessonId);
            }
        });
    }

    // Initialize event listeners
    init() {
        this.updateUI();

        // Listen for lesson completion events
        document.addEventListener('click', (e) => {
            const checkbox = e.target.closest('.lesson-checkbox');
            if (checkbox) {
                const unit = checkbox.dataset.unit;
                const lessonId = checkbox.dataset.lessonId;
                if (unit && lessonId) {
                    this.toggleLesson(unit, lessonId);

                    // Show notification
                    const isCompleted = this.isCompleted(unit, lessonId);
                    if (isCompleted) {
                        window.ERY.utils.showNotification('¡Lección completada! 🎉', 'success');
                    } else {
                        window.ERY.utils.showNotification('Lección marcada como pendiente', 'info');
                    }
                }
            }
        });

        // Listen for complete unit button
        document.addEventListener('click', (e) => {
            const completeBtn = e.target.closest('.complete-unit-btn');
            if (completeBtn) {
                const unit = completeBtn.dataset.unit;
                if (unit) {
                    this.completeAllLessons(unit);
                }
            }
        });
    }

    // Complete all lessons in a unit
    completeAllLessons(unit) {
        const totalLessons = this.getTotalLessons(unit);
        for (let i = 1; i <= totalLessons; i++) {
            const lessonId = `semana${i}`;
            if (!this.isCompleted(unit, lessonId)) {
                this.completeLesson(unit, lessonId);
            }
        }
        window.ERY.utils.showNotification('¡Unidad completada! 🎊', 'success');
    }

    // Reset all progress
    resetProgress() {
        if (confirm('¿Estás seguro de que quieres reiniciar todo el progreso?')) {
            this.progress = {
                unidad1: { completed: [], progress: 0 },
                unidad2: { completed: [], progress: 0 },
                unidad3: { completed: [], progress: 0 },
                unidad4: { completed: [], progress: 0 }
            };
            this.saveProgress();
            this.updateUI();
            window.ERY.utils.showNotification('Progreso reiniciado', 'info');
        }
    }

    // Export progress data
    exportProgress() {
        const dataStr = JSON.stringify(this.progress, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `ery_cursos_progress_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }

    // Import progress data
    importProgress(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const imported = JSON.parse(e.target.result);
                this.progress = imported;
                this.saveProgress();
                this.updateUI();
                window.ERY.utils.showNotification('Progreso importado exitosamente', 'success');
            } catch (error) {
                window.ERY.utils.showNotification('Error al importar progreso', 'error');
            }
        };
        reader.readAsText(file);
    }

    // Show trophy celebration
    showTrophyCelebration(unit) {
        // Check if already shown for this unit this session
        const celebrationKey = `celebration_${unit}`;
        if (sessionStorage.getItem(celebrationKey)) {
            return; // Already celebrated this session
        }

        // Create celebration modal
        const modal = document.createElement('div');
        modal.className = 'trophy-modal';
        modal.innerHTML = `
            <div class="trophy-container">
                <div class="trophy-content">
                    <div class="trophy-icon">🏆</div>
                    <h2 class="trophy-title">¡Felicitaciones!</h2>
                    <p class="trophy-message">Has completado el 100% de ${unit.toUpperCase().replace('UNIDAD', 'UNIDAD ')}</p>
                    <button class="btn btn-primary trophy-close">Continuar</button>
                </div>
                <div class="confetti"></div>
            </div>
        `;

        document.body.appendChild(modal);

        // Trigger animation
        setTimeout(() => modal.classList.add('show'), 10);

        // Add confetti animation
        this.createConfetti(modal.querySelector('.confetti'));

        // Close button
        modal.querySelector('.trophy-close').addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        });

        // Mark as celebrated this session
        sessionStorage.setItem(celebrationKey, 'true');

        // Play success sound if available
        this.playSuccessSound();
    }

    // Create confetti effect
    createConfetti(container) {
        const colors = ['#FF7A48', '#0593A2', '#103778', '#E3371E', '#FFD700'];
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 2 + 's';
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            container.appendChild(confetti);
        }
    }

    // Play success sound
    playSuccessSound() {
        try {
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDc iUFLIHO8tiJNwgZaLvt5qxxHwUthssx');
            audio.volume = 0.3;
            audio.play().catch(() => { }); // Ignore if autoplay blocked
        } catch (e) {
            // Silently fail if audio not supported
        }
    }
}

// Initialize progress tracker
document.addEventListener('DOMContentLoaded', () => {
    window.progressTracker = new ProgressTracker();

    // Export to ERY namespace
    window.ERY = window.ERY || {};
    window.ERY.progressTracker = window.progressTracker;
});
