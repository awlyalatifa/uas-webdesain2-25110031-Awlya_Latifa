// 1. Logika SPA (Single Page Application) - Manipulasi Class Active tanpa Reload Halaman
function switchPage(pageId) {
    // Cari semua elemen ber-class page-section
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.classList.remove('active'); // Sembunyikan semua section
    });

    // Tampilkan section yang dituju
    const activeSection = document.getElementById(pageId);
    if (activeSection) {
        activeSection.classList.add('active');
    }

    // Perbarui status tautan menu navbar
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.getElementById(`nav-${pageId}`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // Otomatis menutup hamburger menu navbar di view mobile setelah link diklik
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse.classList.contains('show')) {
        const bootstrapCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        bootstrapCollapse.hide();
    }

    // Scroll otomatis ke bagian paling atas layar saat berganti halaman
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 2. Inisialisasi Fitur Bootstrap Tooltip (Untuk info Alergen Menu)
document.addEventListener("DOMContentLoaded", function () {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// 3. Form Validation & Button Loading State (Fitur interaktif halaman Kontak)
function validateForm(event) {
    event.preventDefault(); // Mencegah reload halaman bawaan form browser
    
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('userName');
    const messageInput = document.getElementById('userMessage');
    
    const btnSubmit = document.getElementById('btnSubmit');
    const btnText = document.getElementById('btnText');
    const btnSpinner = document.getElementById('btnSpinner');

    // Cek kecocokan validasi elemen Bootstrap
    if (!form.checkValidity()) {
        event.stopPropagation();
        form.classList.add('was-validated');
    } else {
        // Jika validasi berhasil, aktifkan button loading state
        btnSubmit.disabled = true;
        btnText.innerText = "Sedang Memproses...";
        btnSpinner.classList.remove('d-none');

        // Simulasi proses pengiriman data selama 2 detik
        setTimeout(() => {
            alert(`Terima kasih ${nameInput.value}, pesan Anda berhasil dikirim ke pihak Yummi Bakery!`);
            
            // Reset state form seperti semula
            form.reset();
            form.classList.remove('was-validated');
            btnSubmit.disabled = false;
            btnText.innerText = "Kirim Pesan";
            btnSpinner.classList.add('d-none');
        }, 2000);
    }
}
