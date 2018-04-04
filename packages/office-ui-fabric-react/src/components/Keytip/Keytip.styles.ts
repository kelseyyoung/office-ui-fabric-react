import { IKeytipStyleProps, IKeytipStyles } from './Keytip.types';
import { ICalloutContentStyleProps, ICalloutContentStyles } from '../../Callout';
import { IStyleFunction, IPoint } from '../../Utilities';

export const getStyles = (props: IKeytipStyleProps): IKeytipStyles => {
  const { theme, disabled, visible } = props;
  return {
    container: [
      {
        backgroundColor: theme.palette.neutralDark
      },
      disabled && {
        opacity: 0.5,
      },
      !visible && {
        visibility: 'hidden',
        opacity: 0
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
      color: '#b1b1b1'
    }]
  };
};

export const getCalloutStyles = (props: ICalloutContentStyleProps): ICalloutContentStyles => {
  return {
    container: [
    ],
    root: [{
      border: 'none',
      boxShadow: 'none'
    }],
    beak: [
    ],
    beakCurtain: [
    ],
    calloutMain: [{
      backgroundColor: 'transparent'
    }]
  };
};

export const getCalloutOffsetStyles = (offset: IPoint): IStyleFunction<ICalloutContentStyleProps, ICalloutContentStyles> => {
  return (props: ICalloutContentStyleProps): ICalloutContentStyles => {
    return {
      container: [
      ],
      root: [{
        border: 'none',
        boxShadow: 'none',
        marginLeft: offset.x,
        // Reverse the margin from the bottom so the callout positioning
        // doesn't auto-correct it
        marginBottom: -1 * offset.y
      }],
      beak: [
      ],
      beakCurtain: [
      ],
      calloutMain: [{
        backgroundColor: 'transparent'
      }]
    };
  };
};