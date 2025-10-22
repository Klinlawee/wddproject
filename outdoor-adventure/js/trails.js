// Trail-specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Populate Trail Grid
    function populateTrails(filter = "all") {
        const trailGrid = document.getElementById('trail-grid');
        if (!trailGrid) return;
        
        trailGrid.innerHTML = '';
        
        const filteredTrails = filter === "all" ? trails : trails.filter(trail => trail.difficulty === filter);
        
        filteredTrails.forEach(trail => {
            const trailCard = document.createElement('div');
            trailCard.className = 'card';
            trailCard.innerHTML = `
                <img src="${trail.image}" alt="${trail.name}" loading="lazy">
                <h3>${trail.name}</h3>
                <div class="meta">
                    <span><i class="fas fa-signal"></i> ${trail.difficulty.charAt(0).toUpperCase() + trail.difficulty.slice(1)}</span>
                    <span><i class="fas fa-hiking"></i> ${trail.length}</span>
                    <span><i class="fas fa-mountain"></i> ${trail.elevation} gain</span>
                </div>
                <p>${trail.description}</p>
                <a href="#" class="btn btn-primary">View Details</a>
            `;
            trailGrid.appendChild(trailCard);
        });
    }

    // Trail Filter Functionality
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter trails
            const filter = this.getAttribute('data-filter');
            populateTrails(filter);
        });
    });

    // Initialize trails
    populateTrails();
});