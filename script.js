// --- ELEMEN UI ---
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const targetLang = document.getElementById('targetLang');
const loader = document.getElementById('loader');
const apiBadge = document.getElementById('apiBadge');
const apiName = document.getElementById('apiName');
const charCount = document.getElementById('charCount');

// Hitung Karakter
inputText.addEventListener('input', () => {
    charCount.innerText = inputText.value.length;
    // Auto resize height jika di mobile (opsional, tapi bagus untuk UX)
    inputText.style.height = 'auto'; 
    inputText.style.height = inputText.scrollHeight + 'px';
});

// --- FITUR SUARA (TTS) ---
function speakText() {
    const text = outputText.value;
    if (!text) return;

    // Stop jika ada suara sebelumnya
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    // Set bahasa sesuai pilihan target (misal 'id', 'en', 'ja')
    utterance.lang = targetLang.value;
    utterance.rate = 0.9; // Kecepatan sedikit lebih lambat agar jelas
    
    window.speechSynthesis.speak(utterance);
}

// --- FITUR COPY ---
function copyToClipboard() {
    if(outputText.value) {
        navigator.clipboard.writeText(outputText.value);
        // Feedback visual kecil (bisa ditambah toast kalau mau)
        const originalBtn = event.currentTarget.innerHTML;
        event.currentTarget.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>`;
        setTimeout(() => {
            event.currentTarget.innerHTML = originalBtn;
        }, 1500);
    }
}

function clearText() {
    inputText.value = '';
    outputText.value = '';
    charCount.innerText = '0';
    apiBadge.classList.add('hidden');
    window.speechSynthesis.cancel();
}

// --- CORE TRANSLATION ENGINE ---
async function translateEngine() {
    const text = inputText.value.trim();
    if (!text) return;

    // Source dipaksa 'auto' sesuai request
    const sl = 'auto'; 
    const tl = targetLang.value;

    outputText.value = "";
    loader.classList.remove('hidden');
    apiBadge.classList.add('hidden');

    const providers = [
        // 1. Lingva
        {
            name: "Lingva",
            fn: async () => {
                const res = await fetch(`https://lingva.ml/api/v1/${sl}/${tl}/${encodeURIComponent(text)}`);
                if (!res.ok) throw new Error('Down');
                return (await res.json()).translation;
            }
        },
        // 2. Google GTX
        {
            name: "Google",
            fn: async () => {
                const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&q=${encodeURIComponent(text)}`;
                const res = await fetch(url);
                if (!res.ok) throw new Error('Down');
                const data = await res.json();
                return data[0].map(x => x[0]).join('');
            }
        },
        // 3. Libre (Backup)
        {
            name: "Libre",
            fn: async () => {
                const res = await fetch("https://de.libretranslate.com/translate", {
                    method: "POST",
                    body: JSON.stringify({ q: text, source: "auto", target: tl, format: "text" }),
                    headers: { "Content-Type": "application/json" }
                });
                if (!res.ok) throw new Error('Down');
                return (await res.json()).translatedText;
            }
        }
    ];

    let success = false;

    for (const provider of providers) {
        try {
            const result = await provider.fn();
            outputText.value = result;
            apiName.innerText = provider.name;
            apiBadge.classList.remove('hidden');
            success = true;
            break; 
        } catch (e) {
            console.log(`${provider.name} skip.`);
        }
    }

    loader.classList.add('hidden');
    if (!success) outputText.value = "Koneksi gagal. Coba lagi nanti.";
}
