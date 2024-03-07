import { SpecsPanel, ReviewPanel, QandAPanel } from "./Panels";
import { Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductTabs() {
  const tabName = ["Specification", "Reviews", "Q/A"];
  const panels = [
    {
      panelComponent: <SpecsPanel />,
      name: "Specs",
    },
    {
      panelComponent: <ReviewPanel />,
      name: "Review",
    },
    {
      panelComponent: <QandAPanel />,
      name: "QandA",
    },
  ];

  return (
    <div className="w-full py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 shadow-md">
          {tabName.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2 lg:py-4 text-sm font-semibold leading-5",
                  "ring-white ring-offset-1 ring-offset-white focus:outline-none focus:ring-2",
                  selected
                    ? "bg-darker text-white shadow"
                    : "text-black hover:bg-darker/[0.2] hover:text-white"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2 ">
          {panels.map((panel) => (
            <Tab.Panel
              key={panel.name}
              className={classNames(
                "rounded-2xl shadow-lg bg-white p-3",
                "focus:outline-none "
              )}
            >
              {panel.panelComponent}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
