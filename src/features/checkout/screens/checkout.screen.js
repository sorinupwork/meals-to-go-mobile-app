import React, { useContext, useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { List, Divider } from "react-native-paper";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { CreditCardInput } from "../components/credit-card.component";
import { CartContext } from "../../../services/cart/cart.context";
import { Text } from "../../../components/typography/text.component";
import {
  CartIconContainer,
  CartIcon,
  NameInput,
  PayButton,
  ClearButton,
  PaymentProcessing,
} from "../components/checkout.styles";
import { RestaurantInfoCard } from "../../restaurants/components/restaurant-info-card.component";
import { payRequest } from "../../../services/checkout/checkout.service";

export const CheckoutScreen = ({ navigation }) => {
  const { cart, restaurant, clearCart } = useContext(CartContext);
  const [sum, setSum] = useState(0);
  const [name, setName] = useState(null);
  const [card, setCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!cart.length) {
      setSum(0);
      return;
    }
    const newSum = cart.reduce((acc, { price }) => {
      return (acc += price);
    }, 0);
    setSum(newSum);
  }, [cart]);

  const onPay = () => {
    setIsLoading(true);
    if (!card || !card.id) {
      setIsLoading(false);
      navigation.navigate("Checkout Error", {
        error: "Please fill in a valid credit card.",
      });
      return;
    }
    payRequest(card.id, sum, name)
      .then((result) => {
        setIsLoading(false);
        clearCart();
        navigation.navigate("Checkout Success");
      })
      .catch((err) => {
        setIsLoading(false);
        navigation.navigate("Checkout Error", {
          error: err,
        });
      });
  };

  if (!cart.length || !restaurant) {
    return (
      <SafeArea>
        <CartIconContainer>
          <CartIcon icon="cart-off" />
          <Text>Your cart is empty!</Text>
        </CartIconContainer>
      </SafeArea>
    );
  }
  return (
    <SafeArea>
      <RestaurantInfoCard restaurant={restaurant} />
      {isLoading && <PaymentProcessing />}
      <ScrollView>
        <Spacer position={"left"} size={"medium"}>
          <Spacer position={"top"} size={"large"}>
            <Text>Your Order</Text>
          </Spacer>
          <List.Section>
            {cart.map((item, i) => {
              return (
                <List.Item
                  key={`item-${i}`}
                  title={`${item.item} - ${item.price / 100}`}
                />
              );
            })}
          </List.Section>
          <Text>Total: {sum / 100}</Text>
        </Spacer>
        <Spacer position={"top"} size={"large"} />
        <Divider />

        <NameInput
          label="Name"
          value={name}
          onChangeText={(t) => {
            if (t.length) {
              setName(t);
            } else {
              setName(null);
            }
          }}
        />
        <Spacer position={"top"} size={"large"}>
          {name && (
            <CreditCardInput
              name={name}
              onSuccess={(enteredCard) => setCard(enteredCard)}
              onError={() =>
                navigation.navigate("Checkout Error", {
                  error: "Something went wrong processing your credit card.",
                })
              }
            />
          )}
        </Spacer>

        <Spacer position={"top"} size="xl" />

        <PayButton
          disabled={isLoading}
          onPress={onPay}
          icon="currency-usd"
          mode={"contained"}
        >
          Pay Order
        </PayButton>

        <Spacer position={"top"} size="large">
          <ClearButton
            disabled={isLoading}
            onPress={clearCart}
            icon="cart-off"
            mode={"contained"}
          >
            Clear Cart
          </ClearButton>
        </Spacer>
      </ScrollView>
    </SafeArea>
  );
};
