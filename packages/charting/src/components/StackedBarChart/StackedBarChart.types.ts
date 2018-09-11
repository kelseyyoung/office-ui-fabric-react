import { ITheme, IStyle } from 'office-ui-fabric-react/lib/Styling';
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';

export interface IStackedBarChart {}
import { IChartProps } from './index';

export interface IStackedBarChartProps {
  /**
   * Data to render in the chart.
   */
  data?: IChartProps;

  /**
   * Width of the chart.
   */
  width?: number;

  /**
   * Height of each bar in the chart.
   */
  barHeight?: number;

  /**
   * Do not show the legend at the bottom of chart
   * when there are more than two datapoints
   *
   * @default false
   */
  hideLegend?: boolean;

  /**
   * Do not show number/ratio on top of bar
   *
   * @default false
   */
  hideNumberDisplay?: boolean;

  /**
   * Additional CSS class(es) to apply to the StackedBarChart.
   */
  className?: string;

  /**
   * Theme (provided through customization.)
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IStackedBarChartStyleProps, IStackedBarChartStyles>;

  isMultiStackedBarChart?: boolean;

  /**
   * Color setting of bar background color, this will show while all data points value is 0
   */
  barBackgroundColor?: string;
}

export interface IStackedBarChartStyleProps {
  /**
   * Theme (provided through customization.)
   */
  theme: ITheme;

  /**
   * Additional CSS class(es) to apply to the StackedBarChart.
   */
  className?: string;

  /**
   * Width of the chart.
   */
  width?: number;

  /**
   * Height of bar in the chart.
   */
  barHeight?: number;

  /**
   * prop to show data of the chart with appropriate legend color
   */
  legendColor?: string;

  /**
   * prop to check if the chart is selcted or hovered upon to determine opacity
   */
  shouldHighlight?: boolean;

  /**
   * prop to check which specific section of the stacked bar chart is selected or hovered upon
   */
  isChartSelected?: boolean;
}

export interface IStackedBarChartStyles {
  /**
   *  Style for the root element.
   */
  root: IStyle;

  /**
   * Style for the chart.
   */
  chart: IStyle;

  /**
   * Style for the chart Title.
   */
  chartTitle: IStyle;

  /**
   * Style for the legend container div
   */
  legendContainer: IStyle;

  /**
   * Style for the legend card title displayed in the hover card
   */
  hoverCardTextStyles: IStyle;

  /**
   * Style for the data displayed in the hover card
   */
  hoverCardDataStyles: IStyle;

  /**
   * Style for the root of the hover card
   */
  hoverCardRoot: IStyle;

  /**
   * Style to change the opacity of bars in dataviz when we hover on a single bar or legends
   */
  opacityChangeOnHover: IStyle;
}
