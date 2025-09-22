document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reportForm");
  const reportsList = document.getElementById("reportsList");
  const successMsg = document.getElementById("successMsg");

  // Load reports from localStorage
  let reports = JSON.parse(localStorage.getItem("reports")) || [];
  displayReports();

  // Handle form submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const report = {
      id: Date.now().toString(), // unique string ID
      type: document.getElementById("type").value,
      itemType: document.getElementById("itemType").value,
      description: document.getElementById("description").value,
      dateTime: document.getElementById("dateTime").value,
      location: document.getElementById("location").value,
      contact: document.getElementById("contact").value
    };

    reports.push(report);
    localStorage.setItem("reports", JSON.stringify(reports));

    form.reset();

    successMsg.classList.remove("hidden");
    setTimeout(() => successMsg.classList.add("hidden"), 2000);

    displayReports();
  });

  // Show all reports
  function displayReports() {
    reportsList.innerHTML = "";
    if (reports.length === 0) {
      reportsList.innerHTML = "No reports yet.";
      return;
    }

    reports.forEach((r) => {
      const div = document.createElement("div");
      div.classList.add("report-card");
      div.innerHTML = `
        <button class="delete-btn" data-id="${r.id}">Delete</button>
        <strong>${r.type}:</strong> ${r.itemType}<br>
        <em>${r.description}</em><br>
        📍 ${r.location} | 🕒 ${r.dateTime}<br>
        📞 ${r.contact}
      `;
      reportsList.appendChild(div);
    });

    // Attach delete event to buttons
    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        deleteReport(id);
      });
    });
  }

  // Delete function
  function deleteReport(id) {
    reports = reports.filter(r => r.id !== id);
    localStorage.setItem("reports", JSON.stringify(reports));
    displayReports();
  }
});
