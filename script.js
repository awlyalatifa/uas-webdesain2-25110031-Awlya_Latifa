document.addEventListener("DOMContentLoaded", function () {
    console.log("Premium Bakery Fresh Green SPA System Activated successfully.");

    // CORE ROUTING ENGINE SPA TANPA RELOAD
    const navButtons = document.querySelectorAll("[data-page]");
    const allSections = document.querySelectorAll(".page-section");

    function executeRouting(pageTarget) {
        allSections.forEach(sec => {
            sec.classList.remove("active-page");
            if (sec.id === `page-${pageTarget}`) {
                sec.classList.add("active-page");
            }
        });

        document.querySelectorAll(".nav-link-cute").forEach(link => {
            link.classList.remove("active");
        });

        const correspondingNav = document.querySelector(`.nav-link-cute[data-page="${pageTarget}"]`);
        if (correspondingNav) {
            correspondingNav.classList.add("active");
        }

        // Auto collapse mobile menu
        const navbarCollapseElement = document.getElementById("mainNavbar");
        if (navbarCollapseElement && navbarCollapseElement.classList.contains("show")) {
            const bootstrapCollapseInstance = bootstrap.Collapse.getInstance(navbarCollapseElement) 
                                              || new bootstrap.Collapse(navbarCollapseElement);
            bootstrapCollapseInstance.hide();
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navButtons.forEach(btn => {
        btn.addEventListener("click", function (event) {
            event.preventDefault(); 
            const destinationPage = this.getAttribute("data-page");
            executeRouting(destinationPage);
        });
    });

    // Inisialisasi Tooltip & Popover
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    [...popoverTriggerList].map(popEl => new bootstrap.Popover(popEl));

    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].map(toolEl => new bootstrap.Tooltip(toolEl));

    // Transfer Data ke Modal Detail
    const modalDetailElement = document.getElementById('modalDetail');
    if (modalDetailElement) {
        modalDetailElement.addEventListener('show.bs.modal', function (event) {
            const triggerButton = event.relatedTarget; 
            const productName = triggerButton.getAttribute('data-name');
            const productDescription = triggerButton.getAttribute('data-desc');

            modalDetailElement.querySelector('#modalNamaProduk').innerText = productName;
            modalDetailElement.querySelector('#modalDescProduk').innerText = productDescription;
        });
    }

    // WhatsApp Order Placeholder Alert
    const orderNotifButtons = document.querySelectorAll('.btn-order-notif');
    orderNotifButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetMenu = this.getAttribute('data-name');
            alert(`Sistem sedang mengalihkan Anda ke WhatsApp Admin Yummi Company Bakery untuk pemesanan: "${targetMenu}".`);
        });
    });

    // Validasi Form Kontak
    const formKontak = document.getElementById("formKontak");
    const contactAlert = document.getElementById("contactAlert");
    const btnSubmit = document.getElementById("btnSubmit");
    const btnText = document.getElementById("btnText");

    if (formKontak) {
        formKontak.addEventListener("submit", function (event) {
            event.preventDefault();
            if (!formKontak.checkValidity()) {
                formKontak.classList.add("was-validated");
            } else {
                formKontak.classList.remove("was-validated");
                btnSubmit.disabled = true;
                btnText.innerHTML = `<i class="fas fa-spinner fa-spin me-2"></i> Memproses Pesan...`;

                setTimeout(() => {
                    contactAlert.classList.remove("d-none");
                    formKontak.reset();
                    btnSubmit.disabled = false;
                    btnText.innerHTML = `KIRIM FORMULIR`;

                    setTimeout(() => {
                        contactAlert.classList.add("d-none");
                    }, 4000);
                }, 1500);
            }
        });
    }
});
