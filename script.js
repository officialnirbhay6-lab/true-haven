/* ==========================================================================
   TRUEHAVEN STAYS - INTERACTIVE JAVASCRIPT
   Handles property detail overlays, photo carousels, pricing calculator & WhatsApp reservation
   ========================================================================== */

const PARAMOUNT_AIRBNB_URL = "https://www.airbnb.co.uk/rooms/1761390398461668658?unique_share_id=e3924d43-ff08-4672-af1f-88d210f07cfa&viralityEntryPoint=1&s=76&source_impression_id=p3_1788349185_P3ng4E3hx17yac8B";

// All 73 high-resolution photos downloaded from Airbnb Photo Tour
const PARAMOUNT_PHOTOS = Array.from({ length: 73 }, (_, i) => `assets/paramount/paramount_${i + 1}.jpg`);

// Property Database
const PROPERTIES_DATA = {
    'paramount': {
        id: 'paramount',
        name: 'Paramount Midtown Luxury Suite',
        tagline: 'Rooftop Infinity Pool · Panoramic Downtown Skyline Views',
        location: 'Al Mustaqbal Street, Business Bay, Dubai, United Arab Emirates',
        specs: '1BR · 2 Beds · 1.5 Baths · Accommodates 4 Guests',
        priceNight: 240,
        maxGuests: 4,
        currency: 'USD',
        priceAed: 880,
        rating: '4.98',
        reviewsCount: 48,
        badge: 'Guest favorite',
        hostName: 'TrueHaven Stays (Superhost)',
        airbnbUrl: PARAMOUNT_AIRBNB_URL,
        photos: PARAMOUNT_PHOTOS,
        description: 'Experience Hollywood-inspired luxury at Paramount Midtown in Business Bay. Featuring a world-famous rooftop infinity pool on the top floor with breathtaking views of Burj Khalifa and the Dubai skyline. This modern 1BR suite offers floor-to-ceiling windows, high-speed WiFi, plush king bedding, Nespresso coffee station, and access to a state-of-the-art gym.'
    },
    'burj-vista': {
        id: 'burj-vista',
        name: 'Burj Vista Executive Residence',
        tagline: 'Direct Unobstructed Views of Burj Khalifa & Dubai Fountain',
        location: 'Sheikh Mohammed Bin Rashid Boulevard, Downtown Dubai, UAE',
        specs: '1BR · 3 Beds · 1.5 Baths · Accommodates 6 Guests',
        priceNight: 290,
        maxGuests: 6,
        currency: 'USD',
        priceAed: 1065,
        rating: '4.99',
        reviewsCount: 62,
        badge: 'Guest favorite',
        hostName: 'TrueHaven Stays (Superhost)',
        photos: [
            'assets/burj_vista_view.jpg',
            'assets/burj_vista_pool.png',
            'assets/burj_vista_loungers.png',
            'assets/burj_vista_gym.png',
            'assets/burj_vista_view.jpg'
        ],
        description: 'Immerse yourself in Downtown Dubai luxury at Burj Vista. Wake up to direct, uninterrupted views of the world-famous Burj Khalifa right from your private balcony. Enjoys direct air-conditioned tunnel linkage to Dubai Mall & Metro station, a resort-style infinity pool with architectural shade, landscaped lounge deck, and fully-equipped fitness center.'
    }
};

// Global Carousel Movement
function moveCarousel(trackId, direction) {
    const track = document.getElementById(trackId);
    if (!track) return;
    
    const images = track.querySelectorAll('.carousel-img');
    const totalImages = images.length;
    let currentIndex = parseInt(track.dataset.currentIndex || '0');
    
    currentIndex += direction;
    
    if (currentIndex < 0) {
        currentIndex = totalImages - 1;
    } else if (currentIndex >= totalImages) {
        currentIndex = 0;
    }
    
    track.dataset.currentIndex = currentIndex;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update Dots
    const dotsContainerId = trackId.replace('Track', 'Dots');
    const dotsContainer = document.getElementById(dotsContainerId);
    if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentIndex);
        });
    }
}

