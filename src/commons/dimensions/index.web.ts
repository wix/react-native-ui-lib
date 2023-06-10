
function getContainerElementDimension(prop: 'clientWidth' | 'clientHeight'): number {
  const containerElement = document.querySelector('[data-react-native-web-dimensions="true"]');
  if (containerElement) {
    return containerElement[prop];
  }

  return 0;
}

export const getScreenWidth = () => {
  return getContainerElementDimension('clientWidth');
};
export const getScreenHeight = () => {
  return getContainerElementDimension('clientHeight');
};

export const getWindowWidth = () => {
  return getContainerElementDimension('clientWidth');
};
export const getWindowHeight = () => {
  return getContainerElementDimension('clientHeight');
};
