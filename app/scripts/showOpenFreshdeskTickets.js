async function showOpenFreshdeskTickets(id, email){
    console.log(`Getting tickets for ${email}`)
    const baseURL = 'https://ipostal1.freshdesk.com/api/v2/';
    const authorization = "Basic <%= encode(iparam.apiKey) %>"

    async function addAgentPortalTags(ticketIDs){
        const requestURL = `${baseURL}/tickets/bulk_update`
        // !!!!Developer Ticket #'s -- COMMENT OUT BEFORE PRODUCTION!!!!
        // const ticketIDs = [ 610193, 654262, 654264 ] // these are test tickets assigned to luke
        await client.request.post(requestURL, {
          headers: {
            "Authorization": authorization,
            "Content-Type": "application/json"
          },
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
      const requestURL = `${baseURL}tickets?email=${email}`;
      const options = {headers: {"Authorization": authorization}}
      const data = await client.request.get(requestURL, options);
      const response = JSON.parse(data.response);
  
      const openTickets = response.filter( ticket => ticket.status === 2);
      console.log(`Found ${openTickets.length} open ticket(s).`)

      document.querySelector('.freshdesk-tickets .count').innerText = openTickets.length;

      if (openTickets.length === 0) {
        document.querySelector('.freshdesk-tickets').classList = "freshdesk-tickets zero-tickets"
        document.querySelector('.freshdesk-tickets a').style.display = 'none';
        return;
      }
      const ticketIDs = openTickets.map( ticket => ticket.id);
  
      // a status of 2 means open tickets, see FD docs for details.
      const status = encodeURIComponent(`:[2]`);
      // the requestor must be the users Freshdesk ID.
      const requestor = encodeURIComponent(`:[${id}]`);
      const viewTicketURL = `https://ipostal1.freshdesk.com/a/tickets/filters/search?orderBy=created_at&orderType=desc&q[]=status${status}&q[]=requester${requestor}&ref=all_tickets`
      
      const fdButton = document.querySelector('.freshdesk-tickets a');
      fdButton.setAttribute('href', viewTicketURL);
      fdButton.setAttribute('target', '_blank');
      fdButton.addEventListener('click', () => addAgentPortalTags(ticketIDs))
  
    } catch (error) {

      const response = JSON.parse(error.response)
      console.error(`Could not get tickets for user. Reason: ${response.errors[0].message}`)

    }
  }