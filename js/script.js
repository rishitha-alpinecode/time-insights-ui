document.addEventListener('DOMContentLoaded', () => {

    const dashboardData = {
        timeWithoutTeam: [
            { type: "Call review", value: 7.5, change: 2, isIncrease: false, expected: "6%-10%", hours: 5.8 },
            { type: "Internal Meets", value: 15.0, change: 5, isIncrease: false, expected: "10%-15%", hours: 5.8 },
            { type: "External Meets", value: 12.5, change: 5, isIncrease: false, expected: "20%-25%", hours: 5.8 },
            { type: "Block", value: 2.5, change: 2, isIncrease: true, expected: "4%-8%", hours: 5.8 }
        ],
        open: { openCalendar: 44.5, change: 2, isIncrease: true, expected: "12%-15%", hours: 5.8 }
    };

    const renderCards = (data) => {
        const timeWithoutTeamContainer = document.getElementById('timeWithoutTeamCards');
        const openCardContainer = document.getElementById('openCard');

        timeWithoutTeamContainer.innerHTML = '';
        openCardContainer.innerHTML = '';

        // Rendering of the "Time without team" cards
        data.timeWithoutTeam.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('data-card', 'color');
            
            const arrow = item.isIncrease ? 'up.png' : 'down.png';
            const changeColorClass = item.isIncrease ? 'up' : 'down';

            card.innerHTML = `
                <div class="card-header ">
                    <span class="value">${item.value}%</span>
                    <div class = "block">
                    <div class="change ${changeColorClass}">
                        <img src="./images/${arrow}" alt="${item.isIncrease ? 'Up' : 'Down'} arrow">
                        <span>${item.change}%</span>
                    </div>
                    <span class="hours">
                        ${item.hours}hrs
                    </span>
                    </div>
                </div>
                <div class="type">
                    ${item.type}
                     <img src="./images/Group 1707478219.png" height="18px" width="18px" style="padding-top:5px; padding-left: 10px">
                    </div>
                
                <div class="details">
                    <span class="expected">Expected: ${item.expected}</span>
                </div>
            `;
            timeWithoutTeamContainer.appendChild(card);
        });

        // Render "Open" card
        // const openItem = data.open;
        // const openCard = document.createElement('div');
        // openCard.classList.add('data-card', 'open-card');
        
        // const arrow = openItem.isIncrease ? 'up.png' : 'down.png';
        // const changeColorClass = openItem.isIncrease ? 'up' : 'down';

        // openCard.innerHTML = `
        //     <div class="card-header">
        //         <span class="value">${openItem.openCalendar}%</span>
        //         <div class="change ${changeColorClass}">
        //             <img src="./images/${arrow}" alt="${openItem.isIncrease ? 'Up' : 'Down'} arrow">
        //             <span>${openItem.change}%</span>
        //         </div>
        //     </div>
        //     <div class="type">Open Calendar</div>
        //     <div class="details">
        //         <span class="expected">Expected: ${openItem.expected}</span>
        //         <span class="hours">
        //            <img src="./images/timer.png" alt="Timer icon">
        //             ${openItem.hours}hrs
        //         </span>
        //     </div>
        // `;
        const openItem = data.open;
    const openCard = document.createElement('div');
    openCard.classList.add('data-card', 'open-card'); // base + modifier
    
    const arrow = openItem.isIncrease ? 'up.png' : 'down.png';
    const changeColorClass = openItem.isIncrease ? 'up' : 'down';

    openCard.innerHTML = `
        <div class="card-header">
            <span class="value">${openItem.openCalendar}%</span>
            <div class="block">
                <div class="change ${changeColorClass}">
                    <img src="./images/${arrow}" alt="${openItem.isIncrease ? 'Up' : 'Down'} arrow">
                    <span>${openItem.change}%</span>
                </div>
                <span class="hours">
                    ${openItem.hours}hrs
                </span>
            </div>
        </div>
        <div class="type">Open Calendar
        <img src="./images/Group 1707478219.png" height="18px" width="18px" style="padding-top:5px; padding-left: 10px"></div>
        
        <div class="details">
            <span class="expected">Expected: ${openItem.expected}</span>
        </div>
    `;
        openCardContainer.appendChild(openCard);
    };

    // Initialize Litepicker
    const picker = new Litepicker({
        element: document.getElementById('dateRangeInput'),
        singleMode: false,
        // tooltipText: {
        //     one: 'night',
        //     other: 'nights',
        // },
        format: 'MMM D', // Format for the input field
        // Adjust the default date to match the screenshot initially
        startDate: '2025-09-08',
        endDate: '2025-09-14',
        dropdowns: {
            months: true,
            years: true,
        },
        setup: (picker) => {
            picker.on('selected', (date1, date2) => {
                const startDate = date1.toDate();
                const endDate = date2.toDate();
                
                // Update the date display
                const formattedStartDisplay = startDate.toLocaleString('en-US', { month: 'short', day: 'numeric' });
                const formattedEndDisplay = endDate.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                document.getElementById('date-range-display').textContent = `${formattedStartDisplay} - ${formattedEndDisplay}`;

                // Update the input field display
                const formattedInputStart = startDate.toLocaleString('en-US', { month: 'short', day: 'numeric' });
                const formattedInputEnd = endDate.toLocaleString('en-US', { month: 'short', day: 'numeric' });
                document.getElementById('dateRangeInput').value = `${formattedInputStart} - ${formattedInputEnd}`;
                
                // You would typically re-fetch data based on new dates here
                // For this front-end only version, data remains static,
                // but if you connect a backend, this is where you'd call
                // fetchData(startDate.toISOString(), endDate.toISOString());
            });
        },
    });

    // Set initial display for date range input and span
    const initialStartDate = new Date('2025-09-8');
    const initialEndDate = new Date('2025-09-14');
    const formattedInitialDisplay = `${initialStartDate.toLocaleString('en-US', { month: 'short', day: 'numeric' })} - ${initialEndDate.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    document.getElementById('date-range-display').textContent = formattedInitialDisplay;
    
    const formattedInitialInput = `${initialStartDate.toLocaleString('en-US', { month: 'short', day: 'numeric' })} - ${initialEndDate.toLocaleString('en-US', { month: 'short', day: 'numeric' })}`;
    document.getElementById('dateRangeInput').value = formattedInitialInput;

    // Initial render with the hardcoded data
    renderCards(dashboardData);
});