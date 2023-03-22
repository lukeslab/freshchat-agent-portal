var client;

(async function init() {
  client = await app.initialized()
  client.events.on('app.activated', renderAgentPortal)
})()

async function renderAgentPortal(){
  console.log("Agent-portal App Activated");
  const noEmailElem = document.querySelector('.no-email')
  const appBody = document.querySelector('.app-body');
  const freshDeskTicketsElem = document.querySelector('.freshdesk-tickets')
  
  appBody.style.display = "flex"
  freshDeskTicketsElem.style.display = "none"
  noEmailElem.style.display = "none"

  const email = await getCustomerEmail();

  if(email) {
    const customerData = await getCustomerDataFromFreshdesk(email);
    const { id, error } = customerData
    console.log(customerData)
    showRecipientLookup(email);
    showMailboxes(customerData);

    if (!error) {
      showOpenFreshdeskTickets(id, email);
    }
  } else {
    appBody.style.display = "none"
    noEmailElem.style.display = "block"
  }
}