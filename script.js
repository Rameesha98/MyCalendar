const events = {
    "2025-02-26": { name: "Mahasivarathri Day" },
    "2025-03-01": { name: "Ramadan Start" },
    "2025-03-13": { name: "Madin Full Moon Poya Day", type: "poya" },
    "2025-03-31": { name: "Eid al-Fitr" },
    "2025-04-12": { name: "Bak Full Moon Poya Day", type: "poya" },
    "2025-04-13": { name: "Sinhala and Tamil New Year's Eve" },
    "2025-04-14": { name: "Sinhala and Tamil New Year's Day" },
    "2025-04-18": { name: "Good Friday" },
    "2025-04-20": { name: "Easter Sunday" },
    "2025-05-01": { name: "May Day" },
    "2025-05-11": { name: "Mother's Day" },
    "2025-05-12": { name: "Vesak Full Moon Poya Day", type: "poya" },
    "2025-05-13": { name: "Day after Vesak Full Moon Poya Day", type: "poya" },
    "2025-06-07": { name: "Eid al-Adha" },
    "2025-06-10": { name: "Poson Full Moon Poya Day", type: "poya" },
    "2025-06-15": { name: "Father's Day" },
    "2025-07-07": { name: "Eid al-Adha" },
    "2025-08-08": { name: "Nikini Full Moon Poya Day", type: "poya" },
    "2025-09-05": { name: "Milad-Un-Nabi (Holy Prophet's Birthday)" },
    "2025-09-07": { name: "Binara Full Moon Poya Day", type: "poya" },
    "2025-10-06": { name: "Vap Full Moon Poya Day", type: "poya" },
    "2025-10-20": { name: "Deepavali" },
    "2025-11-05": { name: "Il Full Moon Poya Day", type: "poya" },
    "2025-12-04": { name: "Unduvap Full Moon Poya Day", type: "poya" },
    "2025-12-24": { name: "Christmas Eve" },
    "2025-12-25": { name: "Christmas Day" },
};

const specialDates = {
    "2025-02-26": "special-date-1",
    "2025-03-01": "special-date-2",
    "2025-03-31": "special-date-4",
    "2025-04-13": "special-date-6",
    "2025-04-14": "special-date-7",
    "2025-04-18": "special-date-8",
    "2025-04-20": "special-date-9",
    "2025-05-01": "special-date-10",
    "2025-05-11": "special-date-11",
    "2025-06-07": "special-date-14",
    "2025-06-15": "special-date-16",
    "2025-07-07": "special-date-17",
    "2025-09-05": "special-date-19",
    "2025-10-20": "special-date-22",
    "2025-12-24": "special-date-25",
    "2025-12-25": "special-date-26"
};

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let currentDate = today.getDate();

function renderCalendar() {
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();

    document.getElementById('monthYear').textContent = `${monthNames[currentMonth]} ${currentYear}`;

    const calendarDates = document.getElementById('calendarDates');
    calendarDates.innerHTML = '';

    const offset = firstDay === 0 ? 6 : firstDay - 1;
    for (let i = 0; i < offset; i++) {
        calendarDates.innerHTML += `<div></div>`;
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const date = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const event = events[date];

        const dayOfWeek = new Date(currentYear, currentMonth, day).getDay();
        const dayClass = dayOfWeek === 6 ? 'saturday' : dayOfWeek === 0 ? 'sunday' : '';

        const eventClass = event ? 'holiday' : '';
        const todayClass = (day === currentDate && currentMonth === today.getMonth() && currentYear === today.getFullYear()) ? 'today' : '';

        const specificDateClass = specialDates[date] || '';
        const poyaClass = event && event.type === "poya" ? 'poya-day' : ''; //Poya Day Class eka

        calendarDates.innerHTML += `
            <div class="${dayClass} ${eventClass} ${todayClass} ${specificDateClass} ${poyaClass}">
                ${day}
                ${event ? `<span class="tooltip">${event.name}</span>` : ''}
            </div>
        `;
    }
}

function changeMonth(direction) {
    currentMonth += direction;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
}

function changeYear(direction) {
    currentYear += direction; 
    currentMonth = 0; 
    renderCalendar();
}

document.addEventListener("DOMContentLoaded", () => {
    renderCalendar();
});

