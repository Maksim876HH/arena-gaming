// Dashboard JavaScript
let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', function() {
  loadAndDisplayBookings();
  setupFilterButtons();
});

function setupFilterButtons() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      filterButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      currentFilter = this.dataset.filter;
      displayBookings();
    });
  });
}

function loadAndDisplayBookings() {
  displayBookings();
}

function displayBookings() {
  const bookings = JSON.parse(localStorage.getItem('arena_bookings') || '[]');
  const bookingsList = document.getElementById('bookings-list');
  const emptyState = document.getElementById('empty-state');

  if (!bookings || bookings.length === 0) {
    bookingsList.style.display = 'none';
    emptyState.style.display = 'block';
    return;
  }

  const filteredBookings = filterBookings(bookings);

  if (filteredBookings.length === 0) {
    bookingsList.innerHTML = '';
    emptyState.style.display = 'block';
    emptyState.querySelector('h3').textContent = 'No bookings in this category';
    emptyState.querySelector('p').textContent = 'Try selecting a different filter';
    return;
  }

  bookingsList.style.display = 'grid';
  emptyState.style.display = 'none';
  bookingsList.innerHTML = '';

  filteredBookings.forEach(booking => {
    const bookingCard = createBookingCard(booking);
    bookingsList.appendChild(bookingCard);
  });
}

