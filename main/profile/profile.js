        const $ = (selector, root = document) => root.querySelector(selector);
        const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

        // Elements
        const avatarInput = $('#avatarInput');
        const coverInput = $('#coverInput');
        const avatarImg = $('#avatarImg');
        const coverEl = $('#cover');
        const editBtn = $('#editBtn');
        const editForm = $('#editForm');
        const nameInput = $('#nameInput');
        const roleInput = $('#roleInput');
        const displayName = $('#displayName');
        const saveProfile = $('#saveProfile');
        const cancelEdit = $('#cancelEdit');

        const tabPhotos = $('#tabPhotos');
        const tabVideos = $('#tabVideos');
        const photosPanel = $('#photosPanel');
        const videosPanel = $('#videosPanel');

        const mediaInput = $('#mediaInput');
        const photosGrid = $('#photosGrid');
        const videosGrid = $('#videosGrid');

        const lightbox = $('#lightbox');
        const lightboxInner = $('#lightboxInner');
        const closeLightbox = $('#closeLightbox');

        // Avatar preview (replaces default placeholder image)
        avatarInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const url = URL.createObjectURL(file);
            avatarImg.src = url;
        });

        // Cover preview: set as background-image on cover element (no external images by default)
        coverInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const url = URL.createObjectURL(file);
            coverEl.style.backgroundImage = `linear-gradient(120deg, rgba(0,0,0,0.18), rgba(0,0,0,0.06)), url(${url})`;
            coverEl.style.backgroundSize = 'cover';
            coverEl.style.backgroundPosition = 'center';
        });

        // Edit profile toggle
        editBtn.addEventListener('click', () => {
            nameInput.value = displayName.textContent.trim();
            editForm.classList.remove('hidden');
        });
        cancelEdit.addEventListener('click', () => editForm.classList.add('hidden'));
        saveProfile.addEventListener('click', () => {
            if (nameInput.value.trim()) displayName.textContent = nameInput.value.trim();
            editForm.classList.add('hidden');
        });

        // Tabs
        function showTab(tab) {
            if (tab === 'photos') {
                tabPhotos.classList.add('tab-active');
                tabVideos.classList.remove('tab-active');
                photosPanel.classList.remove('hidden-panel'); photosPanel.classList.add('visible-panel');
                videosPanel.classList.remove('visible-panel'); videosPanel.classList.add('hidden-panel');
            } else {
                tabVideos.classList.add('tab-active');
                tabPhotos.classList.remove('tab-active');
                videosPanel.classList.remove('hidden-panel'); videosPanel.classList.add('visible-panel');
                photosPanel.classList.remove('visible-panel'); photosPanel.classList.add('hidden-panel');
            }
        }
        tabPhotos.addEventListener('click', () => showTab('photos'));
        tabVideos.addEventListener('click', () => showTab('videos'));

        // Add media via file input
        mediaInput.addEventListener('change', (e) => {
            handleFiles(Array.from(e.target.files));
            e.target.value = '';
        });

        // Quick upload buttons
        $('#uploadPhotoBtn').addEventListener('click', () => {
            mediaInput.accept = 'image/*';
            mediaInput.click();
        });
        $('#uploadVideoBtn').addEventListener('click', () => {
            mediaInput.accept = 'video/*';
            mediaInput.click();
        });

        // create media card
        function createMediaCard(file, url) {
            const isVideo = file.type.startsWith('video');
            const wrap = document.createElement('div');
            wrap.className = 'media-item rounded-lg overflow-hidden cursor-pointer bg-black/10';
            wrap.dataset.type = isVideo ? 'video' : 'image';

            if (isVideo) {
                const vid = document.createElement('video');
                vid.src = url;
                vid.controls = false;
                vid.muted = true;
                vid.playsInline = true;
                vid.loop = true;
                vid.className = 'w-full h-48 object-cover';
                wrap.appendChild(vid);
                vid.play().catch(()=>{});
            } else {
                const img = document.createElement('img');
                img.src = url;
                img.alt = file.name || 'photo';
                img.className = 'w-full h-40 object-cover';
                wrap.appendChild(img);
            }

            // click to open lightbox
            wrap.addEventListener('click', () => openLightbox(isVideo ? 'video' : 'image', url));
            return wrap;
        }

        function removeEmptyHints() {
            const pEmpty = $('#photosEmpty');
            if (pEmpty) pEmpty.remove();
            const vEmpty = $('#videosEmpty');
            if (vEmpty) vEmpty.remove();
        }

        function handleFiles(files) {
            if (!files.length) return;
            removeEmptyHints();
            files.forEach(file => {
                const url = URL.createObjectURL(file);
                const isVideo = file.type.startsWith('video');
                const card = createMediaCard(file, url);
                if (isVideo) {
                    videosGrid.prepend(card);
                    showTab('videos');
                } else {
                    photosGrid.prepend(card);
                    showTab('photos');
                }
            });
        }

        // Lightbox
        function openLightbox(type, src) {
            lightboxInner.innerHTML = '';
            if (type === 'image') {
                const img = document.createElement('img');
                img.src = src;
                img.className = 'max-w-full max-h-[80vh] object-contain';
                lightboxInner.appendChild(img);
            } else {
                const vid = document.createElement('video');
                vid.src = src;
                vid.controls = true;
                vid.autoplay = true;
                vid.className = 'max-w-full max-h-[80vh]';
                lightboxInner.appendChild(vid);
            }
            lightbox.classList.remove('hidden');
            lightbox.setAttribute('aria-hidden', 'false');
        }
        closeLightbox.addEventListener('click', () => {
            lightbox.classList.add('hidden');
            lightbox.setAttribute('aria-hidden', 'true');
            lightboxInner.innerHTML = '';
        });
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox.click();
        });

        // Initial: make media items interactive (none by default). If any dynamic items exist later, event handlers are attached when created.

        // Drag & drop into grid
        ['dragenter','dragover'].forEach(ev => {
            photosGrid.addEventListener(ev, (e) => { e.preventDefault(); photosGrid.classList.add('ring-2','ring-white/30'); });
            videosGrid.addEventListener(ev, (e) => { e.preventDefault(); videosGrid.classList.add('ring-2','ring-white/30'); });
        });
        ['dragleave','drop'].forEach(ev => {
            photosGrid.addEventListener(ev, (e) => { photosGrid.classList.remove('ring-2','ring-white/30'); });
            videosGrid.addEventListener(ev, (e) => { videosGrid.classList.remove('ring-2','ring-white/30'); });
        });
        photosGrid.addEventListener('drop', (e) => {
            e.preventDefault();
            const files = Array.from(e.dataTransfer.files || []).filter(f => f.type.startsWith('image'));
            handleFiles(files);
        });
        videosGrid.addEventListener('drop', (e) => {
            e.preventDefault();
            const files = Array.from(e.dataTransfer.files || []).filter(f => f.type.startsWith('video'));
            handleFiles(files);
        });

        // Accessibility: keyboard close for lightbox
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) closeLightbox.click();
        });

        // Parallax subtle movement on scroll
        window.addEventListener('scroll', () => {
            const cover = document.getElementById('cover');
            if (!cover) return;
            const rect = cover.getBoundingClientRect();
            const amount = Math.max(-40, Math.min(40, (rect.top) / 20));
            cover.style.transform = `translateY(${amount}px)`;
        });

        // Minor: autoplay small videos on hover
        document.addEventListener('mouseover', (e) => {
            const v = e.target.closest('.media-item')?.querySelector('video');
            if (v) { v.play().catch(()=>{}); }
        });
        document.addEventListener('mouseout', (e) => {
            const v = e.target.closest('.media-item')?.querySelector('video');
            if (v) { v.pause(); }
        });
