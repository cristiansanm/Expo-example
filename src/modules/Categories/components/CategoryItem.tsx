import Colors from '@assets/constants/Colors';
import { TabBarIcon } from '@components/IconBuilder';
import { Text, View } from '@components/Themed';
import { nanoid } from '@reduxjs/toolkit';
import { Link } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';

export const CategoryItem = ({ category }: { category: string }) => {
  const currentScheme = useColorScheme();
  return (
    <Link key={`${category}${nanoid(3)}`} href="/(tabs)/two">
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TabBarIcon name="list" color={Colors[currentScheme ?? 'light'].tint} />
        <Text key={category + nanoid(3)}>{category}</Text>
      </View>
    </Link>
  );
};
