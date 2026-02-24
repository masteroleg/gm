// --- Mobile menu open/close ---
document.getElementById('burgerBtn').addEventListener('click', function () {
    document.getElementById('mainNav').classList.remove('hidden');
});
// Закрытие меню
document.getElementById('closeMenu').addEventListener('click', function () {
    document.getElementById('mainNav').classList.add('hidden');
});
   
