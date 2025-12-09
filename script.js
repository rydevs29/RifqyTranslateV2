// --- ELEMEN UI ---
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const targetLang = document.getElementById('targetLang');
const loader = document.getElementById('loader');
const apiBadge = document.getElementById('apiBadge');
const apiName = document.getElementById('apiName');
const charCount = document.getElementById('charCount');

// Auto-resize & Hitung Karakter
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
        // Efek visual tombol
        const btn = event.currentTarget;
        const originalIcon = btn.innerHTML;
        btn.innerHTML = `<span class="text-green-400 text-xs font-bold">✓</span>`;
        setTimeout(() => btn.innerHTML = originalIcon, 1000);
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

// --- ENGINE TERJEMAHAN (MULTI-SERVER) ---
async function translateEngine() {
    const text = inputText.value.trim();
    if (!text) {
        alert("Mohon ketik teks yang ingin diterjemahkan!");
        return;
    }

    // Reset UI
    outputText.value = "";
    outputText.placeholder = "Sedang menghubungkan ke server...";
    loader.classList.remove('hidden');
    apiBadge.classList.add('hidden');
    
    const sl = 'auto'; // Source Language
    const tl = targetLang.value; // Target Language

    // DAFTAR SERVER (Prioritas Tinggi ke Rendah)
    // Kita gunakan banyak mirror Lingva karena server utama sering down
    const providers = [
        // 1. Lingva Mirror 1 (Sering Stabil)
        {
            name: "Server A (Lingva)",
            url: (t) => `https://lingva.ml/api/v1/${sl}/${tl}/${encodeURIComponent(t)}`,
            type: "lingva"
        },
        // 2. Google GTX (Paling Cepat, tapi kadang kena CORS)
        {
            name: "Server B (Google)",
            url: (t) => `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&q=${encodeURIComponent(t)}`,
            type: "google"
        },
        // 3. Lingva Mirror 2 (Cadangan Eropa)
        {
            name: "Server C (Lingva EU)",
            url: (t) => `https://lingva.se/api/v1/${sl}/${tl}/${encodeURIComponent(t)}`,
            type: "lingva"
        },
        // 4. Lingva Mirror 3 (Cadangan Alternatif)
        {
            name: "Server D (Lingva Alt)",
            url: (t) => `https://translate.ploud.jp/api/v1/${sl}/${tl}/${encodeURIComponent(t)}`,
            type: "lingva"
        }
    ];

    let success = false;
    let lastError = "";

    // LOOP SEMUA SERVER SAMPAI BERHASIL
    for (const provider of providers) {
        try {
            // Beri tahu user server mana yang sedang dicoba
            outputText.placeholder = `Mencoba ${provider.name}...`;
            console.log(`Requesting: ${provider.name}`);

            const response = await fetch(provider.url(text));
            
            if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
            
            const data = await response.json();
            let resultText = "";

            // Cara ambil data beda-beda tiap server
            if (provider.type === "lingva") {
                resultText = data.translation;
            } else if (provider.type === "google") {
                // Google formatnya array ribet: [[["Halo","Hello",,,]],,"en"]
                resultText = data[0].map(x => x[0]).join('');
            }

            if (resultText) {
                outputText.value = resultText;
                apiName.innerText = provider.name; // Tampilkan nama server yang berhasil
                apiBadge.classList.remove('hidden');
                
                // Set warna badge sukses
                apiBadge.className = `text-[10px] px-2 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 font-mono`;
                
                success = true;
                break; // BERHENTI LOOP, SUDAH SUKSES!
            }

        } catch (err) {
            console.warn(`${provider.name} Gagal:`, err);
            lastError = err.message;
            // Jangan stop, lanjut ke provider berikutnya...
        }
    }

    loader.classList.add('hidden');

    if (!success) {
        outputText.placeholder = "Gagal Menerjemahkan.";
        outputText.value = `ERROR: Semua server sibuk atau koneksi Anda memblokir akses.\n\nDetail: ${lastError}`;
    }
}
