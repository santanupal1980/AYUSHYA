let notifCount = 0;
const maxNotifs = 6;
const notifTexts = [
  "Morning reminder: Take your blood pressure medication 💊",
  "Pre-lunch tip: 5-minute stretch recommended 🧘",
  "Post-lunch check-in: Log your water intake 💧",
  "Afternoon alert: Time for a light walk 🚶‍♀️",
  "Evening routine: Start winding down, no screens 📵",
  "Bedtime check: Record sleep time and mood 🌙"
];
const intervalHours = [8, 11, 13, 16, 19, 21];
const notifications = [];

function simulateDayNotifications() {
  if (notifCount >= maxNotifs) return;
  const simulatedTime = new Date();
  simulatedTime.setHours(intervalHours[notifCount], 0, 0, 0);
  const timeStr = simulatedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const notifText = `🔔 ${timeStr} | ${notifTexts[notifCount]}`;
  notifications.unshift(notifText);
  renderNotifs();
  notifCount++;
  if (notifCount < maxNotifs) setTimeout(simulateDayNotifications, 4000);
}

let notifPage = 0;
function renderNotifs() {
  const notifList = document.getElementById('notificationList');
  notifList.innerHTML = '';
  const perPage = 3;
  const start = notifPage * perPage;
  const visible = notifications.slice(start, start + perPage);
  visible.forEach(txt => {
    const li = document.createElement('li');
    li.className = 'nudge';
    li.textContent = txt;
    notifList.appendChild(li);
  });
}
function prevNotif() {
  if (notifPage > 0) {
    notifPage--;
    renderNotifs();
  }
}
function nextNotif() {
  if ((notifPage + 1) * 3 < notifications.length) {
    notifPage++;
    renderNotifs();
  }
}


  function addJournalEntry() {
    const input = document.getElementById('journalInput');
    const text = input.value.trim();
    if (!text) return;

    const time = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const journalArea = document.getElementById('journalArea');
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.innerHTML = `<span class="text-xs opacity-60 mr-2">[${time}]</span> ${text}`;
    journalArea.appendChild(bubble);
    journalArea.scrollTop = journalArea.scrollHeight;
    input.value = '';
  }

  function simulateJournaling() {
    const journalArea = document.getElementById('journalArea');
    const logs = [
      { time: '08:05', text: 'Woke up feeling well rested 😌' },
      { time: '11:15', text: 'Did a quick 5-minute stretch 💪' },
      { time: '13:30', text: 'Drank 2 glasses of water after lunch 💧' },
      { time: '16:45', text: 'Went on a 20-minute walk 🏞️' },
      { time: '19:20', text: 'Read a book before bed 📖' },
      { time: '21:30', text: 'Feeling calm and sleepy 😴' },
    ];

    logs.forEach((entry, i) => {
      setTimeout(() => {
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble';
        bubble.innerHTML = `<span class="text-xs opacity-60 mr-2">[${entry.time}]</span> ${entry.text}`;
        journalArea.appendChild(bubble);
        journalArea.scrollTop = journalArea.scrollHeight;
      }, i * 3000);
    });
  }

  // Optional: Call this to simulate on page load
  // window.addEventListener('DOMContentLoaded', simulateJournaling);



function simulateConversation() {
  const convArea = document.getElementById('conversationArea');
  const messages = [
    { from: 'user', text: 'Good morning, how should I start my day?' },
    { from: 'ai', text: 'Start with your morning medication and 5-minute stretch. 😊' },
    { from: 'user', text: 'I had lunch. Should I log my water intake now?' },
    { from: 'ai', text: 'Yes, please log your hydration. Great job staying on track! 💧' },
    { from: 'user', text: 'Feeling tired in the evening.' },
    { from: 'ai', text: 'Try winding down with a book. Avoid screens 1 hour before bed. 🌙' }
  ];
  messages.forEach((msg, i) => {
    setTimeout(() => {
      const bubble = document.createElement('div');
      bubble.className = `chat-bubble fade-in ${msg.from === 'user' ? 'from-user' : 'from-ai'}`;
      bubble.textContent = msg.text;
      convArea?.appendChild(bubble);
    }, i * 4000);
  });
}

function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  document.getElementById(tabId)?.classList.add('active');
}

