import {SWITCH_LANGUAGE, TOGGLE_COLLAPSED_NAV, WINDOW_WIDTH} from "constants/ActionTypes";
import {
  HORIZONTAL_MENU_POSITION,
  LAYOUT_TYPE,
  NAV_STYLE,
  THEME_COLOR_SELECTION,
  THEME_TYPE,
  VERTICAL_NAVIGATION,
  SHIFT_DATA,
  FULL_NAME,SET_TIME
} from "../../constants/ThemeSetting";
export const FILTER_DATA = 'FILTER_DATA';


export function toggleCollapsedSideNav(navCollapsed) {
  return {type: TOGGLE_COLLAPSED_NAV, navCollapsed};
}

export function updateWindowWidth(width) {
  return {type: WINDOW_WIDTH, width};
}

export function setThemeType(themeType) {
  return {type: THEME_TYPE, themeType};
}

export function setThemeColorSelection(colorSelection) {
  return {type: THEME_COLOR_SELECTION, colorSelection};
}

export function onNavStyleChange(navStyle) {
  return {type: NAV_STYLE, navStyle};
}

export function onVerticalNavStyleChange(verticalNavStyle) {
  return {type: VERTICAL_NAVIGATION, verticalNavStyle};
}
export function onHorizontalNavPositionChange(horizontalNavPosition) {
  return {type: HORIZONTAL_MENU_POSITION, horizontalNavPosition};
}

export function setLayoutTypeChange(layoutType) {
  return {type: LAYOUT_TYPE, layoutType};
}


export function switchLanguage(locale) {
  return {
    type: SWITCH_LANGUAGE,
    payload: locale
  };
}
export function setFilterData(filterData) {
  return {type: FILTER_DATA, filterData};
}
export function setProfileTopCorner(setProfile) {
  return {type: SHIFT_DATA, setProfile};
}
export function setFullName(name) {
  return {type: FULL_NAME, name};
}
export function setTime(setTime) {
  return {type: SET_TIME, setTime};
}
