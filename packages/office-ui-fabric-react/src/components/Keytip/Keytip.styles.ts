import { IKeytipStyleProps, IKeytipStyles } from './Keytip.types';
import { ICalloutContentStyleProps, ICalloutContentStyles } from '../Callout/Callout.types';

export const getStyles = (props: IKeytipStyleProps): IKeytipStyles => {
  const { theme, disabled } = props;
  return {
    container: [
      {
        backgroundColor: theme.palette.neutralDark
      },
      disabled && {

      }
    ],
    root: [{
      textAlign: 'center',
      paddingLeft: 3,
      paddingRight: 3,
      backgroundColor: theme.palette.neutralDark,
      color: theme.palette.neutralLight,
      minWidth: 11,
      lineHeight: 17,
      height: 17,
      display: 'inline-block'
    },
    disabled && {

    }],
  };
};

export const getCalloutStyles = (props: ICalloutContentStyleProps): ICalloutContentStyles => {
  const { theme } = props;
  return {
    container: [
    ],
    root: [{
      borderColor: theme.palette.neutralDark,
    }],
    beak: [
    ],
    beakCurtain: [
    ],
    calloutMain: [
    ]
  };
};