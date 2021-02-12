import { SWITCH_LANGUAGE, TOGGLE_COLLAPSED_NAV, WINDOW_WIDTH } from "constants/ActionTypes";
import {
  HORIZONTAL_MENU_POSITION,
  INSIDE_THE_HEADER,
  LAYOUT_TYPE,
  LAYOUT_TYPE_FULL,
  NAV_STYLE,
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  TAB_SIZE,
  THEME_COLOR_SELECTION,
  THEME_COLOR_SELECTION_PRESET,
  THEME_TYPE,
  THEME_TYPE_LITE,
  VERTICAL_NAVIGATION,
  SHIFT_DATA,
  FULL_NAME, SET_TIME
} from "../../constants/ThemeSetting";
export const FILTER_DATA = 'FILTER_DATA';

const initialSettings = {
  navCollapsed: true,
  navStyle: VERTICAL_NAVIGATION,
  verticalNavStyle: window.innerWidth < TAB_SIZE ? NAV_STYLE_DRAWER : NAV_STYLE_FIXED,
  horizontalNavPosition: INSIDE_THE_HEADER,
  layoutType: LAYOUT_TYPE_FULL,
  themeType: THEME_TYPE_LITE,
  colorSelection: THEME_COLOR_SELECTION_PRESET,

  pathname: '',
  width: window.innerWidth,
  isDirectionRTL: false,
  locale: {
    languageId: 'english',
    locale: 'en',
    name: 'English',
    icon: 'us'
  }
};

const settings = (state = initialSettings, action) => {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      return {
        ...state,
        pathname: action.payload.pathname,
        navCollapsed: false
      };
    case TOGGLE_COLLAPSED_NAV:
      return {
        ...state,
        navCollapsed: action.navCollapsed
      };
    case WINDOW_WIDTH:
      return {
        ...state,
        width: action.width,
        verticalNavStyle: window.innerWidth < TAB_SIZE ? NAV_STYLE_DRAWER : state.verticalNavStyle,
      };
    case THEME_TYPE:
      return {
        ...state,
        themeType: action.themeType
      };
    case THEME_COLOR_SELECTION:
      return {
        ...state,
        colorSelection: action.colorSelection
      };

    case NAV_STYLE:
      return {
        ...state,
        navStyle: action.navStyle
      };

    case VERTICAL_NAVIGATION:
      return {
        ...state,
        verticalNavStyle: action.verticalNavStyle
      };

    case HORIZONTAL_MENU_POSITION:
      return {
        ...state,
        horizontalNavPosition: action.horizontalNavPosition
      };

    case LAYOUT_TYPE:
      return {
        ...state,
        layoutType: action.layoutType
      };

    case SWITCH_LANGUAGE:
      return {
        ...state,
        locale: action.payload,

      };

    case FILTER_DATA:
      return {
        ...state,
        layoutType: action.filterData
      };
    case SHIFT_DATA:
      return {
        ...state,
        setProfile: action.setProfile
      };
    case FULL_NAME:
      return {
        ...state,
        name: action.name
      };
    case SET_TIME:
      return {
        ...state,
        setTime: action.setTime
      };
    default:
      return state;
  }
};

export default settings;
