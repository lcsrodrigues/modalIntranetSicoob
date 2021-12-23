import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import styles from './AppCustomizer.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'ModalSicoobExtensionApplicationCustomizerStrings';

const LOG_SOURCE: string = 'ModalSicoobExtensionApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IModalSicoobExtensionApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
  Top: string;
  Bottom: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class ModalSicoobExtensionApplicationCustomizer
  extends BaseApplicationCustomizer<IModalSicoobExtensionApplicationCustomizerProperties> {

  private _topPlaceholder: PlaceholderContent | undefined;
  
  private _renderPlaceHolders(): void {
    
    // Handling the top placeholder
    if (!this._topPlaceholder) {
      this._topPlaceholder = this.context.placeholderProvider.tryCreateContent( PlaceholderName.Top );
  
      // The extension should not assume that the expected placeholder is available.
      if (!this._topPlaceholder) {
        console.error("The expected placeholder (Top) was not found.");
        return;
      }
  
        if (this._topPlaceholder.domElement) {
          this._topPlaceholder.domElement.innerHTML = `
          <div class="${styles.app}">
            <div class="${styles.container}">
              <div class="${styles.header}">
                <div class="${styles.titleHeader}">
                  <span>Lorem Ipsum</span>
                </div>
                <div class="${styles.closeHeader}">
                  <img src="${require('../../images/close.png')}" />
                </div>
              </div>
              <div class="${styles.content}">
              <div class="${styles.sideLeft}">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin accumsan eu sapien vitae semper. Duis scelerisque mi egestas varius vehicula. Curabitur vel pretium enim, quis aliquam orci. Quisque egestas justo congue, convallis urna ut, tristique libero. In vel faucibus felis, eget tempus quam. Donec iaculis turpis ut felis aliquet ullamcorper at vel sem. Donec mattis sollicitudin turpis eu placerat. Aliquam condimentum sodales sapien et consequat. In hac habitasse platea dictumst.</p>
              </div>
              <div class="${styles.sideRight}">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin accumsan eu sapien vitae semper. Duis scelerisque mi egestas varius vehicula. Curabitur vel pretium enim, quis aliquam orci. Quisque egestas justo congue, convallis urna ut, tristique libero. In vel faucibus felis, eget tempus quam. Donec iaculis turpis ut felis aliquet ullamcorper at vel sem. Donec mattis sollicitudin turpis eu placerat. Aliquam condimentum sodales sapien et consequat. In hac habitasse platea dictumst.</p>
              </div>
              </div>
            </div>
          </div>`;
        }
      
    }
  }

  // private _onDispose(): void {
  //   console.log('[HelloWorldApplicationCustomizer._onDispose] Disposed custom top and bottom placeholders.');
  // }

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    // Wait for the placeholders to be created (or handle them being changed) and then
    // render.
    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);

    return Promise.resolve<void>(null);
  }
}
