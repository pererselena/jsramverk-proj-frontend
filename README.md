This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Teknikval för frontend

I detta projekt har jag valt att göra en trading plattform för att kunna köpa och sälja produkter som råvaror och aktier. Namnen har fått inspiration från utbildningen.

I frontend har jag valt att använda mig av React, dotenvm chart.js, react-chartjs-2, formik, socket.io, yup med mera.

React för att det är vad jag är van vid att jobba med sedan tidigare kursmoment, react-chartjs-2 verkade vara en bra implententaion av chart.js som uppfyller de krav som jag har och passar väl in i det exempel som fanns att tillgå och hade en del lätta exempel att förstå på sin sida.
Fomik har via yup väldigt bra validerings möjligheter som passar bra in i appen.

i src finns alla components ligger i en mapp components, bilder i images.

Jag har valt att göra en första sida där alla produkter visas och först hämtas från backend via fetch för att sedan få pris uppdateringar från socket.io. Jag visar även upp en graf med historiska prisuppgifter med hjälp av react-chartjs-2. Jag har valt att spara 30 pulser av pris information i min graf.
Man kan klicka på en köp knapp för att komma till en visnings sida för att konfirmera sitt inköp av produkten.
Det finns också länkar för att logga in, logga ut och titta i sin depå.

I depån visas alla de ordrar som man har köpt, med vilken produkt som ingår, antal man köpt vilket pris man köpte det för samt ett realtids pris. Man kan även via knappar gå till två andra components AddMoney och Sell som hanterar insättning av pengar samt säljer en order.

Om man inte är inloggad kommer man när man går till depå eller buy att hänvisas till inloggnings sidan. Om man är inloggad och går till logga in kommer man istället att se ett logga ut formulär.

I buy och sell ser man det pris som visades i endera home eller depå. Informationen om pris och/eller hur mycket man äger skickas till dessa components. Jag använder mig av fetch för att ansluta till API:et för att köpa eller sälja produkterna.

Alla forms som finns i appen använder formik med yup som validering av input.
Om det går fel på api sidan och den skickar tillbaks en felkod visas den i frontend också.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
