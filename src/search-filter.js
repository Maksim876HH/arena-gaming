// Search & Filter System
const zonesData = [
  {
    id: 'vip',
    name: 'VIP ARENA',
    price: 24,
    specs: 'RTX 4090 • 240Hz Monitors • Private Booths',
    maxSlots: 3,
    equipment: ['rtx'],
    gameType: ['competitive', 'tournament'],
    popularity: 95,
    rating: 4.9,
    availability: 'available'
  },
  {
    id: 'bootcamp',
    name: 'Bootcamps',
    price: 18,
    specs: 'Pro Coaching • Ranked Matches • Team Events',
    maxSlots: 5,
    equipment: ['rtx'],
    gameType: ['competitive', 'tournament'],
    popularity: 88,
    rating: 4.7,
    availability: 'available'
  },
  {
    id: 'ps5',
    name: 'PS5 Lounge',
    price: 15,
    specs: 'Tournaments • Streaming Setup • Arcade Feel',
    maxSlots: 6,
    equipment: ['console', 'streaming'],
    gameType: ['casual', 'competitive'],
    popularity: 82,
    rating: 4.5,
    availability: 'available'
  },
  {
    id: 'streaming',
    name: 'Streaming Studio',
    price: 20,
    specs: '4K Cameras • Green Screen • Audio Mixing',
    maxSlots: 2,
    equipment: ['streaming'],
    gameType: ['casual'],
    popularity: 76,
    rating: 4.8,
    availability: 'limited'
  },
  {
    id: 'tournament',
    name: 'Tournament Arena',
    price: 28,
    specs: 'Large Display • Live Commentary • Spectator Seating',
    maxSlots: 4,
    equipment: ['rtx'],
    gameType: ['tournament', 'competitive'],
    popularity: 91,
    rating: 4.9,
    availability: 'available'
  }
];

let filteredZones = [...zonesData];
let activeFilters = {
  search: '',
  priceMax: 50,
  availability: ['available', 'limited', 'unavailable'],
  equipment: [],
  gameType: [],
  sort: 'default'
};

document.addEventListener('DOMContentLoaded', function() {
  initializeFilters();
  applyFilters();
});

function initializeFilters() {
  // Search
  const searchInput = document.getElementById('zone-search');
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      activeFilters.search = e.target.value.toLowerCase();
      applyFilters();
    });
  }

  // Price slider
  const priceSlider = document.getElementById('price-filter');
  if (priceSlider) {
    priceSlider.addEventListener('input', function(e) {
      activeFilters.priceMax = parseInt(e.target.value);
      document.getElementById('price-value').textContent = `$${activeFilters.priceMax}+`;
      applyFilters();
    });
  }

  // Availability filter
  const availabilityFilters = document.querySelectorAll('.availability-filter');
  availabilityFilters.forEach(filter => {
    filter.addEventListener('change', function() {
      updateCheckboxFilter('availability', 'availability-filter');
      applyFilters();
    });
  });

  // Equipment filter
  const equipmentFilters = document.querySelectorAll('.equipment-filter');
  equipmentFilters.forEach(filter => {
    filter.addEventListener('change', function() {
      updateCheckboxFilter('equipment', 'equipment-filter');
      applyFilters();
    });
  });

  // Game Type filter
  const gameFilters = document.querySelectorAll('.game-filter');
  gameFilters.forEach(filter => {
    filter.addEventListener('change', function() {
      updateCheckboxFilter('gameType', 'game-filter');
      applyFilters();
    });
  });

  // Sort
  const sortSelect = document.getElementById('sort-by');
  if (sortSelect) {
    sortSelect.addEventListener('change', function(e) {
      activeFilters.sort = e.target.value;
      applyFilters();
    });
  }
}

function updateCheckboxFilter(filterType, className) {
  const checkboxes = document.querySelectorAll(`.${className}:checked`);
  activeFilters[filterType] = Array.from(checkboxes).map(cb => cb.value);
}

