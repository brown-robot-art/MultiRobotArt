import { Button, Label, Modal, Tabs, TabsRef, TextInput } from "flowbite-react";
import React, { useRef } from "react";
import { CancelButton } from "../../components/buttons/CancelButton";
import { IconButton } from "../../components/buttons/IconButton";
import { useUIState } from "../../state/useUIState";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { useRobartState } from "../../state/useRobartState";

export const SettingsModal = () => {
  const settingsModalOpen = useUIState((state) => state.settingsModalOpen);
  const toggleSettingsModal = useUIState((state) => state.toggleSettingsModal);
  const resetProject = useRobartState((state) => state.resetProject);
  const projectName = useRobartState((state) => state.projectName);
  const setProjectName = useRobartState((state) => state.setProjectName);
  return (
    <Modal show={settingsModalOpen} onClose={toggleSettingsModal}>
      <Modal.Header>Settings</Modal.Header>
      <Modal.Body>
        <Tabs.Group style="default">
          <Tabs.Item active title="Project">
            Profile content
            <div>
              <div className="mb-2 block">
                <Label value="Project Name" />
              </div>
              <TextInput
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
          </Tabs.Item>
          <Tabs.Item title="Blocks">Block Settings</Tabs.Item>
          <Tabs.Item title="Preferences">User Preferences</Tabs.Item>
        </Tabs.Group>
      </Modal.Body>
      <Modal.Footer>
        <CancelButton onClick={toggleSettingsModal} />
        <IconButton
          color="warning"
          text="Reset Project"
          icon={faSync}
          onClick={resetProject}
        />
      </Modal.Footer>
    </Modal>
  );
};
