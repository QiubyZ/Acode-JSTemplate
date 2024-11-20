import plugin from '../plugin.json';
let AppSettings = acode.require("settings");

class AcodePlugin {

  async init() {

  }

  async destroy() {
    if (AppSettings.value[plugin.id]) {
      delete AppSettings.value[plugin.id];
      AppSettings.update();
    }
    window.toast(`Destroy Configurate of ${plugin.id}`, 5000);
  }
}

if (window.acode) {
  const acodePlugin = new AcodePlugin();
  acode.setPluginInit(plugin.id, async (baseUrl, $page, { cacheFileUrl, cacheFile }) => {
    if (!baseUrl.endsWith('/')) {
      baseUrl += '/';
    }
    acodePlugin.baseUrl = baseUrl;
    await acodePlugin.init($page, cacheFile, cacheFileUrl);
  });
  acode.setPluginUnmount(plugin.id, () => {
    acodePlugin.destroy();
  });
}
