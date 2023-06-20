# Modelyst - Registration Form

## Structure

- api : Axios config, define GET/POST APIs
- components/select : Select component that wraps Material UI Select, utilizing react-hooks-form
- App.tsx : Create Registration form using react-hooks-form

## Libraries

- Material UI
- react-hooks-form
- axios
- react-query
- styled-components

## Available Scripts

In the project directory, you can run:

- npm install\
  Install all libraries you need to run the application.

- npm start\
  Runs the app in the development mode.\
  Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
  The page will reload if you make edits.\
  You will also see any lint errors in the console.

- npm test\
  Launches the test runner in the interactive watch mode.\

- npm run build\
  Builds the app for production to the `build` folder.\
  It correctly bundles React in production mode and optimizes the build for the best performance.
  The build is minified and the filenames include the hashes.\
  Your app is ready to be deployed!

## Future Improvements

1. Utilize the [Autocomplete](https://mui.com/material-ui/react-autocomplete/#search-as-you-type) Component: Consider using the Autocomplete component instead of the Select component. The Autocomplete component provides a search-as-you-type functionality, which can enhance the user experience. To improve performance, you can implement debounce functionality using a [custom debounce hook](https://blog.logrocket.com/create-custom-debounce-hook-react/). This will introduce a delay before sending API requests, preventing unnecessary requests for every keystroke.
2. Centralize Type Definitions: Gather all type definitions in a dedicated types file. Centralizing type definitions promotes code organization and makes it easier to manage and maintain types throughout the application. By having a single location for types, it enhances code readability and reduces the likelihood of inconsistencies.
3. Externalize API Base URL: Store the API base URL in an environment file, such as the .env file. By externalizing the API base URL, it allows for easier configuration and flexibility. This approach enables seamless switching between different environments (e.g., development, staging, production) without modifying the codebase.
4. Enhance Error Handling: Consider implementing additional error handling mechanisms. This can be achieved by further refining the error handling process in files such as axiosConfig.ts or App.tsx. Take note of any TODO comments in the codebase that indicate areas where error handling improvements can be made. Strengthening error handling ensures that potential errors are properly captured, logged, and communicated to users, leading to a more robust and reliable application.
5. Evaluate the Need for a New Page: Assess the necessity of creating a new page solely for a single form. Depending on the specific requirements and complexity of the form, it may not be warranted to dedicate an entire page for it. Evaluate if the form can be incorporated within an existing page or if it can be displayed in a modal or dialog box. This approach can enhance the overall user flow and avoid cluttering the application with unnecessary pages.

