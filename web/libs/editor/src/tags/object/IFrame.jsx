import React from "react";
import { types } from "mobx-state-tree";
import {inject, observer} from "mobx-react";
import {Table, Typography} from "antd";

import ProcessAttrsMixin from "../../mixins/ProcessAttrs";
import Registry from "../../core/Registry";
import Tree from "../../core/Tree";
import { guidGenerator } from "../../utils/unique";
import { clamp } from "../../utils/utilities";
import Base from "./Base";
import {AnnotationMixin} from "../../mixins/AnnotationMixin";

/**
 * The `IFrame` tag is used to show an iframe on the labeling interface.
 * @example
 * <!-- Display an iframe on the labeling interface based on a field in the data -->
 * <View>
 *   <IFrame value="$url" />
 * </View>
 * @example
 * <!-- Display a static iframe on the labeling interface -->
 * <View>
 *   <Header value="https://localhost:3000" />
 * </View>
 * @name IFrame
 * @meta_title IFrame Tag to Show iframes
 * @meta_description Customize Label Studio with the IFrame tag to display an iframe for a labeling task for machine learning and data science projects.
 * @param {string} value              - url of the iframe, either static url or the field name in data to use for the url
 */
const Model = types.model({
  type: "iframe",
  _value: types.optional(types.string, ""),
  value: types.optional(types.string, ""),
});

const IFrameModel = types.compose("IFrameModel", Base, ProcessAttrsMixin, AnnotationMixin, Model);

const HtxIFrame = inject("store")(
  observer(({ item }) => {
    return (
      <iframe src={item._value} style={{width: "100%", height: "100%"}}/>
    );
  }),
);

Registry.addTag("iframe", IFrameModel, HtxIFrame);
Registry.addObjectType(IFrameModel);

export { HtxIFrame, IFrameModel };
