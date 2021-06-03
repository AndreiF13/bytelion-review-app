# Published Expo Project
- https://expo.io/@gmonteiroitcrowd/app

# Components Used
- **Redux + Redux Persist** to provide a simple way to use localstorage to save user state.
- **React Native Comumunity DateTime Picker** to give the ability to filter reviews.
- **MomentJS** to deal with dates.

# Custom Made Components
- For this project, in order to provide a "rating start" feature I've created a custom component **RatingStar** which receives a rating value and build the rating list based on the rating valued provided.

# Disclaimer about using Redux Persist
- In the real world for exemple, when fetching a review list and being able to **up, down vote, comment etc** the normal path is to have a REST API which provide us a way to (GET, POST, PATCH) information about an especific review record, but for this challenge as it was requested that user state should be saved I opted for using **Redux Persist**, which is a middleware to combine the Redux flow and use LocalStorage to save modifications when they happen.

# How to Run Locally?
- In order to be able to login using Google Auth you need to configure your Google Account to link it to the expo environment.
- You just need to simply run `yarn ios` to run the app (in manual mode).