const charts = {};
const chartData = {
  bpChart: {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{ label: 'BP (mmHg)', borderColor: 'red', data: [120, 122, 118, 121, 119, 117, 116] }]
    }
  },
  hydrationChart: {
    type: 'bar',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{ label: 'Water (oz)', backgroundColor: 'blue', data: [60, 70, 65, 80, 75, 90, 85] }]
    }
  },
  sleepChart: {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{ label: 'Sleep (hrs)', borderColor: 'purple', data: [6.5, 7, 7.2, 6, 8, 7.5, 7] }]
    }
  },
  heartActivityChart: {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'HR vs Steps',
        backgroundColor: 'orange',
        data: [{ x: 3000, y: 78 }, { x: 5000, y: 82 }, { x: 8000, y: 85 }, { x: 10000, y: 90 }, { x: 6000, y: 80 }]
      }]
    },
    options: {
      scales: {
        x: { title: { display: true, text: 'Steps' } },
        y: { title: { display: true, text: 'Heart Rate (bpm)' } }
      }
    }
  },
  goalProgressChart: {
    type: 'doughnut',
    data: {
      labels: ['Completed', 'In Progress', 'Remaining'],
      datasets: [{
        data: [40, 30, 30],
        backgroundColor: ['green', 'yellow', 'red']
      }]
    }
  },
  chronicHealthChart: {
    type: 'line',
    data: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
      datasets: [{
        label: 'Chronic Condition Score',
        borderColor: 'teal',
        backgroundColor: 'lightblue',
        data: [50, 55, 60, 63, 67, 72]
      }]
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  simulateDayNotifications();
  simulateJournaling();
  simulateConversation();

  Object.keys(chartData).forEach(id => {
    const ctx = document.getElementById(id)?.getContext('2d');
    if (ctx) charts[id] = new Chart(ctx, chartData[id]);
  });

  const calorieCtx = document.getElementById('calorieChart')?.getContext('2d');
  if (calorieCtx) {
    new Chart(calorieCtx, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          { label: 'Calories Burned', data: [220, 300, 280, 310, 260, 330, 400], backgroundColor: '#34d399' },
          { label: 'Calorie Intake', data: [1800, 1900, 1700, 2000, 2100, 1950, 2200], backgroundColor: '#60a5fa' }
        ]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  const sleepCanvas = document.getElementById('sleepStressChart');
  if (sleepCanvas) {
    const sleepData = [6.5, 7, 5.5, 7.5, 6, 8, 8.5];
    const stressData = [4, 5, 6, 5, 7, 3, 2];
    const moodMap = stressData.map(lvl => lvl <= 3 ? '😊' : lvl <= 5 ? '😐' : '😟');
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const sleepStressChart = new Chart(sleepCanvas, {
      type: 'bar',
      data: {
        labels: days,
        datasets: [
          { type: 'line', label: 'Stress Level', data: stressData, borderColor: '#f97316', backgroundColor: 'transparent', yAxisID: 'y2', tension: 0.3 },
          { type: 'bar', label: 'Sleep Hours', data: sleepData, backgroundColor: '#a78bfa', yAxisID: 'y' }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { position: 'left', title: { display: true, text: 'Sleep Hours' }, beginAtZero: true },
          y2: { position: 'right', title: { display: true, text: 'Stress Level' }, beginAtZero: true, min: 0, max: 10, grid: { drawOnChartArea: false } }
        },
        plugins: { legend: { position: 'bottom' } }
      }
    });

    document.getElementById('moodTrend').innerHTML = `<strong>Mood Trend:</strong> ${moodMap.join(' ')}`;
    document.getElementById('weeklySummary').innerHTML = `📊 <strong>Avg Sleep:</strong> ${(sleepData.reduce((a, b) => a + b) / sleepData.length).toFixed(1)} hrs &nbsp; | &nbsp; <strong>Avg Stress:</strong> ${(stressData.reduce((a, b) => a + b) / stressData.length).toFixed(1)}/10`;

    window.downloadChart = () => {
      const link = document.createElement('a');
      link.download = 'sleep-vs-stress-chart.png';
      link.href = sleepStressChart.toBase64Image();
      link.click();
    };
  }

  // Service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('✅ Service Worker registered', reg))
      .catch(err => console.error('❌ Service Worker failed', err));
  }

  // Modal close
  document.getElementById('chartModal')?.addEventListener('click', closeModal);
});


// 🧠 Expose globally
window.expandChart = function (id) {
  const modal = document.getElementById('chartModal');
  const ctx = document.getElementById('expandedChart')?.getContext('2d');
  // alert(ctx + ">" + chartData[id])
  if (!ctx || !chartData[id]) return;

  if (charts.expanded) charts.expanded.destroy();
  charts.expanded = new Chart(ctx, chartData[id]);

  modal.classList.remove('hidden');
  modal.classList.add('flex');
};

window.closeModal = function (e) {
  const modal = document.getElementById('chartModal');
  if (e?.target?.id === 'chartModal' || e?.target?.tagName === 'BUTTON' || e?.target?.closest('button')) {
    modal.classList.remove('flex');
    modal.classList.add('hidden');
    if (charts.expanded) charts.expanded.destroy();
  }
};


document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('darkModeToggle');
    const root = document.documentElement;

    // Enable toggle if somehow disabled
    toggle.disabled = false;

    // Load theme from localStorage
    if (localStorage.getItem('theme') === 'dark') {
      root.classList.add('dark');
      toggle.checked = true;
    }

    toggle.addEventListener('change', () => {
      if (toggle.checked) {
        root.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        root.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    });
  });

// tailwind.config.js
// module.exports = {
//   content: [
//     './index.html',
//     './src/**/*.{js,ts,jsx,tsx}', // adjust if needed
//   ],
//   darkMode: 'class',
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };



