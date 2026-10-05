// Pricing Tab Switcher
document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const pricingContent = document.getElementById("pricing-content");

  const pricingData = {
    hourly: [
      { name: "Standard", price: "$12", desc: "Per hour" },
      { name: "VIP", price: "$24", desc: "Per hour" },
      { name: "Bootcamp", price: "$18", desc: "Per hour" },
    ],
    daily: [
      { name: "Standard", price: "$85", desc: "Per day" },
      { name: "VIP", price: "$170", desc: "Per day" },
      { name: "Bootcamp", price: "$125", desc: "Per day" },
    ],
    monthly: [
      { name: "Standard", price: "$280", desc: "Unlimited" },
      { name: "VIP", price: "$560", desc: "Unlimited" },
      { name: "Bootcamp", price: "$420", desc: "Unlimited" },
    ],
  };

  function renderPricing(type) {
    pricingContent.innerHTML = pricingData[type]
      .map(
        (plan) => `
                <div class="price-card">
                    <h3>${plan.name}</h3>
                    <p class="price-desc">${plan.desc}</p>
                    <div class="price-amount">${plan.price}</div>
                    <button class="btn btn-primary-small" onclick="openBookingModal()">Select Plan</button>
                </div>
            `,
      )
      .join("");
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Update active state
      tabButtons.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      // Update pricing content
      const tab = this.getAttribute("data-tab");
      renderPricing(tab);
    });
  });

  // Zone pricing data
  const zonePrices = {
    vip: 24,
    bootcamp: 18,
    ps5: 12,
    streaming: 30,
    tournament: 40,
    casual: 8,
    vr: 25,
  };

  // Reservation form calculator
  const zoneSelect = document.getElementById("zone-select");
  const durationSelect = document.getElementById("duration");
  const rateDisplay = document.getElementById("rate-display");
  const durationDisplay = document.getElementById("duration-display");
  const totalPriceDisplay = document.getElementById("total-price");
  const reservationForm = document.querySelector(".reservation-form");

  function updatePrice() {
    const selectedZone = zoneSelect.value;
    const selectedDuration = durationSelect.value;

    if (selectedZone && selectedDuration) {
      const hourlyRate = zonePrices[selectedZone];
      const duration = parseInt(selectedDuration);
      const totalPrice = hourlyRate * duration;

      rateDisplay.textContent = `$${hourlyRate}`;
      durationDisplay.textContent = `${duration} hour${duration > 1 ? "s" : ""}`;
      totalPriceDisplay.textContent = `$${totalPrice}`;
    } else {
      rateDisplay.textContent = "$0";
      durationDisplay.textContent = "0 hours";
      totalPriceDisplay.textContent = "$0";
    }
  }

  zoneSelect.addEventListener("change", updatePrice);
  durationSelect.addEventListener("change", updatePrice);

  // Form submission
  reservationForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = {
      zone: zoneSelect.value,
      date: document.getElementById("reservation-date").value,
      time: document.getElementById("reservation-time").value,
      duration: durationSelect.value,
      players: document.getElementById("players").value,
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      totalPrice: totalPriceDisplay.textContent,
    };

    console.log("Reservation submitted:", formData);
    alert(
      `Reservation confirmed!\n\nZone: ${zoneSelect.options[zoneSelect.selectedIndex].text}\nDate: ${formData.date}\nTime: ${formData.time}\nTotal: ${formData.totalPrice}\n\nConfirmation sent to ${formData.email}`,
    );

    reservationForm.reset();
    updatePrice();
  });
});