function applyFilters() {
  // Start with all zones
  filteredZones = zonesData.filter(zone => {
    // Search filter
    if (activeFilters.search && !zone.name.toLowerCase().includes(activeFilters.search)) {
      return false;
    }

    // Price filter
    if (zone.price > activeFilters.priceMax) {
      return false;
    }

    // Availability filter
    if (activeFilters.availability.length > 0 && !activeFilters.availability.includes(zone.availability)) {
      return false;
    }

    // Equipment filter
    if (activeFilters.equipment.length > 0) {
      const hasEquipment = activeFilters.equipment.some(eq => zone.equipment.includes(eq));
      if (!hasEquipment) return false;
    }

    // Game Type filter
    if (activeFilters.gameType.length > 0) {
      const hasGameType = activeFilters.gameType.some(gt => zone.gameType.includes(gt));
      if (!hasGameType) return false;
    }

    return true;
  });

  // Apply sorting
  sortZones();

  // Display results
  displayFilteredZones();
  updateActiveFiltersDisplay();
}

function sortZones() {
  switch (activeFilters.sort) {
    case 'price-low':
      filteredZones.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filteredZones.sort((a, b) => b.price - a.price);
      break;
    case 'popularity':
      filteredZones.sort((a, b) => b.popularity - a.popularity);
      break;
    case 'rating':
      filteredZones.sort((a, b) => b.rating - a.rating);
      break;
    case 'availability':
      const availabilityOrder = { 'available': 0, 'limited': 1, 'unavailable': 2 };
      filteredZones.sort((a, b) => availabilityOrder[a.availability] - availabilityOrder[b.availability]);
      break;
    default:
      // Default order - keep original
      filteredZones.sort((a, b) => zonesData.indexOf(a) - zonesData.indexOf(b));
  }
}

function displayFilteredZones() {
  const zonesGrid = document.querySelector('.zones-grid-modern');
  if (!zonesGrid) return;

  // Hide all current zone cards
  const allCards = zonesGrid.querySelectorAll('.zone-card-modern');
  allCards.forEach(card => {
    card.classList.add('filtered-out');
  });

  if (filteredZones.length === 0) {
    // Show no results message
    if (!document.querySelector('.no-results')) {
      const noResults = document.createElement('div');
      noResults.className = 'no-results';
      noResults.innerHTML = `
        <div class="no-results-icon">🔍</div>
        <h3>No zones found</h3>
        <p>Try adjusting your filters or search criteria</p>
        <button class="btn btn-primary" onclick="resetAllFilters()">Reset Filters</button>
      `;
      zonesGrid.parentElement.appendChild(noResults);
    }
  } else {
    // Remove no results message if it exists
    const noResults = document.querySelector('.no-results');
    if (noResults) {
      noResults.remove();
    }

    // Show filtered zone cards
    filteredZones.forEach(zone => {
      const card = zonesGrid.querySelector(`[data-zone="${zone.id}"]`);
      if (card) {
        card.classList.remove('filtered-out');
        // Update popularity badge if exists
        updatePopularityBadge(card, zone);
      }
    });
  }

  // Show results counter
  updateResultsCounter();
}

function updatePopularityBadge(card, zone) {
  let badge = card.querySelector('.zone-popularity-badge');
  if (!badge) {
    badge = document.createElement('div');
    badge.className = 'zone-popularity-badge';
    card.querySelector('.zone-image').appendChild(badge);
  }

  if (zone.popularity >= 90) {
    badge.textContent = '⭐ Trending';
  } else if (zone.popularity >= 80) {
    badge.textContent = '🔥 Popular';
  } else {
    badge.textContent = '✨ New';
  }
}

