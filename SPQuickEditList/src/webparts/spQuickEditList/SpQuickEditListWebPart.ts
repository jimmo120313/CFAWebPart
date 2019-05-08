import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from "@microsoft/sp-property-pane";

import * as strings from "SpQuickEditListWebPartStrings";
import { AppContainer, IAppContainerProps } from "./components";
import { IBrigade } from "../../models";
import { sp } from "@pnp/sp";

export interface ISpQuickEditListWebPartProps {
  description: string;
}

export default class SpQuickEditListWebPart extends BaseClientSideWebPart<
  IAppContainerProps
> {
  public componentDidMount(): void {
    console.log("test");
    sp.web.lists
      .getByTitle("Brigade")
      .items.get()
      .then((items: IBrigade[]) => {
        console.log(items);
      });
  }

  public render(): void {
    if (!this.renderedOnce) {
      const element: React.ReactElement<
        IAppContainerProps
      > = React.createElement(AppContainer, {
        description: this.properties.description
      });

      ReactDom.render(element, this.domElement);
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }

  public static _getBrigadeDetail(): void {
    sp.web.lists
      .getByTitle("Brigade")
      .items.get()
      .then((items: IBrigade[]) => {
        console.log(items);
      });
  }
}
