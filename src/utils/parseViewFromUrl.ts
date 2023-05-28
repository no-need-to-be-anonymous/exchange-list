import { TabsProps } from 'antd';

export const parseViewFromUrl = (param: string | null, tabItems: TabsProps['items']): string => {
  const defaultView = '0';
  if (!param) {
    return defaultView;
  }

  const view = tabItems?.find((item) => item.key === param);
  if (!view) {
    return defaultView;
  } else {
    return view.key;
  }
};
