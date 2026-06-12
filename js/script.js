/* ============================================================
   Helper Function
============================================================ */

function setMsg(id, text, color = "black") {
    const el = document.getElementById(id);
    if (el) {
        el.textContent = text;
        el.style.color = color;
    }
}

/* ============================================================
   HOME PAGE LOGIC
============================================================ */

/* ---------------------------
   File Uploads
---------------------------- */

document.getElementById("btn_upload_single")?.addEventListener("click", () => {
    const file = document.getElementById("file_single").files[0];
    setMsg("msg_upload_single", file ? `Uploaded: ${file.name}` : "No file selected", file ? "green" : "red");
});

document.getElementById("btn_upload_multi")?.addEventListener("click", () => {
    const files = [...document.getElementById("file_multi").files];
    setMsg(
        "msg_upload_multi",
        files.length ? `Uploaded: ${files.map(f => f.name).join(", ")}` : "No files selected",
        files.length ? "green" : "red"
    );
});

/* ---------------------------
   Dynamic Web Table
---------------------------- */

function generateMetrics() {
    return [
        { name: "System", cpu: rand(10, 90), mem: rand(500, 2000), net: rand(10, 100), disk: rand(50, 300) },
        { name: "Chrome", cpu: rand(5, 80), mem: rand(200, 1500), net: rand(5, 50), disk: rand(20, 150) },
        { name: "Firefox", cpu: rand(5, 70), mem: rand(200, 1200), net: rand(5, 40), disk: rand(20, 120) },
        { name: "Internet Explorer", cpu: rand(1, 50), mem: rand(100, 800), net: rand(1, 20), disk: rand(10, 80) }
    ];
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function renderDynamicTable() {
    const tbody = document.querySelector("#table_dynamic tbody");
    if (!tbody) return;

    tbody.innerHTML = "";
    generateMetrics().forEach(row => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${row.name}</td>
            <td>${row.cpu}%</td>
            <td>${row.mem}</td>
            <td>${row.net}</td>
            <td>${row.disk}</td>
        `;
        tbody.appendChild(tr);
    });
}

document.getElementById("btn_refresh_metrics")?.addEventListener("click", renderDynamicTable);
renderDynamicTable();

/* ---------------------------
   Pagination Table
---------------------------- */

const paginationData = [
    { id: 1, name: "Smartphone", price: "$10.99" },
    { id: 2, name: "Laptop", price: "$19.99" },
    { id: 3, name: "Tablet", price: "$5.99" },
    { id: 4, name: "Smartwatch", price: "$7.99" },
    { id: 5, name: "Wireless Earbuds", price: "$8.99" }
];

function renderPage(page) {
    const tbody = document.querySelector("#table_pagination tbody");
    if (!tbody) return;

    tbody.innerHTML = "";

    const itemsPerPage = 1;
    const start = (page - 1) * itemsPerPage;
    const row = paginationData[start];

    if (row) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${row.id}</td>
            <td>${row.name}</td>
            <td>${row.price}</td>
            <td><input type="checkbox"></td>
        `;
        tbody.appendChild(tr);
    }
}

document.querySelectorAll(".page-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        renderPage(Number(btn.dataset.page));
    });
});

renderPage(1);

/* ---------------------------
   Tabs
---------------------------- */

document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

        btn.classList.add("active");
        document.getElementById(btn.dataset.tab).classList.add("active");
    });
});

/* ---------------------------
   Dynamic START Button
---------------------------- */

document.getElementById("btn_start")?.addEventListener("click", () => {
    const btn = document.getElementById("btn_start");
    btn.disabled = true;
    setMsg("msg_start", "Processing...", "orange");

    setTimeout(() => {
        setMsg("msg_start", "Completed!", "green");
        btn.disabled = false;
    }, 2000);
});

/* ---------------------------
   Alerts & Popups
---------------------------- */

document.getElementById("btn_alert_simple")?.addEventListener("click", () => {
    alert("This is a simple alert");
});

document.getElementById("btn_alert_confirm")?.addEventListener("click", () => {
    const result = confirm("Do you confirm?");
    setMsg("msg_alerts", result ? "Confirmed" : "Cancelled", "purple");
});

