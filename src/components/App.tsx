import extensionIcon from "/icon32.png";
import runPlugin from "../lib/content";

function App() {
  const onClick = async () => {
    const [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: runPlugin,
    });
  };

  return (
    <>
      <div>
        <img src={extensionIcon} className="icon" />
      </div>
      <h1>Auto-Bumbler</h1>
      <div>
        <button onClick={() => onClick()}>Reply with ChatGPT</button>
      </div>
    </>
  );
}

export default App;
