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
    
    const rlButton = document.querySelector('.app-body > .recipient-lookup button');
    const openURL = showRecipientLookup(rlButton, email);
    
    showMailboxes(store_list);
    showOpenFreshdeskTickets(id, email);
    
    client.events.on('app.deactivated', () => rlButton.removeEventListener('click', openURL))
  } else {
    let p = document.createElement('p');
    p.innerText = 'App unavailable, email not found.';
    appBody.append(p);
  }
}

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
    <button>
      <img src="https://i.ibb.co/qBGyThG/reciplookupsvg-1.png">
      <span>Recipient Lookup</span>
    </button>
  </div>`
}

async function getCustomerEmail() {
  let {user : {email}} = await client.data.get('user');
  if (email) {
    console.log(`Got email: ${email}`)
    return encodeURIComponent(email);
  } else return email;
}

async function getCustomerDataFromFreshdesk(email){
  try {
    
    const requestURL = `https://ipostal1.freshdesk.com/api/v2/contacts?email=${email}`;
    const options = {headers: {"Authorization": "Basic <%= encode(iparam.apiKey) %>"}};
    const data = await client.request.get(requestURL, options);
    const response = JSON.parse(data.response);
  
    const [{custom_fields: {store_list = "No mailboxes found"}, id}] = response;
    return {store_list, id};  
  } catch (error) {
    // console.error('Mailboxes not retrieved, ser is not in freshdesk.')
    const store_list = 'No mailboxes found, user not in Freshdesk';
    const id = '';
    return {store_list, id};
  }
  
  
  
}

function showMailboxes(store_list){

  const mailboxes = document.querySelector(".mailboxes");
  const p = document.createElement('p');
  p.innerText = store_list;
  mailboxes.append(p)

}

function showRecipientLookup(button, email){
  button.style.display = 'flex';
  button.addEventListener('click', openURL);
  
  function openURL() {
    console.log(email);
    let recipientLookupURL = `https://ipostal1.com/CP/customers_lookup.php?expired=&logged=&action=process&status=all&doc_status=all&preapproval=&do_not_email_customer=all&type=0&billing_option=all&search=${email}&search_pob=&search_phone=&search_id=&search_button=search`;
    console.log(recipientLookupURL);
  
    window.open(recipientLookupURL, "_blank");
  }

  return openURL;
}

async function showOpenFreshdeskTickets(id, email){
  console.log(`Getting tickets for ${email}`)
  try {
    const requestURL = `https://ipostal1.freshdesk.com/api/v2/tickets?email=${email}`;
    const options = {headers: {"Authorization": "Basic <%= encode(iparam.apiKey) %>"}}
    const data = await client.request.get(requestURL, options);
    const response = JSON.parse(data.response);

    let openTickets = response.filter( ticket => ticket.status === 2).length;
    console.log(`Found ${openTickets} open ticket(s).`)

    document.querySelector('.freshdesk-tickets .count').innerText = openTickets;

    // a status of 2 means open tickets, see FD docs for details.
    const status = encodeURIComponent(`:[2]`);
    // the requestor must be the users Freshdesk ID.
    const requestor = encodeURIComponent(`:[${id}]`);
    const viewTicketURL = `https://ipostal1.freshdesk.com/a/tickets/filters/search?orderBy=created_at&orderType=desc&q[]=status${status}&q[]=requester${requestor}&ref=all_tickets`
    
    const fdButton = document.querySelector('.freshdesk-tickets a');
    fdButton.setAttribute('href', viewTicketURL);
    fdButton.setAttribute('target', '_blank');


  } catch (error) {
    const response = JSON.parse(error.response)
    console.error(`Could not get tickets for user. Reason: ${response.errors[0].message}`)
  }
}


