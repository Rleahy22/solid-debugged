(() => {
  let created = false;
  let checkCount = 0;

  chrome.devtools.network.onNavigated.addListener(createPanelIfHasSolid);
  const checkSolidInterval = setInterval(createPanelIfHasSolid, 1000);
  createPanelIfHasSolid();

  function createPanelIfHasSolid() {
    if (created || checkCount++ > 10) {
      clearInterval(checkSolidInterval);
      return;
    }

    chrome.devtools.inspectedWindow.eval('window.SOLID_DEBUG', function (solidDebug) {
      console.log('solidDebug:', solidDebug);

      if (!solidDebug || created) {
        return;
      }

      window.SOLID_DEBUG = solidDebug;

      clearInterval(checkSolidInterval);
      created = true;
      chrome.devtools.panels.create('SolidJS', null, './index.html', (panel) => {
        panel.onShown.addListener(onPanelShown);
        panel.onHidden.addListener(onPanelHidden);
      });
    });
  }

  // Manage panel visibility

  function onPanelShown() {
    console.log('PANEL shown');
    chrome.runtime.sendMessage('solid-panel-shown');
  }

  function onPanelHidden() {
    // chrome.runtime.sendMessage('solid-panel-hidden');
  }
})();
