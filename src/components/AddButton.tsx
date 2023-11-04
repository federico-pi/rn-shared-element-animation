import React, { useState } from 'react';

import {
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Image,
  Animated,
  Modal,
  Text,
  Button,
} from 'react-native';
import { COLORS } from '../theme/theme';

export function AddButton() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <TouchableWithoutFeedback
          onPress={() => setShowAddModal(true)}
          style={styles.addButton}
        >
          <View style={[styles.addButtonInner]}>
            <Image
              source={require('../../assets/images/Add.png')}
              resizeMode="contain"
              style={styles.addButtonIcon}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <Modal
        visible={showAddModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onDismiss={() => setShowAddModal(false)}
      >
        <Text>Select a drink</Text>
        <Text>Beer</Text>
        <Text>Wine</Text>
        <Button title="Close" onPress={() => setShowAddModal(false)} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    height: 0,
  },
  box: {
    position: 'relative',
    width: 60,
    height: 60,
    marginTop: -30,
  },
  addButton: {
    shadowColor: COLORS.dark,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  addButtonInner: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  addButtonIcon: {
    width: 40,
    height: 40,
    tintColor: COLORS.white,
  },
  item: {
    position: 'absolute',
    top: 5,
    left: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  itemIcon: {
    width: 32,
    height: 32,
    tintColor: COLORS.white,
  },
});
