import { override } from '@microsoft/decorators';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import * as React from 'react';
import * as ReactDOM from "react-dom";
import Modal from '../../components/modal/Modal';

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
      
      const elem: React.ReactElement = React.createElement(Modal);

      ReactDOM.render(elem, this._topPlaceholder.domElement);   

    }
  }

  @override
  public onInit(): Promise<void> {
    this.context.pageContext.site.serverRelativeUrl;
    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);
    return Promise.resolve<void>(null);
  }
}