document.getElementById("btn_alert_prompt")?.addEventListener("click", () => {
    const value = prompt("Enter something:");
    setMsg("msg_alerts", value ? `You entered: ${value}` : "No input", "purple");
});

document.getElementById("btn_new_tab")?.addEventListener("click", () => {
    window.open("https://example.com", "_blank");
});

document.getElementById("btn_popup_window")?.addEventListener("click", () => {
    window.open("https://example.com", "popup", "width=400,height=300");
});

/* ---------------------------
   Hover Menu
---------------------------- */

const hoverBtn = document.getElementById("btn_hover");
const hoverDropdown = document.getElementById("hover_dropdown");

hoverBtn?.addEventListener("mouseover", () => hoverDropdown.style.display = "block");
hoverBtn?.addEventListener("mouseout", () => hoverDropdown.style.display = "none");
hoverDropdown?.addEventListener("mouseover", () => hoverDropdown.style.display = "block");
hoverDropdown?.addEventListener("mouseout", () => hoverDropdown.style.display = "none");

/* ---------------------------
   Double Click
---------------------------- */

document.getElementById("btn_double_click")?.addEventListener("dblclick", () => {
    document.getElementById("dc_target").value =
        document.getElementById("dc_source").value;
});

/* ---------------------------
   Drag & Drop
---------------------------- */

const dragItem = document.getElementById("drag_item");
const dropZone = document.getElementById("drop_zone");

dragItem?.addEventListener("dragstart", e => {
    e.dataTransfer.setData("text/plain", "dragging");
});

dropZone?.addEventListener("dragover", e => e.preventDefault());

dropZone?.addEventListener("drop", e => {
    e.preventDefault();
    setMsg("msg_drag", "Dropped successfully!", "green");
});

/* ---------------------------
   Slider
---------------------------- */

document.getElementById("price_slider")?.addEventListener("input", e => {
    document.getElementById("price_value").textContent = e.target.value;
});

/* ---------------------------
   Visitors Form
---------------------------- */

document.querySelectorAll(".visitor_btn").forEach(btn => {
    btn.addEventListener("click", () => {
        setMsg("msg_visitor", `Section ${btn.dataset.section} submitted.`, "green");
    });
});

/* ============================================================
   PLAYWRIGHT PRACTICE PAGE LOGIC
============================================================ */

/* ---------------------------
   Login
---------------------------- */

document.getElementById("pw_btn_login")?.addEventListener("click", () => {
    const user = document.getElementById("pw_username").value;
    const pass = document.getElementById("pw_password").value;

    if (!user || !pass) {
        setMsg("pw_msg_login", "Please enter username and password.", "red");
        return;
    }

    setMsg("pw_msg_login", `Logged in as ${user}`, "green");
});

/* ---------------------------
   Dropdown + Multi-select
---------------------------- */

document.getElementById("pw_btn_dropdown")?.addEventListener("click", () => {
    const country = document.getElementById("pw_country").value;
    const skills = [...document.getElementById("pw_skills").selectedOptions].map(o => o.value);

    setMsg("pw_msg_dropdown", `Country: ${country || "None"} | Skills: ${skills.join(", ")}`, "blue");
});

/* ---------------------------
   Alerts
---------------------------- */

document.getElementById("pw_btn_alert_simple")?.addEventListener("click", () => {
    alert("Playwright Simple Alert");
});

document.getElementById("pw_btn_alert_confirm")?.addEventListener("click", () => {
    const result = confirm("Playwright Confirm Alert");
    setMsg("pw_msg_alert", result ? "Confirmed" : "Cancelled", "purple");
});

document.getElementById("pw_btn_alert_prompt")?.addEventListener("click", () => {
    const value = prompt("Enter something:");
    setMsg("pw_msg_alert", value ? `You entered: ${value}` : "No input", "purple");
});

/* ---------------------------
   New Tab & Popup
---------------------------- */

document.getElementById("pw_btn_new_tab")?.addEventListener("click", () => {
    window.open("https://example.com", "_blank");
});

