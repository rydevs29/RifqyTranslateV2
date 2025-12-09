// --- KONFIGURASI UI ---
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const sourceLang = document.getElementById('sourceLang');
const targetLang = document.getElementById('targetLang');
const loader = document.getElementById('loader');
const apiBadge = document.getElementById('apiBadge');
const apiName = document.getElementById('apiName');
const charCount = document.getElementById('charCount');

// Hitung Karakter
inputText.addEventListener('input', () => {
    charCount.innerText = inputText.value.length;
});

// --- LOGIKA "API CHAIN" (FAILOVER SYSTEM) ---

async function translateEngine() {
    const text = inputText.value.trim();
    if (!text) return alert("Masukkan teks dulu!");

    const sl = sourceLang.value;
    const tl = targetLang.value;

    // Reset UI
    outputText.value = "";
    loader.classList.remove('hidden');
    apiBadge.classList.add('hidden');

    // DAFTAR API (Prioritas 1 -> 4)
    // Kita buat array function agar bisa di-loop
    const providers = [
        
        // 1. LINGVA (Scraper Google yang stabil)
        {
            name: "Lingva Cloud",
            fn: async () => {
                // URL: https://lingva.ml/api/v1/{source}/{target}/{text}
                const res = await fetch(`https://lingva.ml/api/v1/${sl}/${tl}/${encodeURIComponent(text)}`);
                if (!res.ok) throw new Error('Lingva Down');
                const data = await res.json();
                return data.translation;
            }
        },

        // 2. GOOGLE TRANSLATE (GTX Endpoint - Sering dipakai extension)
        {
            name: "Google GTX",
            fn: async () => {
                // Endpoint ini mengembalikan array JSON yang rumit
                const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&q=${encodeURIComponent(text)}`;
                const res = await fetch(url);
                if (!res.ok) throw new Error('GTX Down');
                const data = await res.json();
                // Menggabungkan potongan kalimat (Google memecah kalimat panjang)
                return data[0].map(x => x[0]).join('');
            }
        },

        // 3. MYMEMORY (Limit 500 chars/req tapi database bagus)
        {
            name: "MyMemory",
            fn: async () => {
                const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sl}|${tl}`;
                const res = await fetch(url);
                if (!res.ok) throw new Error('MyMemory Down');
                const data = await res.json();
                if(data.responseStatus !== 200) throw new Error(data.responseDetails);
                return data.responseData.translatedText;
            }
        },
        
        // 4. LIBRETRANSLATE (Mirror Publik - Kadang lambat tapi open source)
        {
            name: "LibreMirror",
            fn: async () => {
                // Menggunakan de.libretranslate.com sebagai contoh mirror publik
                const res = await fetch("https://de.libretranslate.com/translate", {
                    method: "POST",
                    body: JSON.stringify({ q: text, source: sl, target: tl, format: "text" }),
                    headers: { "Content-Type": "application/json" }
                });
                if (!res.ok) throw new Error('Libre Down');
                const data = await res.json();
                return data.translatedText;
            }
        }
    ];

    // --- EKSEKUSI LOOP FAILOVER ---
    let success = false;

    for (const provider of providers) {
        try {
            console.log(`Mencoba API: ${provider.name}...`);
            const result = await provider.fn(); // Panggil fungsi API
            
            // Jika berhasil sampai sini, update UI & stop loop
            outputText.value = result;
            apiName.innerText = provider.name;
            apiBadge.classList.remove('hidden');
            
            // Styling badge beda warna kalau pakai backup
            if(provider.name !== "Lingva Cloud") {
                apiBadge.className = "text-[10px] px-2 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400";
            } else {
                apiBadge.className = "text-[10px] px-2 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400";
            }

            success = true;
            break; // KELUAR DARI LOOP KARENA SUDAH BERHASIL
        } catch (error) {
            console.warn(`${provider.name} Gagal:`, error);
            // Lanjut ke provider berikutnya di array...
        }
    }

    loader.classList.add('hidden');

    if (!success) {
        outputText.value = "CRITICAL ERROR: Semua server sibuk atau koneksi internet bermasalah. Coba lagi nanti.";
    }
}

// Fitur Copy & Clear
function copyToClipboard() {
    if(outputText.value) {
        navigator.clipboard.writeText(outputText.value);
        alert("Teks tersalin!");
    }
}

function clearText() {
    inputText.value = '';
    outputText.value = '';
    charCount.innerText = '0';
    apiBadge.classList.add('hidden');
}
  
