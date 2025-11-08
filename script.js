// script.js
// تأكد من تشغيل الكود بعد تحميل DOM بالكامل
document.addEventListener("DOMContentLoaded", function () {
  /* ------------------- حاسبة السعرات ------------------- */
  const calorieForm = document.getElementById("calorieForm");
  const resultDiv = document.getElementById("result");
  const copyBtn = document.getElementById("copyBtn");

  if (calorieForm && resultDiv) {
    calorieForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // جلب القيم من الحقول
      const age = parseInt(document.getElementById("age").value);
      const height = parseFloat(document.getElementById("height").value);
      const weight = parseFloat(document.getElementById("weight").value);
      const genderEl = document.getElementById("gender");
      const activityEl = document.getElementById("activity");

      // تحقق من وجود القيم والعناصر
      const gender = genderEl ? genderEl.value : "male";
      const activity = activityEl ? parseFloat(activityEl.value) : 1.2;

      if (isNaN(age) || isNaN(height) || isNaN(weight)) {
        alert("يرجى إدخال العمر والطول والوزن بشكل صحيح.");
        return;
      }

      // حساب BMR باستخدام معادلة Harris-Benedict (نسخة معدّلة)
      let bmr;
      if (gender === "male") {
        bmr = 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age);
      } else {
        bmr = 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age);
      }

      const calories = Math.round(bmr * activity);

      // عرض النتيجة وتحديث اللون حسب القيمة
      resultDiv.style.display = "block";
      resultDiv.innerHTML = `🔥 عدد السعرات اليومية الموصى بها: <span>${calories}</span> سعر حراري`;

      if (calories < 1800) {
        resultDiv.style.backgroundColor = "#d1f7c4"; // أخضر فاتح
      } else if (calories <= 2500) {
        resultDiv.style.backgroundColor = "#fff3b0"; // أصفر
      } else {
        resultDiv.style.backgroundColor = "#ffb3b3"; // أحمر
      }

      // إظهار زر النسخ إذا وُجد
      if (copyBtn) {
        copyBtn.style.display = "inline-block";
        // تحديث وظيفة النسخ لتنسخ النتيجة الحالية
        copyBtn.onclick = function () {
          const textToCopy = `عدد السعرات اليومية الموصى بها: ${calories} سعر حراري`;
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(textToCopy).then(
              () => alert("تم نسخ النتيجة!"),
              () => alert("فشل نسخ النتيجة.")
            );
          } else {
            // بديل قديم
            const textarea = document.createElement("textarea");
            textarea.value = textToCopy;
            document.body.appendChild(textarea);
            textarea.select();
            try {
              document.execCommand("copy");
              alert("تم نسخ النتيجة!");
            } catch {
              alert("فشل نسخ النتيجة.");
            }
            document.body.removeChild(textarea);
          }
        };
      }
    });
  }

  /* ------------------- حاسبة الماء (في water.html) ------------------- */
  const waterForm = document.getElementById("waterForm");
  const waterResult = document.getElementById("result"); // water.html يستخدم id=result أيضاً
  if (waterForm && waterResult) {
    // نستخدم closure محلي لتجنّب تداخل مع حاسبة السعرات
    waterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const weightInput = document.getElementById("weight");
      const weight = weightInput ? parseFloat(weightInput.value) : NaN;
      if (isNaN(weight) || weight <= 0) {
        alert("يرجى إدخال الوزن بشكل صحيح.");
        return;
      }
      const waterLiters = (weight * 0.033).toFixed(2);
      waterResult.style.display = "block";
      waterResult.innerHTML = `تحتاج إلى حوالي <strong>${waterLiters}</strong> لتر من الماء يوميًا.`;
      // لون افتراضي مناسب
      waterResult.style.backgroundColor = "#d1f7c4";
    });
  }

  /* ------------------- حاسبة الوجبات (meals.html) ------------------- */
  const mealForm = document.getElementById("mealForm");
  const mealResult = document.getElementById("result"); // meals.html يستخدم id=result أيضاً
  if (mealForm && mealResult) {
    mealForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const totalInput = document.getElementById("calories");
      const total = totalInput ? parseFloat(totalInput.value) : NaN;
      if (isNaN(total) || total <= 0) {
        alert("يرجى إدخال عدد السعرات بشكل صحيح.");
        return;
      }
      const breakfast = Math.round(total * 0.30);
      const lunch = Math.round(total * 0.40);
      const dinner = Math.round(total * 0.25);
      const snack = Math.round(total * 0.05);
      mealResult.style.display = "block";
      mealResult.innerHTML = `
        🍳 <strong>الفطور:</strong> ${breakfast} سعرة<br>
        🍛 <strong>الغداء:</strong> ${lunch} سعرة<br>
        🍲 <strong>العشاء:</strong> ${dinner} سعرة<br>
        🍫 <strong>السناك:</strong> ${snack} سعرة
      `;
      mealResult.style.backgroundColor = "#fff3b0";
    });
  }

  /* ------------------- حاسبة BMI (bmi.html) ------------------- */
  const bmiForm = document.getElementById("bmiForm");
  const bmiResult = document.getElementById("bmiResult");
  const copyBmiBtn = document.getElementById("copyBmiBtn");
  if (bmiForm && bmiResult) {
    bmiForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const heightCm = parseFloat(document.getElementById("bmiHeight").value);
      const weight = parseFloat(document.getElementById("bmiWeight").value);
      if (isNaN(heightCm) || isNaN(weight) || heightCm <= 0 || weight <= 0) {
        alert("يرجى إدخال القيم بشكل صحيح!");
        return;
      }
      const heightM = heightCm / 100;
      const bmi = (weight / (heightM * heightM)).toFixed(1);

      let status = "";
      if (bmi < 18.5) status = "نحيف 🟡";
      else if (bmi < 25) status = "وزن مثالي ✅";
      else if (bmi < 30) status = "وزن زائد 🟠";
      else status = "سمنة 🔴";

      bmiResult.style.display = "block";
      bmiResult.innerHTML = `📊 مؤشر كتلة الجسم: <strong>${bmi}</strong><br>الحالة: <strong>${status}</strong>`;

      if (bmi < 18.5) bmiResult.style.backgroundColor = "#fff3b0";
      else if (bmi < 25) bmiResult.style.backgroundColor = "#d1f7c4";
      else if (bmi < 30) bmiResult.style.backgroundColor = "#ffe8d6";
      else bmiResult.style.backgroundColor = "#ffb3b3";

      if (copyBmiBtn) {
        copyBmiBtn.style.display = "inline-block";
        copyBmiBtn.onclick = function () {
          const text = `BMI: ${bmi} (${status})`;
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(
              () => alert("تم نسخ النتيجة ✅"),
              () => alert("فشل نسخ النتيجة.")
            );
          } else {
            const ta = document.createElement("textarea");
            ta.value = text;
            document.body.appendChild(ta);
            ta.select();
            try { document.execCommand("copy"); alert("تم النسخ ✅"); }
            catch { alert("فشل النسخ"); }
            document.body.removeChild(ta);
          }
        };
      }
    });
  }
});
