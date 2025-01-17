import React from "react";
import styled from "styled-components/native";
import { WebView } from "react-native-webview";
import { Platform } from "react-native";

import { Text } from "../typography/text.component";

const isAndroid = Platform.OS === "android";

export const CompactRestaurantInfo = ({ restaurant, isMap }) => {
  const Image = isAndroid && isMap ? CompactWebview : CompactImage;
  return (
    <Item>
      <Image source={{ uri: restaurant.photos[0] }} />
      <Text center variant="caption" numOfLines={3}>
        {restaurant.name}
      </Text>
    </Item>
  );
};

const CompactImage = styled.Image`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

const CompactWebview = styled(WebView)`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

const Item = styled.View`
  padding: 10px;
  max-width: 120px;
  align-items: center;
`;
