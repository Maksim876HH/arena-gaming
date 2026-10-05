// Booking System JavaScript
const bookingState = {
  selectedDate: null,
  selectedTime: null,
  selectedDuration: 2,
  selectedZone: null,
  userInfo: {
    name: '',
    email: '',
    phone: ''
  }
};

const zones = [
  {
    id: 'vip',
    name: 'VIP ARENA',
    price: 24,
    specs: 'RTX 4090 • 240Hz Monitors • Private Booths',
    maxSlots: 3
  },
  {
    id: 'bootcamp',
    name: 'Bootcamps',
    price: 18,
    specs: 'Pro Coaching • Ranked Matches • Team Events',
    maxSlots: 5
  },
  {
    id: 'ps5',
    name: 'PS5 Lounge',
    price: 15,
    specs: 'Tournaments • Streaming Setup • Arcade Feel',
    maxSlots: 6
  },
  {
    id: 'streaming',
    name: 'Streaming Studio',
    price: 20,
    specs: '4K Cameras • Green Screen • Audio Mixing',
    maxSlots: 2
  },
  {
    id: 'tournament',
    name: 'Tournament Arena',
    price: 28,
    specs: 'Large Display • Live Commentary • Spectator Seating',
    maxSlots: 4
  }
];

// Initialize booking system
document.addEventListener('DOMContentLoaded', function() {
  const bookBtn = document.querySelector('.btn-primary');
  if (bookBtn && bookBtn.textContent.includes('Book')) {
    bookBtn.onclick = function(e) {
      e.preventDefault();
      openBookingModal();
    };
  }

  initializeBookingCalendar();
});

