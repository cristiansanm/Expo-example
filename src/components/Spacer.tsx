import { ViewStyle } from 'react-native';

export interface SpacerProps {
  style?: ViewStyle;
  size?: number;
  horizontal?: boolean;
  border?: boolean;
  borderColor?: string;
  borderSize?: number;
}

import { Style } from '@assets/styles';
import { StyleSheet } from 'react-native';

import { DinoSpacerProps } from './DinoSpacer.types';

export const getDynamicStyles = (props: DinoSpacerProps) =>
  StyleSheet.create({
    spacerStyle: {
      ...(props.horizontal
        ? { width: Style.UNIT * (props.size || 1) }
        : { height: Style.UNIT * (props.size || 1) }),
      ...(props.border
        ? {
            borderBottomColor: props.borderColor,
            borderBottomWidth: props.borderSize,
            width: '100%',
            height: Style.UNIT * (props.size || 1),
          }
        : {}),
    },
  });


export const Spacer: React.FC<SpacerProps> = ({
  style,
  size = 1,
  horizontal,
  border,
  borderColor,
  borderSize = 1,
}) => {
  const dynamicStyles = getDynamicStyles({
    size,
    horizontal,
    border,
    borderColor,
    borderSize,
  }).spacerStyle;

  return <View style={[dynamicStyles, style]} />;
};
