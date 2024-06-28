import { View, Text } from "react-native";
import MapView from "react-native-maps";
import { useEffect, useState } from "react";
import {
  LocationObjectCoords,
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Index() {
  const [coordinates, setCoordinates] = useState<LocationObjectCoords>();

  useEffect(() => {
    (async () => {
      await requestForegroundPermissionsAsync();
      let location = await getCurrentPositionAsync();
      setCoordinates(location.coords);
    })();
  }, []);

  return (
    <GestureHandlerRootView>
      <View>
        <MapView
          style={{ height: "100%" }}
          initialRegion={
            coordinates
              ? {
                  latitude: coordinates.latitude,
                  longitude: coordinates.longitude,
                  latitudeDelta: 0.03,
                  longitudeDelta: 0.03,
                }
              : undefined
          }
        />
        <BottomSheet snapPoints={["40%", "80%"]}>
          <BottomSheetView>
            <Text>Awesome 🎉</Text>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}
