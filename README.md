# iCracked

The iCracked Mobile Devices API

iCracked has a public API that exposes the devices that we service.

Our api’s base path is:
https://www.icracked.com/v2/api

Query our devices:

GET /mobiledevices

Get a specific device:

GET /mobiledevices/2

Query models of a device:

GET /mobiledevices/2/models

Get a model for a device

GET /mobiledevices/2/models/3

Query networks, colors, sizes, or conditions for a model

GET /mobiledevices/2/models/3/networks
(orcolors,sizes,conditions)

To submit a repair request, the user navigates through our "Repair Flows" at:
www.icracked.com/repair

The Project

Using these API endpoints, re-create the functional aspects of the Repair Flow.

- You can use any front-end web technologies that you want.
- Only focus on the buttons in the flow (e.g. iPhone, iPad, Samsung), and the headers (e.g.
"What Model iPhone?")
- Do Not spend any time working on the visual aspects of the flow.
- Also do not spend any time accessory features, ex. modals, breadcrumbs, or navigation.
- Bonus points if the URL changes appropriately.
