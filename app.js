let contacts = [];

// Fetch the contact data from the JSON file
function fetchData() {
  fetch('contacts.json')
    .then(response => response.json())
    .then(data => {
      contacts = data;
      console.log("Contacts loaded:", contacts); // Debugging line
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

// Search for contacts by name
function searchContact() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const resultDiv = document.getElementById('result');
  
  if (!searchInput.trim()) {
    resultDiv.innerHTML = '<p>Search results will appear here...</p>';
    return;
  }
  
  // Filter contacts based on the search input
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchInput)
  );

  console.log("Filtered contacts:", filteredContacts); // Debugging line

  // Display results
  if (filteredContacts.length > 0) {
    resultDiv.innerHTML = filteredContacts.map(contact => {
      return `
        <div class="contact-result">
          <h2>Rank: ${contact.rank}</h2>
          <p>Name: ${contact.name}</p>
          <p>Phone: ${contact.phone}</p>
          <button onclick="makeCall('${contact.phone}')">Call</button>
        </div>
      `;
    }).join('');
  } else {
    resultDiv.innerHTML = '<p>No contact found.</p>';
  }
}

// Function to initiate the phone call
function makeCall(phoneNumber) {
  window.location.href = `tel:${phoneNumber}`;
}

// Fetch data when the page is loaded
document.addEventListener('DOMContentLoaded', fetchData);
