# File Browser

File Browser is intended to provide a user a simple UI to explore a file system.
The server exposes a GraphQL API that allows the front end application to read the file system entries and their metadata so that it can be displayed to the user.
Your challenge is to build a React UI to allow the user to filter available data by creating a system of table filters. As an example an initial filter has been created for you to demonstrate how to apply a filter to the existing GraphQL query. The filter design is left intentionally underspecified to give you room for creativity. 

### Requirements

Your UI should support filtering by:
  * **File size (min / max)**
  * **Entry Name**
  * **Entry Type**

Also, please clean up the existing demo code where you see fit. Keep in mind that your final result should be a representation of *your* coding style. Everything that already exists in this demo is simply there as a jumping off point. No amount of refactoring is off limits as long as all **existing functionality** is retained and expanded upon.

**Note**: This is a front-end oriented challenge. You you should be able to complete the **required** functionality without having to change the server. Changing the server code is not off-limits, though it is **not necessary**.

## Getting Started

1. Ensure you have `yarn` installed as this project currently uses Yarn's resolution mechanism to control the graphql version used by several dependencies.
2. Clone this repository and create a local branch for your implementation.
3. Run `yarn install` in the project root as well as in the `client` and `server` directories.
4. Code and test your solution.
5. Push your branch to the remote and open a PR when you're ready.

### Local Development

The project is designed to be run locally on your machine. The client project is a mostly empty React app created by `create-react-app` with the Typescript template so the local dev server can be started like normal via `yarn start` in the `client` directory and will run at `http://localhost:3000` by default.

The server is a simple Apollo GraphQL server and can be started via `yarn start` in the `server` directory and will run at `http://localhost:4000` by default.
If you need to change this for some reason keep in mind that the client is pre-configured to connect to the GraphQL server at that address so you'll need to change it in `client/src/index.tsx` as well.

Finally, Typescript GraphQL type generation is provided for the schema and defined queries.
If you make any changes to the schema or queries you can run `yarn generate` in the root directory to regenerate the types.
The server types are placed in `server/src/generated/schema.ts` while the client types are placed in `client/src/generated-api/index.tsx`.
Additionally, any query documents you define will be generated into the client types as a `use[QueryName]Query()` hook (see `server/src/schema/queries/ListEntries.ts` and `useListEntriesQuery` as an example).

### Provided Libraries

* Client and Server communicate via GraphQL using the Apollo framework. The server is a simple standalone Apollo Server while the client uses Apollo Client 3.0 with hooks.
* The client comes with Material UI and Styled Components.

## Considerations and Restrictions

* A reasonable set of tools has been provided to minimize the need for you to spend time making these selections yourself. You should feel free to include additional libraries particularly for design elements like icons, or a different styling framework if you prefer. However, do keep in mind that your goal is to show us how _you_ code, not how OSS Developer X does it so be judicious in your additions. Commentary on where you would include libraries and why would be very welcome!
* The visual and behavior focus is on the front end UI but you should feel free to modify the server if it makes your task easier.
* You are allowed to modify the data in `server/src/db.ts` if it makes the problem harder/gives you the chance to show of some interesting aspect of your design. However do not substantially change the problem by, for example, removing the need for pagination by making the `/tmp` directory have fewer than 25 entries.
* Our goal is not to have you spend an inordinate amount of time on this so unit tests are not required.
* Please do include some comments where it makes sense, for example to explain why you a made a particular design decision. Your code should clearly explain what and how but it can only tell us so much about your thought process.

### Bonus Points

These are not required but if you found this exercise to be easy or doesn't show off your knowledge enough, feel free to spice it up. Some ideas:

* Can you improve the design of the filters or the table cells?
* Can you improve performance?
* Can you add loading, empty, and error states to the table?
* Can you add additional filters?
* Can you allow the filters to work through all directories?
* Can you make the directory listing sortable by the user? Allow the user to sort files by type? How does this affect pagination?
* The data model could be extended in interesting ways.
* Maybe something should happen when you click a file?
