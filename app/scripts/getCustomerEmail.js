async function getCustomerEmail() {
    let {user : {email}} = await client.data.get('user');
    if (email) {
      console.log(`Got email: ${email}`)
      return email;
    } else return null;
  }