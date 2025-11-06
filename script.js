// اختيار عناصر الصفحة
const form = document.getElementById("calorieForm");
const resultDiv = document.getElementById("result");
const copyBtn = document.getElementById("copyBtn");
const dhikrBtn = document.getElementById("dhikrBtn");

// الاستماع لحدث إرسال النموذج
form.addEventListener("submit", function(e) {
    e.preventDefault(); // منع إعادة تحميل الصفحة

    // الحصول على القيم من المدخلات
    const age = parseInt(document.getElementById("age").value);
    const height = parseFloat(document.getElementById("height").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const gender = document.getElementById("gender").value;
    const activity = parseFloat(document.getElementById("activity").value);

    // التحقق من المدخلات
    if(isNaN(age) || isNaN(height) || isNaN(weight)) {
        alert("يرجى إدخال جميع القيم بشكل صحيح!");
        return;
    }

    // حساب السعرات حسب معادلة Harris-Benedict
    let bmr;
    if(gender === "male") {
        bmr = 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age);
    } else {
        bmr = 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age);
    }

    const calories = Math.round(bmr * activity);

    // عرض النتيجة
    resultDiv.style.display = "block";
    resultDiv.innerHTML = `🔥 عدد السعرات اليومية الموصى بها: <span>${calories}</span> سعر حراري`;

    // تغيير لون النتيجة حسب السعرات
    if(calories < 1800) {
        resultDiv.style.backgroundColor = "#d1f7c4"; // أخضر فاتح → قليل
    } else if(calories <= 2500) {
        resultDiv.style.backgroundColor = "#fff3b0"; // أصفر → متوسط
    } else {
        resultDiv.style.backgroundColor = "#ffb3b3"; // أحمر → عالي
    }

    // إظهار زر النسخ
    copyBtn.style.display = "inline-block";

    // حدث النسخ
    copyBtn.onclick = function() {
        const textToCopy = `عدد السعرات اليومية الموصى بها: ${calories} سعر حراري`;
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert("تم نسخ النتيجة!");
        });
    };
});

// زر الذكر
dhikrBtn.addEventListener("click", () => {
    const userDhikr = prompt("اكتب ذكرًا أو دعاءً تذكر الله به:");
    if (userDhikr && userDhikr.trim() !== "") {
        alert("جزاك الله خيرًا! ذكرك: " + userDhikr);
    } else {
        alert("لم يتم كتابة أي ذكر.");
    }
});
