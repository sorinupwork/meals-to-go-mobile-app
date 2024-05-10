import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { CheckoutScreen } from "../../features/checkout/screens/checkout.screen";
import { CheckoutSuccessScreen } from "../../features/checkout/screens/checkout-success";
import { CheckoutErrorScreen } from "../../features/checkout/screens/checkout-error";

const CheckoutStack = createStackNavigator();

export const CheckoutNavigator = () => {
  return (
    <CheckoutStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <CheckoutStack.Screen name="Checkout Screen" component={CheckoutScreen} />
      <CheckoutStack.Screen
        name="Checkout Success"
        component={CheckoutSuccessScreen}
      />
      <CheckoutStack.Screen
        name="Checkout Error"
        component={CheckoutErrorScreen}
      />
    </CheckoutStack.Navigator>
  );
};
