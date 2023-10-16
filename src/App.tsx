import {
  ApolloProvider,
  ApolloClient as ApolloClientInitializer,
  InMemoryCache,
} from "@apollo/client";
import MainNavigator from "./navigation/MainNavigator";
import { ThemeProvider } from "@mui/material";
import { MuiTheme } from "./ui/MuiTheme";

function App() {
  const ApolloClient = new ApolloClientInitializer({
    uri: "https://climanage-be.onrender.com/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <>
      <ApolloProvider client={ApolloClient}>
        <ThemeProvider theme={MuiTheme}>
          <MainNavigator />
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
