
window.userCurrency = 'USD';
window.exchangeRate = 0.272; // Default AED to USD

window.formatPrice = function(amount) {
    try {
        return new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: window.userCurrency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    } catch(e) {
        return '$' + amount;
    }
};

async function initDynamicCurrency() {
    try {
        const ipRes = await fetch('https://ipapi.co/json/');
        const ipData = await ipRes.json();
        if (ipData.currency) {
            window.userCurrency = ipData.currency;
        }

        const rateRes = await fetch('https://open.er-api.com/v6/latest/AED');
        const rateData = await rateRes.json();
        if (rateData.rates && rateData.rates[window.userCurrency]) {
            window.exchangeRate = rateData.rates[window.userCurrency];
        }

        if (PROPERTIES_DATA) {
            for (let key in PROPERTIES_DATA) {
                const prop = PROPERTIES_DATA[key];
                if (prop.priceAed) {
                    prop.priceNight = Math.round(prop.priceAed * window.exchangeRate);
                }
            }
        }

        document.querySelectorAll('.price-box').forEach(box => {
            const aedVal = box.getAttribute('data-aed');
            if (aedVal) {
                const converted = Math.round(parseInt(aedVal) * window.exchangeRate);
                const amountEl = box.querySelector('.price-amount');
                if (amountEl) {
                    amountEl.textContent = window.formatPrice(converted);
                }
            }
        });

        if (window.currentPropertyId && typeof window.renderPropertyDetail === 'function') {
            window.renderPropertyDetail(window.currentPropertyId);
        }
    } catch (error) {
        console.error('Currency conversion failed', error);
    }
}
document.addEventListener("DOMContentLoaded", initDynamicCurrency);

/* ==========================================================================
   TRUE HAVEN STAYS - INTERACTIVE JAVASCRIPT
   Handles property detail overlays, photo carousels, pricing calculator & WhatsApp reservation
   ========================================================================== */

const PARAMOUNT_AIRBNB_URL = "https://www.airbnb.co.uk/rooms/1761390398461668658?unique_share_id=e3924d43-ff08-4672-af1f-88d210f07cfa&viralityEntryPoint=1&s=76&source_impression_id=p3_1788349185_P3ng4E3hx17yac8B";
const BURJ_VISTA_AIRBNB_URL = "https://www.airbnb.co.uk/rooms/1762128215305557732?unique_share_id=8ee15777-1779-4293-a444-fbe1a8d11359&viralityEntryPoint=1&s=76&source_impression_id=p3_1788350250_P3tWF4FsNSd8rdnM";

// Exact Airbnb Photo Tour Categories and Photo Sequences

const PARAMOUNT_PHOTOS = [
    "assets/paramount/airbnb_exact/photo_1.jpg",
    "assets/paramount/airbnb_exact/photo_2.jpg",
    "assets/paramount/airbnb_exact/photo_3.jpg",
    "assets/paramount/airbnb_exact/photo_4.jpg",
    "assets/paramount/airbnb_exact/photo_5.jpg",
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
    "assets/burj_vista/airbnb_exact/photo_1.jpg",
    "assets/burj_vista/airbnb_exact/photo_2.jpg",
    "assets/burj_vista/airbnb_exact/photo_3.jpg",
    "assets/burj_vista/airbnb_exact/photo_4.jpg",
    "assets/burj_vista/airbnb_exact/photo_5.jpg",
    "assets/burj_vista/burj_seq_2.jpg",
    "assets/burj_vista/burj_seq_1.jpg",
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

                reviews: [
            {
                name: 'Matteo',
                location: 'Milan, Italy · 5 years on Airbnb',
                initial: 'M',
                color: '#F97316',
                rating: 5,
                time: '1 week ago',
                text: 'The property was very clean, with a balcony and a very nice view of the Burj Khalifa. The swimming pool on the 64th floor is worth a visit—hands down the best skyline view in Dubai, and the stay was absolutely superb.'
            },
            {
                name: '奕翔 (Yi Xiang)',
                location: 'Singapore · 5 years on Airbnb',
                initial: '奕',
                color: '#3B82F6',
                rating: 5,
                time: '2 weeks ago',
                text: 'The room was clean and tidy. The apartment had all the necessary amenities and was conveniently located in Business Bay, just minutes to Downtown. Fast wifi and great host communication. It was a great stay!'
            },
            {
                name: 'Solomon',
                location: 'Sydney, Australia · 5 years on Airbnb',
                initial: 'S',
                color: '#4B5563',
                rating: 5,
                time: '3 weeks ago',
                text: 'Beautiful property with stunning views of Burj Khalifa. Modern interior, super comfortable bed, and the amenities in Paramount Midtown tower are 5-star hotel grade.'
            },
            {
                name: 'Orhan',
                location: 'Frankfurt, Germany · 4 years on Airbnb',
                initial: 'O',
                color: '#6B7280',
                rating: 5,
                time: '1 month ago',
                text: 'The host was very friendly and helpful. Immediate help in a few minutes. The flat is highly recommended. Nothing is missing—fully stocked kitchen, fast wifi, and great balcony.'
            },
            {
                name: 'Elena',
                location: 'Paris, France · 3 years on Airbnb',
                initial: 'E',
                color: '#EC4899',
                rating: 5,
                time: '1 month ago',
                text: 'Magnifique séjour! The apartment is stylishly decorated, very spacious, and the infinity pool on the 64th floor is magical. Everything was flawless from check-in to check-out.'
            },
            {
                name: 'David',
                location: 'Manchester, UK · 6 years on Airbnb',
                initial: 'D',
                color: '#059669',
                rating: 5,
                time: '2 months ago',
                text: 'Exceptional stay. Paramount Midtown is a top-tier luxury building. The apartment is brand new, spotless, and furnished with great taste. Will definitely book True Haven again on our next trip to Dubai.'
            }
        ],
        lat: 25.1908,
        lng: 55.2662,
        neighborhoodTitle: 'Business Bay & Downtown Dubai',
        neighborhoodDesc: 'Situated in Paramount Tower Hotel & Residences Midtown on Al Mustaqbal Street, Business Bay. Just a 7-minute drive to Dubai Mall and Burj Khalifa, with rapid access to Sheikh Zayed Road, Dubai Canal Promenade, and fine dining hotspots throughout Downtown and DIFC.',
        name: 'Burj View & Infinity Pool | 7 min to Dubai Mall',
        tagline: '🏊‍♂️ Rooftop Infinity Pool · Unobstructed Burj Khalifa View',
        location: 'Al Mustaqbal Street, Business Bay / Downtown Dubai, UAE',
        specs: '4 guests · 1 bedroom · 2 beds · 1.5 bathrooms',
        priceNight: 240,
        maxGuests: 4,
        currency: 'USD',
        priceAed: 880,
        rating: '5.0',
        reviewsCount: 18,
        badge: 'Guest favourite',
        hostName: 'Ruchi',
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
        reviews: [
            {
                name: 'Stefan Sebastian',
                location: 'Madrid, Spain · 2 years on Airbnb',
                initial: 'SS',
                color: '#F97316',
                rating: 5,
                time: '3 weeks ago',
                text: 'The flat is spectacular. Very nice, tidy and with stunning views. The terrace is fantastic, and the building and its facilities, such as the swimming pool and the gym, are very good. Being connected directly to Dubai Mall through the air-conditioned bridge was unbeatable during our stay.'
            },
            {
                name: 'Shivani',
                location: 'London, UK · 3 years on Airbnb',
                initial: 'S',
                color: '#EC4899',
                rating: 5,
                time: '1 month ago',
                text: 'It’s amazing and I love to come again! The views of the Burj Khalifa and the Dubai Fountain from the balcony are breathtaking, day and night. The apartment is beautifully furnished and sparkling clean.'
            },
            {
                name: 'Pedram',
                location: 'Amsterdam, Netherlands · 5 years on Airbnb',
                initial: 'P',
                color: '#EF4444',
                rating: 5,
                time: '1 month ago',
                text: 'Very kind host, can make things happen just like that! Check-in was seamless, the building has world-class amenities, and having a direct indoor walkway to Dubai Mall and the metro made getting around effortless.'
            },
            {
                name: 'Aditya',
                location: 'Sammamish, Washington · 4 years on Airbnb',
                initial: 'A',
                color: '#8B5CF6',
                rating: 5,
                time: '2 months ago',
                text: 'Was a very good location in the heart of downtown Dubai, a view literally in front of Burj Khalifa. Super clean, modern, and high class building. Ruchi also was great with check in and check out accommodation. Highly recommend her and this stay!'
            },
            {
                name: 'Felipe',
                location: 'Cali, Colombia · 4 years on Airbnb',
                initial: 'F',
                color: '#10B981',
                rating: 5,
                time: '2 months ago',
                text: 'Incredible location and views. The apartment was spotless, well-decorated and had everything we needed. Waking up to the Burj Khalifa view from the living room is an unforgettable experience. 10/10.'
            },
            {
                name: 'Nawaf',
                location: 'Riyadh, Saudi Arabia · 6 years on Airbnb',
                initial: 'N',
                color: '#7C3AED',
                rating: 5,
                time: '3 months ago',
                text: 'رائع جداً - An outstanding residence. Luxury furniture, full privacy, and fast communication with the host. Direct mall bridge access was super convenient for shopping and dining.'
            }
        ],
        lat: 25.1972,
        lng: 55.2744,
        neighborhoodTitle: 'Downtown Dubai',
        neighborhoodDesc: 'Located along Sheikh Mohammed Bin Rashid Boulevard, Burj Vista is directly connected to Dubai Mall and the Burj Khalifa / Dubai Metro station via an internal air-conditioned sky bridge. You are mere steps away from the Dubai Fountain, Dubai Opera, and Downtown’s world-renowned dining and shopping destinations.',
        hostName: 'Ruchi',
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
let currentLeafletMap = null;

// Global toast notification helper
function showTrueHavenToast(message) {
    let toast = document.getElementById('truehavenToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'truehavenToast';
        toast.className = 'truehaven-toast';
        toast.innerHTML = '<i class="fa-solid fa-check"></i> <span id="toastMsg"></span>';
        document.body.appendChild(toast);
    }
    const msgEl = document.getElementById('toastMsg') || toast.querySelector('span');
    if (msgEl) msgEl.innerText = message || 'Link copied to clipboard';
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2800);
}

