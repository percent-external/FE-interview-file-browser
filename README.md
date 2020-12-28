# File Browser

File Browser is intended to provide a user a simple UI to explore a file system.
The server exposes a GraphQL API that allows the front end application to read the file system entries and their metadata so that it can be displayed to the user.
Your challenge is to build a React UI to allow the user to navigate the file system through directory links and display the file metadata for each.

The design is left intentionally underspecified to give you room for creativity but as an example, a simple table layout with rows corresponding to the directories and files within the current directory would be a great starting point.

* Directories should be clickable in some way to change the current directory and show the user the contents of that directory.
* File entries should be display along with their size and last modified times but otherwise don't need to be interactive.

We're not expecting a breathtaking design so use your time wisely with regard to look-and-feel but please do make sure the interface is tidy and understandable.
Even simple borders, spacing, and alignment will go a long way!

In addition to the basic file browser layout and functionality there are two additional requirements:

1. Display a component to summarize the entire current directory tree, showing the total number of files within the current directory (all descendants, including files and directories below the current one but not currently displayed) and the sum of the file sizes. 
    * Only show this component if current directory is not the root directory `'/'`.
    * Show the same data for the entire directory tree (i.e. starting from `'/'`) and this should always be visible, regardless of the current directory.
2. Some directories may have many files and the server will only return 25 at a time. Provide some UI for the user to understand that there are more files to see and some way for them to view the next page(s) of results.

## Getting Started

1. Ensure you have `yarn` installed as this project currently uses Yarn's resolution mechanism to control the graphql version used by several dependencies.
2. Clone this repository and create a local branch for your implementation.
3. Run `yarn install` in the project root as well as in the `client` and `server` directories.
4. Code and test your solution.
5. Push your branch to the remote and open a PR when you're ready.

### Local Development

The project is designed to be run locally on your machine. The client project is a mostly empty React app created by `create-react-app` with the Typescript template so the local dev server can be started like normal via `yarn start` in the `client` directory and will run at `http://localhost:3000` by default.

The server is a simple Apollo GraphQL server and can be started via `yarn start-server` in the `server` directory and will run at `http://localhost:4000` by default.
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

* Can you make the directory listing sortable by the user? Allow the user to sort files by type? How does this affect pagination?
* What about making the current directory bookmarkable/allow the browser forward & back buttons to work?
* The data model could be extended in interesting ways.
* Maybe something should happen when you click a file?
