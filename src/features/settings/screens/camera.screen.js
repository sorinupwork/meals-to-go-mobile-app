import React, { useRef, useContext } from "react";
import { Camera, CameraType } from "expo-camera";
import styled from "styled-components/native";
import { Button, View, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Text } from "../../../components/typography/text.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

export const CameraScreen = ({ navigation }) => {
  const { user } = useContext(AuthenticationContext);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef();

  const snap = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync();
      AsyncStorage.setItem(`${user.uid}-photo`, photo.uri);
      navigation.goBack();
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <PermissionContainer>
        <PermissionText>
          We need your permission to show the camera
        </PermissionText>
        <Button onPress={requestPermission} title="allow permission" />
      </PermissionContainer>
    );
  }

  return (
    <TouchableOpacity onPress={snap}>
      <ProfileCamera
        ref={(camera) => (cameraRef.current = camera)}
        type={CameraType.front}
      ></ProfileCamera>
    </TouchableOpacity>
  );
};

const ProfileCamera = styled(Camera)`
  width: 100%;
  height: 100%;
`;

const PermissionContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

const PermissionText = styled(Text)`
  text-align: center;
  margin: 5%;
`;