function openBookingModal() {
  const modal = document.getElementById('booking-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeBookingModal() {
  const modal = document.getElementById('booking-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    resetBookingState();
  }
}

function resetBookingState() {
  bookingState.selectedDate = null;
  bookingState.selectedTime = null;
  bookingState.selectedDuration = 2;
  bookingState.selectedZone = null;
  bookingState.userInfo = { name: '', email: '', phone: '' };

  showStep('date');
}

function initializeBookingCalendar() {
  renderCalendar(new Date());
}

function renderCalendar(date) {
  const calendarContainer = document.getElementById('booking-calendar');
  if (!calendarContainer) return;

  calendarContainer.innerHTML = '';

  const header = document.createElement('div');
  header.className = 'calendar-header';
  header.innerHTML = `
    <button onclick="previousMonth()">←</button>
    <h4 id="month-year"></h4>
    <button onclick="nextMonth()">→</button>
  `;
  calendarContainer.appendChild(header);

  const monthYear = document.getElementById('month-year');
  if (monthYear) {
    monthYear.textContent = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  weekdays.forEach(day => {
    const dayEl = document.createElement('div');
    dayEl.className = 'calendar-weekday';
    dayEl.textContent = day;
    calendarContainer.appendChild(dayEl);
  });

  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const daysInPrevMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

  for (let i = firstDay - 1; i >= 0; i--) {
    const dayEl = document.createElement('div');
    dayEl.className = 'calendar-day other-month';
    dayEl.textContent = daysInPrevMonth - i;
    calendarContainer.appendChild(dayEl);
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let day = 1; day <= daysInMonth; day++) {
    const dayEl = document.createElement('div');
    const currentDate = new Date(date.getFullYear(), date.getMonth(), day);

    dayEl.className = 'calendar-day';
    dayEl.textContent = day;

    if (currentDate < today) {
      dayEl.classList.add('disabled');
    } else {
      dayEl.addEventListener('click', () => selectDate(currentDate));

      if (bookingState.selectedDate &&
          bookingState.selectedDate.toDateString() === currentDate.toDateString()) {
        dayEl.classList.add('selected');
      }

      if (currentDate.toDateString() === today.toDateString()) {
        dayEl.classList.add('today');
      }
    }

    calendarContainer.appendChild(dayEl);
  }

  const remainingDays = 42 - (firstDay + daysInMonth);
  for (let day = 1; day <= remainingDays; day++) {
    const dayEl = document.createElement('div');
    dayEl.className = 'calendar-day other-month';
    dayEl.textContent = day;
    calendarContainer.appendChild(dayEl);
  }
}

function selectDate(date) {
  bookingState.selectedDate = date;
  renderCalendar(date);
  showStep('time');
}

function goToZoneSelection() {
  const time = document.getElementById('booking-time').value;
  const duration = document.getElementById('booking-duration').value;

  if (!time) {
    alert('Please select a time');
    return;
  }

  bookingState.selectedTime = time;
  bookingState.selectedDuration = parseInt(duration);

  populateZoneAvailability();
  showStep('zone');
}

function populateZoneAvailability() {
  const container = document.getElementById('zone-availability');
  if (!container) return;

  container.innerHTML = '';

  zones.forEach(zone => {
    const availableSlots = Math.floor(Math.random() * zone.maxSlots) + 1;
    const isAvailable = availableSlots > 0;

    const zoneEl = document.createElement('div');
    zoneEl.className = `zone-option ${isAvailable ? '' : 'unavailable'}`;

    let statusClass = 'available';
    let statusText = `${availableSlots}/${zone.maxSlots} slots available`;

    if (availableSlots <= 1) {
      statusClass = 'limited';
      statusText = `${availableSlots}/${zone.maxSlots} slot available`;
    }

    zoneEl.innerHTML = `
      <h4>${zone.name}</h4>
      <p>${zone.specs}</p>
      <div class="zone-price">$${zone.price}/hour</div>
      <span class="zone-availability-status ${statusClass}">${statusText}</span>
    `;

    if (!isAvailable) {
      zoneEl.style.pointerEvents = 'none';
    } else {
      zoneEl.addEventListener('click', () => selectZone(zone));
      if (bookingState.selectedZone && bookingState.selectedZone.id === zone.id) {
        zoneEl.classList.add('selected');
      }
    }

    container.appendChild(zoneEl);
  });
}

function selectZone(zone) {
  bookingState.selectedZone = zone;
  populateZoneAvailability();
  goToReview();
}

function goToReview() {
  if (!bookingState.selectedZone) {
    alert('Please select a zone');
    return;
  }

  const dateStr = bookingState.selectedDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  document.getElementById('review-datetime').textContent =
    `${dateStr} at ${bookingState.selectedTime}`;

  document.getElementById('review-zone').textContent =
    bookingState.selectedZone.name;

  document.getElementById('review-duration').textContent =
    `${bookingState.selectedDuration} hour${bookingState.selectedDuration > 1 ? 's' : ''}`;

  const totalPrice = bookingState.selectedZone.price * bookingState.selectedDuration;
  document.getElementById('review-price').textContent = `$${totalPrice}`;

  showStep('review');
}

function completeBooking() {
  const name = document.getElementById('user-name').value;
  const email = document.getElementById('user-email').value;
  const phone = document.getElementById('user-phone').value;

  if (!name || !email || !phone) {
    alert('Please fill in all fields');
    return;
  }

  if (!isValidEmail(email)) {
    alert('Please enter a valid email');
    return;
  }

  bookingState.userInfo = { name, email, phone };

  const bookingId = generateBookingId();
  const totalPrice = bookingState.selectedZone.price * bookingState.selectedDuration;

  // Save booking to localStorage (for demo - in real app use backend)
  const bookings = JSON.parse(localStorage.getItem('arena_bookings') || '[]');
  bookings.push({
    id: bookingId,
    ...bookingState,
    totalPrice,
    status: 'confirmed',
    createdAt: new Date().toISOString()
  });
  localStorage.setItem('arena_bookings', JSON.stringify(bookings));

  showConfirmation(bookingId, totalPrice);
}

function showConfirmation(bookingId, totalPrice) {
  const dateStr = bookingState.selectedDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const confirmationDetails = document.getElementById('confirmation-details');
  if (confirmationDetails) {
    confirmationDetails.innerHTML = `
      <p><strong>Booking ID:</strong> ${bookingId}</p>
      <p><strong>Date:</strong> ${dateStr}</p>
      <p><strong>Time:</strong> ${bookingState.selectedTime}</p>
      <p><strong>Duration:</strong> ${bookingState.selectedDuration} hours</p>
      <p><strong>Zone:</strong> ${bookingState.selectedZone.name}</p>
      <p><strong>Total Price:</strong> $${totalPrice}</p>
      <p style="margin-top: 16px; color: #00d9ff;"><strong>A confirmation email has been sent to ${bookingState.userInfo.email}</strong></p>
    `;
  }

  // In real app, send email here using backend
  sendConfirmationEmail(bookingState.userInfo.email, {
    bookingId,
    dateStr,
    time: bookingState.selectedTime,
    duration: bookingState.selectedDuration,
    zone: bookingState.selectedZone.name,
    totalPrice,
    name: bookingState.userInfo.name
  });

  showStep('confirmation');
}

function sendConfirmationEmail(email, details) {
  // Demo: log to console (in real app, call backend API)
  console.log('Sending confirmation email to:', email, details);

  // In production, this would be:
  // fetch('/api/send-confirmation', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ email, details })
  // });
}

function showStep(stepName) {
  document.querySelectorAll('.booking-step').forEach(step => {
    step.classList.add('hidden');
  });

  const stepEl = document.getElementById(`step-${stepName}`);
  if (stepEl) {
    stepEl.classList.remove('hidden');
  }
}

function previousMonth() {
  const monthYear = document.getElementById('month-year');
  if (!monthYear) return;

  const currentMonth = new Date(monthYear.textContent);
  const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
  renderCalendar(prevMonth);
}

function nextMonth() {
  const monthYear = document.getElementById('month-year');
  if (!monthYear) return;

  const currentMonth = new Date(monthYear.textContent);
  const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1);
  renderCalendar(nextMonth);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function generateBookingId() {
  return 'BK-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 5).toUpperCase();
}

// Make functions global
window.openBookingModal = openBookingModal;
window.closeBookingModal = closeBookingModal;
window.goToZoneSelection = goToZoneSelection;
window.goToReview = goToReview;
window.completeBooking = completeBooking;
window.previousMonth = previousMonth;
window.nextMonth = nextMonth;
window.selectDate = selectDate;
window.selectZone = selectZone;
