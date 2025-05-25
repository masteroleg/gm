// --- Language toggle and translations ---
const langToggle = document.getElementById("langToggle");
const langLabel = document.getElementById("langLabel");

const translations = {
	en: {
		lang: "EN",
		h1: "Trust built <span class='text-brand font-extrabold'>through transparency.</span>",
		p: "Consumer loyalty through enhanced transparency",
		qr: "SCAN TO VERIFY",
		tagline: 'Not fake. Not <span class="italic">“maybe”</span>. Just <span class="font-semibold">genu.im</span>.'
	},
	ua: {
		lang: "UA",
		h1: "Прозорість формує <span class='text-brand font-extrabold'>довіру.</span>",
		p: "Лояльність споживачів через повну прозорість",
		qr: "СКАНУЙТЕ, ЩОБ ПЕРЕВІРИТИ",
		tagline: 'Не фейк. Не <span class="italic">“можливо”</span>. Просто <span class="font-semibold">genu.im</span>.'
	}
};

let currentLang = "en";

function setLang(lang) {
	const t = translations[lang];
	langLabel.textContent = t.lang;
	document.documentElement.lang = lang;
	document.getElementById("heroText").innerHTML = t.h1;
	document.getElementById("heroSub").textContent = t.p;
	document.getElementById("qrLabel").textContent = t.qr;
	document.getElementById("tagline").innerHTML = t.tagline;
}

langToggle.addEventListener("click", () => {
	currentLang = currentLang === "en" ? "ua" : "en";
	setLang(currentLang);
});

// IP Detection
fetch("https://ipapi.co/json")
	.then(res => res.json())
	.then(data => {
		const country = data.country_code;
		currentLang = country === "UA" ? "ua" : "en";
		setLang(currentLang);
	})
	.catch(() => setLang(currentLang)); // fallback

// --- Theme toggle ---
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("change", () => {
	document.documentElement.classList.toggle("dark");
});

// Load system theme
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
	document.documentElement.classList.add("dark");
	themeToggle.checked = true;
}