// DOM Loaded Initialization
document.addEventListener('DOMContentLoaded', () => {
    
    // Filter Pills Logic
    const filterPills = document.querySelectorAll('.filter-pill');
    const propertyCards = document.querySelectorAll('.property-card');

    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            const filterValue = pill.getAttribute('data-filter');

            propertyCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-location') === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Wishlist Heart Buttons
    const heartBtns = document.querySelectorAll('.heart-btn');
    heartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            btn.classList.toggle('saved');
            const isSaved = btn.classList.contains('saved');
            const heartIcon = btn.querySelector('i');
            if (isSaved) {
                heartIcon.className = 'fa-solid fa-heart';
                showNotification('Added to your Wishlist!');
            } else {
                heartIcon.className = 'fa-regular fa-heart';
                showNotification('Removed from Wishlist');
            }
        });
    });

    // Amenities Modal Controls
    const amenitiesModal = document.getElementById('amenitiesModal');
    const openAllAmenitiesBtn = document.getElementById('openAllAmenitiesBtn');
    const closeAmenitiesModalBtn = document.getElementById('closeAmenitiesModalBtn');

    if (openAllAmenitiesBtn && amenitiesModal) {
        openAllAmenitiesBtn.addEventListener('click', () => {
            amenitiesModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeAmenitiesModalBtn && amenitiesModal) {
        closeAmenitiesModalBtn.addEventListener('click', () => {
            amenitiesModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close Modal on Overlay Click
    window.addEventListener('click', (e) => {
        const propModal = document.getElementById('propertyModal');
        if (e.target === amenitiesModal) {
            amenitiesModal.classList.remove('active');
            document.body.style.overflow = '';
        }
        if (e.target === propModal) {
            propModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Property Detail Modal Close Button
    const closePropModalBtn = document.getElementById('closePropertyModalBtn');
    if (closePropModalBtn) {
        closePropModalBtn.addEventListener('click', () => {
            document.getElementById('propertyModal').classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Search Bar Pill click triggers filter scroll
    const searchSubmitBtn = document.getElementById('searchSubmitBtn');
    if (searchSubmitBtn) {
        searchSubmitBtn.addEventListener('click', () => {
            document.getElementById('properties').scrollIntoView({ behavior: 'smooth' });
        });
    }
});

// Toast Notification
function showNotification(msg) {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-notification';
        toast.style.cssText = `
            position: fixed;
            bottom: 32px;
            right: 32px;
            background: #0F1E36;
            color: #FFFFFF;
            padding: 12px 24px;
            border-radius: 9999px;
            font-size: 14px;
            font-weight: 600;
            z-index: 2000;
            box-shadow: 0 4px 14px rgba(0,0,0,0.25);
            transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
            opacity: 0;
            transform: translateY(10px);
        `;
        document.body.appendChild(toast);
    }
    toast.innerText = msg;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
    }, 2500);
}

// Open Full-Page Immersive Property Detail View (No Popup Modal)
function openPropertyDetail(propId) {
    const data = PROPERTIES_DATA[propId];
    if (!data) return;

    const pageContainer = document.getElementById('propertyDetailPage');
    const mainPage = document.getElementById('mainPage');
    if (!pageContainer || !mainPage) return;

    // Photos Grid HTML
    const photoGridHtml = `
        <div style="position: relative; margin-bottom: 32px; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
            <div class="detail-photo-grid">
                <img src="${data.photos[0]}" alt="${data.name}" class="photo-large">
                <img src="${data.photos[1]}" alt="${data.name}">
                <img src="${data.photos[2]}" alt="${data.name}">
                <img src="${data.photos[3]}" alt="${data.name}">
                <img src="${data.photos[4] || data.photos[0]}" alt="${data.name}">
            </div>
            <button class="button-secondary" onclick="openPhotoGalleryModal('${propId}')" style="position: absolute; bottom: 20px; right: 20px; background: rgba(255,255,255,0.95); border: 1px solid #222; border-radius: 8px; padding: 8px 16px; font-weight: 600; font-size: 13px; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
                <i class="fa-solid fa-grip-lines-vertical"></i> Show all ${data.photos.length} photos
            </button>
        </div>
    `;

    // Calculate initial dates (3 nights default)
    const today = new Date();
    const checkInDate = new Date(today);
    checkInDate.setDate(today.getDate() + 3);
    const checkOutDate = new Date(today);
    checkOutDate.setDate(today.getDate() + 6);

    const checkInStr = checkInDate.toISOString().split('T')[0];
    const checkOutStr = checkOutDate.toISOString().split('T')[0];
    const nights = 3;
    const nightlyTotal = data.priceNight * nights;
    const cleaningFee = 50;
    const grandTotal = nightlyTotal + cleaningFee;

    pageContainer.innerHTML = `
        <!-- Full Page Sticky Navigation Header -->
        <header class="top-nav" style="position: sticky; top: 0; z-index: 100; background: rgba(255,255,255,0.95); backdrop-filter: blur(12px); border-bottom: 1px solid #E5E0D8; height: 76px;">
            <div class="container nav-wrapper" style="display: flex; align-items: center; justify-content: space-between;">
                <div style="display: flex; align-items: center; gap: 20px;">
                    <button onclick="closePropertyDetailPage()" style="background: var(--color-surface-soft); border: 1px solid #E5E0D8; padding: 8px 16px; border-radius: 999px; font-weight: 700; font-size: 14px; cursor: pointer; color: #0F1E36; display: flex; align-items: center; gap: 8px; transition: background 0.2s;">
                        <i class="fa-solid fa-arrow-left"></i> Back to all residences
                    </button>
                    <a href="#" class="brand-logo" onclick="closePropertyDetailPage(); return false;">
                        <img src="assets/logo.png" alt="TrueHaven Logo" class="logo-img" style="height: 38px;">
                    </a>
                </div>

                <div>
                    <a href="https://wa.me/971525821668" target="_blank" class="button-primary" style="padding: 8px 18px; font-size: 13px; border-radius: 999px;">
                        <i class="fa-brands fa-whatsapp"></i> WhatsApp Concierge
                    </a>
                </div>
            </div>
        </header>

        <!-- Main Property Detail Container -->
        <div class="container" style="max-width: 1280px; margin: 32px auto 80px; padding: 0 24px;">
            
            <!-- Title Header Row -->
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
                <div>
                    <h1 style="font-size: 32px; font-weight: 800; color: #0F1E36; margin-bottom: 6px; letter-spacing: -0.5px;">${data.name}</h1>
                    <div style="font-size: 16px; font-weight: 500; color: #374151;">
                        <i class="fa-solid fa-star" style="color: #FF385C;"></i> <strong>${data.rating}</strong> (${data.reviewsCount} reviews) · Entire rental unit in Dubai, UAE · <strong>${data.specs}</strong>
                    </div>
                </div>
                <div style="display: flex; gap: 20px; font-size: 14px; font-weight: 600; text-decoration: underline; cursor: pointer; color: #0F1E36;">
                    <span><i class="fa-solid fa-arrow-up-from-bracket"></i> Share</span>
                    <span><i class="fa-regular fa-heart"></i> Save</span>
                </div>
            </div>

            ${photoGridHtml}

            <div class="detail-body-layout" style="display: grid; grid-template-columns: 2fr 1fr; gap: 48px; align-items: start;">
                
                <!-- Left Main Column -->
                <div class="detail-left-col">
                    
                    <!-- Guest Favourite Horizontal Card -->
                    <div style="display: flex; align-items: center; justify-content: space-between; padding: 24px 28px; border: 1px solid #E5E0D8; border-radius: 20px; margin-bottom: 36px; background: #FFFFFF; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
                        <div style="display: flex; align-items: center; gap: 18px;">
                            <span style="font-size: 32px;">🌿</span>
                            <div>
                                <div style="font-size: 17px; font-weight: 800; color: #0F1E36;">Guest favourite</div>
                                <div style="font-size: 14px; color: #6B7280;">One of the most loved homes on Airbnb, according to guests</div>
                            </div>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-size: 22px; font-weight: 800; color: #0F1E36;">${data.rating} <span style="font-size: 15px; color: #0F1E36;">★★★★★</span></div>
                            <div style="font-size: 13px; font-weight: 600; color: #0F1E36; text-decoration: underline;">${data.reviewsCount} Reviews</div>
                        </div>
                    </div>

                    <!-- Host Profile Row -->
                    <div class="host-row" style="padding-bottom: 28px; border-bottom: 1px solid #E5E0D8; margin-bottom: 32px;">
                        <div class="host-avatar" style="width: 52px; height: 52px; font-size: 18px;">TH</div>
                        <div>
                            <div class="host-name" style="font-size: 17px; font-weight: 700; color: #0F1E36;">Hosted by ${data.hostName}</div>
                            <div class="host-badge" style="font-size: 13px; color: #6B7280;">Professional Host · 100% Response Rate</div>
                        </div>
                    </div>

                    <!-- Property Overview -->
                    <div style="margin-bottom: 32px;">
                        <h3 style="font-size: 20px; font-weight: 700; color: #0F1E36; margin-bottom: 12px;">About this residence</h3>
                        <p style="font-size: 16px; color: #374151; line-height: 1.7;">${data.description}</p>
                    </div>

                    <!-- Residence Highlights -->
                    <div style="margin-bottom: 40px; padding: 24px; background: #F4F1EA; border-radius: 16px;">
                        <h4 style="font-size: 16px; font-weight: 700; color: #0F1E36; margin-bottom: 14px;">Residence Highlights</h4>
                        <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px; font-size: 15px; color: #374151;">
                            <li><i class="fa-solid fa-check-circle" style="color: #10B981; margin-right: 10px;"></i> ${data.specs}</li>
                            <li><i class="fa-solid fa-check-circle" style="color: #10B981; margin-right: 10px;"></i> ${data.tagline}</li>
                            <li><i class="fa-solid fa-check-circle" style="color: #10B981; margin-right: 10px;"></i> Smart Lock Self Check-in</li>
                            <li><i class="fa-solid fa-check-circle" style="color: #10B981; margin-right: 10px;"></i> Dedicated Covered Parking Spot Included</li>
                        </ul>
                    </div>

                    <!-- Location Highlights -->
                    <div style="margin-bottom: 40px; padding: 28px; background: #0F1E36; color: #FFFFFF; border-radius: 20px; box-shadow: 0 8px 24px rgba(15,30,54,0.15);">
                        <span class="badge-pill light" style="margin-bottom: 10px;">LOCATION HIGHLIGHTS</span>
                        <h4 style="font-size: 20px; font-weight: 700; margin-bottom: 16px;">At the Heart of Dubai's Golden Triangle</h4>
                        <ul style="list-style: none; display: flex; flex-direction: column; gap: 14px; font-size: 14px;">
                            <li style="display: flex; gap: 12px; align-items: center;"><span style="background: rgba(255,255,255,0.15); color: #FFD166; padding: 6px 12px; border-radius: 999px; font-weight: 700;">2 mins</span> <strong>Burj Khalifa & Dubai Fountains</strong></li>
                            <li style="display: flex; gap: 12px; align-items: center;"><span style="background: rgba(255,255,255,0.15); color: #FFD166; padding: 6px 12px; border-radius: 999px; font-weight: 700;">Direct Link</span> <strong>The Dubai Mall & Metro Connection</strong></li>
                            <li style="display: flex; gap: 12px; align-items: center;"><span style="background: rgba(255,255,255,0.15); color: #FFD166; padding: 6px 12px; border-radius: 999px; font-weight: 700;">3 mins</span> <strong>Dubai Opera & Downtown Boulevard</strong></li>
                        </ul>
                    </div>

                    <!-- What this place offers (5-Star Building Amenities Section) -->
                    <div style="margin-bottom: 40px; border-top: 1px solid #E5E0D8; padding-top: 32px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                            <h3 style="font-size: 20px; font-weight: 700; color: #0F1E36;">What this place offers</h3>
                            <button class="button-secondary" onclick="openAmenitiesModalDirect()" style="padding: 10px 20px; font-size: 14px;">Show All 50+ Amenities</button>
                        </div>
                        
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; font-size: 16px; color: #374151;">
                            <div><i class="fa-solid fa-water-ladder" style="color: #0F1E36; width: 28px;"></i> Swimming Pools</div>
                            <div><i class="fa-solid fa-dumbbell" style="color: #0F1E36; width: 28px;"></i> Fitness Gym</div>
                            <div><i class="fa-solid fa-square-parking" style="color: #0F1E36; width: 28px;"></i> Free Covered Parking</div>
                            <div><i class="fa-solid fa-wifi" style="color: #0F1E36; width: 28px;"></i> High-Speed Wifi</div>
                            <div><i class="fa-solid fa-key" style="color: #0F1E36; width: 28px;"></i> Smart Self Check-in</div>
                            <div><i class="fa-solid fa-mug-hot" style="color: #0F1E36; width: 28px;"></i> Nespresso Machine</div>
                            <div><i class="fa-solid fa-snowflake" style="color: #0F1E36; width: 28px;"></i> Central Climate AC</div>
                            <div><i class="fa-solid fa-shirt" style="color: #0F1E36; width: 28px;"></i> Washer & Dryer</div>
                        </div>
                    </div>

                    <!-- Contact & Office Info -->
                    <div style="border-top: 1px solid #E5E0D8; padding-top: 28px; font-size: 15px; color: #6B7280; line-height: 1.6;">
                        <p><strong>TrueHaven Office:</strong> 2204, Iris Bay, Business Bay, Dubai, UAE</p>
                        <p><strong>Direct Helpline:</strong> 052 58 21668 (+971 52 582 1668)</p>
                        <p><strong>Official Email:</strong> hello@truehavenstays.com</p>
                    </div>

                </div>

                <!-- Right Column Sticky Reservation Card -->
                <div class="detail-right-col">
                    <div class="reservation-card" style="border: 1px solid #E5E0D8; border-radius: 20px; padding: 28px; box-shadow: 0 8px 30px rgba(0,0,0,0.08); position: sticky; top: 100px; background: #FFF;">
                        <div style="background: #FFF0F3; color: #FF385C; font-size: 13px; font-weight: 700; padding: 8px 14px; border-radius: 10px; margin-bottom: 20px; display: inline-flex; align-items: center; gap: 6px;">
                            🏷️ Direct Booking: Prices include all fees
                        </div>

                        <div class="res-price-header" style="display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 20px;">
                            <div>
                                <span class="res-price" style="font-size: 28px; font-weight: 800; color: #0F1E36;">$${data.priceNight}</span>
                                <span style="font-size: 15px; color: #6B7280;">/ night</span>
                                <span style="font-size: 13px; color: #6B7280; display: block;">(AED ${data.priceAed})</span>
                            </div>
                            <div style="font-size: 14px; font-weight: 600; color: #0F1E36;">
                                <i class="fa-solid fa-star" style="color: #FF385C;"></i> ${data.rating} (${data.reviewsCount})
                            </div>
                        </div>

                        <!-- Date & Guest Inputs -->
                        <div class="res-form-box">
                            <div class="res-date-row">
                                <div class="res-date-field">
                                    <label class="res-label">CHECK-IN</label>
                                    <input type="date" value="${checkInStr}" class="res-input" id="modalCheckIn" onchange="updateCalc('${propId}')">
                                </div>
                                <div class="res-date-field">
                                    <label class="res-label">CHECKOUT</label>
                                    <input type="date" value="${checkOutStr}" class="res-input" id="modalCheckOut" onchange="updateCalc('${propId}')">
                                </div>
                            </div>
                            <div class="res-guest-field">
                                <label class="res-label">GUESTS</label>
                                <select class="res-select" id="modalGuests">
                                    ${Array.from({length: data.maxGuests || 4}, (_, i) => i + 1).map(g => `<option value="${g}" ${g === 2 ? 'selected' : ''}>${g} ${g === 1 ? 'Guest' : 'Guests'} ${g === (data.maxGuests || 4) ? '(Max capacity)' : ''}</option>`).join('')}
                                </select>
                            </div>
                        </div>

                        <!-- Price Stack -->
                        <div class="res-calc-stack" id="resCalcStack">
                            <div class="calc-row">
                                <span>$${data.priceNight} x <span id="numNights">${nights}</span> nights</span>
                                <span id="subtotalPrice">$${nightlyTotal}</span>
                            </div>
                            <div class="calc-row">
                                <span>Cleaning fee</span>
                                <span>$${cleaningFee}</span>
                            </div>
                            <div class="calc-row">
                                <span>TrueHaven direct service fee</span>
                                <span style="color: #10B981; font-weight: 700;">FREE ($0)</span>
                            </div>
                            <div class="calc-row total">
                                <span>Total (USD)</span>
                                <span id="grandTotalPrice">$${grandTotal}</span>
                            </div>
                        </div>

                        ${data.airbnbUrl ? `
                            <a href="${data.airbnbUrl}" target="_blank" class="button-primary" style="display: flex; align-items: center; justify-content: center; width: 100%; height: 54px; font-size: 16px; margin-bottom: 14px; border-radius: 12px; background: #FF385C; color: #FFFFFF; text-decoration: none; font-weight: 700; box-shadow: 0 4px 14px rgba(255,56,92,0.3);">
                                <i class="fa-solid fa-bolt" style="font-size: 18px; margin-right: 8px;"></i> Reserve on Airbnb
                            </a>
                        ` : `
                            <button class="button-primary" style="width: 100%; height: 54px; font-size: 16px; margin-bottom: 14px; border-radius: 12px;" onclick="bookOnWhatsApp('${propId}')">
                                <i class="fa-brands fa-whatsapp" style="font-size: 22px; margin-right: 8px;"></i> Reserve on WhatsApp
                            </button>
                        `}
                        
                        <p style="text-align: center; font-size: 12px; color: #6B7280;">Instant confirmation • No booking fees charged</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Full Footer for Immersive Detail Page -->
        <footer class="footer-light" style="border-top: 1px solid #E5E0D8;">
            <div class="container text-center" style="padding: 40px 0;">
                <p style="font-size: 14px; color: #6B7280;">© 2026 TrueHaven Stays. Luxury 1BR Residences in Downtown Dubai & Business Bay.</p>
            </div>
        </footer>
    `;

    mainPage.style.display = 'none';
    pageContainer.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Close Full-Page Immersive View & Return to Homepage
function closePropertyDetailPage() {
    const pageContainer = document.getElementById('propertyDetailPage');
    const mainPage = document.getElementById('mainPage');
    if (pageContainer) pageContainer.style.display = 'none';
    if (mainPage) mainPage.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Update Reservation Calculation
function updateCalc(propId) {
    const data = PROPERTIES_DATA[propId];
    if (!data) return;

    const checkInVal = document.getElementById('modalCheckIn').value;
    const checkOutVal = document.getElementById('modalCheckOut').value;

    const d1 = new Date(checkInVal);
    const d2 = new Date(checkOutVal);

    let diffDays = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
    if (isNaN(diffDays) || diffDays <= 0) {
        diffDays = 1;
    }

    const subtotal = data.priceNight * diffDays;
    const cleaningFee = 50;
    const total = subtotal + cleaningFee;

    document.getElementById('numNights').innerText = diffDays;
    document.getElementById('subtotalPrice').innerText = `$${subtotal}`;
    document.getElementById('grandTotalPrice').innerText = `$${total}`;
}

// WhatsApp Booking Redirect
function bookOnWhatsApp(propId) {
    const data = PROPERTIES_DATA[propId];
    if (!data) return;

    const checkIn = document.getElementById('modalCheckIn').value;
    const checkOut = document.getElementById('modalCheckOut').value;
    const guests = document.getElementById('modalGuests').value;
    const total = document.getElementById('grandTotalPrice').innerText;

    const msg = `Hello TrueHaven Stays! I would like to reserve the following residence:\n\n` +
                `🏡 Residence: ${data.name}\n` +
                `📍 Location: ${data.location}\n` +
                `📅 Check-in: ${checkIn}\n` +
                `📅 Check-out: ${checkOut}\n` +
                `👥 Guests: ${guests}\n` +
                `💰 Estimated Total: ${total}\n\n` +
                `Please confirm availability and booking details. Thank you!`;

    const encodedMsg = encodeURIComponent(msg);
    window.open(`https://wa.me/971525821668?text=${encodedMsg}`, '_blank');
}

function openAmenitiesModalDirect() {
    const amenitiesModal = document.getElementById('amenitiesModal');
    if (amenitiesModal) {
        amenitiesModal.classList.add('active');
    }
}

// Full Screen Interactive Photo Gallery Modal for all 73 Photos
function openPhotoGalleryModal(propId) {
    const data = PROPERTIES_DATA[propId];
    if (!data) return;

    let galleryModal = document.getElementById('photoGalleryModal');
    if (!galleryModal) {
        galleryModal = document.createElement('div');
        galleryModal.id = 'photoGalleryModal';
        galleryModal.className = 'photo-gallery-modal';
        document.body.appendChild(galleryModal);
    }

    const categories = [
        { name: 'Living Room', start: 1, end: 5 },
        { name: 'Kitchenette', start: 6, end: 9 },
        { name: 'Dining Area', start: 10, end: 12 },
        { name: 'Bedroom', start: 13, end: 16 },
        { name: 'Full Bathroom', start: 17, end: 19 },
        { name: 'WC / Guest Washroom', start: 20, end: 21 },
        { name: 'Balcony & Panoramic Skyline Views', start: 22, end: 25 },
        { name: 'Rooftop Infinity Pool', start: 26, end: 29 },
        { name: 'Fitness Gym & Wellness', start: 30, end: 32 },
        { name: "Children's Playroom", start: 33, end: 35 },
        { name: 'Full Residence Photo Tour (Complete 73 Photos)', start: 36, end: data.photos.length }
    ];

    let sectionsHtml = '';
    categories.forEach(cat => {
        const catPhotos = data.photos.slice(cat.start - 1, cat.end);
        if (catPhotos.length === 0) return;

        sectionsHtml += `
            <div class="photo-tour-section">
                <h3 class="photo-tour-section-title">${cat.name} (${catPhotos.length} ${catPhotos.length === 1 ? 'photo' : 'photos'})</h3>
                <div class="photo-tour-grid">
                    ${catPhotos.map((src, idx) => `
                        <div class="photo-tour-item">
                            <img src="${src}" alt="${data.name} - ${cat.name} ${idx + 1}" loading="lazy">
                            <div class="photo-tour-caption">${cat.name} · Photo ${cat.start + idx}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    });

    galleryModal.innerHTML = `
        <div class="photo-gallery-header">
            <h2>Photo Tour · ${data.name} (${data.photos.length} High-Res Photos)</h2>
            <button onclick="closePhotoGalleryModal()" class="close-gallery-btn" title="Close Gallery">&times;</button>
        </div>
        <div class="photo-gallery-body">
            ${sectionsHtml}
        </div>
    `;

    galleryModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closePhotoGalleryModal() {
    const galleryModal = document.getElementById('photoGalleryModal');
    if (galleryModal) {
        galleryModal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// ==========================================================================
// INTERACTIVE NAVBAR & MOBILE DRAWER SEARCH (WHERE, WHEN CALENDAR, WHO GUESTS)
// ==========================================================================
let currentNavGuests = 2;
let selectedNavLocation = 'all';

function openMobileDrawer() {
    const drawer = document.getElementById('mobileDrawer');
    if (drawer) {
        drawer.style.display = 'block';
        drawer.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeMobileDrawer() {
    const drawer = document.getElementById('mobileDrawer');
    if (drawer) {
        drawer.style.display = 'none';
        drawer.classList.remove('active');
        document.body.style.overflow = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Set default dates in navbar calendar (today + 3 days to today + 6 days)
    const today = new Date();
    const inDate = new Date(today);
    inDate.setDate(today.getDate() + 3);
    const outDate = new Date(today);
    outDate.setDate(today.getDate() + 6);

    const checkInInput = document.getElementById('navCheckInInput');
    const checkOutInput = document.getElementById('navCheckOutInput');

    if (checkInInput && checkOutInput) {
        checkInInput.value = inDate.toISOString().split('T')[0];
        checkOutInput.value = outDate.toISOString().split('T')[0];
        updateNavDates();
    }

    // Attach Mobile Drawer Toggle Buttons
    const openDrawerBtn = document.getElementById('openMobileDrawerBtn');
    const closeDrawerBtn = document.getElementById('closeMobileDrawerBtn');

    if (openDrawerBtn) {
        openDrawerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openMobileDrawer();
        });
    }

    if (closeDrawerBtn) {
        closeDrawerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeMobileDrawer();
        });
    }

    // Mobile Search Card Buttons
    const mWhereBtn = document.getElementById('mSearchWhereBtn');
    const mWhenBtn = document.getElementById('mSearchWhenBtn');
    const mWhoBtn = document.getElementById('mSearchWhoBtn');
    const mSubmitBtn = document.getElementById('mSearchSubmitBtn');

    if (mWhereBtn) {
        mWhereBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleSearchPopover('wherePopover');
        });
    }

    if (mWhenBtn) {
        mWhenBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleSearchPopover('whenPopover');
        });
    }

    if (mWhoBtn) {
        mWhoBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleSearchPopover('whoPopover');
        });
    }

    if (mSubmitBtn) {
        mSubmitBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeAllSearchPopovers();
            closeMobileDrawer();
            const propSection = document.getElementById('properties');
            if (propSection) {
                propSection.scrollIntoView({ behavior: 'smooth' });
            }
            showToast('🔍 Searching residences for your dates...');
        });
    }

    // Attach click listeners to Desktop WHERE, WHEN, WHO search pill segments
    const searchWhereBtn = document.getElementById('searchWhereBtn');
    const searchWhenBtn = document.getElementById('searchWhenBtn');
    const searchWhoBtn = document.getElementById('searchWhoBtn');
    const searchSubmitBtn = document.getElementById('searchSubmitBtn');

    if (searchWhereBtn) {
        searchWhereBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleSearchPopover('wherePopover');
        });
    }

    if (searchWhenBtn) {
        searchWhenBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleSearchPopover('whenPopover');
        });
    }

    if (searchWhoBtn) {
        searchWhoBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleSearchPopover('whoPopover');
        });
    }

    if (searchSubmitBtn) {
        searchSubmitBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeAllSearchPopovers();
            const propSection = document.getElementById('properties');
            if (propSection) {
                propSection.scrollIntoView({ behavior: 'smooth' });
            }
            showToast('🔍 Searching residences for your dates...');
        });
    }

    // Close popovers & drawer on click outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-search-pill') && !e.target.closest('.search-popover') && !e.target.closest('.mobile-search-box')) {
            closeAllSearchPopovers();
        }
    });
});

