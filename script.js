/* ============================================================
   SCRIPT.JS — VICTOR TECH (Shared across all pages)
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {

    // ===== THEME TOGGLE =====
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        const html = document.documentElement;
        if (localStorage.getItem('theme') === 'dark') {
            html.setAttribute('data-theme', 'dark');
            icon.className = 'fas fa-sun';
        }
        themeToggle.addEventListener('click', function() {
            if (html.getAttribute('data-theme') === 'dark') {
                html.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                icon.className = 'fas fa-moon';
            } else {
                html.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                icon.className = 'fas fa-sun';
            }
        });
    }


    // ===== STICKY HEADER =====
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ===== SCROLL REVEAL (Intersection Observer) =====
    const revealElements = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        revealElements.forEach(function(el) { observer.observe(el); });
    } else {
        function checkReveal() {
            var windowHeight = window.innerHeight;
            var elements = document.querySelectorAll('.reveal:not(.visible)');
            elements.forEach(function(el) {
                var rect = el.getBoundingClientRect();
                if (rect.top < windowHeight - 100) {
                    el.classList.add('visible');
                }
            });
        }
        window.addEventListener('scroll', checkReveal);
        window.addEventListener('load', checkReveal);
        setTimeout(checkReveal, 300);
    }

    // ===== ANIMATED COUNTERS =====
    const counters = document.querySelectorAll('.counter-item .number, .hero-stats .stat-number');
    if (counters.length) {
        let countersAnimated = false;
        function animateCounters() {
            if (countersAnimated) return;
            const trigger = document.querySelector('.counters-grid') || document.querySelector('.hero-stats');
            if (!trigger) return;
            const rect = trigger.getBoundingClientRect();
            if (rect.top < window.innerHeight - 80) {
                countersAnimated = true;
                counters.forEach(function(counter) {
                    const target = parseInt(counter.getAttribute('data-count') || '0');
                    let current = 0;
                    const increment = Math.ceil(target / 60);
                    const interval = setInterval(function() {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(interval);
                        }
                        counter.textContent = current;
                        if (target === 98) counter.textContent = current + '%';
                    }, 30);
                });
            }
        }
        if ('IntersectionObserver' in window) {
            const obs = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) { animateCounters(); obs.unobserve(entry.target); }
                });
            }, { threshold: 0.1 });
            const trigger = document.querySelector('.counters-grid') || document.querySelector('.hero-stats');
            if (trigger) obs.observe(trigger);
        } else {
            window.addEventListener('scroll', animateCounters);
            window.addEventListener('load', function() { setTimeout(animateCounters, 500); });
            setTimeout(animateCounters, 500);
        }
    }

    // ===== PORTFOLIO (only on portfolio page) =====
    const portfolioGrid = document.getElementById('portfolioGrid');
    if (portfolioGrid) {

        // ========== PORTFOLIO DATA ==========
        var portfolioData = [
            // ============================================================
            // WEBSITES & PORTALS
            // ============================================================
            {
                id: 1,
                category: 'websites',
                title: 'BrightFuture Schools Website',
                desc: 'Modern educational website with online enrollment system, student portal, and parent communication tools.',
                media: 'images/websites/seeta university.jfif',
                type: 'image',
                websiteUrl: 'https://su.ac.ug/',
                gallery: [
                    'https://placehold.co/800x500/8E1C1C/FFFFFF?text=Homepage',
                    'https://placehold.co/800x500/E4A83B/1A1714?text=Student+Portal',
                    'https://placehold.co/800x500/2a2520/FFFFFF?text=Parent+Dashboard'
                ],
                features: [
                    'Online Enrollment',
                    'Student Portal',
                    'Parent Dashboard',
                    'Payment Integration',
                    'Academic Calendar',
                    'Teacher Management'
                ],
                tech: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL', 'Bootstrap'],
                live: true,
                featured: true
            },
            {
                id: 2,
                category: 'websites',
                title: 'JMS Enterprises E-Commerce',
                desc: 'Full-featured online store with payment integration, inventory management, and customer dashboard.',
                media: 'images/websites/JIJI.png',
                type: 'image',
                websiteUrl: 'https://jiji.ug/',
                gallery: [
                    'https://placehold.co/800x500/E4A83B/1A1714?text=Homepage',
                    'https://placehold.co/800x500/8E1C1C/FFFFFF?text=Product+Catalog',
                    'https://placehold.co/800x500/2a2520/FFFFFF?text=Shopping+Cart',
                    'https://placehold.co/800x500/8E1C1C/FFFFFF?text=Checkout'
                ],
                features: [
                    'Product Catalog',
                    'Shopping Cart',
                    'Payment Gateway',
                    'Order Tracking',
                    'Inventory Management',
                    'Customer Dashboard'
                ],
                tech: ['React', 'Node.js', 'MongoDB', 'Stripe API', 'Tailwind CSS'],
                live: true
            },
            {
                id: 3,
                category: 'websites',
                title: 'Makerere University Portal',
                desc: 'Complete student management portal with course registration, grade tracking, and fee management.',
                media: 'images/websites/makerere university.jfif',
                type: 'image',
                websiteUrl: 'https://myportal.mak.ac.ug/',
                gallery: [
                    'https://placehold.co/800x500/2a2520/FFFFFF?text=Student+Dashboard',
                    'https://placehold.co/800x500/8E1C1C/FFFFFF?text=Course+Registration',
                    'https://placehold.co/800x500/E4A83B/1A1714?text=Grade+Viewing',
                    'https://placehold.co/800x500/2a2520/FFFFFF?text=Fee+Management'
                ],
                features: [
                    'Student Registration',
                    'Course Enrollment',
                    'Grade Viewing',
                    'Fee Management',
                    'Academic Calendar',
                    'Faculty Dashboard',
                    'Parent Access',
                    'Mobile App Integration'
                ],
                tech: ['Laravel', 'Vue.js', 'PostgreSQL', 'Redis', 'AWS'],
                live: true,
                portal: true
            },

            // ============================================================
            // BRANDING
            // ============================================================
            {
                id: 4,
                category: 'branding',
                title: 'Complete Brand Identity Suite',
                desc: 'Full branding package including logo, stationery, and style guide.',
                media: 'images/branding/full branding suite.png',
                type: 'image'
            },
            {
                id: 5,
                category: 'branding',
                title: 'Corporate Brand Refresh',
                desc: 'Modern rebranding for a leading financial institution.',
                media: 'images/branding/avalon.png',
                type: 'image'
            },

            // ============================================================
            // LOGOS
            // ============================================================
            {
                id: 6,
                category: 'logos',
                title: 'Elegant Logo Design',
                desc: 'Minimalist logo concept for a luxury brand.',
                media: 'images/logos/logo.png',
                type: 'image'
            },
            {
                id: 7,
                category: 'logos',
                title: 'Creative Logo Suite',
                desc: 'Versatile logo variations for digital and print use.',
                media: 'images/logos/Pole Power Supply Logo 2.png',
                type: 'image'
            },

            // ============================================================
            // POSTERS
            // ============================================================
            {
                id: 8,
                category: 'posters',
                title: 'Event Poster Design',
                desc: 'Eye-catching poster for a music festival.',
                media: 'images/posters/Mrs Florence Birthday.png',
                type: 'image'
            },
            {
                id: 9,
                category: 'posters',
                title: 'Corporate Poster Series',
                desc: 'Professional poster series for a product launch.',
                media: 'https://placehold.co/600x400/E4A83B/1A1714?text=Poster+Series',
                type: 'image'
            },

            // ============================================================
            // PHOTOGRAPHY
            // ============================================================
            {
                id: 10,
                category: 'photography',
                title: 'Wedding Photography',
                desc: 'Beautiful wedding coverage with candid and posed shots.',
                media: 'https://placehold.co/600x400/8E1C1C/FFFFFF?text=Wedding+Photography',
                type: 'image'
            },
            {
                id: 11,
                category: 'photography',
                title: 'Corporate Headshots',
                desc: 'Professional headshot photography for executive team.',
                media: 'https://placehold.co/600x400/E4A83B/1A1714?text=Corporate+Headshots',
                type: 'image'
            },
            {
                id: 12,
                category: 'photography',
                title: 'Event Coverage',
                desc: 'Full event photography for a corporate gala.',
                media: 'https://placehold.co/600x400/2a2520/FFFFFF?text=Event+Coverage',
                type: 'image'
            },

            // ============================================================
            // VIDEOGRAPHY — WITH THUMBNAILS
            // ============================================================
            {
                id: 13,
                category: 'videography',
                title: 'CEO Maria\'s Bridal Kukyala',
                desc: 'Beautiful bridal introduction ceremony coverage with cinematic editing.',
                media: 'images/videography/thumbnails/ceo marias bridal.png',
                type: 'video',
                duration: '0:56',
                videoUrl: 'images/videography/CEO Maria’s Bridal Kukyala.mp4'
            },
            {
                id: 14,
                category: 'videography',
                title: 'Natasha Introduction Ceremony',
                desc: 'Elegant wedding introduction ceremony highlight film.',
                media: 'images/videography/thumbnails/natasha.png',
                type: 'video',
                duration: '1:49',
                videoUrl: 'images/videography/natasha_intro.mp4'
            },

            // ============================================================
            // PRINTING WORKS
            // ============================================================
            {
                id: 15,
                category: 'printing',
                title: 'Premium Business Cards',
                desc: 'High-quality business cards with spot UV finish.',
                media: 'images/printing/Business card mockup.png',
                type: 'image'
            },
            {
                id: 16,
                category: 'printing',
                title: 'Event Banners & Signage',
                desc: 'Large format printing for conference and events.',
                media: 'https://placehold.co/600x400/E4A83B/1A1714?text=Banners+%26+Signage',
                type: 'image'
            },
            {
                id: 17,
                category: 'printing',
                title: 'Certificate & Stationery',
                desc: 'Premium certificate design and stationery suite.',
                media: 'https://placehold.co/600x400/2a2520/FFFFFF?text=Certificate+Design',
                type: 'image'
            },

            // ============================================================
            // BEFORE/AFTER
            // ============================================================
            {
                id: 18,
                category: 'beforeafter',
                title: 'Website Redesign',
                desc: 'Complete before and after transformation of a corporate website.',
                media: 'https://placehold.co/600x400/8E1C1C/FFFFFF?text=Website+Before',
                mediaAfter: 'https://placehold.co/600x400/E4A83B/1A1714?text=Website+After',
                type: 'beforeafter'
            },
            {
                id: 19,
                category: 'beforeafter',
                title: 'Brand Identity Overhaul',
                desc: 'Before and after of a complete brand identity refresh.',
                media: 'https://placehold.co/600x400/8E1C1C/FFFFFF?text=Brand+Before',
                mediaAfter: 'https://placehold.co/600x400/E4A83B/1A1714?text=Brand+After',
                type: 'beforeafter'
            },
            {
                id: 20,
                category: 'beforeafter',
                title: 'Photo Retouching',
                desc: 'Professional photo retouching and color grading before/after.',
                media: 'https://placehold.co/600x400/8E1C1C/FFFFFF?text=Photo+Before',
                mediaAfter: 'https://placehold.co/600x400/E4A83B/1A1714?text=Photo+After',
                type: 'beforeafter'
            }
        ];

        // ========== RENDER PORTFOLIO ==========
        function renderPortfolio(filter) {
            filter = filter || 'all';
            var filtered = filter === 'all' ? portfolioData : portfolioData.filter(function(item) {
                return item.category === filter;
            });

            if (filtered.length === 0) {
                portfolioGrid.innerHTML = '<div class="portfolio-empty"><i class="fas fa-search"></i><p>No projects found in this category.</p></div>';
                return;
            }

            portfolioGrid.innerHTML = filtered.map(function(item, index) {
                return buildPortfolioItem(item, index);
            }).join('');

            document.querySelectorAll('.portfolio-item').forEach(function(el, idx) {
                el.addEventListener('click', function() {
                    var index = parseInt(this.dataset.index);
                    openLightbox(index);
                });
            });
        }

        function buildPortfolioItem(item, index) {
            var mediaHtml = '';
            var badgeHtml = '';
            var overlayIcon = '';
            var extraClass = '';
            var actionsHtml = '';

            switch(item.type) {
                case 'image':
                    mediaHtml = '<img src="' + item.media + '" alt="' + item.title + '" class="portfolio-image" loading="lazy" />';
                    overlayIcon = 'fa-image';
                    break;
                case 'video':
                    mediaHtml = '<img src="' + item.media + '" alt="' + item.title + '" class="portfolio-image" loading="lazy" />';
                    mediaHtml += '<div class="video-play"><i class="fas fa-play"></i></div>';
                    if (item.duration) {
                        mediaHtml += '<span class="video-duration">' + item.duration + '</span>';
                    }
                    overlayIcon = 'fa-video';
                    break;
                case 'beforeafter':
                    mediaHtml = '<img src="' + item.media + '" alt="' + item.title + ' — Before" class="portfolio-image" loading="lazy" />';
                    badgeHtml = '<span class="beforeafter-badge"><i class="fas fa-arrows-left-right"></i> Before/After</span>';
                    overlayIcon = 'fa-arrows-left-right';
                    extraClass = ' beforeafter-item';
                    break;
                default:
                    mediaHtml = '<img src="' + item.media + '" alt="' + item.title + '" class="portfolio-image" loading="lazy" />';
                    overlayIcon = 'fa-folder';
            }

            if (item.live && item.websiteUrl) {
                badgeHtml += '<span class="live-badge"><i class="fas fa-link"></i> Live</span>';
            }

            if (item.websiteUrl) {
                actionsHtml += '<a href="' + item.websiteUrl + '" target="_blank" class="overlay-btn primary-btn" onclick="event.stopPropagation();"><i class="fas fa-external-link-alt"></i> Visit</a>';
            }
            if (item.gallery && item.gallery.length > 1) {
                actionsHtml += '<button class="overlay-btn secondary-btn" onclick="event.stopPropagation();openLightbox(' + index + ');"><i class="fas fa-images"></i> Gallery</button>';
            }

            var categoryLabels = {
                'websites': 'Website',
                'branding': 'Branding',
                'logos': 'Logo Design',
                'posters': 'Poster',
                'photography': 'Photography',
                'videography': 'Video',
                'printing': 'Printing',
                'beforeafter': 'Before/After'
            };
            var categoryLabel = categoryLabels[item.category] || item.category;

            return '<div class="portfolio-item' + extraClass + '" data-index="' + index + '" data-category="' + item.category + '">' +
                badgeHtml +
                mediaHtml +
                '<span class="category-badge">' + categoryLabel + '</span>' +
                '<div class="overlay">' +
                '<div class="overlay-icon"><i class="fas ' + overlayIcon + '"></i></div>' +
                '<h4>' + item.title + '</h4>' +
                '<p>' + item.desc + '</p>' +
                (actionsHtml ? '<div class="overlay-actions">' + actionsHtml + '</div>' : '') +
                '<span class="overlay-tag">Click to view details</span>' +
                '</div>' +
                '</div>';
        }

        // ========== LIGHTBOX ==========
        var lightboxData = [];
        var currentLightboxIndex = 0;
        var currentGallerySlide = 0;
        var galleryItems = [];

        function openLightbox(index) {
            var filteredItems = document.querySelectorAll('.portfolio-item');
            var allItems = [];
            document.querySelectorAll('.portfolio-item').forEach(function(el) {
                allItems.push(el);
            });

            lightboxData = [];
            allItems.forEach(function(el) {
                var idx = parseInt(el.dataset.index);
                var item = portfolioData[idx];
                if (item) {
                    lightboxData.push(item);
                }
            });

            var clickedItem = portfolioData[parseInt(filteredItems[index].dataset.index)];
            lightboxData.forEach(function(item, i) {
                if (item.id === clickedItem.id) {
                    currentLightboxIndex = i;
                }
            });

            currentGallerySlide = 0;
            showLightboxItem(currentLightboxIndex);
            document.getElementById('lightboxOverlay').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function showLightboxItem(index) {
            var item = lightboxData[index];
            if (!item) return;

            var mediaContainer = document.getElementById('lightboxMedia');
            var infoContainer = document.getElementById('lightboxInfo');

            var mediaHtml = '';

            if (item.gallery && item.gallery.length > 0) {
                galleryItems = item.gallery;
                currentGallerySlide = 0;
                mediaHtml = buildGalleryHtml(galleryItems, 0);
            } else if (item.type === 'image') {
                mediaHtml = '<img src="' + item.media + '" alt="' + item.title + '" />';
            } else if (item.type === 'video') {
                var videoFile = item.videoUrl || item.media;
                var posterFile = item.media || '';
                var videoExt = videoFile.split('.').pop().toLowerCase();
                var mimeType = 'video/mp4';
                if (videoExt === 'webm') mimeType = 'video/webm';
                else if (videoExt === 'ogg') mimeType = 'video/ogg';
                else if (videoExt === 'mov') mimeType = 'video/quicktime';

                mediaHtml = '<div style="position:relative;width:100%;display:flex;align-items:center;justify-content:center;min-height:200px;">' +
                    '<div class="video-loading" style="position:absolute;color:rgba(255,255,255,0.6);font-size:1rem;z-index:1;">' +
                    '<i class="fas fa-spinner fa-spin"></i> Loading video...' +
                    '</div>' +
                    '<video controls playsinline preload="metadata" style="max-width:100%;max-height:70vh;border-radius:var(--radius);z-index:2;background:#000;width:100%;"' +
                    ' poster="' + posterFile + '">' +
                    '<source src="' + videoFile + '" type="' + mimeType + '" />' +
                    '<p style="padding:2rem;text-align:center;color:rgba(255,255,255,0.7);">' +
                    'Your browser does not support this video format. ' +
                    '<a href="' + videoFile + '" download style="color:var(--orange);">Download</a>' +
                    '</p>' +
                    '</video>' +
                    '</div>';
            } else if (item.type === 'beforeafter') {
                mediaHtml = '<div class="beforeafter-container">' +
                    '<div class="ba-item">' +
                    '<span class="ba-label before"><i class="fas fa-arrow-left"></i> Before</span>' +
                    '<img src="' + item.media + '" alt="Before" />' +
                    '</div>' +
                    '<div class="ba-divider"><i class="fas fa-arrows-left-right"></i></div>' +
                    '<div class="ba-item">' +
                    '<span class="ba-label after">After <i class="fas fa-arrow-right"></i></span>' +
                    '<img src="' + item.mediaAfter + '" alt="After" />' +
                    '</div>' +
                    '</div>';
            } else {
                mediaHtml = '<img src="' + item.media + '" alt="' + item.title + '" />';
            }

            mediaContainer.innerHTML = mediaHtml;

            var video = mediaContainer.querySelector('video');
            if (video) {
                var loadingEl = mediaContainer.querySelector('.video-loading');
                video.addEventListener('loadeddata', function() {
                    if (loadingEl) loadingEl.style.display = 'none';
                    video.muted = false;
                    video.play().catch(function() {
                        video.muted = true;
                        video.play().catch(function(e) {});
                    });
                });
                video.addEventListener('error', function() {
                    if (loadingEl) {
                        loadingEl.innerHTML = '<i class="fas fa-exclamation-triangle" style="color:var(--orange);"></i> Video error. <a href="' + (item.videoUrl || item.media) + '" download style="color:var(--orange);">Download</a>';
                    }
                });
                setTimeout(function() {
                    if (loadingEl && loadingEl.style.display !== 'none') loadingEl.style.display = 'none';
                }, 8000);
            }

            var infoHtml = '<h3>' + item.title + '</h3>' +
                '<p>' + item.desc + '</p>' +
                '<span class="lightbox-category">' + item.category.charAt(0).toUpperCase() + item.category.slice(1) + '</span>';

            if (item.websiteUrl) {
                infoHtml += '<div class="lightbox-actions"><a href="' + item.websiteUrl + '" target="_blank" class="btn btn-secondary" style="margin-top:0.5rem;"><i class="fas fa-external-link-alt"></i> Visit Live Website</a></div>';
            }

            if (item.features && item.features.length > 0) {
                infoHtml += '<div class="lightbox-features"><h4><i class="fas fa-list-check" style="color:var(--orange);"></i> Features</h4><ul>';
                item.features.forEach(function(f) {
                    infoHtml += '<li><i class="fas fa-check" style="color:var(--orange);"></i> ' + f + '</li>';
                });
                infoHtml += '</ul></div>';
            }

            if (item.tech && item.tech.length > 0) {
                infoHtml += '<div class="lightbox-tech"><h4><i class="fas fa-code" style="color:var(--orange);"></i> Technologies</h4><div class="tech-tags">';
                item.tech.forEach(function(t) {
                    infoHtml += '<span class="tech-tag">' + t + '</span>';
                });
                infoHtml += '</div></div>';
            }

            infoContainer.innerHTML = infoHtml;

            document.getElementById('lightboxPrev').style.display = index > 0 ? 'flex' : 'none';
            document.getElementById('lightboxNext').style.display = index < lightboxData.length - 1 ? 'flex' : 'none';
        }

        function buildGalleryHtml(images, activeIndex) {
            var html = '<div class="lightbox-gallery" data-total="' + images.length + '">';
            images.forEach(function(img, i) {
                html += '<div class="gallery-item' + (i === activeIndex ? ' active' : '') + '">' +
                    '<img src="' + img + '" alt="Gallery image ' + (i + 1) + '" />' +
                    '</div>';
            });
            if (images.length > 1) {
                html += '<button class="gallery-prev"><i class="fas fa-chevron-left"></i></button>' +
                    '<button class="gallery-next"><i class="fas fa-chevron-right"></i></button>' +
                    '<div class="gallery-dots">';
                for (var i = 0; i < images.length; i++) {
                    html += '<span class="' + (i === activeIndex ? 'active' : '') + '" data-index="' + i + '"></span>';
                }
                html += '</div>';
            }
            html += '</div>';
            return html;
        }

        function navigateGallery(direction) {
            var galleryContainer = document.querySelector('.lightbox-gallery');
            if (!galleryContainer) return;
            var total = parseInt(galleryContainer.dataset.total);
            if (total <= 1) return;
            var items = galleryContainer.querySelectorAll('.gallery-item');
            var dots = galleryContainer.querySelectorAll('.gallery-dots span');
            var newIndex = currentGallerySlide + direction;
            if (newIndex < 0) newIndex = total - 1;
            if (newIndex >= total) newIndex = 0;
            currentGallerySlide = newIndex;

            items.forEach(function(el, i) {
                el.classList.toggle('active', i === newIndex);
            });
            dots.forEach(function(el, i) {
                el.classList.toggle('active', i === newIndex);
            });
        }

        // ========== LIGHTBOX EVENT BINDINGS ==========
        document.getElementById('lightboxClose').addEventListener('click', function() {
            closeLightbox();
        });

        document.getElementById('lightboxPrev').addEventListener('click', function() {
            navigateLightbox(-1);
        });

        document.getElementById('lightboxNext').addEventListener('click', function() {
            navigateLightbox(1);
        });

        document.getElementById('lightboxMedia').addEventListener('click', function(e) {
            var target = e.target;
            if (target.closest('.gallery-prev')) {
                navigateGallery(-1);
            } else if (target.closest('.gallery-next')) {
                navigateGallery(1);
            } else if (target.closest('.gallery-dots span')) {
                var dot = target.closest('.gallery-dots span');
                var index = parseInt(dot.dataset.index);
                if (!isNaN(index)) {
                    var galleryContainer = document.querySelector('.lightbox-gallery');
                    if (!galleryContainer) return;
                    var items = galleryContainer.querySelectorAll('.gallery-item');
                    var dots = galleryContainer.querySelectorAll('.gallery-dots span');
                    currentGallerySlide = index;
                    items.forEach(function(el, i) {
                        el.classList.toggle('active', i === index);
                    });
                    dots.forEach(function(el, i) {
                        el.classList.toggle('active', i === index);
                    });
                }
            }
        });

        document.getElementById('lightboxOverlay').addEventListener('click', function(e) {
            if (e.target === this) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', function(e) {
            if (!document.getElementById('lightboxOverlay').classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') {
                var gallery = document.querySelector('.lightbox-gallery');
                if (gallery && gallery.dataset.total > 1) {
                    navigateGallery(-1);
                } else {
                    navigateLightbox(-1);
                }
            }
            if (e.key === 'ArrowRight') {
                var gallery = document.querySelector('.lightbox-gallery');
                if (gallery && gallery.dataset.total > 1) {
                    navigateGallery(1);
                } else {
                    navigateLightbox(1);
                }
            }
            if (e.key === ' ' || e.key === 'Space') {
                e.preventDefault();
                var video = document.querySelector('#lightboxMedia video');
                if (video) {
                    if (video.paused) video.play();
                    else video.pause();
                }
            }
        });

        function closeLightbox() {
            document.getElementById('lightboxOverlay').classList.remove('active');
            document.body.style.overflow = '';
            var video = document.querySelector('#lightboxMedia video');
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
            currentGallerySlide = 0;
        }

        function navigateLightbox(direction) {
            var newIndex = currentLightboxIndex + direction;
            if (newIndex < 0 || newIndex >= lightboxData.length) return;
            currentLightboxIndex = newIndex;
            currentGallerySlide = 0;
            showLightboxItem(currentLightboxIndex);
        }

        // ========== FILTER BUTTONS ==========
        var filterButtons = document.querySelectorAll('.portfolio-filters button');
        filterButtons.forEach(function(btn) {
            btn.addEventListener('click', function() {
                filterButtons.forEach(function(b) {
                    b.classList.remove('active');
                });
                this.classList.add('active');
                renderPortfolio(this.dataset.filter);
            });
        });

        // ========== INITIAL RENDER ==========
        renderPortfolio('all');
    }

    // ===== TESTIMONIALS (only on testimonials page) =====
    const track = document.getElementById('testimonialTrack');
    if (track) {
        var testimonials = [
            { name: 'Sarah Nambi', role: 'CEO, BrightFuture Schools',
                text: 'Victor Tech transformed our school\'s online presence. The website is stunning and our enrollment has increased significantly!',
                initials: 'SN' },
            { name: 'John Muwonge', role: 'Founder, JMS Enterprises',
                text: 'The branding and photography services from Victor Tech are exceptional. They captured our brand identity perfectly.',
                initials: 'JM' },
            { name: 'Grace Akiiki', role: 'Event Planner, Grace Events',
                text: 'Victor Tech covered our corporate event with professionalism. The photos and videos were delivered on time and exceeded expectations.',
                initials: 'GA' },
            { name: 'Robert Sseguya', role: 'Manager, Seeta University',
                text: 'Reliable, creative, and professional. Victor Tech is our go-to partner for all technology and creative needs.',
                initials: 'RS' }
        ];

        var currentTestimonial = 0;

        function renderTestimonials() {
            track.innerHTML = testimonials.map(function(t) {
                return '<div class="testimonial-item">' +
                    '<div class="testimonial-card">' +
                    '<div class="stars">' +
                    '<i class="fas fa-star"></i>' +
                    '<i class="fas fa-star"></i>' +
                    '<i class="fas fa-star"></i>' +
                    '<i class="fas fa-star"></i>' +
                    '<i class="fas fa-star"></i>' +
                    '</div>' +
                    '<blockquote>"' + t.text + '"</blockquote>' +
                    '<div class="client">' +
                    '<div class="avatar">' + t.initials + '</div>' +
                    '<div class="info">' +
                    '<h4>' + t.name + '</h4>' +
                    '<span>' + t.role + '</span>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            }).join('');
            updateSlide();
        }

        function updateSlide() {
            var items = track.querySelectorAll('.testimonial-item');
            items.forEach(function(item, i) {
                item.style.display = i === currentTestimonial ? 'block' : 'none';
            });
        }

        renderTestimonials();

        document.getElementById('nextTestimonial').addEventListener('click', function() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            updateSlide();
        });

        document.getElementById('prevTestimonial').addEventListener('click', function() {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            updateSlide();
        });

        setInterval(function() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            updateSlide();
        }, 6000);
    }

    // ===== BLOG (only on blog page) =====
    const blogGrid = document.getElementById('blogGrid');
    if (blogGrid) {
        // Get existing static cards and add 'reveal' class for scroll animation
        var cards = blogGrid.querySelectorAll('.blog-card');
        cards.forEach(function(card) {
            card.classList.add('reveal');
        });

        // Use Intersection Observer for blog cards
        if ('IntersectionObserver' in window) {
            const obs = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
            cards.forEach(function(card) {
                obs.observe(card);
            });
        } else {
            // fallback: just make them visible immediately
            cards.forEach(function(card) { card.classList.add('visible'); });
        }
    }

    // ===== CONTACT FORM =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            var btn = this.querySelector('button[type="submit"]');
            var originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;
            setTimeout(function() {
                btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                btn.style.background = '#2e7d32';
                setTimeout(function() {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    btn.style.background = '';
                }, 3000);
            }, 2000);
        });
    }

    // ===== NEWSLETTER =====
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var input = this.querySelector('input');
            var btn = this.querySelector('button');
            var original = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            setTimeout(function() {
                btn.innerHTML = '<i class="fas fa-check"></i> Done!';
                input.value = '';
                setTimeout(function() { btn.innerHTML = original; }, 2000);
            }, 1000);
        });
    }

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS (only on pages with internal links) =====
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});