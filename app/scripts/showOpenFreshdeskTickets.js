async function showOpenFreshdeskTickets(id, email){
    console.log(`Getting tickets for ${email}`)
    // const baseURL = 'https://ipostal1.freshdesk.com/api/v2/';
    // const authorization = "Basic <%= encode(iparam.apiKey) %>"
    console.log(email)

    async function addAgentPortalTags(ticketIDs){
        // !!!!Developer Ticket #'s -- COMMENT OUT BEFORE PRODUCTION!!!!
        // const ticketIDs = [ 610193, 654262, 654264 ] // these are test tickets assigned to luke
        await client.request.invokeTemplate("addAgentPortalTags", {
          body: JSON.stringify({
            "bulk_action": {
              "ids": ticketIDs,
              "properties": {
                "tags": ["Agent Portal"]
              }
            }
          })
        });
        console.log('Tags added!');
    }

    try {
  
      //Save the ticket ids into local storage for use in addAgentPortalTags?
      // const requestURL = `${baseURL}tickets?email=${email}`;
      // const options = {headers: {"Authorization": authorization}}
      // const data = await client.request.get(requestURL, options);
      const data = await client.request.invokeTemplate("getOpenTicketsByCustomerEmail", {
        context: { "email": email }
      })
      console.log("show open tickets data:", data)
      const response = JSON.parse(data.response);

      const openTickets = response.filter( ticket => ticket.status === 2);
      console.log(`Found ${openTickets.length} open ticket(s).`)

      document.querySelector('.freshdesk-tickets .count').innerText = openTickets.length;

      const freshDeskTicketsElem = document.querySelector('.freshdesk-tickets')
      freshDeskTicketsElem.style.display = "block"
      const fdButton = document.querySelector('.freshdesk-tickets a');
      
      if (!openTickets.length) {
        freshDeskTicketsElem.classList = "freshdesk-tickets zero-tickets"
        fdButton.style.display = 'none';
        // if no open tickets exit this function, we don't there is nothing to map.
        return;
      }

      const ticketIDs = openTickets.map( ticket => ticket.id);
  
      // a status of 2 means open tickets, see FD docs for details.
      const status = encodeURIComponent(`:[2]`);
      // the requestor must be the users Freshdesk ID.
      const requestor = encodeURIComponent(`:[${id}]`);
      const viewTicketURL = `https://ipostal1.freshdesk.com/a/tickets/filters/search?orderBy=created_at&orderType=desc&q[]=status${status}&q[]=requester${requestor}&ref=all_tickets`
      
      // set styles and other attributes
      freshDeskTicketsElem.classList = 'freshdesk-tickets'
      
      fdButton.style.display = 'flex'
      fdButton.setAttribute('href', viewTicketURL);
      fdButton.setAttribute('target', '_blank');
      fdButton.addEventListener('click', () => addAgentPortalTags(ticketIDs))
  
    } catch (error) {

      console.error(error)
      // console.error(`Could not get tickets for user. Reason: ${response.errors[0].message}`)

    }
  }