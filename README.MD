# Lastminute.com React Native Hotel Search

### **About the solution**

The app has been created from the React Native CLI template.

Its UX/UI is taken from the existing `lastminute.com` mobile app while implementing the basic sort and filter features.
Care was taken to create a basic design system that is in included in the `variables.ts` file. The application
has been tested on android and iOS mobile phone devices. The focus of the exercise was mostly in the programming of the
sort and filter functionality, in particular, how the operations are chained.

---

### **Technical considerations**

The application is written fully in TypeScript. For data fetching React Query was used and for styling the native `Stylesheet` CSS.
In regards to testing, it is mostly integration tests using React Testing Library and Jest. The application with more time granted would benefit from
unit testing of the individual sort and filter predicates. A good degree of code coverage is maintained thanks to the use of snapshot testing methodology.

Third party libraries were used sparingly with the two main dependencies being `React Query` and `react-native-multi-slider`.
The slider was used as a UI component to allow for range inputs of a budget. It can be found in the filter list of the app.

There are two main functionalities in the app: **Sort & Filter.**
The decision was made to always process data through the filters first before applying a sort method.

Functional programming techniques were used to create a chain of executable filter predicates. Architectural consideration was given emphasis here to allow
for further filtering predicates to be added with ease. By adding the enum `FILTER.STARS` to the `filtersToBeApplied` state the application will chain
the filtering of the budgets and stars predicates. The stars filtering is yet to have a UI but but the management of the data flow and main structure exists. The management of the filters state is made through useReducer and the redux pattern. As the complete *FilterMethods* state would be a large complicated object, useReducer provides effective **granular** control of state manipulation and resetting.

---

### **Known issues**

In the debug build of android the default source passed to the `Image` component does not render [[react native docs]](https://reactnative.dev/docs/image#defaultsource).
The idea was to use this feature to fallback on a locally stored image when the  image uri links provided failed. On iOS devices this solution worked well.

---

## Running the app

The app can be cloned from this repo and the dependencies installed at the root with: `npm install`.
The iOS package also will need its dependencies installed in the iOS folder using `pod install`.
In regards to ruby version issues etc please consult the [React Native Docs](https://reactnative.dev/docs/environment-setup)

To run the app use the command `npm run start` at the root of the project.
In a new terminal to run an iOS application the command `npm run ios` needs to be executed at the root of the project.
For android `npm run android`.

A list of script commands can be found in the `package.json` at the root of the package.



