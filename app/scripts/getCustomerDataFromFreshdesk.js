async function getCustomerDataFromFreshdesk(email){
    const customerData = {}
      const data = await client.request.invokeTemplate("getCustomerDataFromFreshdesk", {
        context: { "email": email }
      })
      console.log("Customer Data", data)
      const response = JSON.parse(data.response);
      
      // The customer's email is not in freshdesk
      if(!response.length) {
        console.log('no email in fresh')
        customerData.error = 'This email was not found in freshdesk.'
        return customerData
      }

      // The customer has an email in FD but no store_list value
      const [{custom_fields: { store_list }, id}] = response;
      customerData.storeList = store_list ? store_list : "No mailboxes found."
      customerData.id = id
      
      return customerData;  
}