// Share property link
function shareProperty(propId) {
    const url = window.location.origin + window.location.pathname + '#' + propId;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
            showTrueHavenToast('Listing link copied to clipboard!');
        }).catch(() => {
            prompt('Copy listing link:', url);
        });
    } else {
        prompt('Copy listing link:', url);
    }
}

// Toggle save/heart property
function toggleSaveProperty(btn) {
    if (!btn) return;
    const icon = btn.querySelector('i');
    if (icon) {
        if (icon.classList.contains('fa-regular')) {
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid');
            icon.style.color = '#FF385C';
            showTrueHavenToast('Saved to your Wishlist!');
        } else {
            icon.classList.remove('fa-solid');
            icon.classList.add('fa-regular');
            icon.style.color = '';
            showTrueHavenToast('Removed from Wishlist');
        }
    }
}

// Open Full-Page Immersive Property Detail View (Matching Airbnb Layout & Hierarchy)
function openPropertyDetail(propId) {
    const data = PROPERTIES_DATA[propId];
    if (!data) return;

    window.currentPropertyId = propId;
    const pageContainer = document.getElementById('propertyDetailPage');
    const mainPage = document.getElementById('mainPage');
    if (!pageContainer || !mainPage) return;

    // Desktop 5-Photo Hero Grid Matching Image 2
    const desktopPhotoGridHtml = `
        <div class="desktop-photo-grid-wrap desktop-only-grid" style="display: none; position: relative; margin-bottom: 24px; border-radius: 14px; overflow: hidden; cursor: pointer; height: 420px;" onclick="openPhotoGalleryModal('${propId}')">
            <div style="display: grid; grid-template-columns: 2fr 1fr 1fr; grid-template-rows: 1fr 1fr; gap: 8px; height: 100%;">
                <img src="${data.photos[0]}" alt="${data.name}" style="grid-column: 1 / 2; grid-row: 1 / 3; width: 100%; height: 100%; object-fit: cover; transition: opacity 0.2s;" onmouseover="this.style.opacity=0.92" onmouseout="this.style.opacity=1">
                <img src="${data.photos[1]}" alt="${data.name}" style="grid-column: 2 / 3; grid-row: 1 / 2; width: 100%; height: 100%; object-fit: cover; transition: opacity 0.2s;" onmouseover="this.style.opacity=0.92" onmouseout="this.style.opacity=1">
                <img src="${data.photos[2]}" alt="${data.name}" style="grid-column: 3 / 4; grid-row: 1 / 2; width: 100%; height: 100%; object-fit: cover; transition: opacity 0.2s;" onmouseover="this.style.opacity=0.92" onmouseout="this.style.opacity=1">
                <img src="${data.photos[3]}" alt="${data.name}" style="grid-column: 2 / 3; grid-row: 2 / 3; width: 100%; height: 100%; object-fit: cover; transition: opacity 0.2s;" onmouseover="this.style.opacity=0.92" onmouseout="this.style.opacity=1">
                <img src="${data.photos[4] || data.photos[0]}" alt="${data.name}" style="grid-column: 3 / 4; grid-row: 2 / 3; width: 100%; height: 100%; object-fit: cover; transition: opacity 0.2s;" onmouseover="this.style.opacity=0.92" onmouseout="this.style.opacity=1">
            </div>
            <button class="button-secondary" onclick="event.stopPropagation(); openPhotoGalleryModal('${propId}')" style="position: absolute; bottom: 20px; right: 20px; background: #FFFFFF; border: 1px solid #222222; border-radius: 8px; padding: 7px 15px; font-weight: 600; font-size: 14px; color: #222222; display: flex; align-items: center; gap: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.18); cursor: pointer;">
                <i class="fa-solid fa-grip" style="font-size: 13px;"></i> Show all photos
            </button>
        </div>
        <style>
            @media (min-width: 769px) {
                .desktop-only-grid {
                    display: block !important;
                }
            }
        </style>
    `;

    // Mobile Edge-to-Edge Hero Carousel
    const mobileHeroHtml = `
        <div class="mobile-pdp-hero">
            <div class="mobile-hero-track" id="mobileHeroTrack">
                ${data.photos.slice(0, 10).map(p => `<img src="${p}" alt="${data.name}" class="mobile-hero-img">`).join('')}
            </div>
            <div class="mobile-photo-counter" onclick="openPhotoGalleryModal('${propId}')">
                <i class="fa-solid fa-grip" style="font-size: 11px; margin-right: 4px;"></i> 1 / ${data.photos.length}
            </div>
        </div>
    `;

    // Default dates matching Reference Image (12/14/2026 to 12/16/2026 - 2 nights)
    const checkInStr = '2026-12-14';
    const checkOutStr = '2026-12-16';
    const nights = 2;
    const nightlyTotal = data.priceNight * nights;
    const cancellationDateStr = '30 November';

    const reviews = data.reviews || [];

    pageContainer.innerHTML = `
        <!-- Mobile Floating Header Buttons (Over Hero Photo) -->
        <div class="mobile-pdp-top-bar">
            <button onclick="closePropertyDetailPage()" class="mobile-circle-btn" title="Back">
                <i class="fa-solid fa-chevron-left"></i>
            </button>
            <div style="display: flex; gap: 10px;">
                <button class="mobile-circle-btn" title="Share" onclick="shareProperty('${propId}')">
                    <i class="fa-solid fa-arrow-up-from-bracket"></i>
                </button>
                <button class="mobile-circle-btn" title="Save" onclick="toggleSaveProperty(this)">
                    <i class="fa-solid fa-heart" style="color: #FF385C;"></i>
                </button>
            </div>
        </div>

        <!-- Full Page Sticky Navigation Header (Desktop Only) -->
        <header class="top-nav desktop-pdp-nav" style="position: sticky; top: 0; z-index: 100; background: rgba(255,255,255,0.96); backdrop-filter: blur(12px); border-bottom: 1px solid #E5E0D8; height: 76px;">
            <div class="container nav-wrapper" style="display: flex; align-items: center; justify-content: space-between;">
                <div style="display: flex; align-items: center; gap: 20px;">
                    <button onclick="closePropertyDetailPage()" style="background: var(--color-surface-soft); border: 1px solid #E5E0D8; padding: 8px 18px; border-radius: 999px; font-weight: 700; font-size: 14px; cursor: pointer; color: #0F1E36; display: flex; align-items: center; gap: 8px; transition: background 0.2s;">
                        <i class="fa-solid fa-arrow-left"></i> Back to all residences
                    </button>
                    <a href="#" class="brand-logo" onclick="closePropertyDetailPage(); return false;">
                        <img src="assets/logo.png" alt="True Haven Logo" class="logo-img" style="height: 38px;">
                        <div class="brand-text">
                            <span class="brand-name">True Haven</span>
                            <span class="brand-sub">LUXURY STAYS</span>
                        </div>
                    </a>
                </div>

                <div class="nav-right-actions">
                    <a href="tel:+971525821668" class="nav-call-btn" style="color: #0F1E36; border-color: #E5E0D8; background: #F9FAFB;" title="Contact Us: +971 52 582 1668">
                        <i class="fa-solid fa-phone"></i> Call
                    </a>
                    <a href="https://wa.me/971525821668?text=Hello%20True%20Haven!%20I'd%20like%20to%20inquire%20about%20a%20luxury%20stay%20in%20Dubai." target="_blank" class="nav-wa-btn" title="WhatsApp Concierge">
                        <i class="fa-brands fa-whatsapp"></i> WhatsApp
                    </a>
                    <a href="https://www.instagram.com/truehavenstays/?hl=en" target="_blank" class="nav-social-btn ig" title="Follow us on Instagram (@truehavenstays)">
                        <i class="fa-brands fa-instagram"></i>
                    </a>
                    <a href="https://www.facebook.com/truehavenstays" target="_blank" class="nav-social-btn fb" title="Follow us on Facebook">
                        <i class="fa-brands fa-facebook-f"></i>
                    </a>
                </div>
            </div>
        </header>

        <!-- Mobile Edge-to-Edge Hero Image Carousel -->
        ${mobileHeroHtml}

        <!-- Main Property Detail Container (Max width 1120px to exact match Airbnb standards) -->
        <div class="container mobile-pdp-container" style="max-width: 1120px; margin: 24px auto 80px; padding: 0 24px;">
            
            <!-- 1. Title Header Row (Exact Image 2 Match) -->
            <div class="desktop-pdp-header" style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 20px;">
                <div>
                    <h1 style="font-size: 26px; font-weight: 600; color: #222222; margin: 0; line-height: 1.2;">${data.name}</h1>
                </div>
                <div style="display: flex; gap: 20px; font-size: 14px; font-weight: 600; text-decoration: underline; cursor: pointer; color: #222222; flex-shrink: 0;">
                    <span onclick="shareProperty('${propId}')" style="display: flex; align-items: center; gap: 8px;"><i class="fa-solid fa-arrow-up-from-bracket" style="font-size: 13px;"></i> Share</span>
                    <span onclick="toggleSaveProperty(this)" style="display: flex; align-items: center; gap: 8px;"><i class="fa-solid fa-heart" style="font-size: 14px; color: #FF385C;"></i> Saved</span>
                </div>
            </div>

            <!-- 2. Photo Grid & Count -->
            ${desktopPhotoGridHtml}

            <!-- Mobile Title Header Section -->
            <div class="mobile-pdp-title-block" style="margin-bottom: 24px;">
                <h1 style="font-size: 24px; font-weight: 800; color: #222222; margin-bottom: 8px; line-height: 1.25;">${data.name}</h1>
                <p style="font-size: 15px; color: #717171; margin-bottom: 4px;">${data.propertyType || 'Entire rental unit in Dubai, United Arab Emirates'}</p>
                <p style="font-size: 14px; color: #222222; font-weight: 600; margin-bottom: 8px;">${data.specs}</p>
                <div onclick="openReviewsModal('${propId}')" style="cursor: pointer; font-size: 14px; font-weight: 700; color: #222222;">
                    <i class="fa-solid fa-star" style="color: #FF385C;"></i> ${data.rating} · <span style="text-decoration: underline;">${data.reviewsCount} reviews</span>
                </div>
            </div>

            <!-- Two-Column Body Layout (Exact Airbnb Alignment from Images 1 & 2) -->
            <div class="detail-body-layout" style="display: grid; grid-template-columns: 1fr 370px; gap: 80px; align-items: start; margin-top: 32px;">
                
                <!-- Left Main Column (Specs -> Guest Favourite -> Highlights -> Hosted by Ruchi -> Content) -->
                <div class="detail-left-col">

                    <!-- Property Type & Specs (Exact Image 1 Match) -->
                    <div style="margin-bottom: 24px;">
                        <h2 style="font-size: 22px; font-weight: 600; color: #222222; margin: 0 0 4px; line-height: 1.25;">
                            ${data.propertyType || 'Entire rental unit in Dubai, United Arab Emirates'}
                        </h2>
                        <div style="font-size: 16px; color: #222222; font-weight: 400;">
                            ${data.specs}
                        </div>
                    </div>

                    <!-- Guest Favourite Card (Exact Image 1 Match) -->
                    <div class="guest-favourite-card" style="display: flex; align-items: center; justify-content: space-between; border: 1px solid #DDDDDD; border-radius: 12px; padding: 18px 24px; margin-bottom: 32px; background: #FFFFFF; gap: 16px;">
                        <!-- Left: Laurel Wreath + Title -->
                        <div style="display: flex; align-items: center; gap: 6px; flex-shrink: 0;">
                            <svg viewBox="0 0 27 48" width="24" height="42" fill="#C49746" style="display: block;">
                                <path d="M21.56 41.52c-1.39-1.02-3.04-2.61-4.28-4.14-1.92-2.37-3.41-5.18-4.32-8.15-.9-2.97-1.28-6.1-.97-9.2.3-3.1 1.25-6.07 2.76-8.72 1.51-2.65 3.56-4.91 6.01-6.61.54-.38.83-.98.74-1.63-.09-.64-.52-1.18-1.15-1.39-.62-.21-1.31-.05-1.78.4-2.73 2.02-5.01 4.67-6.68 7.74-1.68 3.08-2.67 6.51-2.9 10.05-.23 3.54.34 7.08 1.66 10.38 1.32 3.3 3.31 6.27 5.82 8.7 1.63 1.58 3.54 2.92 5.6 3.94.38.19.82.23 1.23.11.41-.12.75-.41.93-.8.18-.39.18-.84.01-1.23-.17-.39-.5-.69-.87-.85z"/>
                            </svg>
                            <div style="font-size: 16px; font-weight: 700; color: #222222; text-align: center; line-height: 1.15;">
                                Guest<br>favourite
                            </div>
                            <svg viewBox="0 0 27 48" width="24" height="42" fill="#C49746" style="display: block; transform: scaleX(-1);">
                                <path d="M21.56 41.52c-1.39-1.02-3.04-2.61-4.28-4.14-1.92-2.37-3.41-5.18-4.32-8.15-.9-2.97-1.28-6.1-.97-9.2.3-3.1 1.25-6.07 2.76-8.72 1.51-2.65 3.56-4.91 6.01-6.61.54-.38.83-.98.74-1.63-.09-.64-.52-1.18-1.15-1.39-.62-.21-1.31-.05-1.78.4-2.73 2.02-5.01 4.67-6.68 7.74-1.68 3.08-2.67 6.51-2.9 10.05-.23 3.54.34 7.08 1.66 10.38 1.32 3.3 3.31 6.27 5.82 8.7 1.63 1.58 3.54 2.92 5.6 3.94.38.19.82.23 1.23.11.41-.12.75-.41.93-.8.18-.39.18-.84.01-1.23-.17-.39-.5-.69-.87-.85z"/>
                            </svg>
                        </div>

                        <!-- Center: Description -->
                        <div style="font-size: 15px; font-weight: 600; color: #222222; line-height: 1.35; padding: 0 16px; flex: 1;">
                            One of the most loved homes on Airbnb, according to guests
                        </div>

                        <!-- Right: Rating & Review Count -->
                        <div style="display: flex; align-items: center; gap: 18px; flex-shrink: 0; cursor: pointer;" onclick="openReviewsModal('${propId}')">
                            <div style="text-align: center;">
                                <div style="font-size: 22px; font-weight: 800; color: #222222; line-height: 1;">${data.rating}</div>
                                <div style="font-size: 9px; color: #222222; letter-spacing: 2px; margin-top: 4px;">★★★★★</div>
                            </div>
                            <div style="width: 1px; height: 38px; background: #DDDDDD;"></div>
                            <div style="text-align: center;">
                                <div style="font-size: 22px; font-weight: 800; color: #222222; line-height: 1; text-decoration: underline;">${data.reviewsCount}</div>
                                <div style="font-size: 12px; font-weight: 600; color: #717171; margin-top: 4px;">Reviews</div>
                            </div>
                        </div>
                    </div>

                    <!-- 4 Highlights List with Icons (Exact Image 1 Match) -->
                    <div class="highlights-list-airbnb" style="display: flex; flex-direction: column; gap: 24px; padding-bottom: 28px; border-bottom: 1px solid #EBEBEB; margin-bottom: 24px;">
                        <div style="display: flex; gap: 20px; align-items: flex-start;">
                            <div style="width: 32px; font-size: 24px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; line-height: 1;">
                                🏆
                            </div>
                            <div>
                                <div style="font-size: 16px; font-weight: 600; color: #222222;">${data.highlight1Title}</div>
                                <div style="font-size: 14px; color: #717171; margin-top: 2px; line-height: 1.4;">${data.highlight1Desc}</div>
                            </div>
                        </div>
                        <div style="display: flex; gap: 20px; align-items: flex-start;">
                            <div style="width: 32px; font-size: 24px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; line-height: 1;">
                                📍
                            </div>
                            <div>
                                <div style="font-size: 16px; font-weight: 600; color: #222222;">${data.highlight2Title}</div>
                                <div style="font-size: 14px; color: #717171; margin-top: 2px; line-height: 1.4;">${data.highlight2Desc}</div>
                            </div>
                        </div>
                        <div style="display: flex; gap: 20px; align-items: flex-start;">
                            <div style="width: 32px; font-size: 24px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; line-height: 1;">
                                🏊‍♂️
                            </div>
                            <div>
                                <div style="font-size: 16px; font-weight: 600; color: #222222;">${data.highlight3Title}</div>
                                <div style="font-size: 14px; color: #717171; margin-top: 2px; line-height: 1.4;">${data.highlight3Desc}</div>
                            </div>
                        </div>
                        <div style="display: flex; gap: 20px; align-items: flex-start;">
                            <div style="width: 32px; font-size: 24px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; line-height: 1;">
                                ⭐
                            </div>
                            <div>
                                <div style="font-size: 16px; font-weight: 600; color: #222222;">${data.highlight4Title}</div>
                                <div style="font-size: 14px; color: #717171; margin-top: 2px; line-height: 1.4;">${data.highlight4Desc}</div>
                            </div>
                        </div>
                    </div>

                    <!-- Host Line: Hosted by Ruchi with Superhost Badge (Exact Image 1 Match) -->
                    <div class="host-line-airbnb" style="display: flex; align-items: center; gap: 16px; padding-bottom: 24px; border-bottom: 1px solid #EBEBEB; margin-bottom: 32px;">
                        <div style="position: relative; width: 44px; height: 44px; flex-shrink: 0;">
                            <img src="assets/ruchi_cropped.jpg" alt="Ruchi" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
                            <div style="position: absolute; bottom: -2px; right: -2px; background: #FF385C; color: #FFFFFF; width: 16px; height: 16px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 9px; border: 2px solid #FFFFFF;" title="Superhost">
                                <i class="fa-solid fa-award"></i>
                            </div>
                        </div>
                        <div>
                            <h3 style="font-size: 16px; font-weight: 600; color: #222222; margin: 0; line-height: 1.2;">Hosted by ${data.hostName || 'Ruchi'}</h3>
                            <div style="font-size: 14px; color: #717171; margin-top: 3px;">${data.hostSubtitle || 'Superhost · 5 years hosting'}</div>
                        </div>
                    </div>

                    <!-- About this space & The space -->
                    <div style="margin-bottom: 32px; padding-bottom: 32px; border-bottom: 1px solid #EBEBEB;">
                        <h3 style="font-size: 22px; font-weight: 600; color: #222222; margin-bottom: 16px;">About this space</h3>
                        <p style="font-size: 16px; color: #222222; line-height: 1.6; white-space: pre-line; margin-bottom: 16px;">${data.aboutThisSpace || data.description}</p>
                        ${data.theSpace ? `
                            <h4 style="font-size: 17px; font-weight: 600; color: #222222; margin: 20px 0 8px;">The space</h4>
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

                    <!-- Amenities Section ("What this place offers" matching Airbnb) -->
                    <div style="margin-bottom: 40px; padding-bottom: 32px; border-bottom: 1px solid #EBEBEB;">
                        <h3 style="font-size: 22px; font-weight: 700; color: #222222; margin-bottom: 24px;">What this place offers</h3>
                        
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; font-size: 16px; color: #222222; margin-bottom: 24px;">
                            <div style="display: flex; align-items: center; gap: 16px;"><i class="fa-solid fa-water-ladder" style="width: 24px; font-size: 20px; color: #222;"></i> <span>${propId === 'paramount' ? '64th Floor Rooftop Infinity Pool' : 'Residences Swimming Pool'}</span></div>
                            <div style="display: flex; align-items: center; gap: 16px;"><i class="fa-solid fa-eye" style="width: 24px; font-size: 20px; color: #222;"></i> <span>Burj Khalifa & Skyline view</span></div>
                            <div style="display: flex; align-items: center; gap: 16px;"><i class="fa-solid fa-wifi" style="width: 24px; font-size: 20px; color: #222;"></i> <span>Fast wifi (Free high-speed)</span></div>
                            <div style="display: flex; align-items: center; gap: 16px;"><i class="fa-solid fa-square-parking" style="width: 24px; font-size: 20px; color: #222;"></i> <span>Free parking on premises</span></div>
                            <div style="display: flex; align-items: center; gap: 16px;"><i class="fa-solid fa-utensils" style="width: 24px; font-size: 20px; color: #222;"></i> <span>Fully equipped kitchen</span></div>
                            <div style="display: flex; align-items: center; gap: 16px;"><i class="fa-solid fa-dumbbell" style="width: 24px; font-size: 20px; color: #222;"></i> <span>State-of-the-art gym</span></div>
                            <div style="display: flex; align-items: center; gap: 16px;"><i class="fa-solid fa-tv" style="width: 24px; font-size: 20px; color: #222;"></i> <span>65" & 55" 4K Smart TVs</span></div>
                            <div style="display: flex; align-items: center; gap: 16px;"><i class="fa-solid fa-snowflake" style="width: 24px; font-size: 20px; color: #222;"></i> <span>Central air conditioning</span></div>
                            <div style="display: flex; align-items: center; gap: 16px;"><i class="fa-solid fa-elevator" style="width: 24px; font-size: 20px; color: #222;"></i> <span>High-speed elevator</span></div>
                            <div style="display: flex; align-items: center; gap: 16px;"><i class="fa-solid fa-shield-halved" style="width: 24px; font-size: 20px; color: #222;"></i> <span>Smoke & Carbon monoxide alarms</span></div>
                        </div>

                        <button onclick="openAmenitiesModalDirect('${propId}')" style="border: 1px solid #222222; background: #FFFFFF; color: #222222; border-radius: 8px; padding: 13px 24px; font-weight: 700; font-size: 15px; cursor: pointer; transition: background 0.2s;">
                            Show all ${data.categorizedAmenities ? '35+' : '50+'} amenities
                        </button>
                    </div>

                    <!-- Reviews Section (Dynamic & Clickable Airbnb Style) -->
                    <div id="pdpReviewsSection" style="margin-bottom: 40px; padding-bottom: 32px; border-bottom: 1px solid #EBEBEB;">
                        <div onclick="openReviewsModal('${propId}')" style="cursor: pointer; display: inline-flex; align-items: center; gap: 8px; margin-bottom: 20px;">
                            <h3 style="font-size: 22px; font-weight: 800; color: #222222; margin: 0;">
                                ★ ${data.rating} · <span style="text-decoration: underline;">${data.reviewsCount} reviews</span>
                            </h3>
                            <i class="fa-solid fa-chevron-right" style="font-size: 14px; color: #222; margin-left: 4px;"></i>
                        </div>

                        <!-- Category Breakdown Bars -->
                        <div class="rating-categories-grid">
                            ${[
                                { label: 'Cleanliness', score: '5.0' },
                                { label: 'Accuracy', score: '5.0' },
                                { label: 'Check-in', score: '5.0' },
                                { label: 'Communication', score: '5.0' },
                                { label: 'Location', score: '5.0' },
                                { label: 'Value', score: '5.0' }
                            ].map(cat => `
                                <div class="rating-category-item">
                                    <span>${cat.label}</span>
                                    <div class="rating-bar-wrap">
                                        <div class="rating-bar-track">
                                            <div class="rating-bar-fill"></div>
                                        </div>
                                        <span class="rating-category-score">${cat.score}</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>

                        <!-- Property Specific Reviews Grid -->
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-top: 28px; margin-bottom: 24px;">
                            ${reviews.slice(0, 4).map(rev => `
                                <div style="background: #FFFFFF; border: 1px solid #EBEBEB; border-radius: 16px; padding: 22px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
                                    <div>
                                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                                            <div style="width: 44px; height: 44px; border-radius: 50%; background: ${rev.color || '#0F1E36'}; color: #FFF; font-weight: 700; display: flex; align-items: center; justify-content: center; font-size: 15px;">${rev.initial || rev.name.charAt(0)}</div>
                                            <div>
                                                <div style="font-size: 15px; font-weight: 700; color: #222;">${rev.name}</div>
                                                <div style="font-size: 13px; color: #717171;">${rev.location || 'Verified Guest'}</div>
                                            </div>
                                        </div>
                                        <div style="font-size: 12px; color: #222; margin-bottom: 8px;">
                                            ${'★'.repeat(rev.rating || 5)}
                                            <span style="color: #717171; margin-left: 6px;">· ${rev.time}</span>
                                        </div>
                                        <p style="font-size: 14px; color: #374151; line-height: 1.55; margin: 0;">"${rev.text}"</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>

                        <button onclick="openReviewsModal('${propId}')" style="border: 1px solid #222222; background: #FFFFFF; color: #222222; border-radius: 8px; padding: 13px 24px; font-weight: 700; font-size: 14px; cursor: pointer; transition: background 0.2s;">
                            Show all ${data.reviewsCount} reviews
                        </button>
                    </div>

                    <!-- Location Map ("Where you'll be" with Interactive Map) -->
                    <div class="property-map-wrapper">
                        <h3 style="font-size: 22px; font-weight: 700; color: #222222; margin-bottom: 6px;">Where you'll be</h3>
                        <p style="font-size: 15px; color: #717171; margin-bottom: 16px;">${data.location}</p>
                        
                        <div id="propertyMap"></div>

                        <div style="margin-top: 24px;">
                            <h4 style="font-size: 16px; font-weight: 700; color: #222222; margin-bottom: 8px;">${data.neighborhoodTitle || 'Dubai Prime Neighborhood'}</h4>
                            <p style="font-size: 14px; color: #374151; line-height: 1.6;">${data.neighborhoodDesc || data.location}</p>
                        </div>
                    </div>

                    <!-- Things to Know (3-Column Airbnb Grid) -->
                    <div class="things-to-know-section">
                        <h3 style="font-size: 22px; font-weight: 700; color: #222222; margin-bottom: 8px;">Things to know</h3>
                        
                        <div class="things-to-know-grid">
                            <div>
                                <h4 class="ttk-col-title">House rules</h4>
                                <ul class="ttk-list">
                                    <li><i class="fa-regular fa-clock"></i> <span>Check-in: 3:00 PM – 11:00 PM</span></li>
                                    <li><i class="fa-regular fa-clock"></i> <span>Checkout before 11:00 AM</span></li>
                                    <li><i class="fa-solid fa-users"></i> <span>4 guests maximum</span></li>
                                    <li><i class="fa-solid fa-ban-smoking"></i> <span>No smoking inside</span></li>
                                    <li><i class="fa-solid fa-champagne-glasses"></i> <span>No parties or events</span></li>
                                </ul>
                            </div>
                            <div>
                                <h4 class="ttk-col-title">Safety & property</h4>
                                <ul class="ttk-list">
                                    <li><i class="fa-solid fa-shield-halved"></i> <span>Carbon monoxide alarm installed</span></li>
                                    <li><i class="fa-solid fa-bell"></i> <span>Smoke alarm installed</span></li>
                                    <li><i class="fa-solid fa-fire-extinguisher"></i> <span>Fire extinguisher on premises</span></li>
                                    <li><i class="fa-solid fa-kit-medical"></i> <span>First aid kit available</span></li>
                                    <li><i class="fa-solid fa-video-slash"></i> <span>No interior security cameras</span></li>
                                </ul>
                            </div>
                            <div>
                                <h4 class="ttk-col-title">Cancellation policy</h4>
                                <ul class="ttk-list">
                                    <li><i class="fa-regular fa-calendar-check"></i> <span>Free cancellation up to 48 hours before check-in</span></li>
                                    <li><i class="fa-solid fa-circle-info"></i> <span>Review full policy on Airbnb before reserving</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- Right Column Sticky Reservation Booking Engine (Exact Images 1 & 2 Match) -->
                <div class="detail-right-col" style="position: sticky; top: 100px;">
                    
                    <!-- Rare find badge pill (Exact Image 1 Match) -->
                    <div class="rare-find-badge" style="background: #FFFFFF; border: 1px solid #DDDDDD; border-radius: 12px; padding: 14px 20px; margin-bottom: 20px; display: flex; align-items: center; gap: 12px; box-shadow: 0 2px 6px rgba(0,0,0,0.03);">
                        <span style="font-size: 18px; line-height: 1;">💎</span>
                        <span style="font-size: 14px; color: #222222;"><strong style="font-weight: 700;">Rare find!</strong> This place is usually booked</span>
                    </div>

                    <!-- Main Booking Card Box (Exact Image 1 Match) -->
                    <div class="booking-card-airbnb" style="border: 1px solid #DDDDDD; border-radius: 12px; padding: 24px; box-shadow: 0 6px 16px rgba(0,0,0,0.12); background: #FFFFFF;">
                        
                        <!-- Price Header Line -->
                        <div style="margin-bottom: 22px;">
                            <span id="bookingCardPrice" style="font-size: 22px; font-weight: 700; color: #222222; text-decoration: underline;">${window.formatPrice(nightlyTotal)}</span>
                            <span id="bookingCardPeriod" style="font-size: 15px; color: #222222; font-weight: 500; margin-left: 6px;">for <span id="numNightsText">${nights}</span> nights</span>
                        </div>

                        <!-- 2x2 Date and Guest inputs Box -->
                        <div style="border: 1px solid #B0B0B0; border-radius: 8px; overflow: hidden; margin-bottom: 14px;">
                            <div style="display: grid; grid-template-columns: 1fr 1fr; border-bottom: 1px solid #B0B0B0;">
                                <div style="padding: 10px 12px; border-right: 1px solid #B0B0B0;">
                                    <label style="display: block; font-size: 10px; font-weight: 800; color: #222222; letter-spacing: 0.5px; margin-bottom: 2px;">CHECK-IN</label>
                                    <input type="date" value="${checkInStr}" id="modalCheckIn" onchange="updateCalc('${propId}')" style="border: none; width: 100%; font-size: 14px; font-weight: 500; color: #222222; outline: none; background: transparent;">
                                </div>
                                <div style="padding: 10px 12px;">
                                    <label style="display: block; font-size: 10px; font-weight: 800; color: #222222; letter-spacing: 0.5px; margin-bottom: 2px;">CHECKOUT</label>
                                    <input type="date" value="${checkOutStr}" id="modalCheckOut" onchange="updateCalc('${propId}')" style="border: none; width: 100%; font-size: 14px; font-weight: 500; color: #222222; outline: none; background: transparent;">
                                </div>
                            </div>
                            <div style="padding: 10px 12px; position: relative;">
                                <label style="display: block; font-size: 10px; font-weight: 800; color: #222222; letter-spacing: 0.5px; margin-bottom: 2px;">GUESTS</label>
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <select id="modalGuests" onchange="updateCalc('${propId}')" style="border: none; width: 100%; font-size: 14px; font-weight: 500; color: #222222; outline: none; background: transparent; cursor: pointer; -webkit-appearance: none; appearance: none;">
                                        <option value="1">1 guest</option>
                                        <option value="2" selected>2 guests</option>
                                        <option value="3">3 guests</option>
                                        <option value="4">4 guests (Max)</option>
                                    </select>
                                    <i class="fa-solid fa-chevron-down" style="font-size: 12px; color: #222222; pointer-events: none;"></i>
                                </div>
                            </div>
                        </div>

                        <!-- Free Cancellation Notice Pill -->
                        <div style="background: #F7F7F7; border-radius: 8px; padding: 10px 14px; text-align: center; font-size: 13px; font-weight: 500; color: #222222; margin-bottom: 16px;">
                            Free cancellation before <span id="cancellationDeadlineText">${cancellationDateStr}</span>
                        </div>

                        <!-- Primary Reserve Button (Hot Pink Airbnb Style) -->
                        <a href="${data.airbnbUrl}" id="airbnbReserveBtn" target="_blank" style="display: block; width: 100%; padding: 14px 24px; text-align: center; border-radius: 8px; background: #E51D56; color: #FFFFFF; font-size: 16px; font-weight: 600; text-decoration: none; border: none; cursor: pointer; transition: background 0.2s;">
                            Reserve
                        </a>

                        <div style="text-align: center; font-size: 14px; color: #717171; margin-top: 12px; margin-bottom: 8px;">
                            You won't be charged yet
                        </div>

                        <!-- Secondary WhatsApp Concierge Option -->
                        <div style="text-align: center; margin-top: 10px;">
                            <a href="https://wa.me/971525821668?text=Hello%20True%20Haven!%20I'd%20like%20to%20reserve%20${encodeURIComponent(data.name)}." target="_blank" style="font-size: 13px; font-weight: 600; color: #25D366; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">
                                <i class="fa-brands fa-whatsapp" style="font-size: 15px;"></i> Or reserve via WhatsApp Concierge
                            </a>
                        </div>
                    </div>

                    <!-- Report Listing Link (Exact Image 1 Match) -->
                    <div style="text-align: center; margin-top: 20px;">
                        <a href="#" onclick="alert('This listing is verified by True Haven.'); return false;" style="font-size: 14px; color: #717171; text-decoration: underline; display: inline-flex; align-items: center; gap: 8px;">
                            <i class="fa-solid fa-flag" style="font-size: 13px;"></i> Report this listing
                        </a>
                    </div>
                </div>

            </div>
        </div>

        <!-- Fixed Floating Mobile Bottom Bar Matching Airbnb UX -->
        <div class="mobile-fixed-bottom-bar">
            <div class="mobile-bottom-price-box">
                <div class="mobile-bottom-price" id="mobileBottomPrice" style="font-size: 16px; font-weight: 800; color: #222;">${window.formatPrice(data.priceNight)} <span style="font-size: 13px; font-weight: normal; color: #717171;">night</span></div>
                <div class="mobile-bottom-sub" onclick="openReviewsModal('${propId}')" style="cursor: pointer;"><i class="fa-solid fa-star" style="font-size: 11px; color: #FF385C;"></i> ${data.rating} (${data.reviewsCount})</div>
            </div>
            <a href="${data.airbnbUrl}" id="mobileAirbnbReserveBtn" target="_blank" class="mobile-reserve-btn">
                Reserve
            </a>
        </div>

        <!-- Unified Global Footer on Listing Page -->
        <footer class="footer-light" style="border-top: 1px solid #E5E0D8;">
            <div class="container">
                <div class="footer-columns">
                    <!-- Column 1: Brand Info -->
                    <div class="footer-col brand-col">
                        <div class="brand-logo footer-logo">
                            <img src="assets/logo.png" alt="True Haven Logo" class="logo-img">
                            <div class="brand-text">
                                <span class="brand-name">True Haven</span>
                                <span class="brand-sub">LUXURY STAYS</span>
                            </div>
                        </div>
                        <p class="footer-brand-desc">Curated boutique short-term holiday homes in Dubai’s most desirable addresses. Designed for elevated living.</p>
                        <p class="footer-contact-item"><i class="fa-solid fa-location-dot"></i> <strong>Office:</strong> 2204, Iris Bay, Business Bay, Dubai, UAE</p>
                        <p class="footer-contact-item"><i class="fa-solid fa-phone"></i> <strong>Contact Us:</strong> <a href="tel:+971525821668" style="color: inherit; text-decoration: none;">+971 52 582 1668 (052 58 21668)</a></p>
                        <p class="footer-contact-item"><i class="fa-solid fa-envelope"></i> <strong>Email:</strong> <a href="mailto:hello@truehavenstays.com" style="color: inherit; text-decoration: none;">hello@truehavenstays.com</a></p>
                    </div>

                    <!-- Column 2: Quick Links -->
                    <div class="footer-col">
                        <h4 class="footer-col-title">Residences</h4>
                        <ul class="footer-links">
                            <li><a href="#" onclick="openPropertyDetail('paramount'); return false;">Paramount Midtown (Business Bay)</a></li>
                            <li><a href="#" onclick="openPropertyDetail('burj-vista'); return false;">Burj Vista (Downtown Dubai)</a></li>
                            <li><a href="#" onclick="closePropertyDetailPage(); document.getElementById('properties').scrollIntoView(); return false;">Premier Residences</a></li>
                            <li><a href="#" onclick="closePropertyDetailPage(); document.getElementById('places').scrollIntoView(); return false;">Places to Visit in Dubai</a></li>
                        </ul>
                    </div>

                    <!-- Column 3: Guest Support -->
                    <div class="footer-col">
                        <h4 class="footer-col-title">Guest Services</h4>
                        <ul class="footer-links">
                            <li><a href="https://wa.me/971525821668?text=Hello%20True%20Haven!%20I'd%20like%20to%20inquire%20about%20a%20luxury%20stay%20in%20Dubai." target="_blank" style="color: #25D366; font-weight: 700;"><i class="fa-brands fa-whatsapp"></i> WhatsApp Concierge</a></li>
                            <li><a href="tel:+971525821668"><i class="fa-solid fa-phone"></i> Direct Reservations Call</a></li>
                            <li><a href="https://www.instagram.com/truehavenstays/?hl=en" target="_blank"><i class="fa-brands fa-instagram"></i> Instagram Community</a></li>
                            <li><a href="https://www.facebook.com/truehavenstays" target="_blank"><i class="fa-brands fa-facebook-f"></i> Facebook Page</a></li>
                        </ul>
                    </div>
                </div>

                <!-- Legal Hairline Band -->
                <div class="legal-band">
                    <div class="legal-left">
                        <span>© 2026 True Haven Stays, Inc. All rights reserved.</span>
                        <a href="#">Privacy</a> · <a href="#">Terms</a> · <a href="#">Sitemap</a>
                    </div>
                    <div class="legal-right">
                        <span><i class="fa-solid fa-globe"></i> English (US)</span>
                        <span>AED (د.إ)</span>
                        <div class="social-icons">
                            <a href="https://www.instagram.com/truehavenstays/?hl=en" target="_blank" title="Follow us on Instagram (@truehavenstays)"><i class="fa-brands fa-instagram"></i></a>
                            <a href="https://www.facebook.com/truehavenstays" target="_blank" title="Follow us on Facebook"><i class="fa-brands fa-facebook"></i></a>
                            <a href="#"><i class="fa-brands fa-x-twitter"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    `;

    mainPage.style.display = 'none';
    pageContainer.style.display = 'block';
    window.scrollTo(0, 0);
    if (window.location.hash !== '#' + propId) {
        try { history.pushState(null, '', '#' + propId); } catch(e) {}
    }

    // Render interactive Leaflet map
    setTimeout(() => {
        renderPropertyMap(propId);
    }, 150);
}

// Close Full-Page Immersive View & Return to Homepage
function closePropertyDetailPage() {
    const pageContainer = document.getElementById('propertyDetailPage');
    const mainPage = document.getElementById('mainPage');
    if (pageContainer) pageContainer.style.display = 'none';
    if (mainPage) mainPage.style.display = 'block';
    window.currentPropertyId = null;
    window.scrollTo(0, 0);
    if (window.location.hash) {
        try { history.pushState(null, '', window.location.pathname + window.location.search); } catch(e) {}
    }
}

// Render Interactive Map ("Where you'll be")
function renderPropertyMap(propId) {
    const data = PROPERTIES_DATA[propId];
    if (!data) return;
    const mapEl = document.getElementById('propertyMap');
    if (!mapEl) return;

    if (currentLeafletMap) {
        try { currentLeafletMap.remove(); } catch(e) {}
        currentLeafletMap = null;
    }

    if (typeof L === 'undefined') {
        console.warn('Leaflet not loaded');
        return;
    }

    const lat = data.lat || 25.1972;
    const lng = data.lng || 55.2744;

    try {
        currentLeafletMap = L.map('propertyMap', {
            center: [lat, lng],
            zoom: 15,
            scrollWheelZoom: false
        });

        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
            maxZoom: 19
        }).addTo(currentLeafletMap);

        // Soft aura circle
        L.circle([lat, lng], {
            color: '#FF385C',
            fillColor: '#FF385C',
            fillOpacity: 0.15,
            radius: 220,
            weight: 1
        }).addTo(currentLeafletMap);

        // Custom True Haven Pin Icon
        const customPin = L.divIcon({
            className: 'truehaven-map-pin-custom',
            html: '<div style="background: #0F1E36; color: #FFFFFF; width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 16px rgba(0,0,0,0.35); border: 3px solid #FFFFFF; font-size: 18px;"><i class="fa-solid fa-hotel"></i></div>',
            iconSize: [44, 44],
            iconAnchor: [22, 22]
        });

        const marker = L.marker([lat, lng], { icon: customPin }).addTo(currentLeafletMap);
        marker.bindPopup(`<strong>${data.name}</strong><br><span style="color: #6B7280; font-size: 12px;">True Haven Luxury Stays</span>`);

        setTimeout(() => {
            if (currentLeafletMap) currentLeafletMap.invalidateSize();
        }, 300);
    } catch(err) {
        console.error('Error initializing map:', err);
    }
}

// Update Reservation Calculation
function updateCalc(propId) {
    const data = PROPERTIES_DATA[propId];
    if (!data) return;

    const checkInVal = document.getElementById('modalCheckIn') ? document.getElementById('modalCheckIn').value : '';
    const checkOutVal = document.getElementById('modalCheckOut') ? document.getElementById('modalCheckOut').value : '';
    const guestsVal = document.getElementById('modalGuests') ? document.getElementById('modalGuests').value : '2';

    let diffDays = 2;
    if (checkInVal && checkOutVal) {
        const d1 = new Date(checkInVal);
        const d2 = new Date(checkOutVal);
        diffDays = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
        if (isNaN(diffDays) || diffDays <= 0) diffDays = 1;
    }

    const nightlyTotal = data.priceNight * diffDays;

    const priceEl = document.getElementById('bookingCardPrice');
    const nightsEl = document.getElementById('numNightsText');
    const cancelDeadlineEl = document.getElementById('cancellationDeadlineText');
    const mobilePriceEl = document.getElementById('mobileBottomPrice');

    if (priceEl) priceEl.innerText = window.formatPrice(nightlyTotal);
    if (nightsEl) nightsEl.innerText = diffDays;
    
    if (cancelDeadlineEl && checkInVal) {
        const d = new Date(checkInVal);
        d.setDate(d.getDate() - 14);
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        cancelDeadlineEl.innerText = `${d.getDate()} ${months[d.getMonth()]}`;
    }

    if (mobilePriceEl) {
        mobilePriceEl.innerHTML = `${window.formatPrice(data.priceNight)} <span style="font-size: 13px; font-weight: normal; color: #717171;">night</span>`;
    }

    if (data.airbnbUrl) {
        let url = data.airbnbUrl;
        if (checkInVal && checkOutVal) {
            url += `&check_in=${checkInVal}&check_out=${checkOutVal}&adults=${guestsVal}`;
        }
        const desktopBtn = document.getElementById('airbnbReserveBtn');
        if (desktopBtn) desktopBtn.href = url;
        const mobileBtn = document.getElementById('mobileAirbnbReserveBtn');
        if (mobileBtn) mobileBtn.href = url;
    }
}

// WhatsApp Booking Redirect
function bookOnWhatsApp(propId) {
    const data = PROPERTIES_DATA[propId];
    if (!data) return;

    const checkIn = document.getElementById('modalCheckIn') ? document.getElementById('modalCheckIn').value : '';
    const checkOut = document.getElementById('modalCheckOut') ? document.getElementById('modalCheckOut').value : '';
    const guests = document.getElementById('modalGuests') ? document.getElementById('modalGuests').value : '2';

    const msg = `Hello True Haven Stays! I would like to reserve the following residence:\n\n` +
                `🏡 Residence: ${data.name}\n` +
                `📍 Location: ${data.location}\n` +
                `📅 Check-in: ${checkIn}\n` +
                `📅 Check-out: ${checkOut}\n` +
                `👥 Guests: ${guests}\n\n` +
                `Please confirm availability and booking details. Thank you!`;

    const encodedMsg = encodeURIComponent(msg);
    window.open(`https://wa.me/971525821668?text=${encodedMsg}`, '_blank');
}

// -------------------------------------------------------------
// AIRBNB REVIEWS MODAL IMPLEMENTATION
// -------------------------------------------------------------
function openReviewsModal(propId) {
    const targetId = propId || window.currentPropertyId || 'burj-vista';
    const data = PROPERTIES_DATA[targetId];
    if (!data) return;

    let modal = document.getElementById('reviewsModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'reviewsModal';
        modal.className = 'reviews-modal-overlay';
        document.body.appendChild(modal);
    }

    const reviews = data.reviews || [];

    modal.innerHTML = `
        <div class="modal-card reviews-modal-card" style="max-width: 1040px; width: 95%; max-height: 88vh; border-radius: 24px; display: flex; flex-direction: column; overflow: hidden; background: #FFFFFF; box-shadow: 0 25px 60px rgba(0,0,0,0.25);">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 20px 28px; border-bottom: 1px solid #EBEBEB;">
                <h3 style="font-size: 19px; font-weight: 800; margin: 0; color: #222222;">
                    ★ ${data.rating} · ${data.reviewsCount} reviews
                </h3>
                <button onclick="closeReviewsModal()" class="modal-close-btn" style="position: static; font-size: 26px; cursor: pointer; background: none; border: none; color: #222;">&times;</button>
            </div>
            
            <div class="reviews-modal-body" style="display: grid; grid-template-columns: 320px 1fr; gap: 36px; padding: 28px; overflow-y: auto; flex: 1;">
                <!-- Left Column: Scores and Category Bars -->
                <div class="reviews-modal-left" style="border-right: 1px solid #EBEBEB; padding-right: 28px;">
                    <div style="display: flex; align-items: baseline; gap: 10px; margin-bottom: 8px;">
                        <span style="font-size: 48px; font-weight: 800; color: #222222; line-height: 1;">${data.rating}</span>
                        <div style="color: #FF385C; font-size: 18px;">
                            <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                        </div>
                    </div>
                    <div style="font-size: 14px; font-weight: 700; color: #222222; margin-bottom: 24px; display: flex; align-items: center; gap: 6px;">
                        <i class="fa-solid fa-crown" style="color: #FF385C;"></i> Guest favourite
                    </div>

                    <!-- Category Breakdown Bars -->
                    <div style="display: flex; flex-direction: column; gap: 14px; margin-bottom: 28px;">
                        ${[
                            { label: 'Cleanliness', score: '5.0' },
                            { label: 'Accuracy', score: '5.0' },
                            { label: 'Check-in', score: '5.0' },
                            { label: 'Communication', score: '5.0' },
                            { label: 'Location', score: '5.0' },
                            { label: 'Value', score: '5.0' }
                        ].map(cat => `
                            <div>
                                <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; color: #222222; margin-bottom: 4px;">
                                    <span>${cat.label}</span>
                                    <span>${cat.score}</span>
                                </div>
                                <div style="background: #EBEBEB; height: 4px; border-radius: 999px; overflow: hidden;">
                                    <div style="background: #222222; width: 100%; height: 100%;"></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <div style="position: relative;">
                        <i class="fa-solid fa-magnifying-glass" style="position: absolute; left: 14px; top: 13px; color: #717171; font-size: 14px;"></i>
                        <input type="text" id="reviewsSearchInput" placeholder="Search reviews..." oninput="filterReviewsList('${targetId}', this.value)" style="width: 100%; box-sizing: border-box; padding: 10px 14px 10px 38px; border-radius: 999px; border: 1px solid #B0B0B0; font-size: 13px; outline: none;">
                    </div>
                </div>

                <!-- Right Column: Scrollable List of Reviews -->
                <div class="reviews-modal-right">
                    <div id="reviewsListContainer" style="display: flex; flex-direction: column; gap: 24px;">
                        ${renderReviewsHtml(reviews)}
                    </div>
                </div>
            </div>
        </div>
    `;

    modal.style.display = 'flex';
}

function renderReviewsHtml(reviews) {
    if (!reviews || reviews.length === 0) {
        return '<p style="color: #717171; font-size: 14px;">No reviews found matching your search.</p>';
    }
    return reviews.map(rev => `
        <div style="border-bottom: 1px solid #EBEBEB; padding-bottom: 20px;">
            <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 10px;">
                <div style="width: 46px; height: 46px; border-radius: 50%; background: ${rev.color || '#0F1E36'}; color: #FFF; font-weight: 700; display: flex; align-items: center; justify-content: center; font-size: 16px;">${rev.initial || rev.name.charAt(0)}</div>
                <div>
                    <div style="font-size: 16px; font-weight: 700; color: #222;">${rev.name}</div>
                    <div style="font-size: 13px; color: #717171;">${rev.location || 'Verified Guest'}</div>
                </div>
            </div>
            <div style="font-size: 12px; color: #222; margin-bottom: 10px;">
                ${'★'.repeat(rev.rating || 5)}
                <span style="color: #717171; margin-left: 6px;">· ${rev.time}</span>
            </div>
            <p style="font-size: 14px; color: #374151; line-height: 1.6; margin: 0;">"${rev.text}"</p>
        </div>
    `).join('');
}

function filterReviewsList(propId, query) {
    const data = PROPERTIES_DATA[propId];
    if (!data) return;
    const container = document.getElementById('reviewsListContainer');
    if (!container) return;

    const q = (query || '').toLowerCase().trim();
    const filtered = (data.reviews || []).filter(r => 
        r.name.toLowerCase().includes(q) || 
        r.text.toLowerCase().includes(q) || 
        (r.location && r.location.toLowerCase().includes(q))
    );

    container.innerHTML = renderReviewsHtml(filtered);
}

function closeReviewsModal() {
    const modal = document.getElementById('reviewsModal');
    if (modal) modal.style.display = 'none';
}

// -------------------------------------------------------------
// AMENITIES MODAL DIRECT
// -------------------------------------------------------------
function openAmenitiesModalDirect(propId) {
    const targetId = propId || window.currentPropertyId || 'paramount';
    const data = PROPERTIES_DATA[targetId];
    const amenitiesModal = document.getElementById('amenitiesModal');
    if (!amenitiesModal) return;

    if (data && data.categorizedAmenities) {
        const modalContainer = amenitiesModal.querySelector('.modal-scroll-body');
        if (modalContainer) {
            modalContainer.innerHTML = `
                <div class="amenities-category-list">
                    ${data.categorizedAmenities.map(cat => `
                        <div class="amenity-cat-block ${cat.category === 'Not included' ? 'unavailable-block' : ''}">
                            <h4 class="cat-title ${cat.category === 'Not included' ? 'text-muted' : ''}"><i class="fa-solid ${cat.icon}"></i> ${cat.category}</h4>
                            <ul class="cat-items">
                                ${cat.items.map(item => `
                                    <li class="${!item.available ? 'unavailable' : ''}">
                                        <i class="fa-solid ${item.available ? 'fa-check' : 'fa-xmark'}"></i> ${item.text}
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    }
    amenitiesModal.style.display = 'block';
}

// -------------------------------------------------------------
// PHOTO GALLERY MODAL
// -------------------------------------------------------------
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
        categories = [
            { name: "All Photos", photos: data.photos }
        ];
    }

    let activeNavCategory = categories[0].name;

    galleryModal.innerHTML = `
        <div class="gallery-nav-bar">
            <button class="gallery-back-btn" onclick="closePhotoGalleryModal()">
                <i class="fa-solid fa-chevron-left"></i>
            </button>
            <div class="gallery-title">${data.name}</div>
            <div class="gallery-actions">
                <button class="gallery-action-btn" title="Share" onclick="shareProperty('${propId}')">
                    <i class="fa-solid fa-arrow-up-from-bracket"></i>
                </button>
                <button class="gallery-action-btn" title="Save" onclick="toggleSaveProperty(this)">
                    <i class="fa-regular fa-heart"></i>
                </button>
            </div>
        </div>

        <div class="gallery-layout-body">
            <div class="gallery-left-category-nav" id="galleryCategoryNav">
                ${categories.map(cat => {
                    const firstPhoto = cat.photos && cat.photos.length > 0 ? cat.photos[0] : data.photos[0];
                    return `
                        <div class="gallery-cat-tab ${cat.name === activeNavCategory ? 'active' : ''}" onclick="scrollToGalleryCategory('${cat.name.replace(/[^a-zA-Z0-9]/g, '_')}', this)">
                            <img src="${firstPhoto}" alt="${cat.name}">
                            <span>${cat.name}</span>
                        </div>
                    `;
                }).join('')}
            </div>

            <div class="gallery-right-photo-stream" id="galleryPhotoStream">
                ${categories.map(cat => `
                    <div class="gallery-category-stream-group" id="group_${cat.name.replace(/[^a-zA-Z0-9]/g, '_')}">
                        <div class="gallery-cat-heading">${cat.name}</div>
                        <div class="gallery-cat-photos-grid">
                            ${cat.photos.map((src, idx) => `
                                <div class="gallery-photo-item">
                                    <img src="${src}" alt="${data.name} - ${cat.name} ${idx + 1}" loading="lazy">
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    galleryModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closePhotoGalleryModal() {
    const galleryModal = document.getElementById('photoGalleryModal');
    if (galleryModal) galleryModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function scrollToGalleryCategory(categoryId, tabElement) {
    const group = document.getElementById('group_' + categoryId);
    const stream = document.getElementById('galleryPhotoStream');
    if (group && stream) {
        stream.scrollTo({
            top: group.offsetTop - 20,
            behavior: 'smooth'
        });
    }

    const tabs = document.querySelectorAll('.gallery-cat-tab');
    tabs.forEach(t => t.classList.remove('active'));
    if (tabElement) tabElement.classList.add('active');
}

// -------------------------------------------------------------
// SEARCH BAR POP-OVERS, AIRBNB GUEST STEPPERS, AND LOCATION FILTERING
// -------------------------------------------------------------
let selectedNavLocation = 'all';
let navGuests = { adults: 2, children: 0, infants: 0 };

document.addEventListener('DOMContentLoaded', () => {
    // Check initial hash route
    const hash = window.location.hash.replace('#', '');
    if (hash === 'paramount' || hash === 'burj-vista') {
        openPropertyDetail(hash);
    }

    // Amenities modal close
    const closeAmenitiesBtn = document.getElementById('closeAmenitiesModalBtn');
    const amenitiesModal = document.getElementById('amenitiesModal');
    if (closeAmenitiesBtn && amenitiesModal) {
        closeAmenitiesBtn.addEventListener('click', () => {
            amenitiesModal.style.display = 'none';
        });
    }

    // Mobile Drawer open/close
    const openMobileDrawerBtn = document.getElementById('openMobileDrawerBtn');
    const closeMobileDrawerBtn = document.getElementById('closeMobileDrawerBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');

    if (openMobileDrawerBtn && mobileDrawer) {
        openMobileDrawerBtn.addEventListener('click', () => {
            mobileDrawer.style.display = 'flex';
        });
    }

    if (closeMobileDrawerBtn && mobileDrawer) {
        closeMobileDrawerBtn.addEventListener('click', () => {
            mobileDrawer.style.display = 'none';
        });
    }

    // Search bar buttons desktop
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
        });
    }

    // Search bar buttons mobile
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
        });
    }

    // Close popovers on click outside
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

function closeMobileDrawer() {
    const drawer = document.getElementById('mobileDrawer');
    if (drawer) drawer.style.display = 'none';
}

function selectNavLocation(locKey, displayLabel) {
    selectedNavLocation = locKey;
    const whereValEl = document.getElementById('whereValue');
    const mWhereValEl = document.getElementById('mWhereVal');
    if (whereValEl) whereValEl.innerText = displayLabel;
    if (mWhereValEl) mWhereValEl.innerText = displayLabel;

    // Highlight active popover option
    const options = document.querySelectorAll('#wherePopover .popover-option');
    options.forEach(opt => {
        const onclickAttr = opt.getAttribute('onclick') || '';
        opt.classList.toggle('active', onclickAttr.includes(`'${locKey}'`));
    });

    filterPropertiesByLocation(locKey);
    closeAllSearchPopovers();
}

function filterPropertiesByLocation(locKey) {
    const cards = document.querySelectorAll('.property-card');
    cards.forEach(card => {
        const cardLoc = card.getAttribute('data-location') || '';
        const propId = card.getAttribute('data-id') || '';
        if (locKey === 'all') {
            card.style.display = 'flex';
        } else if (locKey === 'business-bay' && (cardLoc === 'business-bay' || propId === 'paramount')) {
            card.style.display = 'flex';
        } else if (locKey === 'downtown' && (cardLoc === 'downtown' || propId === 'burj-vista')) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });

    // Update filter pills active state
    const pills = document.querySelectorAll('.filter-pill');
    pills.forEach(p => {
        p.classList.toggle('active', p.getAttribute('data-filter') === locKey);
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

// Airbnb Guest Stepper Logic (Max 4 guests capacity)
function updateGuestStepper(type, delta) {
    const totalStandard = navGuests.adults + navGuests.children;

    if (delta > 0) {
        if (type === 'adults' || type === 'children') {
            if (totalStandard >= 4) {
                const capNotice = document.getElementById('guestCapAlert');
                if (capNotice) capNotice.style.display = 'block';
                return;
            }
            navGuests[type] += 1;
        } else if (type === 'infants') {
            if (navGuests.infants < 2) navGuests.infants += 1;
        }
    } else if (delta < 0) {
        if (type === 'adults') {
            if (navGuests.adults > 1) navGuests.adults -= 1;
        } else if (type === 'children') {
            if (navGuests.children > 0) navGuests.children -= 1;
        } else if (type === 'infants') {
            if (navGuests.infants > 0) navGuests.infants -= 1;
        }
    }

    refreshGuestStepperUI();
}

function refreshGuestStepperUI() {
    const totalStandard = navGuests.adults + navGuests.children;

    const adultsCountEl = document.getElementById('navAdultsCount');
    const childrenCountEl = document.getElementById('navChildrenCount');
    const infantsCountEl = document.getElementById('navInfantsCount');

    if (adultsCountEl) adultsCountEl.innerText = navGuests.adults;
    if (childrenCountEl) childrenCountEl.innerText = navGuests.children;
    if (infantsCountEl) infantsCountEl.innerText = navGuests.infants;

    const adultsMinus = document.getElementById('adultsMinusBtn');
    const adultsPlus = document.getElementById('adultsPlusBtn');
    const childrenMinus = document.getElementById('childrenMinusBtn');
    const childrenPlus = document.getElementById('childrenPlusBtn');
    const infantsMinus = document.getElementById('infantsMinusBtn');
    const infantsPlus = document.getElementById('infantsPlusBtn');
    const capNotice = document.getElementById('guestCapAlert');

    if (adultsMinus) adultsMinus.disabled = navGuests.adults <= 1;
    if (childrenMinus) childrenMinus.disabled = navGuests.children <= 0;
    if (infantsMinus) infantsMinus.disabled = navGuests.infants <= 0;

    const atMax = totalStandard >= 4;
    if (adultsPlus) adultsPlus.disabled = atMax;
    if (childrenPlus) childrenPlus.disabled = atMax;
    if (infantsPlus) infantsPlus.disabled = navGuests.infants >= 2;

    if (capNotice) {
        capNotice.style.display = atMax ? 'block' : 'none';
    }

    // Auto-update pill label
    let label = `${totalStandard} ${totalStandard === 1 ? 'Guest' : 'Guests'}`;
    if (navGuests.infants > 0) {
        label += `, ${navGuests.infants} ${navGuests.infants === 1 ? 'Infant' : 'Infants'}`;
    }

    const whoValEl = document.getElementById('whoValue');
    const mWhoValEl = document.getElementById('mWhoVal');
    if (whoValEl) whoValEl.innerText = label;
    if (mWhoValEl) mWhoValEl.innerText = label;
}

function resetGuests() {
    navGuests = { adults: 2, children: 0, infants: 0 };
    refreshGuestStepperUI();
}

function applyNavGuests() {
    refreshGuestStepperUI();
    closeAllSearchPopovers();
}
