import React from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-aria-components";
import { merger } from "../commonComponents/utils/utils";

const defaultTabsClassNames = {
  tabs: "w-full",
  tablist: "",
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
        className={`flex ${orientation === "vertical" ? "flex-col" : "flex-row"} items-start justify-between xl:gap-1 2xl:gap-1.5 3xl:gap-2 4xl:gap-3`}
      >
        {tabs &&tabs.map((tab, index) => (
          <Tab
            className={merger(defaultTabsClassNames.tab, classNames?.tab)}
            key={tab.id + index}
            id={tab.id}
          >
            {tab.content}
          </Tab>
        ))}
      </TabList>
      {panels &&
        panels.map((panel, index) => (
          <TabPanel key={panel.id + index} id={panel.id}>
            {panel.content}
          </TabPanel>
        ))}
    </Tabs>
  );
}
