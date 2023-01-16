import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ISettingRegistry } from '@jupyterlab/settingregistry';

/**
 * Initialization data for the dataproc-cluster-connect-ts extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'dataproc-cluster-connect-ts:plugin',
  autoStart: true,
  optional: [ISettingRegistry],
  activate: (app: JupyterFrontEnd, settingRegistry: ISettingRegistry | null) => {
    console.log('JupyterLab extension dataproc-cluster-connect-ts is activated!');

    if (settingRegistry) {
      settingRegistry
        .load(plugin.id)
        .then(settings => {
          console.log('dataproc-cluster-connect-ts settings loaded:', settings.composite);
        })
        .catch(reason => {
          console.error('Failed to load settings for dataproc-cluster-connect-ts.', reason);
        });
    }
  }
};

export default plugin;