function updateActiveFiltersDisplay() {
  const activeFiltersDiv = document.getElementById('active-filters');
  const filterTags = document.getElementById('filter-tags');

  const activeFiltersList = [];

  if (activeFilters.search) {
    activeFiltersList.push({ type: 'search', label: `Search: "${activeFilters.search}"` });
  }

  if (activeFilters.priceMax < 50) {
    activeFiltersList.push({ type: 'price', label: `Max $${activeFilters.priceMax}/hr` });
  }

  activeFilters.availability.forEach(av => {
    const label = av.charAt(0).toUpperCase() + av.slice(1);
    activeFiltersList.push({ type: 'availability', value: av, label });
  });

  activeFilters.equipment.forEach(eq => {
    const labels = {
      'rtx': 'RTX GPU',
      'streaming': 'Streaming Setup',
      'console': 'Console'
    };
    activeFiltersList.push({ type: 'equipment', value: eq, label: labels[eq] });
  });

  activeFilters.gameType.forEach(gt => {
    const label = gt.charAt(0).toUpperCase() + gt.slice(1);
    activeFiltersList.push({ type: 'gameType', value: gt, label });
  });

  if (activeFiltersList.length > 0) {
    activeFiltersDiv.style.display = 'flex';
    filterTags.innerHTML = activeFiltersList.map(filter => `
      <div class="filter-tag">
        ${filter.label}
        <button onclick="removeFilter('${filter.type}', '${filter.value || ''}')" title="Remove">×</button>
      </div>
    `).join('');
  } else {
    activeFiltersDiv.style.display = 'none';
  }
}

function removeFilter(filterType, value) {
  if (filterType === 'search') {
    activeFilters.search = '';
    document.getElementById('zone-search').value = '';
  } else if (filterType === 'price') {
    activeFilters.priceMax = 50;
    document.getElementById('price-filter').value = 50;
    document.getElementById('price-value').textContent = '$50+';
  } else if (filterType === 'availability' || filterType === 'equipment' || filterType === 'gameType') {
    const index = activeFilters[filterType].indexOf(value);
    if (index > -1) {
      activeFilters[filterType].splice(index, 1);
    }
    // Uncheck the checkbox
    const selector = filterType === 'availability' ? '.availability-filter' :
                    filterType === 'equipment' ? '.equipment-filter' : '.game-filter';
    const checkbox = document.querySelector(`${selector}[value="${value}"]`);
    if (checkbox) {
      checkbox.checked = false;
    }
  }

  applyFilters();
}

function resetAllFilters() {
  // Reset all filter states
  activeFilters = {
    search: '',
    priceMax: 50,
    availability: ['available', 'limited', 'unavailable'],
    equipment: [],
    gameType: [],
    sort: 'default'
  };

  // Reset input elements
  document.getElementById('zone-search').value = '';
  document.getElementById('price-filter').value = 50;
  document.getElementById('price-value').textContent = '$50+';
  document.getElementById('sort-by').value = 'default';

  // Uncheck all checkboxes except availability ones
  document.querySelectorAll('.equipment-filter, .game-filter').forEach(cb => {
    cb.checked = false;
  });

  // Check availability ones
  document.querySelectorAll('.availability-filter').forEach(cb => {
    cb.checked = true;
  });

  applyFilters();
}

function updateResultsCounter() {
  let counter = document.querySelector('.results-counter');

  if (!counter) {
    counter = document.createElement('div');
    counter.className = 'results-counter';
    document.querySelector('.zones-grid-modern').parentElement.insertBefore(
      counter,
      document.querySelector('.zones-grid-modern')
    );
  }

  const totalZones = zonesData.length;
  const filteredCount = filteredZones.length;

  if (filteredCount === totalZones) {
    counter.style.display = 'none';
  } else {
    counter.style.display = 'block';
    counter.innerHTML = `Showing <strong>${filteredCount}</strong> of <strong>${totalZones}</strong> zones`;
  }
}

// Make functions global
window.resetAllFilters = resetAllFilters;
window.removeFilter = removeFilter;
