import {
  ButtonItem,
  definePlugin,
  PanelSection,
  PanelSectionRow,
  ServerAPI,
  staticClasses,
} from "decky-frontend-lib";

import { useEffect, useState, VFC } from "react";
import { FaShip } from "react-icons/fa";

// server API
function serverAdd(serverAPI: ServerAPI, value: number) {
  return serverAPI.callPluginMethod<{ value: number }, number>("add", {value: value}) 
}
function serverGetState(serverAPI: ServerAPI) {
  return serverAPI.callPluginMethod<{}, number>("getState", {}) 
}
function serverSetState(serverAPI: ServerAPI, value: number) {
  return serverAPI.callPluginMethod<{value: number}, number>("setState", {value: value}) 
}

const initialLoad = async (serverAPI: ServerAPI, setResult: (result: number) => void) => {
  const apiResult = await serverGetState(serverAPI)
  if (apiResult.success) setResult(apiResult.result)
 }

// Plugin content definition
const Content: VFC<{ serverAPI: ServerAPI }> = (props) => {
  const [result, setResult] = useState<number | undefined>();

  useEffect(() => {
    initialLoad(props.serverAPI, setResult)
  }, []) // empty dependency = only called during load

  // define click listener
  const onValueClick = async () => {
    const apiResult = await serverAdd(props.serverAPI, 1);
    if (apiResult.success) setResult(apiResult.result)
  };

  const onResetClick = async () => {
    const apiResult = await serverSetState(props.serverAPI, 0);
    if (apiResult.success) setResult(apiResult.result)
  }

  return (
    <PanelSection title="Counter">
      <PanelSectionRow>
        <ButtonItem layout="below" onClick={onValueClick}>
          {result ?? " - "}
        </ButtonItem>
        </PanelSectionRow>
        <ButtonItem layout="below" onClick={onResetClick}>
          Reset
        </ButtonItem>
    </PanelSection>
  );
};

export default definePlugin((serverApi: ServerAPI) => {
  return {
    title: <div className={staticClasses.Title}>Counter Test</div>,
    content: <Content serverAPI={serverApi} />,
    icon: <FaShip />,
    onDismount() {
    },
  };
});
