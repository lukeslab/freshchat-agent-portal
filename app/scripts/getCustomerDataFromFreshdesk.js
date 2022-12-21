async function getCustomerDataFromFreshdesk(email){
    try {
  
      const requestURL = `https://ipostal1.freshdesk.com/api/v2/contacts?email=${email}`;
      const options = {headers: {"Authorization": "Basic <%= encode(iparam.apiKey) %>"}};
      const data = await client.request.get(requestURL, options);
      const response = JSON.parse(data.response);
    
      const [{custom_fields: {store_list = "No mailboxes found"}, id}] = response;
      return {store_list, id};  
  
    } catch (error) {
  
      const store_list = 'This email was not found in Freshdesk.';
      const id = '';
      document.querySelector('.freshdesk-tickets').style.display = 'none';
      return {store_list, id};
  
    }
}