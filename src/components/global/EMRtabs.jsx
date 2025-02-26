import React, { useState } from "react";
import { Tabs } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import "antd/dist/reset.css"; // Import Ant Design styles

const { TabPane } = Tabs;

const EMRtabs = ({ tabsList, defaultTab, setActiveTab }) => {
  const [activeKey, setActiveKey] = useState(defaultTab ?? tabsList[0]?.value);

  const handleChange = (key) => {
    setActiveKey(key);
    setActiveTab(key);
  };

  return (
    <div style={{ width: "100%" }}>
      {/* Ant Design Tabs */}
      <Tabs
        activeKey={activeKey}
        onChange={handleChange}
        // centered
        type="card" // Can be 'line', 'card', or 'editable-card'
        tabBarStyle={
          {
            // backgroundColor: "#00748b",
            // color: "white",
            // borderRadius: "8px",
          }
        }
        style={{
          width: "100%",
        }}
      >
        {tabsList.map((tab) => (
          <TabPane tab={<span>{tab.name}</span>} key={tab.value} />
        ))}
      </Tabs>

      {/* Animated Tab Content */}
      <div
        // style={{ position: "relative", overflow: "hidden", marginTop: "16px" }}
      >
        <AnimatePresence mode="wait">
          {tabsList.map((tab) =>
            tab.value === activeKey ? (
              <motion.div
                key={tab.value}
                initial={{ x: 100, opacity: 0 }} // Slide in from right
                animate={{ x: 0, opacity: 1 }} // Fade in
                exit={{ x: -100, opacity: 0 }} // Slide out to left
                transition={{ duration: 0.3 }}
                style={{ position: "absolute", width: "100%" }}
              >
                {tab.content}
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EMRtabs;
