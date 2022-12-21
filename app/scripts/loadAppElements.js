function loadAppElements(appBody) {
    appBody.innerHTML = `
    <div class="freshdesk-tickets">
      <div class="counter">
        <span class="count"></span>
        <span>Open Ticket(s)</span>
        <a>View Tickets</a>
      </div>
    </div>
  
    <div class="recipient-lookup">
      <div class="mailboxes">
        
      </div>
      <a>
        <img src="https://i.ibb.co/qBGyThG/reciplookupsvg-1.png">
        <span>Recipient Lookup</span>
      </a>
    </div>`
}