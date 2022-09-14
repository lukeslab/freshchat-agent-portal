document.addEventListener('DOMContentLoaded', function() {
  app.initialized()
    .then(function(_client){
      console.log("App Initialized for first time")
      window.client = _client;
      client.events.on('app.activated', renderAgentPortal);
      
    })
})

async function renderAgentPortal(){
  // let { user: { email } } = client.data.get('user');
  console.log("Agent-portal App Activated");
  showRecipientLookup();
  // showOpenFreshdeskTickets();
  
}


function showRecipientLookup(){
  client.data.get('user').then(({user : {email}}) => {
    console.log(`Got email: ${email}`)
    if (email) {
      
      email = encodeURIComponent(email);

      const button = document.querySelector('.agent-portal-recipient-lookup button');
      button.style.display = 'flex';
      button.addEventListener('click', openURL)
      
      client.events.on('app.deactivated', () => {
        button.removeEventListener('click', openURL)
      })

      function openURL() {
      
        console.log(email);
        let recipientLookupURL = `https://ipostal1.com/CP/customers_lookup.php?expired=&logged=&action=process&status=all&doc_status=all&preapproval=&do_not_email_customer=all&type=0&billing_option=all&search=${email}&search_pob=&search_phone=&search_id=&search_button=search`;
        console.log(recipientLookupURL);
      
        window.open(recipientLookupURL, "_blank");
      }
      
    } else throw new Error('No Email')
  })
  .catch(error => console.error(error))
}

async function showOpenFreshdeskTickets(){

}


