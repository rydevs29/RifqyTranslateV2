// --- DATABASE BAHASA (100+) ---
const languages = [
    { code: "id", name: "Indonesia", flag: "🇮🇩" },
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "ja", name: "Japanese", flag: "🇯🇵" },
    { code: "ko", name: "Korean", flag: "🇰🇷" },
    { code: "ar", name: "Arabic", flag: "🇸🇦" },
    { code: "zh-CN", name: "Chinese (Simplified)", flag: "🇨🇳" },
    { code: "zh-TW", name: "Chinese (Traditional)", flag: "🇨🇳" },
    { code: "af", name: "Afrikaans", flag: "🇿🇦" },
    { code: "sq", name: "Albanian", flag: "🇦🇱" },
    { code: "am", name: "Amharic", flag: "🇪🇹" },
    { code: "hy", name: "Armenian", flag: "🇦🇲" },
    { code: "az", name: "Azerbaijani", flag: "🇦🇿" },
    { code: "eu", name: "Basque", flag: "🏁" },
    { code: "be", name: "Belarusian", flag: "🇧🇾" },
    { code: "bn", name: "Bengali", flag: "🇧🇩" },
    { code: "bs", name: "Bosnian", flag: "🇧🇦" },
    { code: "bg", name: "Bulgarian", flag: "🇧🇬" },
    { code: "ca", name: "Catalan", flag: "🏁" },
    { code: "ceb", name: "Cebuano", flag: "🇵🇭" },
    { code: "ny", name: "Chichewa", flag: "🇲🇼" },
    { code: "co", name: "Corsican", flag: "🇫🇷" },
    { code: "hr", name: "Croatian", flag: "🇭🇷" },
    { code: "cs", name: "Czech", flag: "🇨🇿" },
    { code: "da", name: "Danish", flag: "🇩🇰" },
    { code: "nl", name: "Dutch", flag: "🇳🇱" },
    { code: "eo", name: "Esperanto", flag: "🌍" },
    { code: "et", name: "Estonian", flag: "🇪🇪" },
    { code: "tl", name: "Filipino", flag: "🇵🇭" },
    { code: "fi", name: "Finnish", flag: "🇫🇮" },
    { code: "fr", name: "French", flag: "🇫🇷" },
    { code: "fy", name: "Frisian", flag: "🇳🇱" },
    { code: "gl", name: "Galician", flag: "🇪🇸" },
    { code: "ka", name: "Georgian", flag: "🇬🇪" },
    { code: "de", name: "German", flag: "🇩🇪" },
    { code: "el", name: "Greek", flag: "🇬🇷" },
    { code: "gu", name: "Gujarati", flag: "🇮🇳" },
    { code: "ht", name: "Haitian Creole", flag: "🇭🇹" },
    { code: "ha", name: "Hausa", flag: "🇳🇬" },
    { code: "haw", name: "Hawaiian", flag: "🇺🇸" },
    { code: "iw", name: "Hebrew", flag: "🇮🇱" },
    { code: "hi", name: "Hindi", flag: "🇮🇳" },
    { code: "hmn", name: "Hmong", flag: "🇨🇳" },
    { code: "hu", name: "Hungarian", flag: "🇭🇺" },
    { code: "is", name: "Icelandic", flag: "🇮🇸" },
    { code: "ig", name: "Igbo", flag: "🇳🇬" },
    { code: "ga", name: "Irish", flag: "🇮🇪" },
    { code: "it", name: "Italian", flag: "🇮🇹" },
    { code: "jw", name: "Javanese", flag: "🇮🇩" },
    { code: "kn", name: "Kannada", flag: "🇮🇳" },
    { code: "kk", name: "Kazakh", flag: "🇰🇿" },
    { code: "km", name: "Khmer", flag: "🇰🇭" },
    { code: "ku", name: "Kurdish", flag: "🇹🇷" },
    { code: "ky", name: "Kyrgyz", flag: "🇰🇬" },
    { code: "lo", name: "Lao", flag: "🇱🇦" },
    { code: "la", name: "Latin", flag: "🇻🇦" },
    { code: "lv", name: "Latvian", flag: "🇱🇻" },
    { code: "lt", name: "Lithuanian", flag: "🇱🇹" },
    { code: "lb", name: "Luxembourgish", flag: "🇱🇺" },
    { code: "mk", name: "Macedonian", flag: "🇲🇰" },
    { code: "mg", name: "Malagasy", flag: "🇲🇬" },
    { code: "ms", name: "Malay", flag: "🇲🇾" },
    { code: "ml", name: "Malayalam", flag: "🇮🇳" },
    { code: "mt", name: "Maltese", flag: "🇲🇹" },
    { code: "mi", name: "Maori", flag: "🇳🇿" },
    { code: "mr", name: "Marathi", flag: "🇮🇳" },
    { code: "mn", name: "Mongolian", flag: "🇲🇳" },
    { code: "my", name: "Myanmar (Burmese)", flag: "🇲🇲" },
    { code: "ne", name: "Nepali", flag: "🇳🇵" },
    { code: "no", name: "Norwegian", flag: "🇳🇴" },
    { code: "ps", name: "Pashto", flag: "🇦🇫" },
    { code: "fa", name: "Persian", flag: "🇮🇷" },
    { code: "pl", name: "Polish", flag: "🇵🇱" },
    { code: "pt", name: "Portuguese", flag: "🇵🇹" },
    { code: "pa", name: "Punjabi", flag: "🇮🇳" },
    { code: "ro", name: "Romanian", flag: "🇷🇴" },
    { code: "ru", name: "Russian", flag: "🇷🇺" },
    { code: "sm", name: "Samoan", flag: "🇼🇸" },
    { code: "gd", name: "Scots Gaelic", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
    { code: "sr", name: "Serbian", flag: "🇷🇸" },
    { code: "st", name: "Sesotho", flag: "🇱🇸" },
    { code: "sn", name: "Shona", flag: "🇿🇼" },
    { code: "sd", name: "Sindhi", flag: "🇵🇰" },
    { code: "si", name: "Sinhala", flag: "🇱🇰" },
    { code: "sk", name: "Slovak", flag: "🇸🇰" },
    { code: "sl", name: "Slovenian", flag: "🇸🇮" },
    { code: "so", name: "Somali", flag: "🇸🇴" },
    { code: "es", name: "Spanish", flag: "🇪🇸" },
    { code: "su", name: "Sundanese", flag: "🇮🇩" },
    { code: "sw", name: "Swahili", flag: "🇰🇪" },
    { code: "sv", name: "Swedish", flag: "🇸🇪" },
    { code: "tg", name: "Tajik", flag: "🇹🇯" },
    { code: "ta", name: "Tamil", flag: "🇮🇳" },
    { code: "te", name: "Telugu", flag: "🇮🇳" },
    { code: "th", name: "Thai", flag: "🇹🇭" },
    { code: "tr", name: "Turkish", flag: "🇹🇷" },
    { code: "uk", name: "Ukrainian", flag: "🇺🇦" },
    { code: "ur", name: "Urdu", flag: "🇵🇰" },
    { code: "uz", name: "Uzbek", flag: "🇺🇿" },
    { code: "vi", name: "Vietnamese", flag: "🇻🇳" },
    { code: "cy", name: "Welsh", flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿" },
    { code: "xh", name: "Xhosa", flag: "🇿🇦" },
    { code: "yi", name: "Yiddish", flag: "🇮🇱" },
    { code: "yo", name: "Yoruba", flag: "🇳🇬" },
    { code: "zu", name: "Zulu", flag: "🇿🇦" }
];

// --- LOGIKA UI (SEARCHABLE DROPDOWN) ---
const dropdownBtn = document.getElementById('dropdownBtn');
const dropdownMenu = document.getElementById('dropdownMenu');
const langSearch = document.getElementById('langSearch');
const langList = document.getElementById('langList');
const selectedLabel = document.getElementById('selectedLabel');
const targetLangInput = document.getElementById('targetLang'); // Hidden input

// Render List Bahasa awal
function renderLanguages(filter = "") {
    langList.innerHTML = "";
    const filtered = languages.filter(l => l.name.toLowerCase().includes(filter.toLowerCase()));
    
    if (filtered.length === 0) {
        langList.innerHTML = `<li class="px-3 py-2 text-xs text-slate-500 text-center">Tidak ditemukan</li>`;
        return;
    }

    filtered.forEach(lang => {
        const li = document.createElement('li');
        li.className = "flex items-center gap-2 px-3 py-2 text-sm hover:bg-white/10 cursor-pointer rounded-lg transition text-slate-300 hover:text-white";
        li.innerHTML = `<span>${lang.flag}</span> <span>${lang.name}</span>`;
        li.onclick = () => selectLanguage(lang);
        langList.appendChild(li);
    });
}

// Pilih Bahasa
function selectLanguage(lang) {
    targetLangInput.value = lang.code; // Update hidden input
    selectedLabel.innerHTML = `<span>${lang.flag}</span> ${lang.name}`;
    dropdownMenu.classList.add('hidden'); // Tutup menu
}

// Toggle Menu
function toggleDropdown(e) {
    e.stopPropagation();
    dropdownMenu.classList.toggle('hidden');
    if (!dropdownMenu.classList.contains('hidden')) {
        langSearch.value = "";
        renderLanguages();
        setTimeout(() => langSearch.focus(), 100);
    }
}

// Tutup Menu jika klik di luar
function closeDropdown(e) {
    if (!dropdownMenu.contains(e.target) && !dropdownBtn.contains(e.target)) {
        dropdownMenu.classList.add('hidden');
    }
}

// Filter saat ketik
function filterLanguages() {
    renderLanguages(langSearch.value);
}

// Init pertama kali
renderLanguages();


// --- ELEMEN UTAMA LAINNYA ---
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const loader = document.getElementById('loader');
const apiBadge = document.getElementById('apiBadge');
const apiName = document.getElementById('apiName');
const charCount = document.getElementById('charCount');

inputText.addEventListener('input', () => {
    charCount.innerText = inputText.value.length;
    inputText.style.height = 'auto'; 
    inputText.style.height = (inputText.scrollHeight) + 'px';
});

function speakText() {
    if (!outputText.value) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(outputText.value);
    utterance.lang = targetLangInput.value; // Ambil dari hidden input
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
}

function copyToClipboard() {
    if(outputText.value) {
        navigator.clipboard.writeText(outputText.value);
        const btn = event.currentTarget;
        const originalIcon = btn.innerHTML;
        btn.innerHTML = `<span class="text-green-400 text-xs font-bold">✓</span>`;
        setTimeout(() => btn.innerHTML = originalIcon, 1000);
    }
}

function clearText() {
    inputText.value = '';
    outputText.value = '';
    charCount.innerText = '0';
    apiBadge.classList.add('hidden');
    window.speechSynthesis.cancel();
    inputText.style.height = 'auto';
}

// --- ENGINE TERJEMAHAN (25+ SERVER GOD MODE) ---
async function translateEngine() {
    const text = inputText.value.trim();
    if (!text) {
        alert("Mohon ketik teks yang ingin diterjemahkan!");
        return;
    }

    outputText.value = "";
    outputText.placeholder = ""; 
    loader.classList.remove('hidden'); 
    apiBadge.classList.add('hidden');
    
    const sl = 'auto'; 
    const tl = targetLangInput.value; // Ambil dari hidden input

    // Helper Fetch
    const libreFetch = async (baseUrl, txt) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        try {
            const res = await fetch(baseUrl, {
                method: "POST",
                body: JSON.stringify({ q: txt, source: "auto", target: tl, format: "text" }),
                headers: { "Content-Type": "application/json" },
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            if (!res.ok) throw new Error('Down');
            const json = await res.json();
            return json.translatedText;
        } catch (e) { clearTimeout(timeoutId); throw e; }
    };

    // LIST SERVER (Sama seperti sebelumnya)
    const providers = [
        { name: "Server (Google GTX)", url: (t) => `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&q=${encodeURIComponent(t)}`, type: "google" },
        { name: "Server (Google Dict)", url: (t) => `https://translate.googleapis.com/translate_a/single?client=dict-chrome-ex&sl=${sl}&tl=${tl}&dt=t&q=${encodeURIComponent(t)}`, type: "google" },
        { name: "Server (Google Web)", url: (t) => `https://translate.googleapis.com/translate_a/single?client=webapp&sl=${sl}&tl=${tl}&dt=t&q=${encodeURIComponent(t)}`, type: "google" },
        { name: "Server (Lingva ML)", url: (t) => `https://lingva.ml/api/v1/${sl}/${tl}/${encodeURIComponent(t)}`, type: "lingva" },
        { name: "Server (Lingva SE)", url: (t) => `https://lingva.se/api/v1/${sl}/${tl}/${encodeURIComponent(t)}`, type: "lingva" },
        { name: "Server (Lingva Garuda)", url: (t) => `https://lingva.garudalinux.org/api/v1/${sl}/${tl}/${encodeURIComponent(t)}`, type: "lingva" },
        { name: "Server (Lingva PussTheCat)", url: (t) => `https://lingva.pussthecat.org/api/v1/${sl}/${tl}/${encodeURIComponent(t)}`, type: "lingva" },
        { name: "Server (Lingva Krivoklat)", url: (t) => `https://lingva.krivoklat.eu/api/v1/${sl}/${tl}/${encodeURIComponent(t)}`, type: "lingva" },
        { name: "Server (Lingva Nezumi)", url: (t) => `https://lingva.nezumi.ws/api/v1/${sl}/${tl}/${encodeURIComponent(t)}`, type: "lingva" },
        { name: "Server (Lingva Ploud)", url: (t) => `https://translate.ploud.jp/api/v1/${sl}/${tl}/${encodeURIComponent(t)}`, type: "lingva" },
        { name: "Server (MyMemory)", fn: async (t) => {
            const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(t)}&langpair=${sl}|${tl}`;
            const res = await fetch(url);
            const data = await res.json();
            if (data.responseStatus !== 200) throw new Error('Limit');
            return data.responseData.translatedText;
        }, type: "custom_fetch" },
        { name: "Server 12 (Libre DE)", fn: (t) => libreFetch("https://de.libretranslate.com/translate", t), type: "libre" },
        { name: "Server 13 (Libre Argos)", fn: (t) => libreFetch("https://translate.argosopentech.com/translate", t), type: "libre" },
        { name: "Server 14 (Libre Fedilab)", fn: (t) => libreFetch("https://translate.fedilab.app/translate", t), type: "libre" },
        { name: "Server 15 (Libre Terra)", fn: (t) => libreFetch("https://translate.terraprint.co/translate", t), type: "libre" },
        { name: "Server 16 (Libre Calyx)", fn: (t) => libreFetch("https://translate.calyxos.org/translate", t), type: "libre" },
        { name: "Server 17 (Libre Ataraxia)", fn: (t) => libreFetch("https://tr.ataraxiadev.com/translate", t), type: "libre" },
        { name: "Server 18 (Libre Zilly)", fn: (t) => libreFetch("https://trans.zillyhuhn.com/translate", t), type: "libre" },
        { name: "Server 19 (Libre PnlPal)", fn: (t) => libreFetch("https://api.pnlpal.dev/translate", t), type: "libre" },
        { name: "Server 20 (Libre Rontu)", fn: (t) => libreFetch("https://translate.rontu.ru/translate", t), type: "libre" },
        { name: "Server 21 (Libre Tchncs)", fn: (t) => libreFetch("https://translate.tchncs.de/translate", t), type: "libre" },
        { name: "Server 22 (Libre 766)", fn: (t) => libreFetch("https://translate.766.com/translate", t), type: "libre" },
        { name: "Server 23 (Libre Gorf)", fn: (t) => libreFetch("https://translate.gorf.club/translate", t), type: "libre" },
        { name: "Server 24 (Libre Castle)", fn: (t) => libreFetch("https://translate.fortress.one/translate", t), type: "libre" },
        { name: "Server 25 (Libre Haddock)", fn: (t) => libreFetch("https://translate.haddock.cc/translate", t), type: "libre" }
    ];

    let success = false;

    for (const provider of providers) {
        try {
            console.log(`Mencoba: ${provider.name}`);
            let resultText = "";

            if (provider.type === "google" || provider.type === "lingva") {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 3000);
                const response = await fetch(provider.url(text), { signal: controller.signal });
                clearTimeout(timeoutId);
                if (!response.ok) throw new Error('HTTP Error');
                const data = await response.json();
                resultText = (provider.type === "lingva") ? data.translation : data[0].map(x => x[0]).join('');
            } else if (provider.type === "custom_fetch" || provider.type === "libre") {
                resultText = await provider.fn(text);
            }

            if (resultText) {
                outputText.value = resultText;
                apiName.innerText = provider.name; 
                apiBadge.classList.remove('hidden');
                let colorClass = "text-purple-400 border-purple-500/30 bg-purple-500/10";
                if (provider.type === "google") colorClass = "text-green-400 border-green-500/30 bg-green-500/10";
                if (provider.type === "lingva") colorClass = "text-blue-400 border-blue-500/30 bg-blue-500/10";
                if (provider.type === "libre") colorClass = "text-orange-400 border-orange-500/30 bg-orange-500/10";
                apiBadge.className = `text-[10px] px-2 py-1 rounded-full border ${colorClass} font-mono`;
                success = true;
                break;
            }
        } catch (err) { console.warn(err); }
    }

    loader.classList.add('hidden'); 
    if (!success) {
        outputText.value = "Gagal terhubung ke semua server.";
        outputText.placeholder = "Error Koneksi.";
    }
}
