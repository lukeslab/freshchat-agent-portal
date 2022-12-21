function showMailboxes(store_list){

    const mailboxes = document.querySelector(".mailboxes");
    const p = document.createElement('p');
    p.innerText = store_list;
    mailboxes.append(p)
  
}