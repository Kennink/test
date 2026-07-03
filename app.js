let contacts = [];

const result = document.getElementById("result");
const searchInput = document.getElementById("searchInput");
const totalContacts = document.getElementById("totalContacts");
const clearBtn = document.getElementById("clearBtn");

// =============================
// Load Contacts
// =============================

async function fetchData() {

    result.innerHTML = `
        <div class="welcome">
            <h2>Loading contacts...</h2>
        </div>
    `;

    try {

        const response = await fetch("./contacts.json", {
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        contacts = await response.json();

        totalContacts.innerHTML =
            `Total Contacts : <b>${contacts.length}</b>`;

        result.innerHTML = `
            <div class="welcome">
                <h2>👮 Nepal Police Contact Directory</h2>
                <p>Start typing to search contacts.</p>
            </div>
        `;

    } catch (error) {

        console.error(error);

        result.innerHTML = `
            <div class="no-result">
                Unable to load contacts.
            </div>
        `;
    }
}

fetchData();


// =============================
// Search
// =============================

searchInput.addEventListener("input", searchContact);

clearBtn.addEventListener("click", () => {

    searchInput.value = "";

    result.innerHTML = `
        <div class="welcome">
            <h2>👮 Nepal Police Contact Directory</h2>
            <p>Start typing to search contacts.</p>
        </div>
    `;

    totalContacts.innerHTML =
        `Total Contacts : <b>${contacts.length}</b>`;

});


// =============================
// Highlight Text
// =============================

function highlight(text, keyword){

    if(!keyword) return text || "";

    return String(text).replace(

        new RegExp(`(${keyword})`, "gi"),

        "<mark>$1</mark>"

    );

}


// =============================
// Search Function
// =============================

function searchContact(){

    const keyword = searchInput.value.trim().toLowerCase();

    if(keyword===""){

        result.innerHTML = `
            <div class="welcome">
                <h2>👮 Nepal Police Contact Directory</h2>
                <p>Start typing to search contacts.</p>
            </div>
        `;

        totalContacts.innerHTML =
            `Total Contacts : <b>${contacts.length}</b>`;

        return;

    }

    const filtered = contacts.filter(contact =>

        (contact.name || "").toLowerCase().includes(keyword) ||

        (contact.npname || "").toLowerCase().includes(keyword) ||

        (contact.rank || "").toLowerCase().includes(keyword) ||

        (contact.phone || "").includes(keyword) ||

        (contact.response || "").toLowerCase().includes(keyword) ||

        (contact.blood || "").toLowerCase().includes(keyword)

    );

    totalContacts.innerHTML =
        `Showing <b>${filtered.length}</b> of <b>${contacts.length}</b> contacts`;

    if(filtered.length===0){

        result.innerHTML = `
            <div class="no-result">
                <h2>😔</h2>
                <p>No contact found.</p>
            </div>
        `;

        return;

    }

    result.innerHTML = filtered.map(contact => `

<div class="contact-card">

<div class="top-row">

<div class="rank">

${highlight(contact.rank,keyword)}

</div>

<div class="blood">

🩸 ${highlight(contact.blood,keyword)}

</div>

</div>

<div class="name">

${highlight(contact.npname,keyword)}

</div>

<div class="info">

<div class="info-row">

<div class="label">
मोबाइल
</div>

<div class="value">

${highlight(contact.phone,keyword)}

</div>

</div>

<div class="info-row">

<div class="label">
दर्जा
</div>

<div class="value">

${highlight(contact.rank,keyword)}

</div>

</div>

<div class="info-row">

<div class="label">
जिम्मेवारी
</div>

<div class="value">

${highlight(contact.response,keyword)}

</div>

</div>

<div class="info-row">

<div class="label">
Blood Group
</div>

<div class="value">

${highlight(contact.blood,keyword)}

</div>

</div>

</div>

<div class="button-row">

<button
class="copy-btn"
onclick="copyNumber('${contact.phone}')">

📋 Copy

</button>

<button
class="call-btn"
onclick="makeCall('${contact.phone}')">

📞 Call

</button>

</div>

</div>

`).join("");

}


// =============================
// Copy Phone Number
// =============================

function copyNumber(number){

    navigator.clipboard.writeText(number);

    alert("Copied : " + number);

}


// =============================
// Call
// =============================

function makeCall(number){

    window.location.href = "tel:" + number;

}
