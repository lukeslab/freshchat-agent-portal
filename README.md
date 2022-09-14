# Agent Portal

The purpose of this app is to streamline our agent interactions with the customer they are currently chatting with. At this time, it has two function:

1.) to provide a count and filtered view of the number of open tickets a currently chatting customer has open in Freshdesk; and
2.) provide our agent a button to quickly take them to the recipient lookup in the USZOOM Admin Portal while at the same time filtering for the user email they are chatting with.

The app will display on the right-hand side of the chat inbox screen, using the placeholder `conversation_user_info` in the manifest.json file. Please see Freshchat developers SDK for more information.

# Details

## Count/View of Open Tickets

Freshchat has a native Freshdesk integration that displays user tickets, however this includes all tickets regardless of status such as closed or resolved. In an attempt to clean up this list, this app will show a count of the number of open tickets only, and clicking it will take the agent to a filtered view of this count.

## Recipient Lookup Button

### Requirements

Before an agent interacts with the button, they must meet the following criteria:

1.) the customer email they are chatting with is a customer email currently in the system,
2.) the agent must not have an expired session in the admin portal,
3.) the agent must set the recipient lookup store value to 'ALL'.

# Known Issues

If an agent uses the button, then navigate into the users profile and attempt to view a users 1583 form file, it may result in the browser blocking the file from opening as if it were a popup. To circumvent this, please right-click the 'view' button for the image file that is not opening and click 'open in new tab'.

## Files and Folders

.
├── README.md A file for your future self and developer friends to learn about app
├── app A folder to place all assets required for frontend components
│ ├── index.html A landing page for the user to use the app
│ ├── scripts JavaScript to place files frontend components business logic
│ │ └── app.js
│ └── styles A folder to place all the styles for app
│ ├── images
│ │ └── icon.svg
│ │ └── rocket.svg
│ └── style.css
├── config A folder to place all the configuration files
│ └── iparams.json
└── manifest.json A JSON file holding meta data for app to run on platform

Explore [more of app sample apps](https://community.developers.freshworks.com/t/freshworks-sample-apps/3604) on the Freshworks github respository.
