import React from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-aria-components";
import { merger } from "../utils/utils";

const defaultTabsClassNames = {
  tabs: "w-full",
  tablist: "flex flex-row gap-2 ",
  tab: "w-full",
};

export default function TorusTab({
  tabs,
  panels,
  orientation = "vertical",
  ariaLabel,
  classNames,
  defaultSelectedKey,
  onSelectionChange,
}) {
  return (
    <Tabs
      orientation={orientation}
      keyboardActivation="automatic"
      className={merger(defaultTabsClassNames.tabs, classNames?.tabs)}
      defaultSelectedKey={defaultSelectedKey}
      onSelectionChange={onSelectionChange}
    >
      <TabList
        aria-label={ariaLabel}
        className={merger(defaultTabsClassNames.tablist, classNames?.tablist)}
      >
        {tabs.map((tab, index) => (
          <Tab
            className={merger(defaultTabsClassNames.tab, classNames?.tab)}
            key={index}
            id={tab.id}
          >
            {tab.content}
          </Tab>
        ))}
      </TabList>
      {panels &&
        panels.map((panel, index) => (
          <TabPanel key={index} id={panel.id}>
            {panel.content}
          </TabPanel>
        ))}
    </Tabs>
  );
}
