import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { ICommandPalette, ReactWidget } from '@jupyterlab/apputils';
import { ISettingRegistry } from '@jupyterlab/settingregistry';
import tabIcon from '../resources/category-svgrepo-com.svg';



/**
 * Initialization data for the dataproc-cluster-connect-ts extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'dataproc-cluster-connect-ts:plugin',
  autoStart: true,
  requires: [ICommandPalette],
  optional: [ISettingRegistry],
  activate: (
    app: JupyterFrontEnd,
    palette: ICommandPalette,
    settingRegistry: ISettingRegistry | null
  ) => {
    let view = new ExampleWidget();
    view.id = 'eaxample-widget-id';
    view.title.icon = tabIcon;
    view.title.iconClass = 'jp-SideBar-tabIcon';
    view.title.caption = 'No Caption';

    app.shell.add(view, 'left', { rank: 1000 });
    const { commands } = app;
    const command = 'jlab-examples:command-palette';
    commands.addCommand(command, {
      label: 'Execute jlab-examples:command-palette Command',
      caption: 'Execute jlab-examples:command-palette Command',
      execute: (args: any) => {
        console.log(
          `jlab-examples:command-palette has been called ${args['origin']}.`
        );
      }
    });

    const category = 'Extension Examples';
    palette.addItem({ command, category, args: { origin: 'from palette' } });

    console.log(
      'JupyterLab extension dataproc-cluster-connect-ts is activated!'
    );

    if (settingRegistry) {
      settingRegistry
        .load(plugin.id)
        .then(settings => {
          console.log(
            'dataproc-cluster-connect-ts settings loaded:',
            settings.composite
          );
        })
        .catch(reason => {
          console.error(
            'Failed to load settings for dataproc-cluster-connect-ts.',
            reason
          );
        });
    }
  }
};


function ExampleComponent() {
  return (
    <Body>
      <Div className="jp-Examplewidget"><h2>Hello World!</h2></Div>
    </Body>
  );
}
  
export class ExampleWidget extends ReactWidget {
  render(): JSX.Element {
    return (
        <ExampleComponent/>
    );
  }
}
  

export default plugin;
