
window.userCurrency = 'INR';
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
const PARAMOUNT_REVIEWS_LIST = [
    {
        "name": "Christiane",
        "location": "10 years on Airbnb",
        "avatarUrl": "https://a0.muscache.com/im/pictures/user/93fb791c-e4d9-46b2-9f76-16cdaad22fa6.jpg?im_w=120",
        "initial": "C",
        "color": "#E11D48",
        "rating": 5,
        "time": "3 days ago",
        "stay": "Stayed a few nights",
        "text": "Very nice Apartment. Well equiped. Great view. Bar, Restaurant, Pool on top was perfect. We come again."
    },
    {
        "name": "Weronika",
        "location": "7 years on Airbnb",
        "avatarUrl": null,
        "initial": "W",
        "color": "#D97706",
        "rating": 5,
        "time": "1 week ago",
        "stay": "Stayed a few nights",
        "text": "Clean, spacious and elegant with special view on on Burj Khalifa from 58 th floor !! We would love to come back ! It was a perfect first impression of Dubai for my mum stay. Thank you Prince for quick responses and clear instructions ☺️ Perfect stay ❤️ The building has beautiful 180* pool on the 64th floor (something like aura sky pool but for business bay) sometimes very busy"
    },
    {
        "name": "Merlinda",
        "location": "1 month on Airbnb",
        "avatarUrl": null,
        "initial": "M",
        "color": "#2563EB",
        "rating": 5,
        "time": "3 weeks ago",
        "stay": "Stayed a few nights",
        "text": "We rented the apartment for three nights and were absolutely delighted! Everything was simply great: The apartment was very clean, cozy and very well equipped. We felt comfortable from the very first moment. The stay was really great, and we would come back anytime. Thank you so much for the wonderful time! Highly recommended! ⭐⭐⭐⭐⭐"
    },
    {
        "name": "Harish",
        "location": "8 years on Airbnb",
        "avatarUrl": null,
        "initial": "H",
        "color": "#059669",
        "rating": 5,
        "time": "October 2026",
        "stay": "Stayed one night",
        "text": "This 1BHK was absolute perfection! The view of the Burj Khalifa is breathtaking, especially at night. Swimming in the rooftop pool with the skyline right in front of you was an amazing highlight. The kitchen is fully equipped with everything you need, and the place was spotless and modern. On top of that, the host was super approachable, helpful, and easy to communicate with throughout our stay. I am sad that I booked it for only 1 night. Would 100% stay here again and highly recommend it!"
    },
    {
        "name": "Goda",
        "location": "2 months on Airbnb",
        "avatarUrl": null,
        "initial": "G",
        "color": "#7C3AED",
        "rating": 5,
        "time": "3 weeks ago",
        "stay": "Stayed a few nights",
        "text": "The view is absolutely beautiful, everything is so well-maintained, and the location is wonderful. Everything is very clean, and every little detail has been thoughtfully considered. I will definitely come back! ❤️"
    },
    {
        "name": "Ahmed Enad",
        "location": "1 month on Airbnb",
        "avatarUrl": null,
        "initial": "A",
        "color": "#DC2626",
        "rating": 5,
        "time": "October 2026",
        "stay": "Stayed a few nights",
        "text": "The stay was wonderful, and the hosts Prince & Ruchi were helpful and responsive. The place is worth the price. Thank you very much."
    },
    {
        "name": "Shana",
        "location": "Houston, Texas",
        "avatarUrl": null,
        "initial": "S",
        "color": "#0284C7",
        "rating": 5,
        "time": "October 2026",
        "stay": "Stayed a few nights",
        "text": "Great location! The property was clean, modern, and well-maintained. The host was extremely responsive and quick to answer any questions. Overall, a wonderful experience, and I would definitely recommend staying here!"
    },
    {
        "name": "Berkay",
        "location": "2 years on Airbnb",
        "avatarUrl": null,
        "initial": "B",
        "color": "#4F46E5",
        "rating": 5,
        "time": "October 2026",
        "stay": "Stayed about a week",
        "text": "The stay was excellent. Great location. Everything was clean in the accommodation and once again exceeded our expectations. We'd love to come back."
    },
    {
        "name": "Blake",
        "location": "4 years on Airbnb",
        "avatarUrl": null,
        "initial": "B",
        "color": "#0D9488",
        "rating": 5,
        "time": "October 2026",
        "stay": "Stayed one night",
        "text": "10/10 clean and spacious! Great view"
    },
    {
        "name": "奕翔 (Yi Xiang)",
        "location": "5 years on Airbnb",
        "avatarUrl": null,
        "initial": "奕",
        "color": "#3B82F6",
        "rating": 5,
        "time": "October 2026",
        "stay": "Stayed a few nights",
        "text": "The room was clean and tidy. The apartment had all the necessary amenities and was conveniently located. It was a great stay!"
    },
    {
        "name": "Matteo",
        "location": "Milan, Italy · 5 years on Airbnb",
        "avatarUrl": null,
        "initial": "M",
        "color": "#F97316",
        "rating": 5,
        "time": "September 2026",
        "stay": "Stayed one night",
        "text": "The place was very clean, with a balcony and a very nice view of the Burj Khalifa. The pool is worth a visit, and the price is very reasonable. I recommend it!"
    },
    {
        "name": "Solomon",
        "location": "Sydney, Australia · 5 years on Airbnb",
        "avatarUrl": null,
        "initial": "S",
        "color": "#475569",
        "rating": 5,
        "time": "September 2026",
        "stay": "Stayed a few nights",
        "text": "Beautiful Property with stunning views of Burj Khalifa"
    },
    {
        "name": "Orhan",
        "location": "Frankfurt, Germany · 4 years on Airbnb",
        "avatarUrl": null,
        "initial": "O",
        "color": "#64748B",
        "rating": 5,
        "time": "September 2026",
        "stay": "Stayed a few nights",
        "text": "The host was very friendly and helpful. Immediate help in a few minutes. The apartment is highly recommended. Nothing is lacking. The view from the balcony is simply fantastic. We were very satisfied.👌😀"
    },
    {
        "name": "Krishnil",
        "location": "6 years on Airbnb",
        "avatarUrl": null,
        "initial": "K",
        "color": "#6D28D9",
        "rating": 5,
        "time": "September 2026",
        "stay": "Stayed a few nights",
        "text": "Nice and clean place. Really enjoyed it."
    },
    {
        "name": "Erwan",
        "location": "3 years on Airbnb",
        "avatarUrl": null,
        "initial": "E",
        "color": "#0284C7",
        "rating": 5,
        "time": "2 weeks ago",
        "stay": "Stayed a few nights",
        "text": "👌🏼👌🏼👌🏼"
    },
    {
        "name": "Romain",
        "location": "5 years on Airbnb",
        "avatarUrl": null,
        "initial": "R",
        "color": "#16A34A",
        "rating": 5,
        "time": "1 week ago",
        "stay": "Stayed one night",
        "text": "Top"
    },
    {
        "name": "Valeria",
        "location": "Cartagena, Colombia",
        "avatarUrl": null,
        "initial": "V",
        "color": "#CA8A04",
        "rating": 5,
        "time": "September 2026",
        "stay": "Stayed a few nights",
        "text": "Alright"
    },
    {
        "name": "兴俊 (Xingjun)",
        "location": "5 years on Airbnb",
        "avatarUrl": null,
        "initial": "兴",
        "color": "#0891B2",
        "rating": 5,
        "time": "September 2026",
        "stay": "Stayed a few nights",
        "text": "The view from the pool is beautiful."
    },
    {
        "name": "Nawaf",
        "location": "2 months on Airbnb",
        "avatarUrl": null,
        "initial": "N",
        "color": "#9333EA",
        "rating": 5,
        "time": "September 2026",
        "stay": "Stayed one night",
        "text": "Very nice"
    }
];
const BURJ_VISTA_REVIEWS_LIST = [
    {
        "name": "Stefan Sebastian",
        "location": "Madrid, Spain · 2 years on Airbnb",
        "initial": "SS",
        "color": "#F97316",
        "rating": 5,
        "time": "3 weeks ago",
        "text": "The flat is spectacular. Very nice, tidy and with stunning views. The terrace is fantastic, and the building and its facilities, such as the swimming pool and the gym, are very good. Being connected directly to Dubai Mall through the air-conditioned bridge was unbeatable during our stay."
    },
    {
        "name": "Shivani",
        "location": "London, UK · 3 years on Airbnb",
        "initial": "S",
        "color": "#EC4899",
        "rating": 5,
        "time": "1 month ago",
        "text": "It’s amazing and I love to come again! The views of the Burj Khalifa and the Dubai Fountain from the balcony are breathtaking, day and night. The apartment is beautifully furnished and sparkling clean."
    },
    {
        "name": "Pedram",
        "location": "Amsterdam, Netherlands · 5 years on Airbnb",
        "initial": "P",
        "color": "#EF4444",
        "rating": 5,
        "time": "1 month ago",
        "text": "Very kind host, can make things happen just like that! Check-in was seamless, the building has world-class amenities, and having a direct indoor walkway to Dubai Mall and the metro made getting around effortless."
    },
    {
        "name": "Aditya",
        "location": "Sammamish, Washington · 4 years on Airbnb",
        "initial": "A",
        "color": "#8B5CF6",
        "rating": 5,
        "time": "2 months ago",
        "text": "Was a very good location in the heart of downtown Dubai, a view literally in front of Burj Khalifa. Super clean, modern, and high class building. Ruchi also was great with check in and check out accommodation. Highly recommend her and this stay!"
    },
    {
        "name": "Felipe",
        "location": "Cali, Colombia · 4 years on Airbnb",
        "initial": "F",
        "color": "#10B981",
        "rating": 5,
        "time": "2 months ago",
        "text": "Incredible location and views. The apartment was spotless, well-decorated and had everything we needed. Waking up to the Burj Khalifa view from the living room is an unforgettable experience. 10/10."
    },
    {
        "name": "Nawaf",
        "location": "Riyadh, Saudi Arabia · 6 years on Airbnb",
        "initial": "N",
        "color": "#7C3AED",
        "rating": 5,
        "time": "3 months ago",
        "text": "رائع جداً - An outstanding residence. Luxury furniture, full privacy, and fast communication with the host. Direct mall bridge access was super convenient for shopping and dining."
    },
    {
        "name": "Maya",
        "location": "Paris, France · 3 years on Airbnb",
        "initial": "M",
        "color": "#EC4899",
        "rating": 5,
        "time": "3 months ago",
        "text": "The view from this balcony is something you will never forget. You have front row seats to the Dubai Fountain shows every evening without the crowds! Truly magical."
    },
    {
        "name": "Kenneth",
        "location": "New York, USA · 5 years on Airbnb",
        "initial": "K",
        "color": "#0284C7",
        "rating": 5,
        "time": "4 months ago",
        "text": "Ruchi is a true Superhost. Check-in was effortless, the apartment was pristine, and the skybridge connection to Dubai Mall was a lifesaver in the afternoon heat."
    },
    {
        "name": "Ananya",
        "location": "New Delhi, India · 4 years on Airbnb",
        "initial": "A",
        "color": "#D97706",
        "rating": 5,
        "time": "4 months ago",
        "text": "Best location in Downtown Dubai by far! Stepping onto the balcony and looking straight at the Burj Khalifa is breathtaking. Beds were exceptionally comfortable."
    },
    {
        "name": "Lucas",
        "location": "São Paulo, Brazil · 3 years on Airbnb",
        "initial": "L",
        "color": "#10B981",
        "rating": 5,
        "time": "5 months ago",
        "text": "Everything was top notch. High speed wifi, smart TVs, luxury linens, and the building pool has a wonderful view of the city. Will definitely stay here again."
    },
    {
        "name": "Hanna",
        "location": "Oslo, Norway · 6 years on Airbnb",
        "initial": "H",
        "color": "#3B82F6",
        "rating": 5,
        "time": "5 months ago",
        "text": "Spotless, spacious and flooded with natural light. The kitchen is fully equipped with high quality cookware. Ruchi answered our queries immediately."
    },
    {
        "name": "Omar",
        "location": "Dubai, UAE · 4 years on Airbnb",
        "initial": "O",
        "color": "#6366F1",
        "rating": 5,
        "time": "6 months ago",
        "text": "Booked this for visiting family and they were blown away. The location cannot be beaten—literally connected to Dubai Mall and Metro. Five stars!"
    },
    {
        "name": "Rachel",
        "location": "Edinburgh, UK · 5 years on Airbnb",
        "initial": "R",
        "color": "#F43F5E",
        "rating": 5,
        "time": "6 months ago",
        "text": "Staying at Burj Vista was the highlight of our trip. Watching the Burj Khalifa light up at night from the private balcony with a cup of tea is pure luxury."
    },
    {
        "name": "Daniel",
        "location": "Vancouver, Canada · 4 years on Airbnb",
        "initial": "D",
        "color": "#475569",
        "rating": 5,
        "time": "7 months ago",
        "text": "Outstanding communication, immaculate cleanliness, and unbeatable convenience. Having direct access to Dubai Mall without ever having to step outside into traffic is unmatched."
    },
    {
        "name": "Zaid",
        "location": "Amman, Jordan · 5 years on Airbnb",
        "initial": "Z",
        "color": "#059669",
        "rating": 5,
        "time": "7 months ago",
        "text": "شقة ممتازة وموقع خيالي أمام برج خليفة مباشرة. التعامل مع روتشي كان ممتاز وسريع. تجربة فاخرة تستحق التكرار."
    },
    {
        "name": "Emily",
        "location": "Melbourne, Australia · 4 years on Airbnb",
        "initial": "E",
        "color": "#8B5CF6",
        "rating": 5,
        "time": "8 months ago",
        "text": "Can’t recommend this place enough! Clean, quiet, stylish, and in the heart of Downtown. Thank you Ruchi for being such a wonderful and accommodating host!"
    }
];

