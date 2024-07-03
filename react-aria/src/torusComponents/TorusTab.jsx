import React from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-aria-components";

const defaultTabsClassNames = {
  Tablist: "flex flex-row gap-20 ",
};

export default function TorusTab({
  tabs,
  panels,
  ariaLabel,
  defaultSelectedKey,
}) {
  return (
    <Tabs
      orientation="vertical"
      keyboardActivation="automatic"
      defaultSelectedKey={defaultSelectedKey}
    >
      <TabList
        aria-label={ariaLabel}
        classNames={{ Tablist: defaultTabsClassNames.Tablist }}
      >
        {tabs.map((tab, index) => (
          <Tab key={index} id={tab.id}>
            {tab.label}
          </Tab>
        ))}
      </TabList>
      {panels.map((panel, index) => (
        <TabPanel key={index} id={panel.id}>
          {panel.content}
        </TabPanel>
      ))}
    </Tabs>
  );
}
