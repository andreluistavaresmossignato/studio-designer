document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('close-lightbox');
    const prevBtn = document.getElementById('prev-lightbox');
    const nextBtn = document.getElementById('next-lightbox');
    const images = document.querySelectorAll('.portfolio-grid img');
  
    let currentIndex = 0;
    let visibleImages = [];
  
    // Função para atualizar lista de imagens visíveis (respeita o filtro)
    function updateVisibleImages() {
      visibleImages = Array.from(images).filter(img => img.style.display !== 'none');
    }
  
    // Abrir lightbox
    images.forEach((img, index) => {
      img.addEventListener('click', () => {
        updateVisibleImages();
        const visibleIndex = visibleImages.indexOf(img);
        if (visibleIndex === -1) return;
  
        currentIndex = visibleIndex;
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });
  
    // Fechar
    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  
    // Função para trocar de imagem com fade
    function showImage(imgElement) {
      const content = document.querySelector('.lightbox-content');
      content.style.opacity = 0;
      content.style.transform = 'scale(0.98)';
      
      setTimeout(() => {
        lightboxImg.src = imgElement.src;
        lightboxImg.alt = imgElement.alt;
        content.style.opacity = 1;
        content.style.transform = 'scale(1)';
      }, 200);
    }

  // Navegação
  prevBtn.addEventListener('click', () => {
    updateVisibleImages();
    if (visibleImages.length === 0) return;
    currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
    showImage(visibleImages[currentIndex]);
  });

  nextBtn.addEventListener('click', () => {
    updateVisibleImages();
    if (visibleImages.length === 0) return;
    currentIndex = (currentIndex + 1) % visibleImages.length;
    showImage(visibleImages[currentIndex]);
  });

  // Abrir lightbox (com animação)
  images.forEach(img => {
    img.addEventListener('click', () => {
      updateVisibleImages();
      const visibleIndex = visibleImages.indexOf(img);
      if (visibleIndex === -1) return;

      currentIndex = visibleIndex;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Força repaint para garantir animação
      setTimeout(() => {
        const content = document.querySelector('.lightbox-content');
        content.style.opacity = 1;
        content.style.transform = 'scale(1)';
      }, 10);
    });
  });
  
    // Teclado
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevBtn.click();
      if (e.key === 'ArrowRight') nextBtn.click();
    });
});