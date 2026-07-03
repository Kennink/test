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

        const response = await fetch(`contacts.json?${Date.now()}`);

        contacts = await response.json();

        totalContacts.innerHTML =
            `Total Contacts : <b>${contacts.length}</b>`;

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

function searchContact() {

    const keyword = document.getElementById("searchInput")
        .value
        .trim()
        .toLowerCase();

    const resultDiv = document.getElementById("result");

    if (keyword === "") {

        resultDiv.innerHTML =
            "<p>Search results will appear here...</p>";

        return;

    }

    const filteredContacts = contacts.filter(contact =>

        (contact.name || "").toLowerCase().includes(keyword) ||

        (contact.npname || "").toLowerCase().includes(keyword) ||

        (contact.rank || "").toLowerCase().includes(keyword) ||

        (contact.phone || "").includes(keyword) ||

        (contact.response || "").toLowerCase().includes(keyword) ||

        (contact.blood || "").toLowerCase().includes(keyword)

    );

    if(filteredContacts.length===0){

        resultDiv.innerHTML="<p>No contact found.</p>";

        return;

    }

    resultDiv.innerHTML = filteredContacts.map(contact=>`

<div class="contact-result">

<div class="contact-details">

<p><strong>दर्जा :</strong> ${contact.rank}</p>

<p><strong>नाम :</strong> ${contact.npname}</p>

<p><strong>मो. नं. :</strong> ${contact.phone}</p>

<p><strong>जिम्मेवारी :</strong> ${contact.response}</p>

<p><strong>Blood Group :</strong> ${contact.blood}</p>

</div>

<div>

<button class="call-btn"

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
