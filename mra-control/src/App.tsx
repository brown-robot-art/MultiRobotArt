import React from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Timeline } from "./layout/Timeline";
import { BlockEditorPanel } from "./layout/BlockEditorPanel";
import { BlockCodePanel } from "./layout/BlockCodePanel";
import { BlockManagerPanel } from "./layout/BlockManagerPanel";
import { useRobartState } from "./state/useRobartState";
import { NavigationBar } from "./layout/NavigationBar";
import { SettingsModal } from "./layout/settings/SettingsModal";
import { RightPanel } from "./layout/RightPanel";

function App() {
    return (
        <>
            <div className="flex h-screen w-screen flex-col gap-1">
                <NavigationBar />
                <div className="flex flex-grow">
                    <PanelGroup direction="vertical">
                        <Panel
                            defaultSize={50}
                            onResize={() =>
                                window.dispatchEvent(new Event("resize"))
                            }
                        >
                            <PanelGroup direction="horizontal">
                                <Panel
                                    defaultSize={50}
                                    onResize={() =>
                                        window.dispatchEvent(
                                            new Event("resize")
                                        )
                                    }
                                >
                                    <BlockEditorPanel />
                                </Panel>
                                <PanelResizeHandle className="w-2 bg-blue-50 opacity-30 shadow-lg" />
                                <Panel defaultSize={50}>
                                    <RightPanel />
                                </Panel>
                            </PanelGroup>
                        </Panel>
                        <PanelResizeHandle className="h-2 bg-blue-50 opacity-30 shadow-lg" />
                        <Panel defaultSize={50}>
                            <PanelGroup direction="horizontal">
                                <Panel defaultSize={20}>
                                    <BlockManagerPanel />
                                </Panel>
                                <PanelResizeHandle className="w-2 bg-blue-50 opacity-30 shadow-lg" />
                                <Panel>
                                    <Timeline />
                                </Panel>
                            </PanelGroup>
                        </Panel>
                    </PanelGroup>
                </div>
            </div>
        </>
    );
}

export default App;
