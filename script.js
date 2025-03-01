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

    document.querySelectorAll(".complete-btn").forEach((btn, index) => {
        btn.addEventListener("click", function () {
            if (taskCounter > 0) {
                taskCounter--;
                taskCounterEl.textContent = taskCounter;
                taskCountNav.textContent = 6 - taskCounter;
                btn.style.background = "#a0a7d5";
                btn.disabled = true;
                const logItem = document.createElement("li");
                const currentTime = new Date().toLocaleTimeString();
                logItem.textContent = `You have completed the task "${taskNames[index]}" at ${currentTime}`;
                logItem.style.backgroundColor = "#F4F7FF"; 
                logItem.style.padding = "10px"; 
                logItem.style.marginBottom = "10px"; 
                logItem.style.borderRadius = "5px"; 
                logList.appendChild(logItem);

                showCustomAlert(`Board updated successfully with task "${taskNames[index]}"`);
            }
        });
    });

    function showCustomAlert(message) {
        const alertModal = document.createElement("div");
        alertModal.classList.add("custom-alert-modal");
        alertModal.innerHTML = `
            <div class="alert-content">
                <p>${message}</p>
                <button class="close-alert-btn">Close</button>
            </div>
        `;
        document.body.appendChild(alertModal);

        alertModal.querySelector(".close-alert-btn").addEventListener("click", function () {
            alertModal.remove();
        });
    }

    clearHistoryBtn.addEventListener("click", function () {
        if (!logList) {
            console.error("logList element is missing.");
            return;
        }

        logList.replaceChildren();

        taskCounter = 6;
        taskCounterEl.textContent = taskCounter;
        taskCountNav.textContent = 0;

        document.querySelectorAll(".complete-btn").forEach(btn => {
            btn.style.background = "";
            btn.disabled = false;
        });

        console.log("Activity history cleared!");
    });

    const heroHeight = document.querySelector(".hero").offsetHeight;
    document.querySelector(".activity-log").style.height = `${heroHeight}px`;
});
