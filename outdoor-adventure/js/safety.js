// Safety-specific functionality
document.addEventListener('DOMContentLoaded', function() {
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
        });
    }

    if (uncheckAllBtn) {
        uncheckAllBtn.addEventListener('click', function() {
            document.querySelectorAll('#checklist-items input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = false;
                checkbox.parentElement.classList.remove('checked');
            });
            saveChecklistProgress();
        });
    }

    if (printChecklistBtn) {
        printChecklistBtn.addEventListener('click', function() {
            // Create a print-friendly version
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Ten Essentials Checklist - Outdoor Adventure Hub</title>
                        <style>
                            body { font-family: Arial, sans-serif; margin: 20px; }
                            h1 { color: #2E8B57; }
                            .checklist-item { margin: 10px 0; padding: 10px; border: 1px solid #ddd; }
                            .checked { background-color: #f0f0f0; text-decoration: line-through; }
                        </style>
                    </head>
                    <body>
                        <h1>Ten Essentials Checklist</h1>
                        <p>Generated from Outdoor Adventure Hub on ${new Date().toLocaleDateString()}</p>
                        <div id="print-checklist">
            `);
            
            checklistItems.forEach((item, index) => {
                const checkbox = document.getElementById(`item-${index}`);
                const isChecked = checkbox ? checkbox.checked : false;
                printWindow.document.write(`
                    <div class="checklist-item ${isChecked ? 'checked' : ''}">
                        <input type="checkbox" ${isChecked ? 'checked' : ''} disabled> 
                        ${item}
                    </div>
                `);
            });
            
            printWindow.document.write('</div></body></html>');
            printWindow.document.close();
            printWindow.print();
        });
    }

    if (saveChecklistBtn) {
        saveChecklistBtn.addEventListener('click', function() {
            saveChecklistProgress();
            alert('Checklist progress saved! It will be restored on your next visit.');
        });
    }

    // Initialize checklist
    populateChecklist();
});