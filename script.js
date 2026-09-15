/* ==========================================================================
   TRUEHAVEN STAYS - INTERACTIVE JAVASCRIPT
   Handles property detail overlays, photo carousels, pricing calculator & WhatsApp reservation
   ========================================================================== */

const PARAMOUNT_AIRBNB_URL = "https://www.airbnb.co.uk/rooms/1761390398461668658?unique_share_id=e3924d43-ff08-4672-af1f-88d210f07cfa&viralityEntryPoint=1&s=76&source_impression_id=p3_1788349185_P3ng4E3hx17yac8B";
const BURJ_VISTA_AIRBNB_URL = "https://www.airbnb.co.uk/rooms/1762128215305557732?unique_share_id=8ee15777-1779-4293-a444-fbe1a8d11359&viralityEntryPoint=1&s=76&source_impression_id=p3_1788350250_P3tWF4FsNSd8rdnM";

// Exact Airbnb Photo Tour Categories and Photo Sequences

const PARAMOUNT_PHOTOS = [
    "assets/paramount/paramount_seq_1.png",
    "assets/paramount/paramount_seq_2.png",
    "assets/paramount/paramount_seq_3.jpg",
    "assets/paramount/paramount_seq_4.jpg",
    "assets/paramount/paramount_seq_5.png",
    "assets/paramount/paramount_seq_6.png",
    "assets/paramount/paramount_seq_7.png",
    "assets/paramount/paramount_seq_8.png",
    "assets/paramount/paramount_seq_9.jpg",
    "assets/paramount/paramount_seq_10.png",
    "assets/paramount/paramount_seq_11.png",
    "assets/paramount/paramount_seq_12.jpg",
    "assets/paramount/paramount_seq_13.jpg",
    "assets/paramount/paramount_seq_14.png",
    "assets/paramount/paramount_seq_15.jpg",
    "assets/paramount/paramount_seq_16.jpg",
    "assets/paramount/paramount_seq_17.jpg",
    "assets/paramount/paramount_seq_18.jpg",
    "assets/paramount/paramount_seq_19.jpg",
    "assets/paramount/paramount_seq_20.jpg",
    "assets/paramount/paramount_seq_21.png",
    "assets/paramount/paramount_seq_22.png",
    "assets/paramount/paramount_seq_23.png",
    "assets/paramount/paramount_seq_24.jpg",
    "assets/paramount/paramount_seq_25.jpg",
    "assets/paramount/paramount_seq_26.jpg",
    "assets/paramount/paramount_seq_27.jpg",
    "assets/paramount/paramount_seq_28.jpg",
    "assets/paramount/paramount_seq_29.jpg",
    "assets/paramount/paramount_seq_30.jpg",
    "assets/paramount/paramount_seq_31.jpg",
    "assets/paramount/paramount_seq_32.jpg",
    "assets/paramount/paramount_seq_33.jpg",
    "assets/paramount/paramount_seq_34.jpg",
    "assets/paramount/paramount_seq_35.jpg",
    "assets/paramount/paramount_seq_36.jpg",
    "assets/paramount/paramount_seq_37.jpg",
    "assets/paramount/paramount_seq_38.jpg",
    "assets/paramount/paramount_seq_39.jpg",
    "assets/paramount/paramount_seq_40.jpg",
    "assets/paramount/paramount_seq_41.jpg",
    "assets/paramount/paramount_seq_42.jpg",
    "assets/paramount/paramount_seq_43.jpg",
    "assets/paramount/paramount_seq_44.jpg",
    "assets/paramount/paramount_seq_45.jpg",
    "assets/paramount/paramount_seq_46.jpg",
    "assets/paramount/paramount_seq_47.jpg",
    "assets/paramount/paramount_seq_48.jpg",
    "assets/paramount/paramount_seq_49.jpg",
    "assets/paramount/paramount_seq_50.jpg",
    "assets/paramount/paramount_seq_51.jpg",
    "assets/paramount/paramount_seq_52.jpg",
    "assets/paramount/paramount_seq_53.jpg",
    "assets/paramount/paramount_seq_54.jpg",
    "assets/paramount/paramount_seq_55.jpg",
    "assets/paramount/paramount_seq_56.jpg",
    "assets/paramount/paramount_seq_57.jpg",
    "assets/paramount/paramount_seq_58.jpg",
    "assets/paramount/paramount_seq_59.jpg",
    "assets/paramount/paramount_seq_60.jpg",
    "assets/paramount/paramount_seq_61.jpg",
    "assets/paramount/paramount_seq_62.jpg",
    "assets/paramount/paramount_seq_63.jpg",
    "assets/paramount/paramount_seq_64.png",
    "assets/paramount/paramount_seq_65.png",
    "assets/paramount/paramount_seq_66.png",
    "assets/paramount/paramount_seq_67.png",
    "assets/paramount/paramount_seq_68.png",
    "assets/paramount/paramount_seq_69.png",
    "assets/paramount/paramount_seq_70.jpg",
    "assets/paramount/paramount_seq_71.jpg",
    "assets/paramount/paramount_seq_72.jpg",
    "assets/paramount/paramount_seq_73.jpg",
    "assets/paramount/paramount_seq_74.jpg",
    "assets/paramount/paramount_seq_75.jpg",
    "assets/paramount/paramount_seq_76.jpg",
    "assets/paramount/paramount_seq_77.jpg",
    "assets/paramount/paramount_seq_78.jpg",
    "assets/paramount/paramount_seq_79.jpg",
    "assets/paramount/paramount_seq_80.jpg",
    "assets/paramount/paramount_seq_81.jpg",
    "assets/paramount/paramount_seq_82.png",
    "assets/paramount/paramount_seq_83.png",
    "assets/paramount/paramount_seq_84.png"
];

const BURJ_VISTA_PHOTOS = [
    "assets/burj_vista/burj_seq_1.jpg",
    "assets/burj_vista/burj_seq_2.jpg",
    "assets/burj_vista/burj_seq_3.jpg",
    "assets/burj_vista/burj_seq_4.jpg",
    "assets/burj_vista/burj_seq_5.jpg",
    "assets/burj_vista/burj_seq_6.jpg",
    "assets/burj_vista/burj_seq_7.jpg",
    "assets/burj_vista/burj_seq_8.jpg",
    "assets/burj_vista/burj_seq_9.jpg",
    "assets/burj_vista/burj_seq_10.jpg",
    "assets/burj_vista/burj_seq_11.jpg",
    "assets/burj_vista/burj_seq_12.jpg",
    "assets/burj_vista/burj_seq_13.jpg",
    "assets/burj_vista/burj_seq_14.jpg",
    "assets/burj_vista/burj_seq_15.jpg",
    "assets/burj_vista/burj_seq_16.png",
    "assets/burj_vista/burj_seq_17.jpg",
    "assets/burj_vista/burj_seq_18.jpg",
    "assets/burj_vista/burj_seq_19.jpg",
    "assets/burj_vista/burj_seq_20.jpg",
    "assets/burj_vista/burj_seq_21.jpg",
    "assets/burj_vista/burj_seq_22.jpg",
    "assets/burj_vista/burj_seq_23.jpg",
    "assets/burj_vista/burj_seq_24.jpg",
    "assets/burj_vista/burj_seq_25.jpg",
    "assets/burj_vista/burj_seq_26.jpg",
    "assets/burj_vista/burj_seq_27.jpg",
    "assets/burj_vista/burj_seq_28.jpg",
    "assets/burj_vista/burj_seq_29.jpg",
    "assets/burj_vista/burj_seq_30.jpg",
    "assets/burj_vista/burj_seq_31.jpg",
    "assets/burj_vista/burj_seq_32.jpg",
    "assets/burj_vista/burj_seq_33.jpg",
    "assets/burj_vista/burj_seq_34.jpg",
    "assets/burj_vista/burj_seq_35.jpg",
    "assets/burj_vista/burj_seq_36.jpg",
    "assets/burj_vista/burj_seq_37.jpg",
    "assets/burj_vista/burj_seq_38.jpg",
    "assets/burj_vista/burj_seq_39.jpg",
    "assets/burj_vista/burj_seq_40.jpg",
    "assets/burj_vista/burj_seq_41.jpg",
    "assets/burj_vista/burj_seq_42.jpg",
    "assets/burj_vista/burj_seq_43.jpg",
    "assets/burj_vista/burj_seq_44.jpg",
    "assets/burj_vista/burj_seq_45.jpg",
    "assets/burj_vista/burj_seq_46.jpg",
    "assets/burj_vista/burj_seq_47.jpg",
    "assets/burj_vista/burj_seq_48.jpg",
    "assets/burj_vista/burj_seq_49.jpg",
    "assets/burj_vista/burj_seq_50.jpg",
    "assets/burj_vista/burj_seq_51.jpg",
    "assets/burj_vista/burj_seq_52.jpg",
    "assets/burj_vista/burj_seq_53.jpg",
    "assets/burj_vista/burj_seq_54.png",
    "assets/burj_vista/burj_seq_55.png",
    "assets/burj_vista/burj_seq_56.png",
    "assets/burj_vista/burj_seq_57.png",
    "assets/burj_vista/burj_seq_58.png",
    "assets/burj_vista/burj_seq_59.png",
    "assets/burj_vista/burj_seq_60.png",
    "assets/burj_vista/burj_seq_61.jpg",
    "assets/burj_vista/burj_seq_62.png",
    "assets/burj_vista/burj_seq_63.png",
    "assets/burj_vista/burj_seq_64.jpg",
    "assets/burj_vista/burj_seq_65.jpg",
    "assets/burj_vista/burj_seq_66.jpg",
    "assets/burj_vista/burj_seq_67.jpg",
    "assets/burj_vista/burj_seq_68.jpg",
    "assets/burj_vista/burj_seq_69.png",
    "assets/burj_vista/burj_seq_70.png",
    "assets/burj_vista/burj_seq_71.png",
    "assets/burj_vista/burj_seq_72.png"
];

