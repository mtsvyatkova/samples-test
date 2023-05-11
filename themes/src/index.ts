import {
  defineComponents,
  IgcSelectComponent,
  IgcSelectItemComponent
} from "igniteui-webcomponents";
import { css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import Base from "./base";
import { ApexGrid, ColumnConfiguration } from "apex-grid";
import type { ProductInfo } from "./mock-data";
import darkBootstrap from "../node_modules/igniteui-webcomponents/themes/dark/bootstrap.css?inline";
import darkFluent from "../node_modules/igniteui-webcomponents/themes/dark/fluent.css?inline";
import darkMaterial from "../node_modules/igniteui-webcomponents/themes/dark/material.css?inline";
import darkIndigo from "../node_modules/igniteui-webcomponents/themes/dark/indigo.css?inline";
import Bootstrap from "../node_modules/igniteui-webcomponents/themes/light/bootstrap.css?inline"
import Fluent from "../node_modules/igniteui-webcomponents/themes/light/fluent.css?inline";
import Material from "../node_modules/igniteui-webcomponents/themes/light/material.css?inline";
import Indigo from "../node_modules/igniteui-webcomponents/themes/light/indigo.css?inline";

ApexGrid.register();
defineComponents(IgcSelectItemComponent, IgcSelectComponent);

const themeMap = {
  "Bootstrap Dark": darkBootstrap,
  "Fluent Dark": darkFluent,
  "Material Dark": darkMaterial,
  "Indigo Dark": darkIndigo,
  Bootstrap: Bootstrap,
  Fluent: Fluent,
  Material: Material,
  Indigo: Indigo
};

type Theme = keyof typeof themeMap;

@customElement("styling-config-themes")
export default class extends Base {
  static styles = [
    css`
      :host {
        contain: content;
        --ig-size: 2;
      }
      apex-grid {
        min-height: 400px;
      }
      section {
        display: flex;
        margin-bottom: 2rem;
        gap: 2rem;
      }
    `
  ];

  @state()
  protected theme: Theme = "Bootstrap";

  @state()
  protected columns: ColumnConfiguration<ProductInfo>[] = [
    { key: "name", headerText: "Product", sort: true, filter: true },
    {
      key: "price",
      headerText: "Price per item",
      sort: true,
      filter: true,
      type: "number"
    },
    {
      key: "sold",
      headerText: "Items sold",
      sort: true,
      filter: true,
      type: "number"
    },
    {
      key: "total",
      headerText: "Total",
      sort: true,
      filter: true,
      type: "number"
    },
    {
      key: "rating",
      headerText: "User rating",
      type: "number",
      sort: true,
      filter: true,
      cellTemplate: ({ value }) =>
        html`<igc-rating readonly .value=${value}></igc-rating>`
    }
  ];

  #updateTheme({ detail }: CustomEvent<IgcSelectItemComponent>) {
    this.theme = detail.value as Theme;
  }

  protected get activeTheme() {
    const styles = themeMap[this.theme];
    return styles.replaceAll(":root", "apex-grid");
  }

  protected render() {
    const themes = Object.keys(themeMap).sort();

    return html`<style>
        ${this.activeTheme}
      </style>
      <section>
        <igc-select
          flip
          .value=${this.theme}
          label="Select a theme:"
          @igcChange=${this.#updateTheme}
        >
          ${themes.map(
            (theme) =>
              html`<igc-select-item .value=${theme}>${theme}</igc-select-item>`
          )}
        </igc-select>
      </section>
      <apex-grid .columns=${this.columns} .data=${this.data}></apex-grid>`;
  }
}
