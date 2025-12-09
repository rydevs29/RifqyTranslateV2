// UI Elements
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const targetLang = document.getElementById('targetLang');
const loader = document.getElementById('loader');
const apiBadge = document.getElementById('apiBadge');
const apiName = document.getElementById('apiName');
const charCount = document.getElementById('charCount');

// Auto-resize & Count Char
inputText.addEventListener('input', () => {
    charCount.innerText = inputText.value.length;
    inputText.style.height = 'auto'; 
    inputText.style.height = (inputText.scrollHeight) + 'px';
});

// Fitur Bicara (TTS)
function speakText() {
    if (!outputText.value) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(outputText.value);
    utterance.lang = targetLang.value;
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
}

// Fitur Copy
function copyToClipboard() {
    if(outputText.value) {
        navigator.clipboard.writeText(outputText.value);
        // Visual Feedback (Icon Goyang/Berubah dikit)
        const btn = event.currentTarget;
        btn.classList.add('text-green-400');
        setTimeout(() => btn.classList.remove('text-green-400'), 1000);
    }
}

// Fitur Clear
function clearText() {
    inputText.value = '';
    outputText.value = '';
    charCount.innerText = '0';
    apiBadge.classList.add('hidden');
    window.speechSynthesis.cancel();
    inputText.style.height = 'auto';
}

// --- ENGINE TERJEMAHAN (FIXED) ---
async function translateEngine() {
    const text = inputText.value.trim();
    if (!text) {
        alert("Mohon ketik teks terlebih dahulu!");
        return;
    }

    // Setup UI sebelum mulai
    outputText.value = "";
    loader.classList.remove('hidden');
    apiBadge.classList.add('hidden');
    
    const sl = 'auto'; // Source Language selalu Auto
    const tl = targetLang.value; // Target Language dari dropdown

    // DAFTAR PROVIDER (Urutan diubah untuk stabilitas)
    const providers = [
        // 1. GOOGLE GTX (Prioritas Utama - Paling Stabil)
        {
            name: "Google",
            fn: async () => {
                // Endpoint GTX public google
                const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&q=${encodeURIComponent(text)}`;
                const res = await fetch(url);
                if (!res.ok) throw new Error('Google Block/Error');
                const data = await res.json();
                // Parsing hasil Google (karena bentuknya array bertingkat)
                return data[0].map(x => x[0]).join('');
            }
        },
        // 2. LINGVA (Cadangan 1)
        {
            name: "Lingva",
            fn: async () => {
                const res = await fetch(`https://lingva.ml/api/v1/${sl}/${tl}/${encodeURIComponent(text)}`);
                if (!res.ok) throw new Error('Lingva Down');
                const data = await res.json();
                return data.translation;
            }
        },
        // 3. MYMEMORY (Cadangan 2)
        {
            name: "MyMemory",
            fn: async () => {
                const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${tl}`; // MyMemory lebih bagus jika source inggris, tapi kita coba umum
                const res = await fetch(url);
                const data = await res.json();
                if (data.responseStatus !== 200) throw new Error('MyMemory Limit');
                return data.responseData.translatedText;
            }
        }
    ];

    let success = false;

    // Loop Failover: Coba satu-satu sampai berhasil
    for (const provider of providers) {
        try {
            console.log(`Mencoba translate via: ${provider.name}...`);
            const result = await provider.fn();
            
            if (result) {
                outputText.value = result;
                apiName.innerText = provider.name;
                apiBadge.classList.remove('hidden');
                
                // Ubah warna badge tergantung provider
                const badgeClass = provider.name === "Google" 
                    ? "border-green-500/30 bg-green-500/10 text-green-400" 
                    : "border-orange-500/30 bg-orange-500/10 text-orange-400";
                apiBadge.className = `text-[10px] px-2 py-1 rounded-full border ${badgeClass} font-mono`;

                success = true;
                break; // Berhenti loop jika berhasil
            }
        } catch (err) {
            console.warn(`Gagal via ${provider.name}:`, err);
            // Lanjut ke provider berikutnya...
        }
    }

    loader.classList.add('hidden');

    if (!success) {
        outputText.value = "Error: Gagal terhubung ke semua server terjemahan. Coba periksa koneksi internet Anda.";
    }
}
