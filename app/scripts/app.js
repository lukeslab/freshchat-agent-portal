document.addEventListener('DOMContentLoaded', function() {
  app.initialized()
    .then(function(_client){
      console.log("App Initialized for first time")
      window.client = _client;
      client.events.on('app.activated', renderAgentPortal);
    })
})

async function renderAgentPortal(){
  console.log("Agent-portal App Activated");
  const appBody = document.querySelector('.app-body');
  appBody.innerHTML = '';

  const email = await getCustomerEmail();
  if (email) {;
    await loadAppElements(appBody);

    const {store_list, id} = await getCustomerDataFromFreshdesk(email);
    
    showRecipientLookup(email);
    
    showMailboxes(store_list);
    showOpenFreshdeskTickets(id, email);
    
  } else {
    let p = document.createElement('p');
    p.innerText = 'No email provided.';
    appBody.append(p);    
  }
}










