# Agent Portal

The purpose of this app is to streamline our agent interactions with the customer they are currently chatting with. At this time, it has two function:

1.) to provide a count and filtered view of the number of open tickets a currently chatting customer has open in Freshdesk; and
2.) provide our agent a button to quickly take them to the recipient lookup in the USZOOM Admin Portal while at the same time filtering for the user email they are chatting with.

The app will display on the right-hand side of the chat inbox screen, using the placeholder `conversation_user_info` in the manifest.json file. Please see Freshchat developers SDK for more information.

# Details

## Mailboxes

The mailboxes data is pulled from Freshdesk using the store_list property value. This in turn should be synced with the Admin portal.

## Count/View of Open Tickets

Freshchat has a native Freshdesk integration that displays user tickets, however this includes all tickets regardless of status such as closed or resolved. In an attempt to clean up this list, this app will show a count of the number of open tickets only, and clicking it will take the agent to a filtered view of this count. If the number of open tickets is greater than 0, it will be colored red. Otherwise, it will be green.

## Recipient Lookup Button

The recipient lookup button will allow an agent to search the customer in the Admin portal simply by clicking the button. The below requirements must be met by the agent before it will work.

### Requirements

Before an agent interacts with the button, they must meet the following criteria:

1.) the customer email they are chatting with is a customer email currently in the system,
2.) the agent must not have an expired session in the admin portal,
3.) the agent must set the recipient lookup store value to 'ALL'.

## App States

There are five app states, each of which will show different interfaces depending on the result. If an email is not provided through the chat widget, then the app will only show the error message "No email was provided" (Figure 1). If an email was provide but it was not found in Freshdesk, then the agent will see a message that states this and also have recipient lookup functionality (Figure 2). If an email was provided, is in Freshdesk, but does not have a store_list value, the agent will see an error message that "No mailboxes were found" but will still have access to the Open Tickets counter, View Tickets button, and Recipient Lookup button (Figure 3). Finally, if an email was provided, is found in Freshdesk, and has store_list value, the agent will be able to see the mailboxes listed in this value + all of the features mentioned above (Figures 4 & 5). For the final two cases the open tickets counter will be colored green if the number of open tickets is zero. If the number of open tickets exceeds zero, it will be colored red and provide a view tickets button. Example conversations are provided below.

Figure 1 - Email not provided
![Screenshot of email not provided](fig1.png)
https://ipostal1.freshchat.com/a/236306003128395/inbox/2/0/conversation/720870712804149?dev=true

Figure 2 - Email provided but not in freshdesk.
![Screenshot of email provided but not in freshdesk](fig2.png)
https://ipostal1.freshchat.com/a/236306003128395/inbox/2/0/conversation/720867158787826?dev=true

Figure 3 - Email provided and is in Freshdesk but does not have store_list value
![Email provided and is in Freshdesk but does not have store_list value](fig3.png)
https://ipostal1.freshchat.com/a/236306003128395/inbox/2/0/conversation/720872696968715?dev=true

Figure 4 - Email provided, is in Freshdesk, has store_list property value, and zero open tickets
![Email provided, is in Freshdesk, and has store_list property value](fig4.png)
https://ipostal1.freshchat.com/a/236306003128395/inbox/2/0/conversation/720866553638500?dev=true

Figure 5 - Email provided, is in Freshdesk, has store_list property value, and atleast 1 open ticket
![Email provided, is in Freshdesk, has store_list property value, and atleast 1 open ticket](fig5.png)

# Known Issues

If an agent uses the button, then navigate into the users profile and attempt to view a users 1583 form file, it may result in the browser blocking the file from opening as if it were a popup. To circumvent this, please right-click the 'view' button for the image file that is not opening and click 'open in new tab'.
