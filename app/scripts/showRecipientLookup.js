function showRecipientLookup(email){
    const rlButton = document.querySelector('.recipient-lookup a');
    rlButton.style.display = 'flex';
  
    let recipientLookupURL = `https://ipostal1.com/CP/customers_lookup.php?expired=&logged=&action=process&status=all&doc_status=all&preapproval=&do_not_email_customer=all&type=0&billing_option=all&search=${email}&search_pob=&search_phone=&search_id=&search_button=search`;
    rlButton.setAttribute('href', recipientLookupURL);
    rlButton.setAttribute('target', '_blank');
  }