function toggleSearchPopover(popoverId) {
    const target = document.getElementById(popoverId);
    if (!target) return;
    const isVisible = target.style.display === 'block';
    closeAllSearchPopovers();
    if (!isVisible) {
        target.style.display = 'block';
    }
}

function closeAllSearchPopovers() {
    ['wherePopover', 'whenPopover', 'whoPopover'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
}

function selectNavLocation(locKey, displayLabel) {
    selectedNavLocation = locKey;
    const whereValEl = document.getElementById('whereValue');
    const mWhereValEl = document.getElementById('mWhereVal');
    if (whereValEl) whereValEl.innerText = displayLabel;
    if (mWhereValEl) mWhereValEl.innerText = displayLabel;

    filterPropertiesByLocation(locKey);
    closeAllSearchPopovers();
}

function filterPropertiesByLocation(locKey) {
    const cards = document.querySelectorAll('.property-card');
    cards.forEach(card => {
        const title = card.querySelector('.property-title').innerText.toLowerCase();
        if (locKey === 'all') {
            card.style.display = 'flex';
        } else if (locKey === 'business-bay' && title.includes('paramount')) {
            card.style.display = 'flex';
        } else if (locKey === 'downtown' && title.includes('burj')) {
            card.style.display = 'flex';
        } else if (locKey !== 'all') {
            card.style.display = 'none';
        }
    });
}

function updateNavDates() {
    const inInput = document.getElementById('navCheckInInput');
    const outInput = document.getElementById('navCheckOutInput');
    if (!inInput || !outInput) return;

    const inVal = inInput.value;
    const outVal = outInput.value;
    if (!inVal || !outVal) return;

    const d1 = new Date(inVal);
    const d2 = new Date(outVal);
    const diff = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
    
    const calcEl = document.getElementById('navNightsCalc');
    if (calcEl) {
        calcEl.innerText = diff > 0 ? `${diff} nights selected` : 'Select checkout date';
    }
}

function applyNavDates() {
    const inInput = document.getElementById('navCheckInInput');
    const outInput = document.getElementById('navCheckOutInput');
    if (!inInput || !outInput) return;

    const inVal = inInput.value;
    const outVal = outInput.value;

    if (inVal && outVal) {
        const d1 = new Date(inVal);
        const d2 = new Date(outVal);
        const d1Str = d1.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const d2Str = d2.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        const whenValEl = document.getElementById('whenValue');
        const mWhenValEl = document.getElementById('mWhenVal');
        if (whenValEl) whenValEl.innerText = `${d1Str} – ${d2Str}`;
        if (mWhenValEl) mWhenValEl.innerText = `${d1Str} – ${d2Str}`;
    }
    closeAllSearchPopovers();
}

function changeNavGuests(delta) {
    currentNavGuests = Math.min(6, Math.max(1, currentNavGuests + delta));
    const countEl = document.getElementById('navGuestCount');
    if (countEl) countEl.innerText = currentNavGuests;
}

function applyNavGuests() {
    const whoValEl = document.getElementById('whoValue');
    const mWhoValEl = document.getElementById('mWhoVal');
    const labelStr = `${currentNavGuests} ${currentNavGuests === 1 ? 'Guest' : 'Guests'}`;
    if (whoValEl) whoValEl.innerText = labelStr;
    if (mWhoValEl) mWhoValEl.innerText = labelStr;
    closeAllSearchPopovers();
}
