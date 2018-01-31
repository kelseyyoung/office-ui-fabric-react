import { ICalloutContentStyleProps, ICalloutContentStyles } from '../Callout/Callout.types';

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