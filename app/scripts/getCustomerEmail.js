async function getCustomerEmail() {
    let {user : {email}} = await client.data.get('user');
    if (email) {
      console.log(`Got email: ${email}`)
      return encodeURIComponent(email);
    } else return email;
  }