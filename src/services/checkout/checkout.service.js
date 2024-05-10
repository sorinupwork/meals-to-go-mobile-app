import createStripe from "stripe-client";
import { host } from "../../utils/env";

const stripe = createStripe(
  "pk_test_51MGImwEXcxExxgjgqFk4Bw4J3VRTAbMvzHpVFv1aR49pkQwlQXznbb4V8BJSfvq3G5Ek6C0t34pNChFeiRrsR4G300l5N3VS7R"
);

export const cardTokenRequest = (card) => stripe.createToken({ card });

export const payRequest = (token, amount, name) => {
  return fetch(`${host}/pay`, {
    body: JSON.stringify({
      token,
      name,
      amount,
    }),
    method: "POST",
  }).then((res) => {
    if (res.status > 200) {
      return Promise.reject("something went wrong processing your payment");
    }
    return res.json();
  });
};
