// بيانات التبرعات
let donations = {
    totalDonations: 0,
    mealsDonated: 0,
    clothesDonated: 0,
    educationDonated: 0,
};

// نظام النقاط
let userPoints = 0;

// دالة التبرع
function donate(activity) {
    let amount = prompt(`كم تريد التبرع لنشاط "${activity}"؟ (بالدينار الأردني)`);

    if (amount && !isNaN(amount) && amount > 0) {
        amount = parseFloat(amount);
        donations.totalDonations += amount;

        // تحديث الإحصائيات بناءً على النشاط
        switch (activity) {
            case "وجبات الإفطار":
                donations.mealsDonated += amount;
                break;
            case "كسوة العيد":
                donations.clothesDonated += amount;
                break;
            case "التعليم":
                donations.educationDonated += amount;
                break;
        }

        // إضافة نقاط للمستخدم
        userPoints += Math.floor(amount / 10); // 10 ريالات = 1 نقطة
        alert(`شكرًا لتبرعك بمبلغ ${amount} ريال لنشاط "${activity}".\nلقد حصلت على ${Math.floor(amount / 10)} نقاط!`);

        // تحديث الإحصائيات على الصفحة
        updateStatistics();
    } else {
        alert("الرجاء إدخال مبلغ صحيح.");
    }
}

// دالة تحديث الإحصائيات
function updateStatistics() {
    document.getElementById("totalDonations").innerText = donations.totalDonations.toLocaleString();
    document.getElementById("mealsDonated").innerText = donations.mealsDonated.toLocaleString();
    document.getElementById("clothesDonated").innerText = donations.clothesDonated.toLocaleString();
    document.getElementById("educationDonated").innerText = donations.educationDonated.toLocaleString();
    document.getElementById("userPoints").innerText = userPoints;
}

// دالة لإظهار/إخفاء القائمة
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// تحديث الإحصائيات عند تحميل الصفحة
window.onload = updateStatistics;