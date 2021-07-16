import {Deserialize, getSlatePluginOptions,} from '@udecode/slate-plugins-core';
import {MARK_COLOR} from "./defaults";
import {getNodeDeserializer} from "@udecode/slate-plugins";

export const getColorDeserialize = (): Deserialize => (editor) => {
  const options = getSlatePluginOptions(editor, MARK_COLOR);

  return {
    leaf: getNodeDeserializer({
      type: options.type,
      getNode: (element) => ({ [options.type]: element.style.color }),
      rules: [
        {
          style: {
            color: '*',
          },
        },
      ],
      ...options.deserialize,
    }),
  };
};