function filterBookings(bookings) {
  const now = new Date();

  return bookings.filter(booking => {
    const bookingDate = new Date(booking.selectedDate);

    if (currentFilter === 'all') return true;
    if (currentFilter === 'upcoming') return bookingDate > now && booking.status === 'confirmed';
    if (currentFilter === 'completed') return bookingDate < now;
    if (currentFilter === 'cancelled') return booking.status === 'cancelled';

    return true;
  }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function createBookingCard(booking) {
  const bookingDate = new Date(booking.selectedDate);
  const now = new Date();
  let status = booking.status;

  if (bookingDate < now && status === 'confirmed') {
    status = 'completed';
  }

  const dateStr = bookingDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const card = document.createElement('div');
  card.className = 'booking-card';
  card.onclick = () => showBookingDetails(booking);

  card.innerHTML = `
    <div class="booking-card-header">
      <div class="booking-card-title">
        <h3>${booking.selectedZone.name}</h3>
        <span class="booking-id">${booking.id}</span>
      </div>
      <span class="booking-status ${status}">${status.toUpperCase()}</span>
    </div>

    <div class="booking-card-details">
      <div class="booking-detail-item">
        <span class="booking-detail-label">Date</span>
        <span class="booking-detail-value">${dateStr}</span>
      </div>
      <div class="booking-detail-item">
        <span class="booking-detail-label">Time</span>
        <span class="booking-detail-value">${booking.selectedTime}</span>
      </div>
      <div class="booking-detail-item">
        <span class="booking-detail-label">Duration</span>
        <span class="booking-detail-value">${booking.selectedDuration}h</span>
      </div>
      <div class="booking-detail-item">
        <span class="booking-detail-label">Total Price</span>
        <span class="booking-detail-value highlight">$${booking.totalPrice}</span>
      </div>
    </div>

    <div class="booking-card-actions">
      <button class="booking-card-btn" onclick="event.stopPropagation(); viewBookingDetails('${booking.id}')">View Details</button>
      ${status === 'confirmed' ? `<button class="booking-card-btn danger" onclick="event.stopPropagation(); cancelBooking('${booking.id}')">Cancel</button>` : ''}
    </div>
  `;

  return card;
}

function showBookingDetails(booking) {
  const modal = document.getElementById('booking-details-modal');
  const content = document.getElementById('booking-details-content');

  const bookingDate = new Date(booking.selectedDate);
  const dateStr = bookingDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const endTime = calculateEndTime(booking.selectedTime, booking.selectedDuration);

  content.innerHTML = `
    <div class="detail-section">
      <h4>Booking Information</h4>
      <div class="detail-row">
        <span class="detail-row-label">Booking ID</span>
        <span class="detail-row-value" style="font-family: monospace; font-size: 13px;">${booking.id}</span>
      </div>
      <div class="detail-row">
        <span class="detail-row-label">Status</span>
        <span class="detail-row-value">${booking.status.toUpperCase()}</span>
      </div>
      <div class="detail-row">
        <span class="detail-row-label">Created</span>
        <span class="detail-row-value">${new Date(booking.createdAt).toLocaleDateString()}</span>
      </div>
    </div>

    <div class="detail-section">
      <h4>Gaming Session</h4>
      <div class="detail-row">
        <span class="detail-row-label">Zone</span>
        <span class="detail-row-value">${booking.selectedZone.name}</span>
      </div>
      <div class="detail-row">
        <span class="detail-row-label">Date</span>
        <span class="detail-row-value">${dateStr}</span>
      </div>
      <div class="detail-row">
        <span class="detail-row-label">Time</span>
        <span class="detail-row-value">${booking.selectedTime} - ${endTime}</span>
      </div>
      <div class="detail-row">
        <span class="detail-row-label">Duration</span>
        <span class="detail-row-value">${booking.selectedDuration} hour${booking.selectedDuration > 1 ? 's' : ''}</span>
      </div>
      <div class="detail-row">
        <span class="detail-row-label">Equipment</span>
        <span class="detail-row-value" style="font-size: 12px;">${booking.selectedZone.specs}</span>
      </div>
    </div>

    <div class="detail-section">
      <h4>Pricing Details</h4>
      <div class="detail-row">
        <span class="detail-row-label">Hourly Rate</span>
        <span class="detail-row-value">$${booking.selectedZone.price}/hour</span>
      </div>
      <div class="detail-row">
        <span class="detail-row-label">Hours</span>
        <span class="detail-row-value">${booking.selectedDuration}</span>
      </div>
      <div class="detail-row">
        <span class="detail-row-label">Total Amount</span>
        <span class="detail-row-value price">$${booking.totalPrice}</span>
      </div>
    </div>

    <div class="detail-section">
      <h4>Guest Information</h4>
      <div class="detail-row">
        <span class="detail-row-label">Name</span>
        <span class="detail-row-value">${booking.userInfo.name}</span>
      </div>
      <div class="detail-row">
        <span class="detail-row-label">Email</span>
        <span class="detail-row-value" style="font-size: 13px;">${booking.userInfo.email}</span>
      </div>
      <div class="detail-row">
        <span class="detail-row-label">Phone</span>
        <span class="detail-row-value">${booking.userInfo.phone}</span>
      </div>
    </div>

    <div class="qr-code-section">
      <h5>Entry Code (Show at Reception)</h5>
      <div class="qr-code" id="qr-code">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" fill="white"/>
          <text x="50" y="50" text-anchor="middle" font-size="8" fill="black">${booking.id.substring(0, 8)}</text>
        </svg>
      </div>
    </div>

    <div class="modal-actions">
      <button class="btn btn-primary" onclick="downloadBookingPDF('${booking.id}')">Download Receipt</button>
      <button class="btn btn-secondary" onclick="closeDetailsModal()">Close</button>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function viewBookingDetails(bookingId) {
  const bookings = JSON.parse(localStorage.getItem('arena_bookings') || '[]');
  const booking = bookings.find(b => b.id === bookingId);
  if (booking) {
    showBookingDetails(booking);
  }
}

function closeDetailsModal() {
  const modal = document.getElementById('booking-details-modal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function cancelBooking(bookingId) {
  if (confirm('Are you sure you want to cancel this booking?')) {
    const bookings = JSON.parse(localStorage.getItem('arena_bookings') || '[]');
    const bookingIndex = bookings.findIndex(b => b.id === bookingId);

    if (bookingIndex !== -1) {
      bookings[bookingIndex].status = 'cancelled';
      localStorage.setItem('arena_bookings', JSON.stringify(bookings));
      displayBookings();
      alert('Booking cancelled successfully');
    }
  }
}

function downloadBookingPDF(bookingId) {
  const bookings = JSON.parse(localStorage.getItem('arena_bookings') || '[]');
  const booking = bookings.find(b => b.id === bookingId);

  if (!booking) return;

  const bookingDate = new Date(booking.selectedDate);
  const dateStr = bookingDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const endTime = calculateEndTime(booking.selectedTime, booking.selectedDuration);

  let pdfContent = `
ARENA - Gaming Lounge Booking Receipt
=====================================

Booking ID: ${booking.id}
Date: ${dateStr}

BOOKING DETAILS
===============
Zone: ${booking.selectedZone.name}
Date: ${dateStr}
Time: ${booking.selectedTime} - ${endTime}
Duration: ${booking.selectedDuration} hours
Equipment: ${booking.selectedZone.specs}

PRICING
=======
Hourly Rate: $${booking.selectedZone.price}
Hours: ${booking.selectedDuration}
Total Amount: $${booking.totalPrice}

GUEST INFORMATION
=================
Name: ${booking.userInfo.name}
Email: ${booking.userInfo.email}
Phone: ${booking.userInfo.phone}

Status: ${booking.status.toUpperCase()}
Created: ${new Date(booking.createdAt).toLocaleString()}

Please show this receipt or your booking ID at the reception desk upon arrival.

Thank you for choosing ARENA!
  `;

  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(pdfContent));
  element.setAttribute('download', `ARENA_Booking_${booking.id}.txt`);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function calculateEndTime(startTime, duration) {
  const [hours, minutes] = startTime.split(':').map(Number);
  const endHours = hours + duration;
  const endMinutes = minutes;

  return `${String(endHours % 24).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
}

// Make functions global
window.viewBookingDetails = viewBookingDetails;
window.closeDetailsModal = closeDetailsModal;
window.cancelBooking = cancelBooking;
window.downloadBookingPDF = downloadBookingPDF;
