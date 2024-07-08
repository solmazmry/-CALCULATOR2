// Toggling üçün "checkbox" və konteyneri tapırıq
const toggleMode = document.getElementById("toggle-mode");
const container = document.querySelector(".container");

// Toggling event-i dinləyici əlavə edirik
toggleMode.addEventListener("change", () => {
  container.classList.toggle("dark-mode"); // (yəni dark mode aktiv/inaktiv edilir).
});

// Bu funksiya klaviatura düymələrinin basılmasını idarə edir
const handleKeyPress = (key) => {
  if (/[0-9]/.test(key)) handleButtonPress(key);
  if (/[\+\-\*\/%]/.test(key)) handleButtonPress(key);
};

// Bu funksiya verilən dəyər üçün kalkulyator düyməsini basmağı simulyasiya edir
const handleButtonPress = (value) => {
  // Bu value, basılmaq istənilən kalkulyator düyməsinin üzərində yazılmış dəyərdir.

  const button = Array.from(document.querySelectorAll("button")).find(
    //array-də dövr edir və innerText (düymənin üzərindəki mətn) dəyəri verilən value ilə eyni olan ilk düyməni tapır.
    //find metodu tapılan ilk uyğun elementi qaytarır. Əgər uyğun element tapılmasa, undefined qaytarır.
    (btn) => btn.innerText === value //
  );
  if (button) button.click();
  //Əgər find metodu uyğun bir düymə taparsa (button dəyişəni undefined deyil), bu düymənin click metodunu çağırır.
};

// "C" düyməsi üçün hamısını təmizləyən funksiya
const clearAll = () => {
  document.getElementById("answer").value = "";
};

// "CE" düyməsi üçün son girişi silən funksiya
const deleteLastEntry = () => {
  const answer = document.getElementById("answer");
  answer.value = answer.value.slice(0, -1);
};

// Düymələrə funksionallıq əlavə edirik
document.querySelectorAll("button").forEach((button) => {
  // button elementlərini seçir və onları bir NodeList şəklində qaytarır.
  //.forEach((button) => { ... }) metodu ilə bu düymələrin hər birinə funksionallıq əlavə edirik.
  button.addEventListener("click", () => {
    const value = button.innerText; // düymənin üzərində yazılan mətn (dəyər) alınır.
    const answer = document.getElementById("answer");

    if (value === "C") {
      clearAll();
    } else if (value === "CE") {
      deleteLastEntry();
    } else if (value === "=") {
      try {
        // Hesablama aparmaq üçün eval funksiyasından istifadə edirik
        const expression = answer.value.replace("X", "*").replace("%", "/100");
        answer.value = eval(expression);
      } catch {
        answer.value = "Error"; // Xəta baş verərsə, "Error" yazdırırıq
      }
    } else {
      // Digər hallarda, düymənin dəyərini ekranın sonuna əlavə edirik
      answer.value += value;
    }
  });
});