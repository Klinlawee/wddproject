// Safety-specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Ten Essentials Checklist
    const checklistItems = [
        "Navigation (map, compass, GPS)",
        "Headlamp/Flashlight (with extra batteries)",
        "Sun Protection (sunglasses, sunscreen, hat)",
        "First Aid Kit",
        "Knife/Multi-tool",
        "Fire (waterproof matches/lighter)",
        "Emergency Shelter (tent, tarp, bivy)",
        "Extra Food (beyond minimum expectations)",
        "Extra Water (or means to purify water)",
        "Extra Clothes (appropriate for weather)"
    ];

    // Create progress indicator
    function createProgressIndicator() {
        const checklistContainer = document.getElementById('checklist-items');
        if (!checklistContainer) return;
        
        const progressHTML = `
            <div class="checklist-progress">
                <div class="progress-text">Checklist Progress: <span id="progress-count">0</span>/10 items</div>
                <div class="progress-bar">
                    <div class="progress-fill" id="progress-fill" style="width: 0%"></div>
                </div>
                <div class="checklist-complete" id="checklist-complete">
                    <h4><i class="fas fa-check-circle"></i> All Set for Adventure!</h4>
                    <p>You've packed all the Ten Essentials. Have a safe and enjoyable hike!</p>
                </div>
            </div>
        `;
        
        checklistContainer.insertAdjacentHTML('beforebegin', progressHTML);
    }

    // Update progress indicator
    function updateProgress() {
        const checkboxes = document.querySelectorAll('#checklist-items input[type="checkbox"]');
        const checkedCount = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
        const progressCount = document.getElementById('progress-count');
        const progressFill = document.getElementById('progress-fill');
        const completeMessage = document.getElementById('checklist-complete');
        
        if (progressCount && progressFill) {
            progressCount.textContent = checkedCount;
            const progressPercentage = (checkedCount / checklistItems.length) * 100;
            progressFill.style.width = `${progressPercentage}%`;
            
            // Update progress bar color based on completion
            if (progressPercentage < 50) {
                progressFill.style.background = '#dc3545'; // Red
            } else if (progressPercentage < 100) {
                progressFill.style.background = '#ffc107'; // Yellow
            } else {
                progressFill.style.background = '#28a745'; // Green
            }
        }
        
        // Show completion message when all items are checked
        if (completeMessage && checkedCount === checklistItems.length) {
            completeMessage.classList.add('show');
        } else if (completeMessage) {
            completeMessage.classList.remove('show');
        }
    }

    // Populate Checklist
    function populateChecklist() {
        const checklistContainer = document.getElementById('checklist-items');
        if (!checklistContainer) return;
        
        checklistContainer.innerHTML = '';
        
        checklistItems.forEach((item, index) => {
            const checklistItem = document.createElement('div');
            checklistItem.className = 'checklist-item';
            checklistItem.innerHTML = `
                <input type="checkbox" id="item-${index}">
                <label for="item-${index}">${item}</label>
            `;
            checklistContainer.appendChild(checklistItem);
            
            // Add event listener to toggle checked class
            const checkbox = checklistItem.querySelector('input');
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    checklistItem.classList.add('checked');
                } else {
                    checklistItem.classList.remove('checked');
                }
                saveChecklistProgress();
                updateProgress();
            });
            
            // Load saved progress
            const savedProgress = localStorage.getItem('checklistProgress');
            if (savedProgress) {
                const progress = JSON.parse(savedProgress);
                if (progress[index]) {
                    checkbox.checked = true;
                    checklistItem.classList.add('checked');
                }
            }
        });
        
        // Initialize progress after populating checklist
        updateProgress();
    }

    // Save checklist progress to localStorage
    function saveChecklistProgress() {
        const checkboxes = document.querySelectorAll('#checklist-items input[type="checkbox"]');
        const progress = Array.from(checkboxes).map(checkbox => checkbox.checked);
        localStorage.setItem('checklistProgress', JSON.stringify(progress));
    }

    // Checklist Actions
    const checkAllBtn = document.getElementById('check-all');
    const uncheckAllBtn = document.getElementById('uncheck-all');
    const printChecklistBtn = document.getElementById('print-checklist');
    const saveChecklistBtn = document.getElementById('save-checklist');

    if (checkAllBtn) {
        checkAllBtn.addEventListener('click', function() {
            document.querySelectorAll('#checklist-items input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = true;
                checkbox.parentElement.classList.add('checked');
            });
            saveChecklistProgress();
            updateProgress();
        });
    }

    if (uncheckAllBtn) {
        uncheckAllBtn.addEventListener('click', function() {
            document.querySelectorAll('#checklist-items input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = false;
                checkbox.parentElement.classList.remove('checked');
            });
            saveChecklistProgress();
            updateProgress();
        });
    }

    if (printChecklistBtn) {
        printChecklistBtn.addEventListener('click', function() {
            // Create a print-friendly version
            const printWindow = window.open('', '_blank');
            const checkboxes = document.querySelectorAll('#checklist-items input[type="checkbox"]');
            const progress = Array.from(checkboxes).map(checkbox => checkbox.checked);
            const checkedCount = progress.filter(Boolean).length;
            
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Ten Essentials Checklist - Outdoor Adventure Hub</title>
                        <style>
                            body { 
                                font-family: Arial, sans-serif; 
                                margin: 20px; 
                                line-height: 1.6;
                            }
                            h1 { 
                                color: #2E8B57; 
                                border-bottom: 3px solid #FF7F50;
                                padding-bottom: 10px;
                            }
                            .checklist-item { 
                                margin: 10px 0; 
                                padding: 12px; 
                                border: 1px solid #ddd;
                                border-radius: 5px;
                            }
                            .checked { 
                                background-color: #f0f0f0; 
                                text-decoration: line-through; 
                            }
                            .progress { 
                                background: #f8f9fa; 
                                padding: 15px; 
                                border-radius: 5px; 
                                margin: 20px 0;
                                text-align: center;
                            }
                            .print-date {
                                color: #666;
                                font-size: 0.9em;
                                margin-bottom: 20px;
                            }
                        </style>
                    </head>
                    <body>
                        <h1>Ten Essentials Checklist</h1>
                        <div class="print-date">Generated from Outdoor Adventure Hub on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</div>
                        <div class="progress">
                            <strong>Progress: ${checkedCount}/${checklistItems.length} items checked</strong>
                        </div>
                        <div id="print-checklist">
            `);
            
            checklistItems.forEach((item, index) => {
                const isChecked = progress[index];
                printWindow.document.write(`
                    <div class="checklist-item ${isChecked ? 'checked' : ''}">
                        <input type="checkbox" ${isChecked ? 'checked' : ''} disabled> 
                        ${item}
                    </div>
                `);
            });
            
            printWindow.document.write(`
                        </div>
                        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
                            <p><strong>Safety Reminder:</strong> Always check weather conditions, tell someone your plans, and know your limits.</p>
                            <p>Visit <strong>Outdoor Adventure Hub</strong> for more safety resources and trail guides.</p>
                        </div>
                    </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.print();
        });
    }

    if (saveChecklistBtn) {
        saveChecklistBtn.addEventListener('click', function() {
            saveChecklistProgress();
            
            // Show confirmation with animation
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> Saved!';
            this.style.background = '#28a745';
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.background = '';
            }, 2000);
            
            alert('Checklist progress saved! It will be restored on your next visit.');
        });
    }

    // Initialize safety features
    createProgressIndicator();
    populateChecklist();
    
    console.log('Safety features loaded successfully');
});