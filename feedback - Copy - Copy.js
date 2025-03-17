document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // يمكنك هنا إضافة كود لإرسال البيانات إلى الخادم
    // مثلاً باستخدام fetch أو XMLHttpRequest

    // إخفاء النموذج وإظهار رسالة الشكر
    document.getElementById('feedbackForm').classList.add('hidden');
    document.getElementById('thankYouMessage').classList.remove('hidden');
});