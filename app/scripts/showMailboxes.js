function showMailboxes(store_list){
    console.log("Showing mailbox:", store_list )
    const mailboxes = document.querySelector(".mailboxes");
    const p = document.createElement('p');
    p.innerText = store_list;
    // mailboxes.appendChild(p)
    mailboxes.innerHTML = p.outerHTML
}