const PROPERTIES_DATA = {
    'paramount': {
        id: 'paramount',
        name: 'Burj View & Infinity Pool | 7 min to Dubai Mall',
        tagline: '🏊‍♂️ Rooftop Infinity Pool · Unobstructed Burj Khalifa View',
        location: 'Al Mustaqbal Street, Business Bay / Downtown Dubai, UAE',
        propertyType: 'Entire rental unit in Dubai, United Arab Emirates',
        specs: '4 guests · 1 bedroom · 2 beds · 1.5 bathrooms',
        priceNight: 240,
        maxGuests: 4,
        currency: 'USD',
        priceAed: 880,
        rating: '5.0',
        reviewsCount: 19,
        badge: 'Guest favourite',
        hostName: 'Ruchi',
        hostSubtitle: 'Superhost · 2 months hosting',
        airbnbUrl: PARAMOUNT_AIRBNB_URL,
        photos: PARAMOUNT_PHOTOS,
        rareFind: true,
        highlight1Title: 'Top 10% of homes',
        highlight1Desc: 'This home is highly ranked based on ratings, reviews and reliability.',
        highlight2Title: 'In Business Bay, near the Burj Khalifa',
        highlight2Desc: "About a 15-min walk to the Burj Khalifa, in Business Bay's canal-side district near Downtown Dubai",
        highlight3Title: '64th-floor rooftop infinity pool',
        highlight3Desc: 'A rooftop infinity pool on the 64th floor with views of the Downtown skyline, open daily',
        highlight4Title: 'Spotless with views guests love',
        highlight4Desc: 'Guests highlight the cleanliness, the Burj Khalifa views from the balcony, and a responsive host',
        reviews: PARAMOUNT_REVIEWS_LIST,
        lat: 25.1932111,
        lng: 55.2654858,
        googleMapsUrl: 'https://www.google.com/maps/search/paramount+building+dubai/@25.1932111,55.2654858,14z?entry=ttu&g_ep=EgoyMDI2MTExMC4wIKXMDSoASAFQAw%3D%3D',
        googleMapsEmbedUrl: 'https://maps.google.com/maps?q=Paramount+Hotel+Midtown,+Business+Bay,+Dubai&ll=25.1932111,55.2654858&z=14&t=&ie=UTF8&iwloc=&output=embed',
        neighborhoodTitle: 'Business Bay & Downtown Dubai',
        neighborhoodDesc: 'Situated in Paramount Tower Hotel & Residences Midtown on Al Mustaqbal Street, Business Bay. Just a 7-minute drive to Dubai Mall and Burj Khalifa, with rapid access to Sheikh Zayed Road, Dubai Canal Promenade, and fine dining hotspots throughout Downtown and DIFC.',
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
        propertyType: 'Entire rental unit in Dubai, United Arab Emirates',
        specs: '4 guests · 1 bedroom · 3 beds · 1.5 bathrooms',
        priceNight: 265,
        maxGuests: 4,
        currency: 'USD',
        priceAed: 975,
        rating: '5.0',
        reviewsCount: 16,
        badge: 'Guest favourite',
        hostName: 'Ruchi',
        hostSubtitle: 'Superhost · 2 months hosting',
        airbnbUrl: BURJ_VISTA_AIRBNB_URL,
        photos: BURJ_VISTA_PHOTOS,
        priceBelowAverage: true,
        highlight1Title: 'Top 10% of homes',
        highlight1Desc: 'This home is highly ranked based on ratings, reviews and reliability.',
        highlight2Title: 'In Downtown Dubai',
        highlight2Desc: 'About a 5-min walk to Burj Khalifa, with Dubai Mall connected by an internal AC skybridge.',
        highlight3Title: 'Private balcony with Burj Khalifa view',
        highlight3Desc: 'A private balcony faces the Burj Khalifa, with a full kitchen, pool, and gym in the building.',
        highlight4Title: 'Loved for the view and the hosts',
        highlight4Desc: 'Guests highlight the Burj Khalifa view and praise Ruchi as a responsive, flexible host.',
        reviews: BURJ_VISTA_REVIEWS_LIST,
        lat: 25.1984429,
        lng: 55.2707577,
        googleMapsUrl: 'https://www.google.com/maps/place/Burj+Vista+-+Sheikh+Mohammed+bin+Rashid+Blvd+-+Burj+Khalifa+-+Downtown+Dubai+-+Dubai+-+United+Arab+Emirates/@25.1984429,55.2681828,17z/data=!3m1!4b1!4m6!3m5!1s0x3e5f42808f1ff1f9:0x881a49d26650dce8!8m2!3d25.1984429!4d55.2707577!16s%2Fg%2F11f147nrcy?entry=ttu&g_ep=EgoyMDI2MTExMC4wIKXMDSoASAFQAw%3D%3D',
        googleMapsEmbedUrl: 'https://maps.google.com/maps?q=Burj+Vista,+Sheikh+Mohammed+bin+Rashid+Blvd,+Downtown+Dubai&ll=25.1984429,55.2707577&z=16&t=&ie=UTF8&iwloc=&output=embed',
        neighborhoodTitle: 'Downtown Dubai',
        neighborhoodDesc: 'Located along Sheikh Mohammed Bin Rashid Boulevard, Burj Vista is directly connected to Dubai Mall and the Burj Khalifa / Dubai Metro station via an internal air-conditioned sky bridge. You are mere steps away from the Dubai Fountain, Dubai Opera, and Downtown’s world-renowned dining and shopping destinations.',
        aboutThisSpace: `Wake up to sweeping views of the Burj Khalifa and the Dubai Fountain from this luxurious one-bedroom apartment in the heart of Downtown Dubai.

Enjoy five-star building amenities and a stylish, comfortable interior, directly connected to Dubai Mall and Dubai Metro through an internal AC skybridge. Perfect for couples, families, or business travellers looking for comfort and convenience in one of the city's most iconic addresses.`,
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
            "2 sofa beds, sleeping up to 4 additional guests",
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
    toast.style.display = 'flex';
    const msgEl = document.getElementById('toastMsg') || toast.querySelector('span');
    if (msgEl) msgEl.innerText = message || 'Link copied to clipboard';
    toast.classList.add('show');
    if (window._toastTimeout) clearTimeout(window._toastTimeout);
    window._toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (!toast.classList.contains('show')) toast.style.display = 'none';
        }, 300);
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

// -------------------------------------------------------------
// AIRBNB CAROUSEL SLIDER ENGINE (Exact Airbnb Image 1 & 2 Match)
// -------------------------------------------------------------
function scrollAirbnbCarousel(carouselId, direction) {
    const el = document.getElementById(carouselId);
    if (!el) return;
    const scrollAmount = direction === 'left' ? -280 : 280;
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
}

function updateAirbnbCarouselNav(carouselId, prevWrapId, nextWrapId) {
    const el = document.getElementById(carouselId);
    const prev = document.getElementById(prevWrapId);
    const next = document.getElementById(nextWrapId);
    if (!el) return;

    // Tolerance for subpixel scroll rendering
    const atStart = el.scrollLeft <= 8;
    const atEnd = (el.scrollLeft + el.clientWidth) >= (el.scrollWidth - 10);

    if (prev) {
        prev.style.display = atStart ? 'none' : 'flex';
    }
    if (next) {
        next.style.display = atEnd ? 'none' : 'flex';
    }
}

