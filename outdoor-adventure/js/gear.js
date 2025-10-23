// Gear-specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Populate Gear Grid
    function populateGear(category = "all") {
        const gearGrid = document.getElementById('gear-grid');
        if (!gearGrid) return;
        
        gearGrid.innerHTML = '';
        
        const filteredGear = category === "all" ? gearItems : gearItems.filter(item => item.category === category);
        
        filteredGear.forEach(item => {
            const gearCard = document.createElement('div');
            gearCard.className = 'card';
            gearCard.innerHTML = `
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PC9zdmc+" 
                     data-src="${item.image}" 
                     alt="${item.name}" 
                     class="lazy"
                     loading="lazy">
                <h3>${item.name}</h3>
                <div class="meta">
                    <span><i class="fas fa-star"></i> ${item.rating}/5.0</span>
                    <span>${item.price}</span>
                </div>
                <p>${item.description}</p>
                <a href="#" class="btn btn-primary">Read Review</a>
            `;
            gearGrid.appendChild(gearCard);
        });

        // Re-initialize lazy loading for newly created images
        setTimeout(() => {
            const event = new Event('DOMContentModified');
            document.dispatchEvent(event);
        }, 100);
    }

    // Gear Category Filter Functionality
    document.querySelectorAll('.gear-category').forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            document.querySelectorAll('.gear-category').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter gear
            const category = this.getAttribute('data-category');
            populateGear(category);
        });
    });

    // Initialize gear
    populateGear();
});