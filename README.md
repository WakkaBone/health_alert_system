This is the possible implication of the **settings page of health alerts notification system**.

The system offers **two types of subscriptions**: **basic** and **advanced**. In the working application the type of subscription will be received from the server side, but here it is hardcoded in .env file. **By default it is set to 'advanced'**. If you want to see how the 'basic' plan looks - change the value to 'basicOnly'.

Specified **settings are being saved to the local storage**. Once we have made any changes, we can click on 'SAVE' or 'DISCARD' buttons. If save - we launch the validation and if no mistakes - give the success message. If discard - we return to the previous state of settings saved in the local storage.

This application is written on **React** with **Styled-Components** used for styling.
