// Menu hambúrguer toggle
// Versão: 2.0 - Fixed typing effect
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
});

// Fechar menu ao clicar em um link
const navLinks = document.querySelectorAll('.nav a');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Smooth scroll para a seção
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        // Fechar menu com delay para suavizar
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
        
        if (targetSection) {
            // Ajustar offset baseado na seção
            let headerOffset = 80;
            
            // Para o footer, usar offset menor
            if (targetId === '#contato') {
                headerOffset = 20;
            }
            
            setTimeout(() => {
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }, 100);
        }
    });
});

// Efeito de digitação no título com destaque
const typingElement = document.querySelector('.typing-text');
if (typingElement) {
    const normalText = 'Lorem Ipsum Dolor ';
    const highlightText = 'Sit Amet';
    let i = 0;
    let j = 0;
    let highlightSpan = null;
    
    function typeWriter() {
        if (i < normalText.length) {
            typingElement.textContent += normalText.charAt(i);
            i++;
            setTimeout(typeWriter, 80);
        } else if (j < highlightText.length) {
            // Criar o span na primeira letra de "Sit Amet"
            if (j === 0) {
                highlightSpan = document.createElement('span');
                highlightSpan.className = 'highlight';
                typingElement.appendChild(highlightSpan);
            }
            // Adicionar letra por letra dentro do span
            highlightSpan.textContent += highlightText.charAt(j);
            j++;
            
            // Se for a última letra, remover o cursor imediatamente
            if (j === highlightText.length) {
                typingElement.style.setProperty('--cursor-display', 'none');
            }
            
            setTimeout(typeWriter, 80);
        }
    }
    
    typeWriter();
}

// File input handlers
const pdfInput = document.getElementById('pdf-file');
const xlsxInput = document.getElementById('xlsx-file');
const pdfName = document.getElementById('pdf-name');
const xlsxName = document.getElementById('xlsx-name');
const processBtn = document.getElementById('process-btn');
const progressContainer = document.getElementById('progress-container');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const successMessage = document.getElementById('success-message');

// File selection handlers
pdfInput.addEventListener('change', function(e) {
    if (this.files && this.files[0]) {
        pdfName.textContent = this.files[0].name;
        pdfName.style.color = '#0C7E92';
    } else {
        pdfName.textContent = 'Nenhum arquivo selecionado';
        pdfName.style.color = 'rgba(255, 255, 255, 0.6)';
    }
});

xlsxInput.addEventListener('change', function(e) {
    if (this.files && this.files[0]) {
        xlsxName.textContent = this.files[0].name;
        xlsxName.style.color = '#0C7E92';
    } else {
        xlsxName.textContent = 'Nenhum arquivo selecionado';
        xlsxName.style.color = 'rgba(255, 255, 255, 0.6)';
    }
});

// Click on upload area to trigger file input
document.querySelectorAll('.file-upload').forEach((upload, index) => {
    upload.addEventListener('click', function() {
        if (index === 0) {
            pdfInput.click();
        } else {
            xlsxInput.click();
        }
    });
});

// Process button handler
processBtn.addEventListener('click', function() {
    const pdfFile = pdfInput.files[0];
    const xlsxFile = xlsxInput.files[0];
    const processType = document.querySelector('input[name="process-type"]:checked').value;
    
    // Validation
    if (!pdfFile) {
        alert('Por favor, selecione um arquivo PDF.');
        return;
    }
    
    if (!xlsxFile) {
        alert('Por favor, selecione um arquivo XLSX.');
        return;
    }
    
    // Hide success message if visible
    successMessage.style.display = 'none';
    
    // Show progress bar
    progressContainer.style.display = 'block';
    progressFill.style.width = '0%';
    progressText.textContent = '0%';
    
    // Disable button
    processBtn.disabled = true;
    processBtn.style.opacity = '0.6';
    processBtn.style.cursor = 'not-allowed';
    
    // Simulate processing with progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Show success message after a short delay
            setTimeout(() => {
                progressContainer.style.display = 'none';
                successMessage.style.display = 'flex';
                
                // Re-enable button
                processBtn.disabled = false;
                processBtn.style.opacity = '1';
                processBtn.style.cursor = 'pointer';
                
                // Simulate download (in a real implementation, this would download the processed files)
                console.log('Processing complete!');
                console.log('Process type:', processType);
                console.log('PDF file:', pdfFile.name);
                console.log('XLSX file:', xlsxFile.name);
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            }, 500);
        }
        
        progressFill.style.width = progress + '%';
        progressText.textContent = Math.round(progress) + '%';
    }, 200);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll for steps
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all steps
document.querySelectorAll('.step').forEach(step => {
    observer.observe(step);
});

// Prevent default drag and drop on upload areas
document.querySelectorAll('.file-upload').forEach(upload => {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        upload.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    // Highlight on drag
    ['dragenter', 'dragover'].forEach(eventName => {
        upload.addEventListener(eventName, function() {
            this.style.background = 'rgba(12, 126, 146, 0.2)';
            this.style.borderColor = '#0C7E92';
        });
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        upload.addEventListener(eventName, function() {
            this.style.background = 'rgba(12, 126, 146, 0.08)';
            this.style.borderColor = 'rgba(12, 126, 146, 0.4)';
        });
    });
    
    // Handle drop
    upload.addEventListener('drop', function(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if (files.length > 0) {
            const file = files[0];
            const uploadIndex = Array.from(document.querySelectorAll('.file-upload')).indexOf(this);
            
            if (uploadIndex === 0 && file.type === 'application/pdf') {
                pdfInput.files = files;
                pdfName.textContent = file.name;
                pdfName.style.color = '#0C7E92';
            } else if (uploadIndex === 1 && (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel')) {
                xlsxInput.files = files;
                xlsxName.textContent = file.name;
                xlsxName.style.color = '#0C7E92';
            }
        }
    });
});
