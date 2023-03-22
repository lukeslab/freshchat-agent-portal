function showMailboxes(customerData){
    const {storeList, error} = customerData
    const mailboxes = document.querySelector(".mailboxes");
    const p = document.createElement('p');


    p.innerText = error ? error : storeList
    mailboxes.innerHTML = p.outerHTML
}