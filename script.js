document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".icon-btn").addEventListener("click", function () {
        document.body.style.backgroundColor = getRandomColor();
    });

    function getRandomColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }

    document.getElementById("currentDate").innerHTML = formatDate(new Date());

    function formatDate(date) {
        const options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options); 

        const dateParts = formattedDate.split(', ');

        return `${dateParts[0]},<br><span class="bold-date">${dateParts[1]} ${dateParts[2]}</span>`;
    }

    const completeButtons = document.querySelectorAll('.complete-btn');

    const taskNames = [
        "Add Dark Mode",
        "Fix Mobile Button Issue",
        "Optimize Home page",
        "Add new emoji 🤲",
        "Integrate OpenAI API",
        "Improve Job Searching"
    ];

    let taskCounter = 6;
    const taskCounterEl = document.getElementById("taskCounter");
    const taskCountNav = document.getElementById("taskCount");
    const logList = document.getElementById("logList");

    completeButtons.forEach((btn, index) => {
        btn.addEventListener("click", function () {
            if (taskCounter > 0) {
                taskCounter--;
                taskCounterEl.textContent = taskCounter;
                taskCountNav.textContent = 6 - taskCounter;
                btn.style.background = "#a0a7d5";
                btn.disabled = true;

                // ✅ Update Activity Log
                const logItem = document.createElement("li");
                const currentTime = new Date().toLocaleTimeString();
                logItem.textContent = `You completed "${taskNames[index]}" at ${currentTime}`;
                logItem.style.backgroundColor = "#F4F7FF"; 
                logItem.style.padding = "10px"; 
                logItem.style.marginBottom = "10px"; 
                logItem.style.borderRadius = "5px"; 
                logList.appendChild(logItem);

                // ✅ Show browser alert for task completion
                alert(`Task completed: "${taskNames[index]}"`);

                // ✅ Alert when all tasks are done
                if (taskCounter === 0) {
                    alert("All tasks are completed!");
                }
            }
        });
    });

    // ✅ Ensure `clearHistoryBtn` is properly selected
    const clearHistoryBtn = document.getElementById("clearHistoryBtn");

    clearHistoryBtn.addEventListener("click", function () {
        if (!logList) {
            console.error("logList element is missing.");
            return;
        }

        logList.replaceChildren(); // ✅ Clears activity log properly

        taskCounter = 6;
        taskCounterEl.textContent = taskCounter;
        taskCountNav.textContent = 0;

        completeButtons.forEach(btn => {
            btn.style.background = "";
            btn.disabled = false;
        });

        alert("Activity history cleared!");
    });

    const heroHeight = document.querySelector(".hero").offsetHeight;
    document.querySelector(".activity-log").style.height = `${heroHeight}px`;
});