function openPropertyDetail(propId) {
    const data = PROPERTIES_DATA[propId];
    if (!data) return;

    window.currentPropertyId = propId;
    const pageContainer = document.getElementById('propertyDetailPage');
    const mainPage = document.getElementById('mainPage');
    if (!pageContainer || !mainPage) return;

    // Desktop 5-Photo Hero Grid Matching Image 2 & Image 4
    const desktopPhotoGridHtml = `
        <div id="pdpPhotos" class="desktop-photo-grid-wrap desktop-only-grid" style="display: none; position: relative; margin-bottom: 24px; border-radius: 14px; overflow: hidden; cursor: pointer; height: 440px;" onclick="openPhotoGalleryModal('${propId}')">
            <div style="display: grid; grid-template-columns: 2fr 1fr 1fr; grid-template-rows: 1fr 1fr; gap: 8px; height: 100%;">
                <img src="${data.photos[0]}" alt="${data.name}" style="grid-column: 1 / 2; grid-row: 1 / 3; width: 100%; height: 100%; object-fit: cover; transition: opacity 0.2s;" onmouseover="this.style.opacity=0.92" onmouseout="this.style.opacity=1">
                <img src="${data.photos[1]}" alt="${data.name}" style="grid-column: 2 / 3; grid-row: 1 / 2; width: 100%; height: 100%; object-fit: cover; transition: opacity 0.2s;" onmouseover="this.style.opacity=0.92" onmouseout="this.style.opacity=1">
                <img src="${data.photos[2]}" alt="${data.name}" style="grid-column: 3 / 4; grid-row: 1 / 2; width: 100%; height: 100%; object-fit: cover; transition: opacity 0.2s;" onmouseover="this.style.opacity=0.92" onmouseout="this.style.opacity=1">
                <img src="${data.photos[3]}" alt="${data.name}" style="grid-column: 2 / 3; grid-row: 2 / 3; width: 100%; height: 100%; object-fit: cover; transition: opacity 0.2s;" onmouseover="this.style.opacity=0.92" onmouseout="this.style.opacity=1">
                <img src="${data.photos[4] || data.photos[0]}" alt="${data.name}" style="grid-column: 3 / 4; grid-row: 2 / 3; width: 100%; height: 100%; object-fit: cover; transition: opacity 0.2s;" onmouseover="this.style.opacity=0.92" onmouseout="this.style.opacity=1">
            </div>
            <button class="button-secondary" onclick="event.stopPropagation(); openPhotoGalleryModal('${propId}')" style="position: absolute; bottom: 20px; right: 20px; background: #FFFFFF; border: 1px solid #222222; border-radius: 8px; padding: 7px 15px; font-weight: 600; font-size: 14px; color: #222222; display: flex; align-items: center; gap: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.18); cursor: pointer;">
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

    // Exact data matching reference images
    const isParamount = (propId === 'paramount');
    
    // Price display matching exact Airbnb reference images
    const priceDisplay = isParamount ? '₹51,314' : '₹56,379';
    const strikethroughPrice = isParamount ? '' : '₹63,772';
    const reviewsCount = isParamount ? 19 : 16;
    const ratingDisplay = '5.0';

    // 4 Highlights Data (Directly defined so never undefined)
    const h1Title = 'Top 10% of homes';
    const h1Desc = 'This home is highly ranked based on ratings, reviews and reliability.';

    const h2Title = isParamount ? 'In Business Bay, near the Burj Khalifa' : 'In Downtown Dubai';
    const h2Desc = isParamount ? "About a 15-min walk to the Burj Khalifa, in Business Bay's canal-side district near Downtown Dubai" : 'About a 5-min walk to Burj Khalifa, with Dubai Mall connected by an internal AC skybridge.';

    const h3Title = isParamount ? '64th-floor rooftop infinity pool' : 'Private balcony with Burj Khalifa view';
    const h3Desc = isParamount ? 'A rooftop infinity pool on the 64th floor with views of the Downtown skyline, open daily' : 'A private balcony faces the Burj Khalifa, with a full kitchen, pool, and gym in the building.';

    const h4Title = isParamount ? 'Spotless with views guests love' : 'Loved for the view and the hosts';
    const h4Desc = isParamount ? 'Guests highlight the cleanliness, the Burj Khalifa views from the balcony, and a responsive host' : 'Guests highlight the Burj Khalifa view and praise Ruchi as a responsive, flexible host.';

    const specsText = isParamount ? '4 guests · 1 bedroom · 2 beds · 1.5 bathrooms' : '4 guests · 1 bedroom · 3 beds · 1.5 bathrooms';

    const reviews = data.reviews || [];

    pageContainer.innerHTML = `
        <!-- Sticky Secondary Navigation Bar (Exact Image 4 Match) -->
        <div id="stickyPdpSubNav" class="sticky-pdp-sub-nav">
            <div class="container" style="max-width: 1120px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; padding: 14px 24px;">
                <div style="display: flex; gap: 28px; font-size: 14px; font-weight: 600; color: #222222;">
                    <a href="#pdpPhotos" onclick="window.scrollTo({top: 0, behavior: 'smooth'}); return false;" style="color: inherit; text-decoration: none; padding: 4px 0;">Photos</a>
                    <a href="#pdpAmenities" onclick="document.getElementById('pdpAmenitiesSection').scrollIntoView({behavior: 'smooth'}); return false;" style="color: inherit; text-decoration: none; padding: 4px 0;">Amenities</a>
                    <a href="#pdpReviews" onclick="document.getElementById('pdpReviewsSection').scrollIntoView({behavior: 'smooth'}); return false;" style="color: inherit; text-decoration: none; padding: 4px 0;">Reviews</a>
                    <a href="#pdpLocation" onclick="document.getElementById('pdpLocationSection').scrollIntoView({behavior: 'smooth'}); return false;" style="color: inherit; text-decoration: none; padding: 4px 0;">Location</a>
                </div>
                <div style="display: flex; align-items: center; gap: 18px;">
                    <div style="text-align: right;">
                        <div style="font-size: 15px; font-weight: 700; color: #222222;">
                            ${strikethroughPrice ? `<span style="font-size: 13px; color: #717171; text-decoration: line-through; margin-right: 6px;">${strikethroughPrice}</span>` : ''}
                            ${priceDisplay} <span style="font-size: 13px; font-weight: 400; color: #717171;">for 2 nights</span>
                        </div>
                        <div style="font-size: 12px; font-weight: 600; color: #222222; margin-top: 1px;" onclick="openReviewsModal('${propId}')" style="cursor: pointer;">
                            <i class="fa-solid fa-star" style="color: #FF385C; font-size: 11px;"></i> ${ratingDisplay} · <span style="text-decoration: underline;">${reviewsCount} reviews</span>
                        </div>
                    </div>
                    <a href="${data.airbnbUrl}" target="_blank" style="background: #E51D56; color: #FFFFFF; font-weight: 600; font-size: 14px; padding: 10px 24px; border-radius: 8px; text-decoration: none; border: none; cursor: pointer; transition: background 0.2s;">
                        Reserve
                    </a>
                </div>
            </div>
        </div>

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

        <!-- Full Page Top Header (Desktop Only) -->
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
            
            <!-- 1. Title Header Row (Exact Image 2 & 4 Match) -->
            <div class="desktop-pdp-header" style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 20px;">
                <div>
                    <h1 style="font-size: 26px; font-weight: 600; color: #222222; margin: 0; line-height: 1.25;">${data.name}</h1>
                </div>
                <div style="display: flex; gap: 20px; font-size: 14px; font-weight: 600; text-decoration: underline; cursor: pointer; color: #222222; flex-shrink: 0;">
                    <span onclick="shareProperty('${propId}')" style="display: flex; align-items: center; gap: 8px;"><i class="fa-solid fa-arrow-up-from-bracket" style="font-size: 13px;"></i> Share</span>
                    <span onclick="toggleSaveProperty(this)" style="display: flex; align-items: center; gap: 8px;"><i class="fa-solid fa-heart" style="font-size: 14px; color: #FF385C;"></i> Saved</span>
                </div>
            </div>

            <!-- 2. Photo Grid & Count -->
            ${desktopPhotoGridHtml}

            <!-- Two-Column Body Layout (Exact Airbnb Alignment - Starts DIRECTLY with Entire rental unit...) -->
            <div class="detail-body-layout" style="display: grid; grid-template-columns: 1fr 370px; gap: 80px; align-items: start; margin-top: 32px;">
                
                <!-- Left Main Column (From Entire rental unit down to Spotless with views...) -->
                <div class="detail-left-col">

                    <!-- Line 1 & Line 2: Entire rental unit & Specs (Exact Image 1 Match) -->
                    <div style="margin-bottom: 24px;">
                        <h2 style="font-size: 22px; font-weight: 600; color: #222222; margin: 0 0 4px; line-height: 1.25;">
                            Entire rental unit in Dubai, United Arab Emirates
                        </h2>
                        <div style="font-size: 16px; color: #222222; font-weight: 400;">
                            ${specsText}
                        </div>
                    </div>

                    <!-- Line 3: Guest Favourite Card (Exact Image 1 Match) -->
                    <div class="guest-favourite-card" style="display: flex; align-items: center; justify-content: space-between; border: 1px solid #DDDDDD; border-radius: 12px; padding: 16px 24px; margin-bottom: 32px; background: #FFFFFF; gap: 16px;">
                        <!-- Left: Golden Laurel Wreath + Title -->
                        <div style="display: flex; align-items: center; gap: 8px; flex-shrink: 0;">
                            <!-- Left Laurel Branch -->
                            <svg viewBox="0 0 28 48" width="24" height="42" style="display: block;">
                                <path d="M22.5 42C20.5 40.5 18 38 16 35C13.5 31.5 11.5 27 11 22C10.5 17 11.5 12 14 7.5C16.5 3.5 20.5 1 21.5 0.5C21.8 0.3 22.2 0.5 22.4 0.8C22.6 1.1 22.5 1.5 22.2 1.7C20.5 3.2 18 6 16.5 9.5C15 13 14.5 17 15 21C15.5 25 17 28.5 19.5 31.5C21.5 34 24 36 25.5 37.5C25.8 37.8 25.8 38.2 25.5 38.5C25.2 38.8 24.8 38.8 24.5 38.5L22.5 42Z" fill="#C49746"/>
                                <ellipse cx="22" cy="7" rx="3.5" ry="6" transform="rotate(-30 22 7)" fill="#C49746"/>
                                <ellipse cx="17" cy="15" rx="3.5" ry="6.5" transform="rotate(-35 17 15)" fill="#C49746"/>
                                <ellipse cx="15" cy="24" rx="3.5" ry="6.5" transform="rotate(-25 15 24)" fill="#C49746"/>
                                <ellipse cx="18" cy="33" rx="3.5" ry="6" transform="rotate(-15 18 33)" fill="#C49746"/>
                                <ellipse cx="23" cy="40" rx="3" ry="5.5" transform="rotate(5 23 40)" fill="#C49746"/>
                            </svg>
                            
                            <div style="font-size: 16px; font-weight: 700; color: #222222; text-align: center; line-height: 1.15;">
                                Guest<br>favourite
                            </div>
                            
                            <!-- Right Laurel Branch (Mirrored) -->
                            <svg viewBox="0 0 28 48" width="24" height="42" style="display: block; transform: scaleX(-1);">
                                <path d="M22.5 42C20.5 40.5 18 38 16 35C13.5 31.5 11.5 27 11 22C10.5 17 11.5 12 14 7.5C16.5 3.5 20.5 1 21.5 0.5C21.8 0.3 22.2 0.5 22.4 0.8C22.6 1.1 22.5 1.5 22.2 1.7C20.5 3.2 18 6 16.5 9.5C15 13 14.5 17 15 21C15.5 25 17 28.5 19.5 31.5C21.5 34 24 36 25.5 37.5C25.8 37.8 25.8 38.2 25.5 38.5C25.2 38.8 24.8 38.8 24.5 38.5L22.5 42Z" fill="#C49746"/>
                                <ellipse cx="22" cy="7" rx="3.5" ry="6" transform="rotate(-30 22 7)" fill="#C49746"/>
                                <ellipse cx="17" cy="15" rx="3.5" ry="6.5" transform="rotate(-35 17 15)" fill="#C49746"/>
                                <ellipse cx="15" cy="24" rx="3.5" ry="6.5" transform="rotate(-25 15 24)" fill="#C49746"/>
                                <ellipse cx="18" cy="33" rx="3.5" ry="6" transform="rotate(-15 18 33)" fill="#C49746"/>
                                <ellipse cx="23" cy="40" rx="3" ry="5.5" transform="rotate(5 23 40)" fill="#C49746"/>
                            </svg>
                        </div>

                        <!-- Center: Description -->
                        <div style="font-size: 15px; font-weight: 600; color: #222222; line-height: 1.35; padding: 0 16px; flex: 1;">
                            One of the most loved homes on Airbnb, according to guests
                        </div>

                        <!-- Right: Rating & Review Count -->
                        <div style="display: flex; align-items: center; gap: 16px; flex-shrink: 0; cursor: pointer;" onclick="openReviewsModal('${propId}')">
                            <div style="text-align: center;">
                                <div style="font-size: 22px; font-weight: 800; color: #222222; line-height: 1;">${ratingDisplay}</div>
                                <div style="font-size: 9px; color: #222222; letter-spacing: 2px; margin-top: 4px;">★★★★★</div>
                            </div>
                            <div style="width: 1px; height: 38px; background: #DDDDDD;"></div>
                            <div style="text-align: center;">
                                <div style="font-size: 22px; font-weight: 800; color: #222222; line-height: 1; text-decoration: underline;">${reviewsCount}</div>
                                <div style="font-size: 12px; font-weight: 600; color: #717171; margin-top: 4px;">Reviews</div>
                            </div>
                        </div>
                    </div>

                    <!-- The 4 Highlights List (Exact Image 1 Match) -->
                    <div class="highlights-list-airbnb" style="display: flex; flex-direction: column; gap: 24px; padding-bottom: 28px; border-bottom: 1px solid #EBEBEB; margin-bottom: 24px;">
                        <!-- Highlight 1: Top 10% of homes -->
                        <div style="display: flex; gap: 20px; align-items: flex-start;">
                            <div style="width: 32px; font-size: 24px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; line-height: 1;">
                                🏆
                            </div>
                            <div>
                                <div style="font-size: 16px; font-weight: 600; color: #222222;">${h1Title}</div>
                                <div style="font-size: 14px; color: #717171; margin-top: 2px; line-height: 1.4;">${h1Desc}</div>
                            </div>
                        </div>

                        <!-- Highlight 2: In Business Bay, near Burj Khalifa -->
                        <div style="display: flex; gap: 20px; align-items: flex-start;">
                            <div style="width: 32px; height: 32px; border-radius: 8px; background: #F3F4F6; border: 1px solid #E5E7EB; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="#222222"/>
                                </svg>
                            </div>
                            <div>
                                <div style="font-size: 16px; font-weight: 600; color: #222222;">${h2Title}</div>
                                <div style="font-size: 14px; color: #717171; margin-top: 2px; line-height: 1.4;">${h2Desc}</div>
                            </div>
                        </div>

                        <!-- Highlight 3: 64th-floor rooftop pool -->
                        <div style="display: flex; gap: 20px; align-items: flex-start;">
                            <div style="width: 32px; height: 32px; border-radius: 8px; background: ${isParamount ? '#E0F2FE' : '#F3F4F6'}; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 18px;">
                                ${isParamount ? '🏊‍♂️' : '🚪'}
                            </div>
                            <div>
                                <div style="font-size: 16px; font-weight: 600; color: #222222;">${h3Title}</div>
                                <div style="font-size: 14px; color: #717171; margin-top: 2px; line-height: 1.4;">${h3Desc}</div>
                            </div>
                        </div>

                        <!-- Highlight 4: Spotless with views guests love -->
                        <div style="display: flex; gap: 20px; align-items: flex-start;">
                            <div style="width: 32px; height: 32px; border-radius: 8px; background: #FEF3C7; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 18px;">
                                ⭐
                            </div>
                            <div>
                                <div style="font-size: 16px; font-weight: 600; color: #222222;">${h4Title}</div>
                                <div style="font-size: 14px; color: #717171; margin-top: 2px; line-height: 1.4;">${h4Desc}</div>
                            </div>
                        </div>
                    </div>

                    <!-- Host Line: Hosted by Ruchi with Superhost Badge -->
                    <div class="host-line-airbnb" style="display: flex; align-items: center; gap: 16px; padding-bottom: 24px; border-bottom: 1px solid #EBEBEB; margin-bottom: 32px;">
                        <div style="position: relative; width: 44px; height: 44px; flex-shrink: 0;">
                            <img src="assets/ruchi_cropped.jpg" alt="Ruchi" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
                            <div style="position: absolute; bottom: -2px; right: -2px; background: #FF385C; color: #FFFFFF; width: 16px; height: 16px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 9px; border: 2px solid #FFFFFF;" title="Superhost">
                                <i class="fa-solid fa-award"></i>
                            </div>
                        </div>
                        <div>
                            <h3 style="font-size: 16px; font-weight: 600; color: #222222; margin: 0; line-height: 1.2;">Hosted by Ruchi</h3>
                            <div style="font-size: 14px; color: #717171; margin-top: 3px;">Superhost · 2 months hosting</div>
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

                    <!-- Amenities Section ("What this place offers" matching Airbnb) -->
                    <div id="pdpAmenitiesSection" style="margin-bottom: 32px; padding-bottom: 32px; border-bottom: 1px solid #EBEBEB;">
                        <h3 style="font-size: 22px; font-weight: 700; color: #222222; margin-bottom: 24px;">What this place offers</h3>
                        
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; font-size: 16px; color: #222222; margin-bottom: 24px;">
                            <div style="display: flex; align-items: center; gap: 16px;"><i class="fa-solid fa-water-ladder" style="width: 24px; font-size: 20px; color: #222;"></i> <span>${isParamount ? '64th Floor Rooftop Infinity Pool' : 'Residences Swimming Pool with Burj View'}</span></div>
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

                    <!-- Calendar / Dates Section (Exact Image 4 Match) -->
                    <div id="pdpCalendarSection" style="margin-bottom: 32px; padding-bottom: 24px;">
                        <div style="margin-bottom: 20px;">
                            <h3 style="font-size: 22px; font-weight: 700; color: #222222; margin: 0 0 4px;">2 nights in Dubai</h3>
                            <p style="font-size: 14px; color: #717171; margin: 0;">14 Dec 2026 – 16 Dec 2026</p>
                        </div>

                        <!-- 2 Months Side by Side Calendar matching Image 4 -->
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 32px;">
                            <!-- Month 1: November 2026 -->
                            <div>
                                <div style="font-weight: 700; font-size: 15px; color: #222222; text-align: center; margin-bottom: 16px;">November 2026</div>
                                <div style="display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; font-size: 12px; color: #717171; margin-bottom: 10px; font-weight: 600;">
                                    <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                                </div>
                                <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px; text-align: center; font-size: 13px; font-weight: 500; color: #222222;">
                                    <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span>
                                    <span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span>
                                    <span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span>
                                    <span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span>
                                    <span>29</span><span>30</span>
                                </div>
                            </div>

                            <!-- Month 2: December 2026 -->
                            <div>
                                <div style="font-weight: 700; font-size: 15px; color: #222222; text-align: center; margin-bottom: 16px;">December 2026</div>
                                <div style="display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; font-size: 12px; color: #717171; margin-bottom: 10px; font-weight: 600;">
                                    <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                                </div>
                                <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px; text-align: center; font-size: 13px; font-weight: 500; color: #222222;">
                                    <span></span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
                                    <span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span>
                                    <span>13</span>
                                    <span style="background: #222222; color: #FFFFFF; border-radius: 50%; font-weight: 700; width: 28px; height: 28px; display: inline-flex; align-items: center; justify-content: center; margin: 0 auto;">14</span>
                                    <span style="background: #F7F7F7; color: #222222; border-radius: 50%; font-weight: 700; width: 28px; height: 28px; display: inline-flex; align-items: center; justify-content: center; margin: 0 auto;">15</span>
                                    <span style="background: #222222; color: #FFFFFF; border-radius: 50%; font-weight: 700; width: 28px; height: 28px; display: inline-flex; align-items: center; justify-content: center; margin: 0 auto;">16</span>
                                    <span>17</span><span>18</span><span>19</span>
                                    <span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span>
                                    <span>27</span><span>28</span><span>29</span><span>30</span><span>31</span>
                                </div>
                            </div>
                        </div>

                        <!-- Calendar Footer (Exact Image 4 Match) -->
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px; font-size: 14px;">
                            <span style="color: #222222; font-size: 18px; cursor: pointer;" title="Keyboard shortcuts"><i class="fa-regular fa-keyboard"></i></span>
                            <button onclick="alert('Select dates directly on Airbnb reservation');" style="background: none; border: none; font-size: 14px; font-weight: 600; color: #222222; text-decoration: underline; cursor: pointer;">Clear dates</button>
                        </div>
                    </div>

                </div> <!-- END detail-left-col -->

                <!-- Right Column Sticky Reservation Booking Engine (Exact Image 1 & 4 Match) -->
                <div class="detail-right-col" style="position: sticky; top: 100px;">
                    
                    <!-- Top Pill Card (Exact Image 1 Match) -->
                    ${isParamount ? `
                        <div class="rare-find-badge" style="background: #FFFFFF; border: 1px solid #DDDDDD; border-radius: 12px; padding: 14px 20px; margin-bottom: 20px; display: flex; align-items: center; gap: 12px; box-shadow: 0 2px 6px rgba(0,0,0,0.03);">
                            <span style="font-size: 18px; line-height: 1;">💎</span>
                            <span style="font-size: 14px; color: #222222;"><strong style="font-weight: 700;">Rare find!</strong> This place is usually booked</span>
                        </div>
                    ` : `
                        <div class="price-below-average-badge" style="background: #FFFFFF; border: 1px solid #DDDDDD; border-radius: 12px; padding: 14px 20px; margin-bottom: 20px; display: flex; align-items: center; gap: 12px; box-shadow: 0 2px 6px rgba(0,0,0,0.03);">
                            <span style="font-size: 18px; line-height: 1;">🏷️</span>
                            <span style="font-size: 14px; color: #222222;">Your price is below the 60-day average</span>
                        </div>
                    `}

                    <!-- Sticky Booking Card -->
                    <div class="booking-card-airbnb" style="border: 1px solid #DDDDDD; border-radius: 16px; padding: 24px; box-shadow: 0 6px 20px rgba(0,0,0,0.08); background: #FFFFFF;">
                        
                        <!-- Nightly Price Header -->
                        <div style="display: flex; align-items: baseline; gap: 8px; margin-bottom: 24px;">
                            ${strikethroughPrice ? `<span style="font-size: 18px; color: #717171; text-decoration: line-through;">${strikethroughPrice}</span>` : ''}
                            <span style="font-size: 24px; font-weight: 800; color: #222222;">${priceDisplay}</span>
                            <span style="font-size: 16px; color: #717171;">for 2 nights</span>
                        </div>

                        <!-- Date Picker / Guest Selector Box -->
                        <div style="border: 1px solid #B0B0B0; border-radius: 8px; overflow: hidden; margin-bottom: 16px;">
                            <div style="display: grid; grid-template-columns: 1fr 1fr; border-bottom: 1px solid #B0B0B0;">
                                <div style="padding: 10px 12px; border-right: 1px solid #B0B0B0; cursor: pointer;">
                                    <div style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: #222222; letter-spacing: 0.5px;">Check-in</div>
                                    <div style="font-size: 14px; color: #222222; margin-top: 2px;">12/14/2026</div>
                                </div>
                                <div style="padding: 10px 12px; cursor: pointer;">
                                    <div style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: #222222; letter-spacing: 0.5px;">Checkout</div>
                                    <div style="font-size: 14px; color: #222222; margin-top: 2px;">12/16/2026</div>
                                </div>
                            </div>
                            <div style="padding: 10px 12px; display: flex; justify-content: space-between; align-items: center; cursor: pointer;">
                                <div>
                                    <div style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: #222222; letter-spacing: 0.5px;">Guests</div>
                                    <div style="font-size: 14px; color: #222222; margin-top: 2px;">1 guest</div>
                                </div>
                                <i class="fa-solid fa-chevron-down" style="font-size: 13px; color: #222222;"></i>
                            </div>
                        </div>

                        <!-- Free Cancellation Banner -->
                        <div style="background: #F7F7F7; border-radius: 8px; padding: 12px; text-align: center; font-size: 13px; font-weight: 600; color: #222222; margin-bottom: 16px;">
                            Free cancellation before 30 November
                        </div>

                        <!-- Reserve Button -->
                        <a href="${data.airbnbUrl}" target="_blank" style="display: block; width: 100%; text-align: center; background: #E51D56; color: #FFFFFF; font-weight: 700; font-size: 16px; padding: 14px; border-radius: 8px; text-decoration: none; transition: background 0.2s; box-shadow: 0 2px 4px rgba(229,29,86,0.2);">
                            Reserve
                        </a>

                        <div style="text-align: center; font-size: 14px; color: #717171; margin-top: 14px;">
                            You won't be charged yet
                        </div>
                    </div>

                    <!-- Report Listing Link (Exact Image 1 Match) -->
                    <div style="text-align: center; margin-top: 24px;">
                        <a href="#" onclick="alert('This listing is verified by True Haven.'); return false;" style="font-size: 14px; color: #717171; text-decoration: underline; display: inline-flex; align-items: center; gap: 8px;">
                            <i class="fa-solid fa-flag" style="font-size: 13px;"></i> Report this listing
                        </a>
                    </div>
                </div>

            </div> <!-- END detail-body-layout (Two-Column Section Ends Here) -->

            <!-- Full-Width Divider Line (Exact Image 4 Match) -->
            <div style="height: 1px; background: #EBEBEB; margin: 48px 0;"></div>

            <!-- Full-Width Reviews Section (Grand Reviews Hero & Breakdown - Exact Image 1 & 4 Match) -->
            <div id="pdpReviewsSection" style="margin-bottom: 48px; padding-bottom: 40px; border-bottom: 1px solid #EBEBEB; width: 100%;">
                
                <!-- Laurel Wreath Hero Centered (Image 1 & 4) -->
                <div style="text-align: center; margin-bottom: 28px;">
                    <div style="display: flex; align-items: center; justify-content: center; gap: 14px; margin-bottom: 10px;">
                        <svg viewBox="0 0 40 60" width="36" height="54" style="flex-shrink: 0;">
                            <defs>
                                <linearGradient id="laurelGoldLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stop-color="#E2B148" />
                                    <stop offset="50%" stop-color="#F9D976" />
                                    <stop offset="100%" stop-color="#B8860B" />
                                </linearGradient>
                            </defs>
                            <path d="M 28 55 C 16 42 10 24 22 5" fill="none" stroke="url(#laurelGoldLeft)" stroke-width="2.5" stroke-linecap="round" />
                            <ellipse cx="27" cy="50" rx="3.5" ry="6.5" transform="rotate(-30 27 50)" fill="url(#laurelGoldLeft)" />
                            <ellipse cx="20" cy="42" rx="3.5" ry="7" transform="rotate(-40 20 42)" fill="url(#laurelGoldLeft)" />
                            <ellipse cx="14" cy="32" rx="3.5" ry="7.5" transform="rotate(-35 14 32)" fill="url(#laurelGoldLeft)" />
                            <ellipse cx="12" cy="22" rx="3.5" ry="7.5" transform="rotate(-25 12 22)" fill="url(#laurelGoldLeft)" />
                            <ellipse cx="15" cy="12" rx="3.2" ry="7" transform="rotate(-10 15 12)" fill="url(#laurelGoldLeft)" />
                            <ellipse cx="22" cy="5" rx="3" ry="6" transform="rotate(15 22 5)" fill="url(#laurelGoldLeft)" />
                        </svg>
                        <div style="font-size: 72px; font-weight: 800; color: #222222; line-height: 1; letter-spacing: -1px;">${ratingDisplay}</div>
                        <svg viewBox="0 0 40 60" width="36" height="54" style="flex-shrink: 0; transform: scaleX(-1);">
                            <defs>
                                <linearGradient id="laurelGoldRight" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stop-color="#E2B148" />
                                    <stop offset="50%" stop-color="#F9D976" />
                                    <stop offset="100%" stop-color="#B8860B" />
                                </linearGradient>
                            </defs>
                            <path d="M 28 55 C 16 42 10 24 22 5" fill="none" stroke="url(#laurelGoldRight)" stroke-width="2.5" stroke-linecap="round" />
                            <ellipse cx="27" cy="50" rx="3.5" ry="6.5" transform="rotate(-30 27 50)" fill="url(#laurelGoldRight)" />
                            <ellipse cx="20" cy="42" rx="3.5" ry="7" transform="rotate(-40 20 42)" fill="url(#laurelGoldRight)" />
                            <ellipse cx="14" cy="32" rx="3.5" ry="7.5" transform="rotate(-35 14 32)" fill="url(#laurelGoldRight)" />
                            <ellipse cx="12" cy="22" rx="3.5" ry="7.5" transform="rotate(-25 12 22)" fill="url(#laurelGoldRight)" />
                            <ellipse cx="15" cy="12" rx="3.2" ry="7" transform="rotate(-10 15 12)" fill="url(#laurelGoldRight)" />
                            <ellipse cx="22" cy="5" rx="3" ry="6" transform="rotate(15 22 5)" fill="url(#laurelGoldRight)" />
                        </svg>
                    </div>
                    <div style="font-size: 22px; font-weight: 700; color: #222222; margin-bottom: 6px;">Guest favourite</div>
                    <div style="font-size: 15px; color: #717171; max-width: 480px; margin: 0 auto 6px; line-height: 1.45;">
                        This home is in the <strong style="color: #222222; font-weight: 700;">top 10%</strong> of eligible listings based on ratings, reviews and reliability
                    </div>
                    <a href="#" onclick="openReviewsModal('${propId}'); return false;" style="font-size: 13px; color: #717171; text-decoration: underline;">How reviews work</a>
                </div>

                <!-- 7-Column Rating Breakdown Grid (Exact Image 1 & 4 Match: Full Width Fit to Screen) -->
                <div class="rating-breakdown-7cols">
                    <!-- Overall rating -->
                    <div class="rating-col-item">
                        <div style="font-size: 13px; font-weight: 600; color: #222222; margin-bottom: 10px;">Overall rating</div>
                        <div style="display: flex; flex-direction: column; gap: 4px;">
                            <div style="display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 600; color: #717171;">
                                <span style="width: 8px;">5</span>
                                <div style="flex: 1; height: 4px; background: #EBEBEB; border-radius: 2px; overflow: hidden;">
                                    <div style="width: 100%; height: 100%; background: #222222;"></div>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 600; color: #717171;">
                                <span style="width: 8px;">4</span>
                                <div style="flex: 1; height: 4px; background: #EBEBEB; border-radius: 2px;"></div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 600; color: #717171;">
                                <span style="width: 8px;">3</span>
                                <div style="flex: 1; height: 4px; background: #EBEBEB; border-radius: 2px;"></div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 600; color: #717171;">
                                <span style="width: 8px;">2</span>
                                <div style="flex: 1; height: 4px; background: #EBEBEB; border-radius: 2px;"></div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 600; color: #717171;">
                                <span style="width: 8px;">1</span>
                                <div style="flex: 1; height: 4px; background: #EBEBEB; border-radius: 2px;"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Cleanliness -->
                    <div class="rating-col-item">
                        <div style="font-size: 13px; font-weight: 600; color: #222222;">Cleanliness</div>
                        <div style="font-size: 17px; font-weight: 800; color: #222222; margin: 4px 0 12px;">5.0</div>
                        <div style="font-size: 22px; color: #222222;"><i class="fa-solid fa-spray-can-sparkles"></i></div>
                    </div>

                    <!-- Accuracy -->
                    <div class="rating-col-item">
                        <div style="font-size: 13px; font-weight: 600; color: #222222;">Accuracy</div>
                        <div style="font-size: 17px; font-weight: 800; color: #222222; margin: 4px 0 12px;">5.0</div>
                        <div style="font-size: 22px; color: #222222;"><i class="fa-regular fa-circle-check"></i></div>
                    </div>

                    <!-- Check-in -->
                    <div class="rating-col-item">
                        <div style="font-size: 13px; font-weight: 600; color: #222222;">Check-in</div>
                        <div style="font-size: 17px; font-weight: 800; color: #222222; margin: 4px 0 12px;">5.0</div>
                        <div style="font-size: 22px; color: #222222;"><i class="fa-solid fa-key"></i></div>
                    </div>

                    <!-- Communication -->
                    <div class="rating-col-item">
                        <div style="font-size: 13px; font-weight: 600; color: #222222;">Communication</div>
                        <div style="font-size: 17px; font-weight: 800; color: #222222; margin: 4px 0 12px;">5.0</div>
                        <div style="font-size: 22px; color: #222222;"><i class="fa-regular fa-message"></i></div>
                    </div>

                    <!-- Location -->
                    <div class="rating-col-item">
                        <div style="font-size: 13px; font-weight: 600; color: #222222;">Location</div>
                        <div style="font-size: 17px; font-weight: 800; color: #222222; margin: 4px 0 12px;">5.0</div>
                        <div style="font-size: 22px; color: #222222;"><i class="fa-solid fa-map-location-dot"></i></div>
                    </div>

                    <!-- Value -->
                    <div class="rating-col-item">
                        <div style="font-size: 13px; font-weight: 600; color: #222222;">Value</div>
                        <div style="font-size: 17px; font-weight: 800; color: #222222; margin: 4px 0 12px;">5.0</div>
                        <div style="font-size: 22px; color: #222222;"><i class="fa-solid fa-tag"></i></div>
                    </div>
                </div>

                <!-- Divider -->
                <div style="height: 1px; background: #EBEBEB; margin: 32px 0 24px;"></div>

                <!-- Guests mention Pills with Interactive Circular Slide Buttons (Exact Image 1 & 3 Match) -->
                <h3 style="font-size: 18px; font-weight: 700; color: #222222; margin-bottom: 16px;">Guests mention</h3>

                <div class="pdp-mention-carousel-wrapper" style="position: relative; margin-bottom: 28px;">
                    <!-- Left Arrow Button with Gradient Fade -->
                    <div id="pdpMentionPrevWrap" style="display: none; position: absolute; left: 0; top: 0; bottom: 0; width: 64px; background: linear-gradient(to right, #FFFFFF 65%, rgba(255,255,255,0)); z-index: 10; align-items: center; justify-content: flex-start; pointer-events: none;">
                        <button onclick="scrollAirbnbCarousel('pdpMentionPillsScroll', 'left')" style="pointer-events: auto; width: 32px; height: 32px; border-radius: 50%; background: #FFFFFF; border: 1px solid #DDDDDD; box-shadow: 0 2px 6px rgba(0,0,0,0.12); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: transform 0.15s, box-shadow 0.15s;" onmouseover="this.style.transform='scale(1.08)'; this.style.boxShadow='0 4px 10px rgba(0,0,0,0.2)'" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 6px rgba(0,0,0,0.12)'">
                            <i class="fa-solid fa-chevron-left" style="font-size: 11px; color: #222222;"></i>
                        </button>
                    </div>

                    <!-- Scrollable Mention Pills -->
                    <div id="pdpMentionPillsScroll" onscroll="updateAirbnbCarouselNav('pdpMentionPillsScroll', 'pdpMentionPrevWrap', 'pdpMentionNextWrap')" style="display: flex; gap: 10px; overflow-x: auto; padding-bottom: 8px; scrollbar-width: none; -ms-overflow-style: none; scroll-behavior: smooth;">
                        ${isParamount ? `
                            <button class="guest-mention-pill" onclick="openReviewsModal('${propId}')">🏊 Pool 4</button>
                            <button class="guest-mention-pill" onclick="openReviewsModal('${propId}')">🖼️ View 9</button>
                            <button class="guest-mention-pill" onclick="openReviewsModal('${propId}')">🧽 Cleanliness 10</button>
                            <button class="guest-mention-pill" onclick="openReviewsModal('${propId}')">🎁 Hospitality 5</button>
                            <button class="guest-mention-pill" onclick="openReviewsModal('${propId}')">🏷️ Amenities 3</button>
                            <button class="guest-mention-pill" onclick="openReviewsModal('${propId}')">📍 Location 3</button>
                            <button class="guest-mention-pill" onclick="openReviewsModal('${propId}')">🏢 Condition 2</button>
                            <button class="guest-mention-pill" onclick="openReviewsModal('${propId}')">📦 Value 2</button>
                        ` : `
                            <button class="guest-mention-pill" onclick="openReviewsModal('${propId}')">🖼️ View 11</button>
                            <button class="guest-mention-pill" onclick="openReviewsModal('${propId}')">🎁 Hospitality 11</button>
                            <button class="guest-mention-pill" onclick="openReviewsModal('${propId}')">📍 Location 7</button>
                            <button class="guest-mention-pill" onclick="openReviewsModal('${propId}')">🧽 Cleanliness 5</button>
                            <button class="guest-mention-pill" onclick="openReviewsModal('${propId}')">🔢 Check-in 3</button>
                            <button class="guest-mention-pill" onclick="openReviewsModal('${propId}')">🗺️ Nearby 3</button>
                            <button class="guest-mention-pill" onclick="openReviewsModal('${propId}')">👟 Walkability 2</button>
                            <button class="guest-mention-pill" onclick="openReviewsModal('${propId}')">🚆 Getting around 2</button>
                        `}
                    </div>

                    <!-- Right Arrow Button with Gradient Fade -->
                    <div id="pdpMentionNextWrap" style="display: flex; position: absolute; right: 0; top: 0; bottom: 0; width: 64px; background: linear-gradient(to left, #FFFFFF 65%, rgba(255,255,255,0)); z-index: 10; align-items: center; justify-content: flex-end; pointer-events: none;">
                        <button onclick="scrollAirbnbCarousel('pdpMentionPillsScroll', 'right')" style="pointer-events: auto; width: 32px; height: 32px; border-radius: 50%; background: #FFFFFF; border: 1px solid #DDDDDD; box-shadow: 0 2px 6px rgba(0,0,0,0.12); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: transform 0.15s, box-shadow 0.15s;" onmouseover="this.style.transform='scale(1.08)'; this.style.boxShadow='0 4px 10px rgba(0,0,0,0.2)'" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 6px rgba(0,0,0,0.12)'">
                            <i class="fa-solid fa-chevron-right" style="font-size: 11px; color: #222222;"></i>
                        </button>
                    </div>
                </div>

                <!-- 2-Column Full-Width Reviews Preview Grid (Exact Airbnb Match) -->
                <div id="pdpInlineReviewsGrid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 36px 80px; margin-top: 32px; margin-bottom: 32px;">
                    ${reviews.slice(0, 6).map(rev => `
                        <div>
                            <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 12px;">
                                ${rev.avatarUrl ? `
                                    <img src="${rev.avatarUrl}" alt="${rev.name}" style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover; flex-shrink: 0;">
                                ` : `
                                    <div style="width: 48px; height: 48px; border-radius: 50%; background: ${rev.color || '#0F1E36'}; color: #FFF; font-weight: 700; display: flex; align-items: center; justify-content: center; font-size: 17px; flex-shrink: 0;">
                                        ${rev.initial || rev.name.charAt(0)}
                                    </div>
                                `}
                                <div>
                                    <div style="font-size: 16px; font-weight: 700; color: #222222;">${rev.name}</div>
                                    <div style="font-size: 14px; color: #717171;">${rev.location || 'Verified Guest'}</div>
                                </div>
                            </div>
                            <div style="font-size: 12px; font-weight: 600; color: #222222; margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
                                <span>${'★'.repeat(rev.rating || 5)}</span>
                                <span style="color: #717171; font-weight: 400;">· ${rev.time}${rev.stay ? ' · ' + rev.stay : ''}</span>
                            </div>
                            <p style="font-size: 15px; color: #374151; line-height: 1.6; margin: 0;">"${rev.text}"</p>
                        </div>
                    `).join('')}
                </div>

                <button onclick="openReviewsModal('${propId}')" style="border: 1px solid #222222; background: #FFFFFF; color: #222222; border-radius: 8px; padding: 13px 24px; font-weight: 700; font-size: 15px; cursor: pointer; transition: background 0.2s;">
                    Show all ${reviewsCount} reviews
                </button>
            </div>

            <!-- Full-Width Divider Line (Exact Image 4 Match) -->
            <div style="height: 1px; background: #EBEBEB; margin: 48px 0;"></div>

            <!-- Full-Width Location Map ("Where you'll be" - Interactive Google Maps Embed) -->
            <div id="pdpLocationSection" class="property-map-wrapper" style="margin-bottom: 48px; padding-bottom: 40px; border-bottom: 1px solid #EBEBEB; width: 100%;">
                <div style="display: flex; align-items: flex-end; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 20px;">
                    <div>
                        <h3 style="font-size: 22px; font-weight: 700; color: #222222; margin: 0 0 6px;">Where you'll be</h3>
                        <p style="font-size: 15px; color: #717171; margin: 0;">Dubai, United Arab Emirates</p>
                    </div>
                    <a href="${data.googleMapsUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 600; color: #222222; text-decoration: none; border: 1px solid #DDDDDD; border-radius: 999px; padding: 8px 16px; background: #FFFFFF; transition: background 0.2s;">
                        <i class="fa-solid fa-location-dot" style="color: #FF385C;"></i>
                        <span>Open in Google Maps</span>
                        <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 11px; color: #717171;"></i>
                    </a>
                </div>
                
                <div id="propertyMapWrap" style="position: relative; border-radius: 16px; overflow: hidden; height: 460px; border: 1px solid #DDDDDD; background: #E5E7EB; width: 100%;">
                    <!-- Floating Search Pill (Airbnb Match, positioned top-right) -->
                    <div class="map-floating-search-pill" onclick="openMapActivitiesModal('${propId}')" style="position: absolute; top: 14px; right: 14px; z-index: 10; background: #FFFFFF; border: 1px solid #DDDDDD; border-radius: 999px; padding: 10px 20px; font-size: 14px; font-weight: 600; color: #222222; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 14px rgba(0,0,0,0.14); cursor: pointer;">
                        <i class="fa-solid fa-magnifying-glass" style="font-size: 13px; color: #222222;"></i>
                        <span>Find things to do</span>
                    </div>

                    <!-- Interactive Google Maps Embed -->
                    <iframe
                        id="propertyMapIframe"
                        src="${data.googleMapsEmbedUrl}"
                        width="100%"
                        height="100%"
                        style="border: 0; width: 100%; height: 100%; display: block;"
                        allowfullscreen=""
                        loading="eager"
                        referrerpolicy="no-referrer-when-downgrade"
                        title="${data.name} Location Map">
                    </iframe>
                </div>

                <div style="margin-top: 24px;">
                    <h4 style="font-size: 16px; font-weight: 700; color: #222222; margin-bottom: 8px;">${data.neighborhoodTitle || 'Dubai Prime Neighborhood'}</h4>
                    <p style="font-size: 14px; color: #374151; line-height: 1.6;">${data.neighborhoodDesc || data.location}</p>
                </div>
            </div>

            <!-- Full-Width Payment Protection Banner (Exact Image 4 Match) -->
            <div style="border-top: 1px solid #EBEBEB; border-bottom: 1px solid #EBEBEB; padding: 22px 0; margin: 36px 0 28px; display: flex; align-items: center; justify-content: center; gap: 16px; text-align: left; width: 100%;">
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none" style="flex-shrink: 0;">
                    <path d="M16 3L5 7V15C5 21.8 9.7 28.1 16 29.8C22.3 28.1 27 21.8 27 15V7L16 3Z" stroke="#FF385C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 16L15 19L20 13" stroke="#FF385C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <div style="font-size: 14px; color: #717171; max-width: 650px; line-height: 1.45;">
                    To help protect your payment, always use Airbnb to send money and communicate with hosts.
                </div>
            </div>

            <!-- Full-Width Things to Know (Exact Image 4 Match) -->
            <div class="things-to-know-section" style="margin-bottom: 48px; width: 100%;">
                <h3 style="font-size: 22px; font-weight: 700; color: #222222; margin-bottom: 24px;">Things to know</h3>
                
                <div class="ttk-grid-5cols" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 28px;">
                    <!-- Instant Book -->
                    <div>
                        <div style="font-size: 24px; margin-bottom: 12px; line-height: 1;">⚡</div>
                        <h4 style="font-size: 16px; font-weight: 700; color: #222222; margin-bottom: 6px;">Instant Book</h4>
                        <p style="font-size: 14px; color: #717171; line-height: 1.45; margin: 0;">You can book this stay without waiting for host approval.</p>
                    </div>

                    <!-- Check in -->
                    <div>
                        <div style="font-size: 24px; margin-bottom: 12px; line-height: 1;">🚪</div>
                        <h4 style="font-size: 16px; font-weight: 700; color: #222222; margin-bottom: 6px;">Check in after 3:00 pm</h4>
                        <p style="font-size: 14px; color: #717171; line-height: 1.45; margin: 0;">Check out before 11:00 am, self check-in with smart lock</p>
                    </div>

                    <!-- House rules -->
                    <div>
                        <div style="font-size: 24px; margin-bottom: 12px; line-height: 1;">📋</div>
                        <h4 style="font-size: 16px; font-weight: 700; color: #222222; margin-bottom: 6px;">House rules</h4>
                        <p style="font-size: 14px; color: #717171; line-height: 1.45; margin: 0 0 6px;">Review these details for a smooth stay.</p>
                        <a href="#" onclick="openHouseRulesModal('${propId}'); return false;" style="font-size: 14px; font-weight: 600; color: #222222; text-decoration: underline;">Show more &gt;</a>
                    </div>

                    <!-- Safety & property -->
                    <div>
                        <div style="font-size: 24px; margin-bottom: 12px; line-height: 1;">🛡️</div>
                        <h4 style="font-size: 16px; font-weight: 700; color: #222222; margin-bottom: 6px;">Safety & property</h4>
                        <p style="font-size: 14px; color: #717171; line-height: 1.45; margin: 0 0 6px;">Carbon monoxide alarm, smoke alarm</p>
                        <a href="#" onclick="openSafetyModal('${propId}'); return false;" style="font-size: 14px; font-weight: 600; color: #222222; text-decoration: underline;">Show more &gt;</a>
                    </div>

                    <!-- Free cancellation -->
                    <div>
                        <div style="font-size: 24px; margin-bottom: 12px; line-height: 1;">📅</div>
                        <h4 style="font-size: 16px; font-weight: 700; color: #222222; margin-bottom: 6px;">Free cancellation before 30 November</h4>
                        <p style="font-size: 14px; color: #717171; line-height: 1.45; margin: 0 0 6px;">Cancel before 7 December for a partial refund.</p>
                        <a href="#" onclick="openCancellationModal('${propId}'); return false;" style="font-size: 14px; font-weight: 600; color: #222222; text-decoration: underline;">Show more &gt;</a>
                    </div>
                </div>
            </div>

        </div> <!-- END container mobile-pdp-container -->

        <!-- Fixed Floating Mobile Bottom Bar Matching Airbnb UX -->
        <div class="mobile-fixed-bottom-bar">
            <div class="mobile-bottom-price-box">
                <div class="mobile-bottom-price" id="mobileBottomPrice" style="font-size: 16px; font-weight: 800; color: #222;">
                    ${priceDisplay} <span style="font-size: 13px; font-weight: normal; color: #717171;">for 2 nights</span>
                </div>
                <div class="mobile-bottom-sub" onclick="openReviewsModal('${propId}')" style="cursor: pointer;"><i class="fa-solid fa-star" style="font-size: 11px; color: #FF385C;"></i> ${ratingDisplay} (${reviewsCount})</div>
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
                <div class="footer-bottom-bar" style="border-top: 1px solid #E5E0D8; padding-top: 24px; margin-top: 40px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
                    <div class="footer-copyright" style="font-size: 13px; color: #717171;">
                        © 2026 True Haven Luxury Stays LLC. All rights reserved. DTCM Registered Holiday Homes Operator.
                    </div>
                    <div class="footer-legal-links" style="display: flex; gap: 20px; font-size: 13px; color: #717171;">
                        <a href="#" onclick="alert('Privacy Policy: True Haven protects guest information and complies with Dubai DTCM holiday homes data standards.'); return false;" style="color: inherit; text-decoration: none;">Privacy</a>
                        <a href="#" onclick="alert('Terms of Service: All bookings subject to Dubai Tourism (DTCM) regulations and house rules.'); return false;" style="color: inherit; text-decoration: none;">Terms</a>
                        <a href="#" onclick="alert('Direct WhatsApp: +971 52 582 1668'); return false;" style="color: inherit; text-decoration: none;">Sitemap</a>
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

    // Sticky Sub-Nav Scroll Listener
    const handlePdpSubNavScroll = () => {
        const subNav = document.getElementById('stickyPdpSubNav');
        if (!subNav) return;
        if (window.scrollY > 440) {
            subNav.classList.add('visible');
        } else {
            subNav.classList.remove('visible');
        }
    };
    window.removeEventListener('scroll', window._pdpSubNavScrollHandler);
    window._pdpSubNavScrollHandler = handlePdpSubNavScroll;
    window.addEventListener('scroll', handlePdpSubNavScroll);

    // Render interactive Leaflet map
    setTimeout(() => {
        renderPropertyMap(propId);
    }, 150);
}


function closePropertyDetailPage() {
    closeReviewsModal();
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

    // Google Maps iframe auto-updates cleanly
    const iframeEl = document.getElementById('propertyMapIframe');
    if (iframeEl && data.googleMapsEmbedUrl) {
        if (!iframeEl.src || iframeEl.src !== data.googleMapsEmbedUrl) {
            iframeEl.src = data.googleMapsEmbedUrl;
        }
    }

    const mapEl = document.getElementById('propertyMap');
    if (!mapEl) return;

    if (currentLeafletMap) {
        try { currentLeafletMap.remove(); } catch(e) {}
        currentLeafletMap = null;
    }

    if (typeof L === 'undefined') {
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

        // Exact Airbnb Black Circle Home Pin (Images 5 & 6)
        const customPin = L.divIcon({
            className: 'airbnb-map-pin-custom',
            html: '<div style="background: #000000; color: #FFFFFF; width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 16px rgba(0,0,0,0.35); border: 2.5px solid #FFFFFF; font-size: 18px;"><i class="fa-solid fa-house"></i></div>',
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
// AIRBNB EXACT REVIEWS MODAL (Exact Image 2 Match)
// -------------------------------------------------------------
// -------------------------------------------------------------
// AIRBNB EXACT REVIEWS MODAL (Exact Image 1 & 2 Match)
// -------------------------------------------------------------
function openReviewsModal(propId) {
    const targetId = propId || window.currentPropertyId || 'paramount';
    const data = PROPERTIES_DATA[targetId];
    if (!data) return;

    let modal = document.getElementById('reviewsModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'reviewsModal';
        modal.className = 'reviews-modal-overlay';
        document.body.appendChild(modal);
    }

    const isParamount = (targetId === 'paramount');
    const reviews = data.reviews || [];
    const reviewsCount = reviews.length || data.reviewsCount || 19;
    const ratingDisplay = data.rating || '5.0';

    // Store active filtered reviews list on window for sorting & searching
    window._activeModalReviews = [...reviews];
    window._currentModalPropertyId = targetId;

    const guestsMentionList = isParamount ? [
        { key: 'pool', label: 'Pool 4', icon: '🏊' },
        { key: 'view', label: 'View 9', icon: '🖼️' },
        { key: 'clean', label: 'Cleanliness 10', icon: '🧽' },
        { key: 'hospitality', label: 'Hospitality 5', icon: '🎁' },
        { key: 'amenities', label: 'Amenities 3', icon: '🏷️' },
        { key: 'location', label: 'Location 3', icon: '📍' },
        { key: 'condition', label: 'Condition 2', icon: '🏢' },
        { key: 'value', label: 'Value 2', icon: '📦' }
    ] : [
        { key: 'view', label: 'View 11', icon: '🖼️' },
        { key: 'hospitality', label: 'Hospitality 11', icon: '🎁' },
        { key: 'location', label: 'Location 7', icon: '📍' },
        { key: 'clean', label: 'Cleanliness 5', icon: '🧽' },
        { key: 'check-in', label: 'Check-in 3', icon: '🔢' },
        { key: 'downtown', label: 'Nearby 3', icon: '🗺️' },
        { key: 'walk', label: 'Walkability 2', icon: '👟' },
        { key: 'transit', label: 'Getting around 2', icon: '🚆' }
    ];

    modal.innerHTML = `
        <div class="modal-card reviews-modal-card" style="max-width: 820px; width: 94%; max-height: 88vh; border-radius: 24px; display: flex; flex-direction: column; overflow: hidden; background: #FFFFFF; box-shadow: 0 25px 60px rgba(0,0,0,0.3); position: relative;">
            
            <!-- Close Button Header (Exact Image 2 Match: Top Right Corner) -->
            <div style="position: sticky; top: 0; background: #FFFFFF; z-index: 20; display: flex; justify-content: flex-end; padding: 18px 22px 0;">
                <button onclick="closeReviewsModal()" style="background: none; border: none; font-size: 24px; cursor: pointer; color: #222222; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: background 0.2s;" onmouseover="this.style.background='#F7F7F7'" onmouseout="this.style.background='none'">&times;</button>
            </div>

            <!-- Scrollable Modal Body -->
            <div class="reviews-modal-scroll" style="overflow-y: auto; padding: 0 32px 32px; flex: 1;">
                
                <!-- 1. Golden Laurel Wreath Hero (Exact Image 2 Match) -->
                <div style="text-align: center; margin-bottom: 24px;">
                    <div style="display: flex; align-items: center; justify-content: center; gap: 14px; margin-bottom: 8px;">
                        <svg viewBox="0 0 40 60" width="34" height="52" style="flex-shrink: 0;">
                            <defs>
                                <linearGradient id="modalHeroGoldLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stop-color="#E2B148" />
                                    <stop offset="50%" stop-color="#F9D976" />
                                    <stop offset="100%" stop-color="#B8860B" />
                                </linearGradient>
                            </defs>
                            <path d="M 28 55 C 16 42 10 24 22 5" fill="none" stroke="url(#modalHeroGoldLeft)" stroke-width="2.5" stroke-linecap="round" />
                            <ellipse cx="27" cy="50" rx="3.5" ry="6.5" transform="rotate(-30 27 50)" fill="url(#modalHeroGoldLeft)" />
                            <ellipse cx="20" cy="42" rx="3.5" ry="7" transform="rotate(-40 20 42)" fill="url(#modalHeroGoldLeft)" />
                            <ellipse cx="14" cy="32" rx="3.5" ry="7.5" transform="rotate(-35 14 32)" fill="url(#modalHeroGoldLeft)" />
                            <ellipse cx="12" cy="22" rx="3.5" ry="7.5" transform="rotate(-25 12 22)" fill="url(#modalHeroGoldLeft)" />
                            <ellipse cx="15" cy="12" rx="3.2" ry="7" transform="rotate(-10 15 12)" fill="url(#modalHeroGoldLeft)" />
                            <ellipse cx="22" cy="5" rx="3" ry="6" transform="rotate(15 22 5)" fill="url(#modalHeroGoldLeft)" />
                        </svg>
                        <div style="font-size: 64px; font-weight: 800; color: #222222; line-height: 1; letter-spacing: -1px;">${ratingDisplay}</div>
                        <svg viewBox="0 0 40 60" width="34" height="52" style="flex-shrink: 0; transform: scaleX(-1);">
                            <defs>
                                <linearGradient id="modalHeroGoldRight" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stop-color="#E2B148" />
                                    <stop offset="50%" stop-color="#F9D976" />
                                    <stop offset="100%" stop-color="#B8860B" />
                                </linearGradient>
                            </defs>
                            <path d="M 28 55 C 16 42 10 24 22 5" fill="none" stroke="url(#modalHeroGoldRight)" stroke-width="2.5" stroke-linecap="round" />
                            <ellipse cx="27" cy="50" rx="3.5" ry="6.5" transform="rotate(-30 27 50)" fill="url(#modalHeroGoldRight)" />
                            <ellipse cx="20" cy="42" rx="3.5" ry="7" transform="rotate(-40 20 42)" fill="url(#modalHeroGoldRight)" />
                            <ellipse cx="14" cy="32" rx="3.5" ry="7.5" transform="rotate(-35 14 32)" fill="url(#modalHeroGoldRight)" />
                            <ellipse cx="12" cy="22" rx="3.5" ry="7.5" transform="rotate(-25 12 22)" fill="url(#modalHeroGoldRight)" />
                            <ellipse cx="15" cy="12" rx="3.2" ry="7" transform="rotate(-10 15 12)" fill="url(#modalHeroGoldRight)" />
                            <ellipse cx="22" cy="5" rx="3" ry="6" transform="rotate(15 22 5)" fill="url(#modalHeroGoldRight)" />
                        </svg>
                    </div>
                    <div style="font-size: 20px; font-weight: 700; color: #222222; margin-bottom: 4px;">Guest favourite</div>
                    <div style="font-size: 14px; color: #717171; max-width: 440px; margin: 0 auto; line-height: 1.45;">
                        This home is in the <strong style="color: #222222; font-weight: 700;">top 10%</strong> of eligible listings based on ratings, reviews and reliability
                    </div>
                </div>

                <!-- 2. Horizontal Rating Breakdown Strip with Interactive Circular Slide Buttons (Exact Image 1 & 2 Match) -->
                <div class="modal-ratings-carousel-wrapper" style="position: relative; margin-bottom: 24px; padding: 0 4px;">
                    
                    <!-- Left Slide Button with Gradient Fade -->
                    <div id="modalRatingsPrevWrap" style="display: none; position: absolute; left: 0; top: 0; bottom: 0; width: 64px; background: linear-gradient(to right, #FFFFFF 65%, rgba(255,255,255,0)); z-index: 10; align-items: center; justify-content: flex-start; pointer-events: none;">
                        <button onclick="scrollAirbnbCarousel('modalRatingsScroll', 'left')" style="pointer-events: auto; width: 32px; height: 32px; border-radius: 50%; background: #FFFFFF; border: 1px solid #DDDDDD; box-shadow: 0 2px 6px rgba(0,0,0,0.12); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: transform 0.15s, box-shadow 0.15s;" onmouseover="this.style.transform='scale(1.08)'; this.style.boxShadow='0 4px 10px rgba(0,0,0,0.2)'" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 6px rgba(0,0,0,0.12)'">
                            <i class="fa-solid fa-chevron-left" style="font-size: 11px; color: #222222;"></i>
                        </button>
                    </div>

                    <!-- Scrollable Categories Strip -->
                    <div id="modalRatingsScroll" onscroll="updateAirbnbCarouselNav('modalRatingsScroll', 'modalRatingsPrevWrap', 'modalRatingsNextWrap')" style="display: flex; gap: 20px; overflow-x: auto; padding-bottom: 12px; scrollbar-width: none; -ms-overflow-style: none; scroll-behavior: smooth;">
                        <!-- Overall rating -->
                        <div style="min-width: 135px; flex-shrink: 0; padding-right: 18px; border-right: 1px solid #EBEBEB;">
                            <div style="font-size: 13px; font-weight: 600; color: #222222; margin-bottom: 8px;">Overall rating</div>
                            <div style="display: flex; flex-direction: column; gap: 3px;">
                                <div style="display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 600; color: #717171;">
                                    <span style="width: 8px;">5</span>
                                    <div style="flex: 1; height: 4px; background: #EBEBEB; border-radius: 2px; overflow: hidden;"><div style="width: 100%; height: 100%; background: #222222;"></div></div>
                                </div>
                                <div style="display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 600; color: #717171;"><span style="width: 8px;">4</span><div style="flex: 1; height: 4px; background: #EBEBEB; border-radius: 2px;"></div></div>
                                <div style="display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 600; color: #717171;"><span style="width: 8px;">3</span><div style="flex: 1; height: 4px; background: #EBEBEB; border-radius: 2px;"></div></div>
                                <div style="display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 600; color: #717171;"><span style="width: 8px;">2</span><div style="flex: 1; height: 4px; background: #EBEBEB; border-radius: 2px;"></div></div>
                                <div style="display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 600; color: #717171;"><span style="width: 8px;">1</span><div style="flex: 1; height: 4px; background: #EBEBEB; border-radius: 2px;"></div></div>
                            </div>
                        </div>

                        <!-- Cleanliness -->
                        <div style="min-width: 95px; flex-shrink: 0; padding-right: 18px; border-right: 1px solid #EBEBEB;">
                            <div style="font-size: 13px; font-weight: 600; color: #222222;">Cleanliness</div>
                            <div style="font-size: 16px; font-weight: 800; color: #222222; margin: 4px 0 8px;">5.0</div>
                            <div style="font-size: 20px; color: #222222;"><i class="fa-solid fa-spray-can-sparkles"></i></div>
                        </div>

                        <!-- Accuracy -->
                        <div style="min-width: 95px; flex-shrink: 0; padding-right: 18px; border-right: 1px solid #EBEBEB;">
                            <div style="font-size: 13px; font-weight: 600; color: #222222;">Accuracy</div>
                            <div style="font-size: 16px; font-weight: 800; color: #222222; margin: 4px 0 8px;">5.0</div>
                            <div style="font-size: 20px; color: #222222;"><i class="fa-regular fa-circle-check"></i></div>
                        </div>

                        <!-- Check-in -->
                        <div style="min-width: 95px; flex-shrink: 0; padding-right: 18px; border-right: 1px solid #EBEBEB;">
                            <div style="font-size: 13px; font-weight: 600; color: #222222;">Check-in</div>
                            <div style="font-size: 16px; font-weight: 800; color: #222222; margin: 4px 0 8px;">5.0</div>
                            <div style="font-size: 20px; color: #222222;"><i class="fa-solid fa-key"></i></div>
                        </div>

                        <!-- Communication -->
                        <div style="min-width: 95px; flex-shrink: 0; padding-right: 18px; border-right: 1px solid #EBEBEB;">
                            <div style="font-size: 13px; font-weight: 600; color: #222222;">Communication</div>
                            <div style="font-size: 16px; font-weight: 800; color: #222222; margin: 4px 0 8px;">5.0</div>
                            <div style="font-size: 20px; color: #222222;"><i class="fa-regular fa-message"></i></div>
                        </div>

                        <!-- Location -->
                        <div style="min-width: 95px; flex-shrink: 0; padding-right: 18px; border-right: 1px solid #EBEBEB;">
                            <div style="font-size: 13px; font-weight: 600; color: #222222;">Location</div>
                            <div style="font-size: 16px; font-weight: 800; color: #222222; margin: 4px 0 8px;">5.0</div>
                            <div style="font-size: 20px; color: #222222;"><i class="fa-solid fa-map-location-dot"></i></div>
                        </div>

                        <!-- Value -->
                        <div style="min-width: 95px; flex-shrink: 0;">
                            <div style="font-size: 13px; font-weight: 600; color: #222222;">Value</div>
                            <div style="font-size: 16px; font-weight: 800; color: #222222; margin: 4px 0 8px;">5.0</div>
                            <div style="font-size: 20px; color: #222222;"><i class="fa-solid fa-tag"></i></div>
                        </div>
                    </div>

                    <!-- Right Slide Button with Gradient Fade -->
                    <div id="modalRatingsNextWrap" style="display: flex; position: absolute; right: 0; top: 0; bottom: 0; width: 64px; background: linear-gradient(to left, #FFFFFF 65%, rgba(255,255,255,0)); z-index: 10; align-items: center; justify-content: flex-end; pointer-events: none;">
                        <button onclick="scrollAirbnbCarousel('modalRatingsScroll', 'right')" style="pointer-events: auto; width: 32px; height: 32px; border-radius: 50%; background: #FFFFFF; border: 1px solid #DDDDDD; box-shadow: 0 2px 6px rgba(0,0,0,0.12); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: transform 0.15s, box-shadow 0.15s;" onmouseover="this.style.transform='scale(1.08)'; this.style.boxShadow='0 4px 10px rgba(0,0,0,0.2)'" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 6px rgba(0,0,0,0.12)'">
                            <i class="fa-solid fa-chevron-right" style="font-size: 11px; color: #222222;"></i>
                        </button>
                    </div>
                </div>

                <!-- 3. Guests Mention Horizontal Strip with Interactive Circular Slide Buttons (Exact Image 1 & 2 Match) -->
                <div style="margin-bottom: 24px;">
                    <div style="font-size: 16px; font-weight: 700; color: #222222; margin-bottom: 12px;">Guests mention</div>
                    <div class="modal-mention-carousel-wrapper" style="position: relative; padding: 0 2px;">
                        
                        <!-- Left Slide Button with Gradient Fade -->
                        <div id="modalMentionPrevWrap" style="display: none; position: absolute; left: 0; top: 0; bottom: 0; width: 64px; background: linear-gradient(to right, #FFFFFF 65%, rgba(255,255,255,0)); z-index: 10; align-items: center; justify-content: flex-start; pointer-events: none;">
                            <button onclick="scrollAirbnbCarousel('modalMentionPillsWrap', 'left')" style="pointer-events: auto; width: 32px; height: 32px; border-radius: 50%; background: #FFFFFF; border: 1px solid #DDDDDD; box-shadow: 0 2px 6px rgba(0,0,0,0.12); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: transform 0.15s, box-shadow 0.15s;" onmouseover="this.style.transform='scale(1.08)'; this.style.boxShadow='0 4px 10px rgba(0,0,0,0.2)'" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 6px rgba(0,0,0,0.12)'">
                                <i class="fa-solid fa-chevron-left" style="font-size: 11px; color: #222222;"></i>
                            </button>
                        </div>

                        <!-- Scrollable Pills Strip -->
                        <div id="modalMentionPillsWrap" onscroll="updateAirbnbCarouselNav('modalMentionPillsWrap', 'modalMentionPrevWrap', 'modalMentionNextWrap')" style="display: flex; gap: 10px; overflow-x: auto; padding-bottom: 6px; scrollbar-width: none; -ms-overflow-style: none; scroll-behavior: smooth;">
                            ${guestsMentionList.map(item => `
                                <button class="guest-mention-pill" onclick="filterModalByMentionKey('${targetId}', '${item.key}', this)" style="flex-shrink: 0; background: #F7F7F7; border: 1px solid #DDDDDD; border-radius: 999px; padding: 8px 16px; font-size: 14px; font-weight: 600; color: #222222; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all 0.2s;">
                                    <span>${item.icon}</span> <span>${item.label}</span>
                                </button>
                            `).join('')}
                        </div>

                        <!-- Right Slide Button with Gradient Fade -->
                        <div id="modalMentionNextWrap" style="display: flex; position: absolute; right: 0; top: 0; bottom: 0; width: 64px; background: linear-gradient(to left, #FFFFFF 65%, rgba(255,255,255,0)); z-index: 10; align-items: center; justify-content: flex-end; pointer-events: none;">
                            <button onclick="scrollAirbnbCarousel('modalMentionPillsWrap', 'right')" style="pointer-events: auto; width: 32px; height: 32px; border-radius: 50%; background: #FFFFFF; border: 1px solid #DDDDDD; box-shadow: 0 2px 6px rgba(0,0,0,0.12); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: transform 0.15s, box-shadow 0.15s;" onmouseover="this.style.transform='scale(1.08)'; this.style.boxShadow='0 4px 10px rgba(0,0,0,0.2)'" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 6px rgba(0,0,0,0.12)'">
                                <i class="fa-solid fa-chevron-right" style="font-size: 11px; color: #222222;"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Divider -->
                <hr style="border: none; border-top: 1px solid #EBEBEB; margin: 20px 0 24px;">

                <!-- 4. Review Header Row: Count on Left, Sort & Search on Right (Exact Image 2 Match) -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 14px;">
                    <div id="modalReviewsCountText" style="font-size: 20px; font-weight: 700; color: #222222;">
                        ${reviewsCount} reviews
                    </div>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <!-- Most Relevant Dropdown (Exact Image 2 Match) -->
                        <div style="position: relative;">
                            <select id="modalSortDropdown" onchange="sortModalReviewsList(this.value)" style="border: 1px solid #B0B0B0; border-radius: 999px; padding: 8px 34px 8px 16px; font-size: 14px; font-weight: 600; color: #222222; background: #FFFFFF; cursor: pointer; outline: none; appearance: none; -webkit-appearance: none;">
                                <option value="relevant">Most relevant</option>
                                <option value="recent">Most recent</option>
                                <option value="highest">Highest rated</option>
                            </select>
                            <i class="fa-solid fa-chevron-down" style="position: absolute; right: 14px; top: 50%; transform: translateY(-50%); font-size: 11px; pointer-events: none; color: #717171;"></i>
                        </div>

                        <!-- Search Button / Input (Exact Image 2 Match) -->
                        <div style="position: relative;">
                            <input type="text" id="modalSearchInput" placeholder="Search reviews..." oninput="searchModalReviewsList(this.value)" style="border: 1px solid #B0B0B0; border-radius: 999px; padding: 8px 14px 8px 34px; font-size: 13px; width: 150px; outline: none; transition: width 0.2s;" onfocus="this.style.width='220px'" onblur="if(!this.value) this.style.width='150px'">
                            <i class="fa-solid fa-magnifying-glass" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-size: 12px; color: #717171;"></i>
                        </div>
                    </div>
                </div>

                <!-- 5. Vertical List of All Reviews (Pure Reviews, No Responses) -->
                <div id="modalReviewsList" style="display: flex; flex-direction: column; gap: 24px;">
                    ${renderFullReviewsListHtml(reviews)}
                </div>

            </div>
        </div>
    `;

    modal.style.display = 'flex';
    modal.onclick = function(e) {
        if (e.target === modal) {
            closeReviewsModal();
        }
    };

    // Initialize slide buttons visibility immediately after render
    setTimeout(() => {
        updateAirbnbCarouselNav('modalRatingsScroll', 'modalRatingsPrevWrap', 'modalRatingsNextWrap');
        updateAirbnbCarouselNav('modalMentionPillsWrap', 'modalMentionPrevWrap', 'modalMentionNextWrap');
    }, 60);
}

function renderFullReviewsListHtml(reviews) {
    if (!reviews || reviews.length === 0) {
        return '<p style="color: #717171; font-size: 14px; text-align: center; padding: 24px;">No reviews found matching your search.</p>';
    }
    return reviews.map(rev => `
        <div style="border-bottom: 1px solid #EBEBEB; padding-bottom: 24px;">
            <!-- Reviewer Header -->
            <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 10px;">
                ${rev.avatarUrl ? `
                    <img src="${rev.avatarUrl}" alt="${rev.name}" style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover; flex-shrink: 0;">
                ` : `
                    <div style="width: 48px; height: 48px; border-radius: 50%; background: ${rev.color || '#0F1E36'}; color: #FFFFFF; font-weight: 700; display: flex; align-items: center; justify-content: center; font-size: 17px; flex-shrink: 0;">
                        ${rev.initial || rev.name.charAt(0)}
                    </div>
                `}
                <div>
                    <h3 style="font-size: 16px; font-weight: 700; color: #222222; margin: 0; line-height: 1.2;">${rev.name}</h3>
                    <div style="font-size: 14px; color: #717171; margin-top: 2px;">${rev.location || 'Verified Guest'}</div>
                </div>
            </div>

            <!-- Rating Stars + Stay Details (Exact Image 2 Match) -->
            <div style="font-size: 12px; font-weight: 600; color: #222222; margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
                <span>${'★'.repeat(rev.rating || 5)}</span>
                <span style="color: #717171; font-weight: 400;">· ${rev.time}${rev.stay ? ' · ' + rev.stay : ''}</span>
            </div>

            <!-- Review Text -->
            <p style="font-size: 15px; color: #374151; line-height: 1.6; margin: 0;">
                ${rev.text}
            </p>
        </div>
    `).join('');
}

function filterModalByMentionKey(propId, key, btn) {
    const data = PROPERTIES_DATA[propId];
    if (!data || !data.reviews) return;
    
    // Toggle active state on clicked pill
    const pills = document.querySelectorAll('#modalMentionPillsWrap .guest-mention-pill');
    pills.forEach(p => {
        if (p !== btn) {
            p.style.background = '#F7F7F7';
            p.style.borderColor = '#DDDDDD';
            p.style.color = '#222222';
        }
    });

    const isAlreadyActive = (btn.style.background === 'rgb(34, 34, 34)' || btn.style.background === '#222222');
    if (isAlreadyActive) {
        btn.style.background = '#F7F7F7';
        btn.style.borderColor = '#DDDDDD';
        btn.style.color = '#222222';
        window._activeModalReviews = [...data.reviews];
    } else {
        btn.style.background = '#222222';
        btn.style.borderColor = '#222222';
        btn.style.color = '#FFFFFF';
        const q = key.toLowerCase();
        window._activeModalReviews = data.reviews.filter(r => 
            r.text.toLowerCase().includes(q) ||
            r.name.toLowerCase().includes(q) ||
            (r.location && r.location.toLowerCase().includes(q))
        );
    }

    const listEl = document.getElementById('modalReviewsList');
    if (listEl) listEl.innerHTML = renderFullReviewsListHtml(window._activeModalReviews);
    const countEl = document.getElementById('modalReviewsCountText');
    if (countEl) countEl.innerText = window._activeModalReviews.length + ' reviews';
}

function sortModalReviewsList(sortType) {
    if (!window._activeModalReviews) return;
    let list = [...window._activeModalReviews];
    if (sortType === 'recent') {
        // preserve natural recent order
    } else if (sortType === 'highest') {
        list.sort((a, b) => (b.rating || 5) - (a.rating || 5));
    }
    const listEl = document.getElementById('modalReviewsList');
    if (listEl) listEl.innerHTML = renderFullReviewsListHtml(list);
}

function searchModalReviewsList(query) {
    const data = PROPERTIES_DATA[window._currentModalPropertyId || 'paramount'];
    if (!data || !data.reviews) return;
    const q = (query || '').toLowerCase().trim();
    if (!q) {
        window._activeModalReviews = [...data.reviews];
    } else {
        window._activeModalReviews = data.reviews.filter(r =>
            r.text.toLowerCase().includes(q) ||
            r.name.toLowerCase().includes(q) ||
            (r.location && r.location.toLowerCase().includes(q))
        );
    }
    const listEl = document.getElementById('modalReviewsList');
    if (listEl) listEl.innerHTML = renderFullReviewsListHtml(window._activeModalReviews);
    const countEl = document.getElementById('modalReviewsCountText');
    if (countEl) countEl.innerText = window._activeModalReviews.length + ' reviews';
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

// ==========================================
// AIRBNB EXACT PDP HELPER MODALS & ACTIONS
// ==========================================

function openHouseRulesModal(propId) {
    const data = PROPERTIES_DATA[propId] || PROPERTIES_DATA['paramount'];
    const modal = document.createElement('div');
    modal.className = 'generic-airbnb-modal-overlay';
    modal.id = 'genericAirbnbModal';
    modal.innerHTML = `
        <div class="generic-airbnb-modal-card">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 20px 28px; border-bottom: 1px solid #EBEBEB;">
                <h3 style="font-size: 19px; font-weight: 800; margin: 0; color: #222222;">House rules</h3>
                <button onclick="closeGenericModal()" style="font-size: 26px; cursor: pointer; background: none; border: none; color: #222;">&times;</button>
            </div>
            <div style="padding: 28px; overflow-y: auto; flex: 1; font-size: 15px; color: #374151; line-height: 1.6;">
                <p style="margin-top: 0; color: #717171;">You'll be staying in someone's home, so please treat it with care and respect.</p>
                
                <h4 style="font-size: 16px; font-weight: 700; color: #222; margin: 20px 0 10px;">Checking in and out</h4>
                <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px;">
                    <div style="display: flex; align-items: center; gap: 12px;"><i class="fa-regular fa-clock" style="font-size: 18px; width: 24px; color: #222;"></i> <span>Check-in after 3:00 PM</span></div>
                    <div style="display: flex; align-items: center; gap: 12px;"><i class="fa-regular fa-clock" style="font-size: 18px; width: 24px; color: #222;"></i> <span>Checkout before 11:00 AM</span></div>
                    <div style="display: flex; align-items: center; gap: 12px;"><i class="fa-solid fa-key" style="font-size: 18px; width: 24px; color: #222;"></i> <span>Self check-in with smart lock & 24/7 building reception</span></div>
                </div>

                <h4 style="font-size: 16px; font-weight: 700; color: #222; margin: 20px 0 10px;">During your stay</h4>
                <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px;">
                    <div style="display: flex; align-items: center; gap: 12px;"><i class="fa-solid fa-users" style="font-size: 18px; width: 24px; color: #222;"></i> <span>4 guests maximum</span></div>
                    <div style="display: flex; align-items: center; gap: 12px;"><i class="fa-solid fa-ban" style="font-size: 18px; width: 24px; color: #222;"></i> <span>No pets allowed</span></div>
                    <div style="display: flex; align-items: center; gap: 12px;"><i class="fa-solid fa-volume-xmark" style="font-size: 18px; width: 24px; color: #222;"></i> <span>Quiet hours 10:00 PM – 8:00 AM</span></div>
                    <div style="display: flex; align-items: center; gap: 12px;"><i class="fa-solid fa-champagne-glasses" style="font-size: 18px; width: 24px; color: #222;"></i> <span>No parties or events</span></div>
                    <div style="display: flex; align-items: center; gap: 12px;"><i class="fa-solid fa-ban-smoking" style="font-size: 18px; width: 24px; color: #222;"></i> <span>No smoking inside the apartment</span></div>
                </div>

                <h4 style="font-size: 16px; font-weight: 700; color: #222; margin: 20px 0 10px;">Dubai Tourism (DTCM) & Building Rules</h4>
                <p style="margin: 0; font-size: 14px; color: #717171;">All guests are required by Dubai Tourism (DTCM) regulations to submit passport soft copies prior to check-in for building registration. Commercial use and subleasing are strictly prohibited.</p>
            </div>
        </div>
    `;
    modal.onclick = (e) => { if (e.target === modal) closeGenericModal(); };
    document.body.appendChild(modal);
}

function openSafetyModal(propId) {
    const data = PROPERTIES_DATA[propId] || PROPERTIES_DATA['paramount'];
    const modal = document.createElement('div');
    modal.className = 'generic-airbnb-modal-overlay';
    modal.id = 'genericAirbnbModal';
    modal.innerHTML = `
        <div class="generic-airbnb-modal-card">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 20px 28px; border-bottom: 1px solid #EBEBEB;">
                <h3 style="font-size: 19px; font-weight: 800; margin: 0; color: #222222;">Safety & property</h3>
                <button onclick="closeGenericModal()" style="font-size: 26px; cursor: pointer; background: none; border: none; color: #222;">&times;</button>
            </div>
            <div style="padding: 28px; overflow-y: auto; flex: 1; font-size: 15px; color: #374151; line-height: 1.6;">
                <p style="margin-top: 0; color: #717171;">Avoid surprises by looking over these important safety and property details.</p>
                
                <h4 style="font-size: 16px; font-weight: 700; color: #222; margin: 20px 0 10px;">Safety devices</h4>
                <div style="display: flex; flex-direction: column; gap: 14px; margin-bottom: 24px;">
                    <div style="display: flex; align-items: center; gap: 12px;"><i class="fa-solid fa-shield-halved" style="font-size: 18px; width: 24px; color: #222;"></i> <span>Carbon monoxide alarm installed</span></div>
                    <div style="display: flex; align-items: center; gap: 12px;"><i class="fa-solid fa-bell" style="font-size: 18px; width: 24px; color: #222;"></i> <span>Smoke alarm installed</span></div>
                    <div style="display: flex; align-items: center; gap: 12px;"><i class="fa-solid fa-fire-extinguisher" style="font-size: 18px; width: 24px; color: #222;"></i> <span>Fire extinguisher on premises</span></div>
                    <div style="display: flex; align-items: center; gap: 12px;"><i class="fa-solid fa-kit-medical" style="font-size: 18px; width: 24px; color: #222;"></i> <span>First aid kit available</span></div>
                    <div style="display: flex; align-items: center; gap: 12px;"><i class="fa-solid fa-video-slash" style="font-size: 18px; width: 24px; color: #222;"></i> <span>No interior security cameras</span></div>
                </div>

                <h4 style="font-size: 16px; font-weight: 700; color: #222; margin: 20px 0 10px;">Property information</h4>
                <div style="display: flex; flex-direction: column; gap: 14px;">
                    <div style="display: flex; align-items: center; gap: 12px;"><i class="fa-solid fa-shield" style="font-size: 18px; width: 24px; color: #222;"></i> <span>24/7 dedicated lobby reception & security staff</span></div>
                    <div style="display: flex; align-items: center; gap: 12px;"><i class="fa-solid fa-elevator" style="font-size: 18px; width: 24px; color: #222;"></i> <span>Elevator access to residence and all building amenities</span></div>
                </div>
            </div>
        </div>
    `;
    modal.onclick = (e) => { if (e.target === modal) closeGenericModal(); };
    document.body.appendChild(modal);
}

function openCancellationModal(propId) {
    const data = PROPERTIES_DATA[propId] || PROPERTIES_DATA['paramount'];
    const modal = document.createElement('div');
    modal.className = 'generic-airbnb-modal-overlay';
    modal.id = 'genericAirbnbModal';
    modal.innerHTML = `
        <div class="generic-airbnb-modal-card">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 20px 28px; border-bottom: 1px solid #EBEBEB;">
                <h3 style="font-size: 19px; font-weight: 800; margin: 0; color: #222222;">Cancellation policy</h3>
                <button onclick="closeGenericModal()" style="font-size: 26px; cursor: pointer; background: none; border: none; color: #222;">&times;</button>
            </div>
            <div style="padding: 28px; overflow-y: auto; flex: 1; font-size: 15px; color: #374151; line-height: 1.6;">
                <h4 style="font-size: 16px; font-weight: 700; color: #222; margin: 0 0 10px;">Free cancellation before 30 November</h4>
                <p style="color: #717171; margin-bottom: 20px;">Cancel before 30 November for a full refund. Cancel before 7 December for a partial refund. After that, this reservation is non-refundable.</p>

                <div style="border-top: 1px solid #EBEBEB; padding-top: 20px;">
                    <h5 style="font-size: 14px; font-weight: 700; color: #222; margin: 0 0 6px;">Protection Guarantee</h5>
                    <p style="font-size: 13px; color: #717171; margin: 0;">Make sure you are comfortable with this host's policy before booking. Booking via Airbnb provides official Guest Refund Policy protection.</p>
                </div>
            </div>
        </div>
    `;
    modal.onclick = (e) => { if (e.target === modal) closeGenericModal(); };
    document.body.appendChild(modal);
}

function openMapActivitiesModal(propId) {
    const data = PROPERTIES_DATA[propId] || PROPERTIES_DATA['paramount'];
    const modal = document.createElement('div');
    modal.className = 'generic-airbnb-modal-overlay';
    modal.id = 'genericAirbnbModal';
    modal.innerHTML = `
        <div class="generic-airbnb-modal-card">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 20px 28px; border-bottom: 1px solid #EBEBEB;">
                <h3 style="font-size: 19px; font-weight: 800; margin: 0; color: #222222;">Things to do around ${data.name}</h3>
                <button onclick="closeGenericModal()" style="font-size: 26px; cursor: pointer; background: none; border: none; color: #222;">&times;</button>
            </div>
            <div style="padding: 28px; overflow-y: auto; flex: 1; font-size: 15px; color: #374151; line-height: 1.6;">
                <p style="color: #717171; margin-top: 0;">Curated attractions within 5–15 minutes of your residence:</p>
                <div style="display: flex; flex-direction: column; gap: 14px;">
                    ${(data.nearbyAttractions || [
                        "Burj Khalifa: World's tallest tower with observation decks",
                        "The Dubai Mall: 1,200+ luxury boutiques and world-class dining",
                        "The Dubai Fountain: World famous choreographed water and music show",
                        "Dubai Opera: Performing arts and musical theater",
                        "Sky Views Observatory: Glass walkway and glass slide"
                    ]).map(item => `
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <i class="fa-solid fa-location-dot" style="color: #FF385C; font-size: 18px; width: 20px;"></i>
                            <span>${item}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    modal.onclick = (e) => { if (e.target === modal) closeGenericModal(); };
    document.body.appendChild(modal);
}

function closeGenericModal() {
    const modal = document.getElementById('genericAirbnbModal');
    if (modal) modal.remove();
}

function filterReviewsByKeyword(propId, keyword) {
    const data = PROPERTIES_DATA[propId];
    if (!data || !data.reviews) return;
    
    // Toggle active on clicked pill
    document.querySelectorAll('.guest-mention-pill').forEach(btn => {
        if (btn.textContent.toLowerCase().includes(keyword.toLowerCase())) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    const filtered = data.reviews.filter(r => r.text.toLowerCase().includes(keyword.toLowerCase()));
    const reviewsToDisplay = filtered.length > 0 ? filtered : data.reviews;
    
    const grid = document.getElementById('pdpInlineReviewsGrid');
    if (grid) {
        grid.innerHTML = reviewsToDisplay.slice(0, 4).map(rev => `
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
        `).join('');
    }
}
