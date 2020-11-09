import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import Router from './src/Router';
import { ThemeProvider } from 'react-native-elements';
import {UserContainer, ProductContainer, BasketContainer, StockerContainer} from './src/services';

const App: () => React$Node = () => {
  return (
      <>
        <UserContainer.Provider>
          <ProductContainer.Provider>
            <BasketContainer.Provider>
                <StockerContainer.Provider>
                    <ThemeProvider>
                        <Router></Router>
                    </ThemeProvider>
                </StockerContainer.Provider>
            </BasketContainer.Provider>
          </ProductContainer.Provider>
        </UserContainer.Provider>
      </>
  );
};

const styles = StyleSheet.create({
  /* React Native Styling Components list : https://github.com/vhpoet/react-native-styling-cheat-sheet */

});

export default App;