document.getElementById("pw_btn_popup_window")?.addEventListener("click", () => {
    window.open("https://example.com", "popup", "width=400,height=300");
});

/* ---------------------------
   File Upload
---------------------------- */

document.getElementById("pw_btn_file")?.addEventListener("click", () => {
    const file = document.getElementById("pw_file").files[0];
    setMsg("pw_msg_file", file ? `Uploaded: ${file.name}` : "No file selected", file ? "green" : "red");
});

/* ---------------------------
   Drag & Drop
---------------------------- */

const pwDrag = document.getElementById("pw_drag_item");
const pwDrop = document.getElementById("pw_drop_zone");

pwDrag?.addEventListener("dragstart", e => {
    e.dataTransfer.setData("text/plain", "dragging");
});

pwDrop?.addEventListener("dragover", e => e.preventDefault());

pwDrop?.addEventListener("drop", e => {
    e.preventDefault();
    setMsg("pw_msg_drag", "Dropped successfully!", "green");
});

/* Circle Drag & Drop */

const circleDrag = document.getElementById("pw_circle_drag");
const circleDrop = document.getElementById("pw_circle_drop");

circleDrag?.addEventListener("dragstart", e => {
    e.dataTransfer.setData("text/plain", "circle");
});

circleDrop?.addEventListener("dragover", e => e.preventDefault());

circleDrop?.addEventListener("drop", e => {
    e.preventDefault();
    setMsg("pw_msg_drag", "Circle dropped successfully!", "green");
});

/* ---------------------------
   Hidden Elements & AJAX
---------------------------- */

document.getElementById("pw_btn_toggle_hidden")?.addEventListener("click", () => {
    const area = document.getElementById("pw_hidden_area");
    area.style.display = area.style.display === "none" ? "block" : "none";
});

document.getElementById("pw_btn_ajax")?.addEventListener("click", () => {
    const loader = document.getElementById("pw_ajax_loader");
    const msg = document.getElementById("pw_msg_ajax");

    loader.style.display = "block";
    msg.textContent = "";

    setTimeout(() => {
        loader.style.display = "none";
        setMsg("pw_msg_ajax", "AJAX content loaded.", "green");
    }, 1500);
});

/* ---------------------------
   Shadow DOM
---------------------------- */

const shadowHost = document.getElementById("pw_shadow_host");

if (shadowHost) {
    const shadow = shadowHost.attachShadow({ mode: "open" });

    shadow.innerHTML = `
        <style>
            .shadow-box {
                padding: 15px;
                background: #e3f2fd;
                border-radius: 6px;
                border: 1px solid #90caf9;
            }
        </style>
        <div class="shadow-box">
            <p>This text is inside Shadow DOM</p>
            <button id="shadow_btn">Click Me</button>
            <p id="shadow_msg"></p>
        </div>
    `;

    shadow.querySelector("#shadow_btn").addEventListener("click", () => {
        shadow.querySelector("#shadow_msg").textContent = "Shadow DOM button clicked!";
    });
}

/* ---------------------------
   Dynamic Loading
---------------------------- */

document.getElementById("pw_btn_load")?.addEventListener("click", () => {
    const loader = document.getElementById("pw_loader");
    const content = document.getElementById("pw_loaded_content");

    loader.style.display = "block";
    content.style.display = "none";

    setTimeout(() => {
        loader.style.display = "none";
        content.style.display = "block";
    }, 2000);
});

/* ---------------------------
   Modal
---------------------------- */

const modal = document.getElementById("pw_modal");

document.getElementById("pw_btn_open_modal")?.addEventListener("click", () => {
    modal.style.display = "block";
});

document.getElementById("pw_btn_close_modal")?.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
});

/* ---------------------------
   Fake API
---------------------------- */

document.getElementById("pw_btn_api")?.addEventListener("click", () => {
    const msg = document.getElementById("pw_msg_api");

    msg.textContent = "Fetching data...";
    msg.style.color = "orange";

    setTimeout(() => {
        msg.textContent = "Data fetched: { id: 1, name: 'Playwright User' }";
        msg.style.color = "green";
    }, 1500);
});