const PARAMOUNT_CATEGORIES_MANIFEST = [
    { id: "all_photos", name: "Full Photo Tour", photos: PARAMOUNT_PHOTOS }
];

// Property Database
const PROPERTIES_DATA = {
    'paramount': {
        id: 'paramount',
        name: 'Burj View & Infinity Pool | 7 min to Dubai Mall',
        tagline: '🏊‍♂️ Rooftop Infinity Pool · Unobstructed Burj Khalifa View',
        location: 'Al Mustaqbal Street, Business Bay / Downtown Dubai, UAE',
        specs: '4 guests · 1 bedroom · 2 beds · 1.5 bathrooms',
        priceNight: 240,
        maxGuests: 4,
        currency: 'USD',
        priceAed: 880,
        rating: '★ New',
        reviewsCount: 12,
        badge: null,
        hostName: 'Prince',
        airbnbUrl: PARAMOUNT_AIRBNB_URL,
        photos: PARAMOUNT_PHOTOS,
        
        // Exact Airbnb Detailed Content Sections
        aboutThisSpace: `Start your day with a dip in the luxurious infinity pool on the rooftop at 64th floor, taking in the sweeping Burj Khalifa and Downtown skyline view, then enjoy that same iconic view right from your own private balcony.

This one-bedroom apartment in Business Bay near Downtown offers five-star amenities and a stylish, comfortable interior. Perfect for couples, families, or business travellers looking for comfort and convenience in one of the city's most sought-after neighbourhoods.`,
        
        theSpace: `A one-bedroom home with the highest infinity pool in Downtown Dubai and a balcony view of the Burj Khalifa & Downtown skyline. Comfortable and well-equipped for couples, families, or business travellers alike.`,
        
        propertyHighlights: [
            "Layout: 1 bedroom, 1.5 bathrooms, 2 beds, sleeps up to 4",
            "View: Private balcony with Burj Khalifa and Downtown skyline view",
            "Amenities: 5-star, hotel-style building facilities",
            "Building extras: Residents' lounge, grocery store on-site, spa, gym",
            "Wi-Fi: Free high-speed internet throughout"
        ],
        
        livingRoom: [
            "Comfortable sofa with cushions",
            "65-inch Smart TV in the living room; 55-inch Smart TV in the bedroom",
            "Stylish coffee table",
            "1 sofa bed, sleeping up to 2 additional guests",
            "Balcony access with panoramic views"
        ],
        
        kitchenDining: [
            "Dishwasher, electric oven, and stove",
            "Fridge, freezer and microwave",
            "Coffee machine, kettle, and toaster",
            "Full set of pots and pans (non-stick, frying pans, saucepans)",
            "Baking trays, cutting boards, knives, and cooking utensils",
            "Plates, bowls, glasses, mugs, and cutlery for all guests"
        ],
        
        sleepingArrangements: [
            "Master Bedroom: king-size bed with ensuite bathroom",
            "Living Room: comfortable sofa bed",
            "Premium mattresses, hotel-quality bedding, and full blackout shades"
        ],
        
        bathrooms: [
            "One ensuite bathroom",
            "One powder room",
            "Fresh towels and essential toiletries provided"
        ],
        
        nearbyAttractions: [
            "Burj Khalifa: 12-minute walk",
            "Dubai Mall: 15-minute walk",
            "Dubai Fountain: 15-minute walk to the famous water shows",
            "Dubai Aquarium: 17-minute walk, inside Dubai Mall",
            "Burj Park: 14-minute walk for lake and skyline views",
            "Sky Views Observatory: 18-minute walk for glass floors and thrills"
        ],
        
        gettingAround: {
            locally: [
                "Walking: Burj Khalifa and Downtown Dubai attractions are 12–18 minutes away on foot",
                "Metro: Business Bay Metro Station, about a 10-minute walk",
                "Taxi / Uber / Careem: Easy pickup right from the building entrance",
                "Bus: Nearby stops connect Business Bay to the rest of Dubai"
            ],
            airport: [
                "Taxi / Uber: Approximately 15 minutes direct to the apartment",
                "Metro: Red Line from DXB to Business Bay Station (about 25 minutes), then a short walk",
                "Car rental: Easy drive via Sheikh Zayed Road, with parking available"
            ]
        },
        
        guestAccess: `Guests have full, private access to the entire one-bedroom apartment, the living area, modern kitchen, and the wonderful Burj Khalifa and Downtown skyline view from the balcony, plus everything the building's residential amenities have to offer.`,
        
        sharedBuildingAmenities: [
            "Rooftop pool: Guests have access to a 64th-floor infinity pool, open daily from 7 AM to 7 PM.",
            "Sky lounge: The Malibu Sky Lounge & Bar is available for drinks and relaxation, with happy hour running from 4 to 7 PM.",
            "Wellness spa: A sauna and jacuzzi are available for guests looking to unwind further, for an extra fee.",
            "Gym: A state-of-the-art fitness area is open for all guests.",
            "Kids' playroom: Families traveling with children can make use of the indoor playroom, available for an extra fee.",
            "Dining: The building offers top-tier restaurants on-site for dining.",
            "Groceries: An on-site grocery store is available for everyday essentials.",
            "Security: 24/7 on-site security is provided for peace of mind.",
            "Check-in: Check-in is fully self-service and available 24 hours a day, starting from 3 PM on your check-in date."
        ],
        
        houseRules: {
            idReq: "All guests must submit soft copies of their passports before check-in for building and security registration, in line with Dubai authorities (DTCM) rules.",
            checkInOut: "Check-in: 3:00 PM · Check-out: 11:00 AM sharp (housekeeping arrives promptly at this time)",
            lateCheckout: "AED 100 for extension to 12:00 PM (subject to host approval); after 12:00 PM, a full day's rate applies (subject to availability)",
            propertyUse: "This home is for residential stays only. Commercial use, business operations, and events are strictly prohibited.",
            accessCards: "Please return all access cards in good condition at checkout. Lost or damaged cards incur a fee of AED 350 per card.",
            smokingPolicy: "Smoking inside the apartment is not permitted. Any evidence of smoking results in a fee of AED 2,000 for professional odour removal, duct cleaning, and furniture deep cleaning.",
            noisePolicy: "No parties or loud music.",
            cleaningServices: "The apartment is deep-cleaned before every check-in. Extra cleaning during your stay can be arranged for an additional cost.",
            registrationDetails: "BUS-PAR-KJYVF"
        },

        categorizedAmenities: [
            {
                category: "Bathroom",
                icon: "fa-bath",
                items: [
                    { text: "Bath", available: true },
                    { text: "Hairdryer", available: true },
                    { text: "Shampoo", available: true },
                    { text: "Body soap", available: true },
                    { text: "Hot water", available: true },
                    { text: "Shower gel", available: true }
                ]
            },
            {
                category: "Bedroom and laundry",
                icon: "fa-bed",
                items: [
                    { text: "Washing machine", available: true },
                    { text: "Essentials (Towels, bed sheets, soap and toilet paper)", available: true },
                    { text: "Hangers", available: true },
                    { text: "Room-darkening blinds", available: true },
                    { text: "Iron", available: true },
                    { text: "Clothes storage: wardrobe", available: true }
                ]
            },
            {
                category: "Entertainment",
                icon: "fa-tv",
                items: [
                    { text: "TV (65-inch Smart TV in living room; 55-inch Smart TV in bedroom)", available: true }
                ]
            },
            {
                category: "Heating and cooling",
                icon: "fa-snowflake",
                items: [
                    { text: "Air conditioning", available: true }
                ]
            },
            {
                category: "Home safety",
                icon: "fa-shield-halved",
                items: [
                    { text: "Smoke alarm", available: true },
                    { text: "Carbon monoxide alarm", available: true },
                    { text: "Fire extinguisher", available: true },
                    { text: "First aid kit", available: true }
                ]
            },
            {
                category: "Internet and office",
                icon: "fa-wifi",
                items: [
                    { text: "Wifi (Free high-speed internet throughout)", available: true }
                ]
            },
            {
                category: "Kitchen and dining",
                icon: "fa-utensils",
                items: [
                    { text: "Kitchen (Space where guests can cook their own meals)", available: true },
                    { text: "Fridge", available: true },
                    { text: "Microwave", available: true },
                    { text: "Cooking basics (Pots and pans, oil, salt and pepper)", available: true },
                    { text: "Crockery and cutlery (Bowls, chopsticks, plates, cups, etc.)", available: true },
                    { text: "Freezer", available: true },
                    { text: "Dishwasher", available: true },
                    { text: "Oven", available: true },
                    { text: "Kettle", available: true },
                    { text: "Coffee maker", available: true },
                    { text: "Wine glasses", available: true },
                    { text: "Toaster", available: true },
                    { text: "Dining table", available: true }
                ]
            },
            {
                category: "Outdoor",
                icon: "fa-chair",
                items: [
                    { text: "Outdoor furniture", available: true }
                ]
            },
            {
                category: "Parking and facilities",
                icon: "fa-square-parking",
                items: [
                    { text: "Free parking on premises", available: true },
                    { text: "Pool (64th Floor Rooftop Infinity Pool)", available: true },
                    { text: "Lift (Lift doorway 32\" / 81cm wide, depth 52\" / 132cm)", available: true },
                    { text: "Gym (State-of-the-art fitness center)", available: true }
                ]
            },
            {
                category: "Not included",
                icon: "fa-circle-xmark",
                items: [
                    { text: "Exterior security cameras on property", available: false },
                    { text: "Tumble dryer", available: false },
                    { text: "Heating", available: false }
                ]
            }
        ]
    },
    'burj-vista': {
        id: 'burj-vista',
        name: 'Burj Khalifa & Fountain view | Direct mall access',
        tagline: '🗼 Direct Unobstructed Views of Burj Khalifa & Dubai Fountain · Direct Metro & Mall Access',
        location: 'Sheikh Mohammed Bin Rashid Boulevard, Downtown Dubai, UAE',
        specs: '4 guests · 1 bedroom · 3 beds · 1.5 bathrooms',
        priceNight: 290,
        maxGuests: 4,
        currency: 'USD',
        priceAed: 1065,
        rating: '5.0',
        reviewsCount: 6,
        badge: 'Guest favorite',
        hostName: 'Prince',
        airbnbUrl: BURJ_VISTA_AIRBNB_URL,
        photos: BURJ_VISTA_PHOTOS,
        
        aboutThisSpace: `Wake up to sweeping views of the Burj Khalifa and the Dubai Fountain from this luxurious one-bedroom apartment in the heart of Downtown Dubai.\n\nEnjoy five-star building amenities and a stylish, comfortable interior, directly connected to Dubai Mall and Dubai Metro through an internal AC skybridge. Perfect for couples, families, or business travellers looking for comfort and convenience in one of the city's most iconic addresses.`,
        
        theSpace: `A one-bedroom home built around its view, with Dubai Mall and Dubai Metro directly connected through an internal AC skybridge. Comfortable and well-equipped for couples, families, or business travellers alike.`,
        
        propertyHighlights: [
            "Layout: 1 bedroom, 1.5 bathrooms, 3 beds, sleeps up to 4",
            "View: Private balcony with full Burj Khalifa and Fountain view",
            "Amenities: 5-star, hotel-style building facilities",
            "Building extras: Residents' lounge, grocery store on-site",
            "Access: Internal sky bridge to Dubai Mall and Metro, 1 minute away",
            "Wi-Fi: Free high-speed internet throughout"
        ],

        livingRoom: [
            "Comfortable sofas with cushions",
            "65-inch Smart TV in the living room; 55-inch Smart TV in the bedroom",
            "Stylish coffee table",
            "2 sofa bed, sleeping up to 4 additional guests",
            "Balcony access with uninterrupted Burj Khalifa views"
        ],

        kitchenDining: [
            "Dishwasher, electric oven, and stove",
            "Fridge, freezer and microwave",
            "Coffee machine, kettle, and toaster",
            "Full set of pots and pans (non-stick, frying pans, saucepans)",
            "Baking trays, cutting boards, knives, and cooking utensils",
            "Plates, bowls, glasses, mugs, and cutlery for all guests"
        ],
        
        sleepingArrangements: [
            "Master Bedroom: king-size bed with ensuite bathroom",
            "Living Room: 2 comfortable sofa beds",
            "Premium mattresses, hotel-quality bedding, and full blackout shades"
        ],
        
        bathrooms: [
            "One ensuite bathroom",
            "One powder room",
            "Fresh towels and essential toiletries provided"
        ],
        
        nearbyAttractions: [
            "Burj Khalifa: 2-minute walk via direct walkway",
            "Dubai Mall: 5-minute walk through an internal sky bridge",
            "Dubai Fountain: 5-minute walk to the famous water shows",
            "Dubai Aquarium: 7-minute walk, inside Dubai Mall",
            "Burj Park: 6-minute walk for lake and skyline views",
            "Sky Views Observatory: 8-minute walk for glass floors and thrills"
        ],
        
        gettingAround: {
            locally: [
                "Walking: Most Downtown attractions are 5–10 minutes away on foot",
                "Metro: Burj Khalifa / Dubai Mall Station (Red Line), about 5-minute walk through an internal sky bridge",
                "Taxi / Uber / Careem: Easy pickup right from the tower entrance",
                "Bus: Nearby stops connect Downtown to the rest of Dubai"
            ],
            airport: [
                "Taxi / Uber: Approximately 15 minutes direct to Burj Vista",
                "Metro: Red Line from DXB to Burj Khalifa / Dubai Mall Station (about 25 minutes), then a short walk",
                "Car rental: Easy drive via Sheikh Zayed Road, with parking available"
            ]
        },
        
        guestAccess: `Guests have full, private access to the entire one-bedroom apartment, the living area, modern kitchen, and the Burj Khalifa view, plus everything the building's residential amenities have to offer.`,
        
        sharedBuildingAmenities: [
            "Swimming pool: Large pool with Burj Khalifa views",
            "Gym: Fully equipped fitness area",
            "Lounges: Residents' lounge and elegant lobby lounge",
            "Security: 24/7 on-site security",
            "Check-in: 24-hour check-in, in the presence of the host. Starting from 3 PM on your check-in date",
            "Climate: Air conditioning throughout the building",
            "Access: Elevator access to all floors"
        ],
        
        houseRules: {
            idReq: "All guests must submit soft copies of their passports before check-in for building and security registration, in line with the Dubai authority (DTCM) rules.",
            checkInOut: "Check-in: 3:00 PM · Check-out: 11:00 AM sharp (housekeeping arrives promptly at this time)",
            lateCheckout: "AED 100 for extension to 12:00 PM (subject to host approval); after 12:00 PM, a full day's rate applies (subject to availability)",
            propertyUse: "This home is for residential stays only. Commercial use, business operations, and events are strictly prohibited.",
            accessCards: "Please return all access cards in good condition at checkout. Lost or damaged cards incur a fee of AED 350 per card.",
            smokingPolicy: "Smoking inside the apartment is strictly not permitted. Any evidence of smoking results in a fee of AED 2,000 for professional odour removal, duct cleaning, and furniture deep cleaning.",
            noisePolicy: "No parties or loud music inside the apartment. Be respectful to our neighbours.",
            cleaningServices: "The apartment is deep-cleaned before every check-in. Extra cleaning during your stay can be arranged for an additional fee.",
            registrationDetails: "BUR-BUR-0XCRY"
        }
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

let isOpeningDetail = false;

// Open Full-Page Immersive Property Detail View (No Popup Modal)
function openPropertyDetail(propId) {
    const data = PROPERTIES_DATA[propId];
    if (!data) return;

    const pageContainer = document.getElementById('propertyDetailPage');
    const mainPage = document.getElementById('mainPage');
    if (!pageContainer || !mainPage) return;

    const bedroomImg = propId === 'paramount' ? 'assets/paramount/bedroom_1.jpg' : 'assets/burj_vista/burj_bedroom_1.jpg';
    const livingImg = propId === 'paramount' ? 'assets/paramount/living_room_1.jpg' : 'assets/burj_vista/burj_living_room_1.jpg';

    // Desktop 5-Photo Grid
    const desktopPhotoGridHtml = `
        <div class="desktop-photo-grid-wrap" style="position: relative; margin-bottom: 28px; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); cursor: pointer;" onclick="openPhotoGalleryModal('${propId}')">
            <div class="detail-photo-grid">
                <img src="${data.photos[0]}" alt="${data.name}" class="photo-large">
                <div class="detail-photo-grid-right">
                    <img src="${data.photos[1]}" alt="${data.name}">
                    <img src="${data.photos[2]}" alt="${data.name}">
                    <img src="${data.photos[3]}" alt="${data.name}">
                    <img src="${data.photos[4] || data.photos[0]}" alt="${data.name}">
                </div>
            </div>
            <button class="button-secondary" onclick="event.stopPropagation(); openPhotoGalleryModal('${propId}')" style="position: absolute; bottom: 18px; right: 18px; background: rgba(255,255,255,0.95); border: 1px solid #222; border-radius: 8px; padding: 7px 15px; font-weight: 600; font-size: 13px; display: flex; align-items: center; gap: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
                <i class="fa-solid fa-border-all"></i> Show all ${data.photos.length} photos
            </button>
        </div>
    `;

    // Mobile Edge-to-Edge Hero Carousel
    const mobileHeroHtml = `
        <div class="mobile-pdp-hero">
            <div class="mobile-hero-track" id="mobileHeroTrack">
                ${data.photos.slice(0, 10).map(p => `<img src="${p}" alt="${data.name}" class="mobile-hero-img">`).join('')}
            </div>
            <div class="mobile-photo-counter" onclick="openPhotoGalleryModal('${propId}')">
                <i class="fa-solid fa-border-all" style="font-size: 11px; margin-right: 4px;"></i> 1 / ${data.photos.length}
            </div>
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
        <!-- Mobile Floating Header Buttons (Over Hero Photo) -->
        <div class="mobile-pdp-top-bar">
            <button onclick="closePropertyDetailPage()" class="mobile-circle-btn" title="Back">
                <i class="fa-solid fa-chevron-left"></i>
            </button>
            <div style="display: flex; gap: 10px;">
                <button class="mobile-circle-btn" title="Share">
                    <i class="fa-solid fa-arrow-up-from-bracket"></i>
                </button>
                <button class="mobile-circle-btn" title="Save">
                    <i class="fa-regular fa-heart"></i>
                </button>
            </div>
        </div>

        <!-- Full Page Sticky Navigation Header (Desktop Only) -->
        <header class="top-nav desktop-pdp-nav" style="position: sticky; top: 0; z-index: 100; background: rgba(255,255,255,0.95); backdrop-filter: blur(12px); border-bottom: 1px solid #E5E0D8; height: 76px;">
            <div class="container nav-wrapper" style="display: flex; align-items: center; justify-content: space-between;">
                <div style="display: flex; align-items: center; gap: 20px;">
                    <button onclick="closePropertyDetailPage()" style="background: var(--color-surface-soft); border: 1px solid #E5E0D8; padding: 8px 16px; border-radius: 999px; font-weight: 700; font-size: 14px; cursor: pointer; color: #0F1E36; display: flex; align-items: center; gap: 8px; transition: background 0.2s;">
                        <i class="fa-solid fa-arrow-left"></i> Back to all residences
                    </button>
                    <a href="#" class="brand-logo" onclick="closePropertyDetailPage(); return false;">
                        <img src="assets/logo.png" alt="TrueHaven Logo" class="logo-img" style="height: 38px;">
                    </a>
                </div>

                <div style="display: flex; align-items: center; gap: 12px;">
                    <a href="https://wa.me/971525821668" target="_blank" class="button-primary" style="padding: 8px 18px; font-size: 13px; border-radius: 999px;">
                        <i class="fa-brands fa-whatsapp"></i> WhatsApp Concierge
                    </a>
                    <a href="https://www.instagram.com/truehavenstays/?hl=en" target="_blank" title="Follow us on Instagram (@truehavenstays)" style="display: flex; align-items: center; justify-content: center; width: 38px; height: 38px; border-radius: 50%; background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); color: #FFFFFF; text-decoration: none; font-size: 18px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
                        <i class="fa-brands fa-instagram"></i>
                    </a>
                </div>
            </div>
        </header>

        <!-- Mobile Edge-to-Edge Hero Image Carousel -->
        ${mobileHeroHtml}

        <!-- Main Property Detail Container -->
        <div class="container mobile-pdp-container" style="max-width: 1280px; margin: 32px auto 80px; padding: 0 24px;">
            
            <!-- Title Header Row (Desktop Layout) -->
            <div class="desktop-pdp-header" style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
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

            <!-- Desktop Photo Grid -->
            ${desktopPhotoGridHtml}

            <!-- Mobile Title Header Section (Ref Image 2) -->
            <div class="mobile-pdp-title-block" style="margin-bottom: 24px;">
                <h1 style="font-size: 24px; font-weight: 800; color: #222222; margin-bottom: 8px; line-height: 1.25;">${data.name}!</h1>
                <p style="font-size: 15px; color: #717171; margin-bottom: 4px;">Entire rental unit in Dubai, United Arab Emirates</p>
                <p style="font-size: 14px; color: #222222; font-weight: 600; margin-bottom: 8px;">${data.specs}</p>
                <div style="font-size: 14px; font-weight: 700; color: #222222;">
                    <i class="fa-solid fa-star" style="color: #FF385C;"></i> ${data.rating} (${data.reviewsCount} reviews)
                </div>
            </div>

            <div class="detail-body-layout">
                
                <!-- Left Main Column -->
                <div class="detail-left-col">
                    
                    <!-- Host Profile Row (Ref Image 2) -->
                    <div class="host-row" style="padding: 24px 0; border-top: 1px solid #EBEBEB; border-bottom: 1px solid #EBEBEB; margin-bottom: 24px; display: flex; align-items: center; gap: 16px;">
                        <img src="assets/prince_new_avatar.png" alt="Prince" class="host-avatar" style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover;">
                        <div>
                            <div class="host-name" style="font-size: 16px; font-weight: 700; color: #222222;">Hosted by ${data.hostName}</div>
                            <div class="host-badge" style="font-size: 13px; color: #717171;">5-Star Luxury Stays</div>
                        </div>
                    </div>

                    <!-- Highlights Row (Ref Image 2) -->
                    <div style="padding-bottom: 24px; border-bottom: 1px solid #EBEBEB; margin-bottom: 24px;">
                        ${propId === 'paramount' ? `
                        <div style="display: flex; gap: 16px; align-items: flex-start; margin-bottom: 16px;">
                            <i class="fa-solid fa-water-ladder" style="font-size: 20px; color: #222222; margin-top: 2px;"></i>
                            <div>
                                <h4 style="font-size: 16px; font-weight: 700; color: #222222; margin-bottom: 2px;">Rooftop Infinity Pool & Balcony View</h4>
                                <p style="font-size: 14px; color: #717171; margin: 0;">Access to the 64th-floor rooftop pool with sweeping Burj Khalifa & Downtown skyline views</p>
                            </div>
                        </div>
                        <div style="display: flex; gap: 16px; align-items: flex-start;">
                            <i class="fa-solid fa-location-dot" style="font-size: 20px; color: #222222; margin-top: 2px;"></i>
                            <div>
                                <h4 style="font-size: 16px; font-weight: 700; color: #222222; margin-bottom: 2px;">Beautiful and walkable</h4>
                                <p style="font-size: 14px; color: #717171; margin: 0;">12-minute walk to Burj Khalifa & 15-minute walk to Dubai Mall</p>
                            </div>
                        </div>
                        ` : `
                        <div style="display: flex; gap: 16px; align-items: flex-start; margin-bottom: 16px;">
                            <i class="fa-solid fa-location-dot" style="font-size: 20px; color: #222222; margin-top: 2px;"></i>
                            <div>
                                <h4 style="font-size: 16px; font-weight: 700; color: #222222; margin-bottom: 2px;">Beautiful and walkable</h4>
                                <p style="font-size: 14px; color: #717171; margin: 0;">This area is scenic and easy to get around.</p>
                            </div>
                        </div>
                        <div style="display: flex; gap: 16px; align-items: flex-start;">
                            <i class="fa-solid fa-water-ladder" style="font-size: 20px; color: #222222; margin-top: 2px;"></i>
                            <div>
                                <h4 style="font-size: 16px; font-weight: 700; color: #222222; margin-bottom: 2px;">Dive right in</h4>
                                <p style="font-size: 14px; color: #717171; margin: 0;">This is one of the few places in the area with a pool.</p>
                            </div>
                        </div>
                        `}
                    </div>

                    <!-- Where you'll sleep Section (Matches Airbnb exact card) -->
                    <div class="mobile-sleep-section" style="margin-bottom: 32px; padding-bottom: 32px; border-bottom: 1px solid #EBEBEB;">
                        <h3 style="font-size: 20px; font-weight: 700; color: #222222; margin-bottom: 16px;">Where you'll sleep</h3>
                        <div class="mobile-sleep-cards" style="display: flex; gap: 16px;">
                            <div class="mobile-sleep-card" style="max-width: 320px; width: 100%; border: 1px solid #EBEBEB; border-radius: 16px; padding: 16px; background: #FFF; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
                                <img src="${bedroomImg}" alt="Bedroom" style="width: 100%; aspect-ratio: 4/3; object-fit: cover; border-radius: 12px; margin-bottom: 12px;">
                                <h5 style="font-size: 16px; font-weight: 700; color: #222; margin-bottom: 4px;">Bedroom</h5>
                                <p style="font-size: 14px; color: #717171; margin: 0;">${propId === 'paramount' ? '1 king bed, 1 sofa bed' : '1 king bed, 2 sofa beds'}</p>
                            </div>
                        </div>
                    </div>

                    <!-- About this space & The space -->
                    <div style="margin-bottom: 32px; padding-bottom: 32px; border-bottom: 1px solid #EBEBEB;">
                        <h3 style="font-size: 20px; font-weight: 700; color: #222222; margin-bottom: 12px;">About this space</h3>
                        <p style="font-size: 15px; color: #374151; line-height: 1.65; white-space: pre-line; margin-bottom: 16px;">${data.aboutThisSpace || data.description}</p>
                        ${data.theSpace ? `
                            <h4 style="font-size: 16px; font-weight: 700; color: #222; margin: 20px 0 8px;">The space</h4>
                            <p style="font-size: 15px; color: #374151; line-height: 1.6; white-space: pre-line;">${data.theSpace}</p>
                        ` : ''}
                    </div>

                    <!-- Property Highlights Section -->
                    ${data.propertyHighlights ? `
                    <div style="margin-bottom: 32px; padding-bottom: 32px; border-bottom: 1px solid #EBEBEB;">
                        <h3 style="font-size: 20px; font-weight: 700; color: #222222; margin-bottom: 16px;">Property Highlights</h3>
                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            ${data.propertyHighlights.map(item => `
                                <div style="display: flex; align-items: flex-start; gap: 12px; font-size: 15px; color: #222;">
                                    <i class="fa-solid fa-circle-check" style="color: #10B981; font-size: 17px; margin-top: 2px;"></i>
                                    <span>${item}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}

                    <!-- Living Room & Kitchen and Dining -->
                    ${data.livingRoom || data.kitchenDining ? `
                    <div style="margin-bottom: 32px; padding-bottom: 32px; border-bottom: 1px solid #EBEBEB;">
                        ${data.livingRoom ? `
                            <h3 style="font-size: 18px; font-weight: 700; color: #222; margin-bottom: 8px;">Living Room</h3>
                            <p style="font-size: 14px; color: #717171; margin-bottom: 12px;">A bright, modern space made for relaxing and spending time together.</p>
                            <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px;">
                                ${data.livingRoom.map(item => `
                                    <div style="display: flex; align-items: flex-start; gap: 10px; font-size: 14px; color: #222;">
                                        <span style="color: #10B981; font-weight: 800;">✔</span>
                                        <span>${item}</span>
                                    </div>
                                `).join('')}
                            </div>
                        ` : ''}

                        ${data.kitchenDining ? `
                            <h3 style="font-size: 18px; font-weight: 700; color: #222; margin-bottom: 8px;">Kitchen and Dining</h3>
                            <p style="font-size: 14px; color: #717171; margin-bottom: 12px;">Fully stocked for home-cooked meals.</p>
                            <div style="display: flex; flex-direction: column; gap: 10px;">
                                ${data.kitchenDining.map(item => `
                                    <div style="display: flex; align-items: flex-start; gap: 10px; font-size: 14px; color: #222;">
                                        <span style="color: #10B981; font-weight: 800;">✔</span>
                                        <span>${item}</span>
                                    </div>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                    ` : ''}

                    <!-- Sleeping Arrangements & Bathrooms -->
                    ${data.sleepingArrangements || data.bathrooms ? `
                    <div style="margin-bottom: 32px; padding-bottom: 32px; border-bottom: 1px solid #EBEBEB;">
                        ${data.sleepingArrangements ? `
                            <h3 style="font-size: 18px; font-weight: 700; color: #222; margin-bottom: 12px;">Sleeping Arrangements</h3>
                            <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px;">
                                ${data.sleepingArrangements.map(item => `
                                    <div style="display: flex; align-items: flex-start; gap: 10px; font-size: 14px; color: #222;">
                                        <span style="color: #10B981; font-weight: 800;">✔</span>
                                        <span>${item}</span>
                                    </div>
                                `).join('')}
                            </div>
                        ` : ''}

                        ${data.bathrooms ? `
                            <h3 style="font-size: 18px; font-weight: 700; color: #222; margin-bottom: 12px;">Bathrooms — 1.5 Total</h3>
                            <div style="display: flex; flex-direction: column; gap: 10px;">
                                ${data.bathrooms.map(item => `
                                    <div style="display: flex; align-items: flex-start; gap: 10px; font-size: 14px; color: #222;">
                                        <span style="color: #10B981; font-weight: 800;">✔</span>
                                        <span>${item}</span>
                                    </div>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                    ` : ''}

                    <!-- Nearby Attractions & Getting Around -->
                    ${data.nearbyAttractions || data.gettingAround ? `
                    <div style="margin-bottom: 32px; padding-bottom: 32px; border-bottom: 1px solid #EBEBEB;">
                        ${data.nearbyAttractions ? `
                            <h3 style="font-size: 20px; font-weight: 700; color: #222222; margin-bottom: 16px;">Nearby Attractions</h3>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; margin-bottom: 24px;">
                                ${data.nearbyAttractions.map(item => `
                                    <div style="background: #F9FAFB; border: 1px solid #E5E7EB; padding: 12px 16px; border-radius: 12px; font-size: 14px; color: #222; display: flex; align-items: center; gap: 10px;">
                                        <i class="fa-solid fa-person-walking" style="color: #FF385C; font-size: 16px;"></i>
                                        <span>${item}</span>
                                    </div>
                                `).join('')}
                            </div>
                        ` : ''}

                        ${data.gettingAround ? `
                            <h3 style="font-size: 20px; font-weight: 700; color: #222222; margin-bottom: 16px;">Getting Around</h3>
                            
                            <h4 style="font-size: 15px; font-weight: 700; color: #374151; margin-bottom: 8px;">Locally</h4>
                            <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px;">
                                ${data.gettingAround.locally.map(item => `
                                    <div style="display: flex; align-items: flex-start; gap: 10px; font-size: 14px; color: #222;">
                                        <span style="color: #10B981; font-weight: 800;">✔</span>
                                        <span>${item}</span>
                                    </div>
                                `).join('')}
                            </div>

                            <h4 style="font-size: 15px; font-weight: 700; color: #374151; margin-bottom: 8px;">From Dubai International Airport (DXB)</h4>
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                                ${data.gettingAround.airport.map(item => `
                                    <div style="display: flex; align-items: flex-start; gap: 10px; font-size: 14px; color: #222;">
                                        <span style="color: #10B981; font-weight: 800;">✔</span>
                                        <span>${item}</span>
                                    </div>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                    ` : ''}

                    <!-- Guest Access & Shared Building Amenities -->
                    ${data.guestAccess || data.sharedBuildingAmenities ? `
                    <div style="margin-bottom: 32px; padding-bottom: 32px; border-bottom: 1px solid #EBEBEB;">
                        ${data.guestAccess ? `
                            <h3 style="font-size: 20px; font-weight: 700; color: #222222; margin-bottom: 12px;">Guest access</h3>
                            <p style="font-size: 15px; color: #374151; line-height: 1.6; margin-bottom: 24px;">${data.guestAccess}</p>
                        ` : ''}

                        ${data.sharedBuildingAmenities ? `
                            <h3 style="font-size: 18px; font-weight: 700; color: #222; margin-bottom: 16px;">Shared Building Amenities</h3>
                            <div style="display: flex; flex-direction: column; gap: 12px;">
                                ${data.sharedBuildingAmenities.map(item => `
                                    <div style="display: flex; align-items: flex-start; gap: 10px; font-size: 14px; color: #222;">
                                        <span style="color: #10B981; font-weight: 800;">✔</span>
                                        <span>${item}</span>
                                    </div>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                    ` : ''}

                    <!-- House Rules & Other Information -->
                    ${data.houseRules ? `
                    <div style="margin-bottom: 32px; padding: 24px; border-radius: 16px; background: #FAF9F6; border: 1px solid #E5E0D8;">
                        <h3 style="font-size: 20px; font-weight: 700; color: #0F1E36; margin-bottom: 4px;">Other things to note</h3>
                        <p style="font-size: 14px; font-weight: 600; color: #6B7280; margin-bottom: 20px;">House Rules and Other Information</p>

                        <div style="display: flex; flex-direction: column; gap: 16px; font-size: 14px; color: #222;">
                            <div>
                                <strong style="display: block; font-size: 15px; color: #0F1E36; margin-bottom: 4px;">Guest ID requirements</strong>
                                <p style="margin: 0; color: #374151;">✔ ${data.houseRules.idReq}</p>
                            </div>
                            <div>
                                <strong style="display: block; font-size: 15px; color: #0F1E36; margin-bottom: 4px;">Check-in and check-out</strong>
                                <p style="margin: 0; color: #374151;">✔ ${data.houseRules.checkInOut}</p>
                                ${data.houseRules.lateCheckout ? `<p style="margin: 4px 0 0; color: #374151;">✔ Late checkout: ${data.houseRules.lateCheckout}</p>` : ''}
                            </div>
                            <div>
                                <strong style="display: block; font-size: 15px; color: #0F1E36; margin-bottom: 4px;">Property use & Access cards</strong>
                                <p style="margin: 0; color: #374151;">✔ ${data.houseRules.propertyUse}</p>
                                ${data.houseRules.accessCards ? `<p style="margin: 4px 0 0; color: #374151;">✔ ${data.houseRules.accessCards}</p>` : ''}
                            </div>
                            <div>
                                <strong style="display: block; font-size: 15px; color: #0F1E36; margin-bottom: 4px;">Policies & Services</strong>
                                ${data.houseRules.smokingPolicy ? `<p style="margin: 0; color: #374151;">✔ ${data.houseRules.smokingPolicy}</p>` : ''}
                                ${data.houseRules.noisePolicy ? `<p style="margin: 4px 0 0; color: #374151;">✔ ${data.houseRules.noisePolicy}</p>` : ''}
                                ${data.houseRules.cleaningServices ? `<p style="margin: 4px 0 0; color: #374151;">✔ ${data.houseRules.cleaningServices}</p>` : ''}
                            </div>
                            <div style="margin-top: 8px; padding-top: 12px; border-top: 1px dashed #D1D5DB; font-size: 13px; color: #6B7280;">
                                <strong>DTCM Registration details:</strong> ${data.houseRules.registrationDetails}
                            </div>
                        </div>
                    </div>
                    ` : ''}

                    <!-- Meet Your Host Section (Exact Airbnb Match) -->
                    <div class="meet-host-section" style="margin-bottom: 40px; padding-top: 32px; border-top: 1px solid #EBEBEB;">
                        <h2 style="font-size: 24px; font-weight: 800; color: #222222; margin-bottom: 24px;">Meet your host</h2>
                        
                        <div class="meet-host-grid">
                            <!-- Left Side -->
                            <div>
                                <!-- Host Profile Card -->
                                <div class="host-profile-card" style="background: #FFFFFF; border-radius: 24px; padding: 28px; box-shadow: 0 6px 24px rgba(0,0,0,0.08); border: 1px solid #EBEBEB; display: flex; justify-content: space-between; align-items: center; gap: 20px; max-width: 340px; margin-bottom: 24px;">
                                    
                                    <!-- Left Side: Avatar & Name -->
                                    <div style="text-align: center; display: flex; flex-direction: column; align-items: center;">
                                        <div style="position: relative; width: 104px; height: 104px; margin-bottom: 12px;">
                                            <img src="assets/prince_new_avatar.png" alt="Prince - Host" style="width: 104px; height: 104px; border-radius: 50%; object-fit: cover; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                                            <div style="position: absolute; bottom: 2px; right: 2px; background: #FF385C; color: #FFFFFF; width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; border: 2px solid #FFFFFF; box-shadow: 0 2px 6px rgba(0,0,0,0.2);">
                                                <i class="fa-solid fa-check"></i>
                                            </div>
                                        </div>
                                        <h3 style="font-size: 22px; font-weight: 800; color: #222222; margin: 0 0 2px 0;">Prince</h3>
                                        <span style="font-size: 14px; font-weight: 600; color: #717171;">Host</span>
                                    </div>

                                    <!-- Right Side: Stats Column -->
                                    <div style="display: flex; flex-direction: column; gap: 14px; width: 120px;">
                                        <div style="padding-bottom: 10px; border-bottom: 1px solid #EBEBEB;">
                                            <div style="font-size: 20px; font-weight: 800; color: #222222;">3</div>
                                            <div style="font-size: 12px; color: #717171; font-weight: 600;">Reviews</div>
                                        </div>
                                        <div>
                                            <div style="font-size: 20px; font-weight: 800; color: #222222;">5.0 ★</div>
                                            <div style="font-size: 12px; color: #717171; font-weight: 600;">Rating</div>
                                        </div>
                                    </div>

                                </div>

                                <!-- Left Side: About Prince Info -->
                                <div style="display: flex; flex-direction: column; gap: 16px; font-size: 16px; color: #222222;">
                                    <div style="display: flex; align-items: center; gap: 14px;">
                                        <i class="fa-solid fa-graduation-cap" style="font-size: 20px; width: 24px; color: #222;"></i>
                                        <span>Where I went to school: IIT Delhi</span>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 14px;">
                                        <i class="fa-solid fa-globe" style="font-size: 20px; width: 24px; color: #222;"></i>
                                        <span>Speaks English and Hindi</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Right Side: Host details -->
                            <div>
                                <h3 style="font-size: 22px; font-weight: 800; color: #222222; margin-bottom: 16px;">Host details</h3>
                                <p style="font-size: 16px; color: #222222; margin-bottom: 24px; line-height: 1.5;">Response rate: 100%<br>Responds within an hour</p>
                                <a href="https://wa.me/971525821668" target="_blank" style="display: inline-block; background: #F7F7F7; color: #222222; text-decoration: none; border-radius: 8px; padding: 13px 23px; font-size: 16px; font-weight: 600; cursor: pointer; margin-bottom: 32px;">Message host</a>
                                
                                <div style="border-top: 1px solid #EBEBEB; padding-top: 24px; display: flex; align-items: center; gap: 12px; font-size: 12px; color: #717171; line-height: 1.4;">
                                    <i class="fa-brands fa-airbnb" style="font-size: 28px; color: #FF385C;"></i>
                                    <span>To help protect your payment, always use Airbnb to send money and communicate with hosts.</span>
                                </div>
                            </div>

                        </div>

                        <!-- Prince's Reviews Section -->
                        <div style="margin-top: 32px; padding-top: 32px; border-top: 1px solid #EBEBEB;">
                            <h3 style="font-size: 20px; font-weight: 800; color: #222222; margin-bottom: 20px;">Prince's reviews</h3>
                            
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; margin-bottom: 24px;">
                                
                                <!-- Review 1 -->
                                <div style="background: #FFFFFF; border: 1px solid #EBEBEB; border-radius: 16px; padding: 20px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
                                    <div style="margin-bottom: 16px;">
                                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px;">
                                            <div style="width: 42px; height: 42px; border-radius: 50%; background: #0F1E36; color: #FFF; font-weight: 700; display: flex; align-items: center; justify-content: center; font-size: 15px;">A</div>
                                            <div>
                                                <div style="font-size: 15px; font-weight: 700; color: #222;">Aditya</div>
                                                <div style="font-size: 13px; color: #717171;">Sammamish, WA</div>
                                            </div>
                                        </div>
                                        <div style="font-size: 12px; color: #222; margin-bottom: 8px;">
                                            <i class="fa-solid fa-star" style="color: #222;"></i>
                                            <i class="fa-solid fa-star" style="color: #222;"></i>
                                            <i class="fa-solid fa-star" style="color: #222;"></i>
                                            <i class="fa-solid fa-star" style="color: #222;"></i>
                                            <i class="fa-solid fa-star" style="color: #222;"></i>
                                            <span style="color: #717171; margin-left: 6px;">· Today</span>
                                        </div>
                                        <p style="font-size: 14px; color: #374151; line-height: 1.5; margin: 0;">"Was a very good location in the heart of downtown Dubai, a view literally in front of Burj Khalifa. Super clean, modern, and high class building. Prince also was great with check in and check out accommodation. Highly recommended him and this stay!"</p>
                                    </div>
                                </div>

                                <!-- Review 2 -->
                                <div style="background: #FFFFFF; border: 1px solid #EBEBEB; border-radius: 16px; padding: 20px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
                                    <div style="margin-bottom: 16px;">
                                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px;">
                                            <div style="width: 42px; height: 42px; border-radius: 50%; background: #10B981; color: #FFF; font-weight: 700; display: flex; align-items: center; justify-content: center; font-size: 15px;">F</div>
                                            <div>
                                                <div style="font-size: 15px; font-weight: 700; color: #222;">Felipe</div>
                                                <div style="font-size: 13px; color: #717171;">Cali, Colombia</div>
                                            </div>
                                        </div>
                                        <div style="font-size: 12px; color: #222; margin-bottom: 8px;">
                                            <i class="fa-solid fa-star" style="color: #222;"></i>
                                            <i class="fa-solid fa-star" style="color: #222;"></i>
                                            <i class="fa-solid fa-star" style="color: #222;"></i>
                                            <i class="fa-solid fa-star" style="color: #222;"></i>
                                            <i class="fa-solid fa-star" style="color: #222;"></i>
                                            <span style="color: #717171; margin-left: 6px;">· 4 days ago</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Review 3 -->
                                <div style="background: #FFFFFF; border: 1px solid #EBEBEB; border-radius: 16px; padding: 20px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
                                    <div style="margin-bottom: 16px;">
                                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px;">
                                            <div style="width: 42px; height: 42px; border-radius: 50%; background: #7C3AED; color: #FFF; font-weight: 700; display: flex; align-items: center; justify-content: center; font-size: 15px;">N</div>
                                            <div>
                                                <div style="font-size: 15px; font-weight: 700; color: #222;">Nawaf</div>
                                                <div style="font-size: 13px; color: #717171;">Riyadh, Saudi Arabia</div>
                                            </div>
                                        </div>
                                        <div style="font-size: 12px; color: #222; margin-bottom: 8px;">
                                            <i class="fa-solid fa-star" style="color: #222;"></i>
                                            <i class="fa-solid fa-star" style="color: #222;"></i>
                                            <i class="fa-solid fa-star" style="color: #222;"></i>
                                            <i class="fa-solid fa-star" style="color: #222;"></i>
                                            <i class="fa-solid fa-star" style="color: #222;"></i>
                                            <span style="color: #717171; margin-left: 6px;">· 1 week ago</span>
                                        </div>
                                        <p style="font-size: 15px; color: #374151; line-height: 1.5; margin: 0; font-family: sans-serif;">"رائع جداً"</p>
                                    </div>
                                </div>

                            </div>

                            <button onclick="document.getElementById('reviews').scrollIntoView({behavior: 'smooth'})" style="border: 1px solid #222222; background: #FFFFFF; color: #222222; border-radius: 8px; padding: 11px 24px; font-weight: 600; font-size: 14px; cursor: pointer; transition: background 0.2s;">
                                Show all reviews
                            </button>
                        </div>
                    </div>

                    <!-- What this place offers Section (Ref Image 3) -->
                    <div style="margin-bottom: 40px; padding-bottom: 32px; border-bottom: 1px solid #EBEBEB;">
                        <h3 style="font-size: 20px; font-weight: 700; color: #222222; margin-bottom: 20px;">What this place offers</h3>
                        
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; font-size: 15px; color: #222222; margin-bottom: 20px;">
                            <div style="display: flex; align-items: center; gap: 14px;"><i class="fa-solid fa-water-ladder" style="width: 24px; font-size: 18px; color: #FF385C;"></i> 64th Floor Infinity Pool</div>
                            <div style="display: flex; align-items: center; gap: 14px;"><i class="fa-solid fa-wifi" style="width: 24px; font-size: 18px; color: #222;"></i> Free High-Speed Wifi</div>
                            <div style="display: flex; align-items: center; gap: 14px;"><i class="fa-solid fa-square-parking" style="width: 24px; font-size: 18px; color: #222;"></i> Free Parking on premises</div>
                            <div style="display: flex; align-items: center; gap: 14px;"><i class="fa-solid fa-utensils" style="width: 24px; font-size: 18px; color: #222;"></i> Fully Stocked Kitchen</div>
                            <div style="display: flex; align-items: center; gap: 14px;"><i class="fa-solid fa-dumbbell" style="width: 24px; font-size: 18px; color: #222;"></i> State-of-the-Art Gym</div>
                            <div style="display: flex; align-items: center; gap: 14px;"><i class="fa-solid fa-tv" style="width: 24px; font-size: 18px; color: #222;"></i> 65" & 55" Smart TVs</div>
                        </div>

                        <button onclick="openAmenitiesModalDirect('${propId}')" style="width: 100%; border: 1px solid #222222; background: #FFFFFF; color: #222222; border-radius: 8px; padding: 13px; font-weight: 600; font-size: 15px; cursor: pointer; transition: background 0.2s;">
                            Show all ${data.categorizedAmenities ? '35+' : '50+'} amenities
                        </button>
                    </div>

                    <!-- Office & Contact Info -->
                    <div style="padding-top: 12px; font-size: 14px; color: #717171; line-height: 1.6;">
                        <p><strong>TrueHaven Office:</strong> 2204, Iris Bay, Business Bay, Dubai, UAE</p>
                        <p><strong>Direct Helpline:</strong> 052 58 21668 (+971 52 582 1668)</p>
                        <p><strong>Official Email:</strong> hello@truehavenstays.com</p>
                    </div>

                </div>

                <!-- Right Column Sticky Reservation Card (Desktop Only) -->
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

        <!-- Fixed Floating Mobile Bottom Bar (Ref Images 2 & 3) -->
        <div class="mobile-fixed-bottom-bar">
            <div class="mobile-bottom-price-box">
                <div class="mobile-bottom-price">Add dates for prices</div>
                <div class="mobile-bottom-sub"><i class="fa-solid fa-star" style="font-size: 11px; color: #222;"></i> ${data.rating}</div>
            </div>
            <a href="${data.airbnbUrl}" target="_blank" class="mobile-reserve-btn">
                Check availability
            </a>
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
    window.scrollTo(0, 0);
    if (window.location.hash !== '#' + propId) {
        try { history.pushState(null, '', '#' + propId); } catch(e) {}
    }
}

// Close Full-Page Immersive View & Return to Homepage
function closePropertyDetailPage() {
    const pageContainer = document.getElementById('propertyDetailPage');
    const mainPage = document.getElementById('mainPage');
    if (pageContainer) pageContainer.style.display = 'none';
    if (mainPage) mainPage.style.display = 'block';
    window.scrollTo(0, 0);
    if (window.location.hash) {
        try { history.pushState(null, '', window.location.pathname + window.location.search); } catch(e) {}
    }
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

function openAmenitiesModalDirect(propId) {
    const targetId = propId || 'paramount';
    const data = PROPERTIES_DATA[targetId];
    const amenitiesModal = document.getElementById('amenitiesModal');
    if (!amenitiesModal) return;

    if (data && data.categorizedAmenities) {
        const modalContainer = amenitiesModal.querySelector('.modal-scroll-body');
        if (modalContainer) {
            modalContainer.innerHTML = `
                <div class="amenities-category-list">
                    ${data.categorizedAmenities.map(cat => `
                        <div class="amenity-cat-block" style="margin-bottom: 28px; padding-bottom: 20px; border-bottom: 1px solid #F3F4F6;">
                            <h4 class="cat-title" style="font-size: 17px; font-weight: 700; color: #0F1E36; margin-bottom: 14px; display: flex; align-items: center; gap: 10px;">
                                <i class="fa-solid ${cat.icon}" style="color: #FF385C; font-size: 18px;"></i> ${cat.category}
                            </h4>
                            <ul class="cat-items" style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px;">
                                ${cat.items.map(item => `
                                    <li style="display: flex; align-items: flex-start; gap: 12px; font-size: 15px; color: ${item.available !== false ? '#374151' : '#9CA3AF'};">
                                        ${item.available !== false ? 
                                            `<i class="fa-solid fa-check" style="color: #10B981; font-size: 16px; margin-top: 2px;"></i> <span>${item.text}</span>` : 
                                            `<i class="fa-solid fa-xmark" style="color: #9CA3AF; font-size: 16px; margin-top: 2px;"></i> <span style="text-decoration: line-through;">${item.text}</span>`
                                        }
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    }
    amenitiesModal.classList.add('active');
}

// Full Screen Interactive Photo Gallery Modal for all 73 Photos (Airbnb Photo Tour Format)
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

    let categories;
    if (propId === 'paramount' && typeof PARAMOUNT_CATEGORIES_MANIFEST !== 'undefined') {
        categories = PARAMOUNT_CATEGORIES_MANIFEST;
    } else if (propId === 'burj-vista' && typeof BURJ_VISTA_CATEGORIES_MANIFEST !== 'undefined') {
        categories = BURJ_VISTA_CATEGORIES_MANIFEST;
    } else {
        categories = [{ id: 'all_photos', name: 'All Photos', photos: data.photos }];
    }

    // Category Cards Top Bar HTML
    const categoryCardsHtml = categories.map(cat => {
        const firstPhoto = cat.photos[0];
        if (!firstPhoto) return '';
        return `
            <div class="photo-tour-cat-card" onclick="scrollToTourSection('${cat.id}')">
                <img src="${firstPhoto}" alt="${cat.name}">
                <span>${cat.name}</span>
            </div>
        `;
    }).join('');

    // Detailed Category Sections HTML
    let sectionsHtml = '';
    categories.forEach(cat => {
        if (!cat.photos || cat.photos.length === 0) return;

        sectionsHtml += `
            <div class="photo-tour-section" id="section-${cat.id}">
                <h3 class="photo-tour-section-title">${cat.name}</h3>
                ${cat.subtext ? `<p style="font-size: 14px; color: #6B7280; margin: -14px 0 20px 0; font-weight: 500;">${cat.subtext}</p>` : ''}
                <div class="photo-tour-grid">
                    ${cat.photos.map((src, idx) => `
                        <div class="photo-tour-item">
                            <img src="${src}" alt="${data.name} - ${cat.name} ${idx + 1}" loading="lazy">
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    });

    galleryModal.innerHTML = `
        <div class="photo-gallery-header">
            <h2>Photo Tour · ${data.name} (${data.photos.length} Photos)</h2>
            <button onclick="closePhotoGalleryModal()" class="close-gallery-btn" title="Close Gallery">&times;</button>
        </div>
        <div class="photo-gallery-body">
            <div class="photo-tour-top-bar">
                <h2 class="photo-tour-main-heading">Photo tour</h2>
                <div class="photo-tour-cat-list">
                    ${categoryCardsHtml}
                </div>
            </div>
            ${sectionsHtml}
        </div>
    `;

    galleryModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function scrollToTourSection(catId) {
    const el = document.getElementById(`section-${catId}`);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
    // URL Hash & Query Parameter Routing Check
    function checkUrlRoute() {
        const hash = window.location.hash.replace('#', '').trim();
        const urlParams = new URLSearchParams(window.location.search);
        const propParam = urlParams.get('property') || urlParams.get('p');
        
        const targetProp = hash || propParam;
        if (targetProp && PROPERTIES_DATA[targetProp]) {
            openPropertyDetail(targetProp);
        }
    }

    checkUrlRoute();
    window.addEventListener('popstate', checkUrlRoute);
    window.addEventListener('hashchange', checkUrlRoute);

    // Global delegation for property card clicks (Photo or Card metadata)
    document.addEventListener('click', (e) => {
        const card = e.target.closest('.property-card');
        if (card && !e.target.closest('.carousel-arrow') && !e.target.closest('.heart-btn')) {
            const propId = card.getAttribute('data-id');
            if (propId) {
                openPropertyDetail(propId);
            }
        }
    });

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
