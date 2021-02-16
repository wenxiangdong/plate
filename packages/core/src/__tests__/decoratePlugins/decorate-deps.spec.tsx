import React, { useMemo, useState } from 'react';
import { render } from '@testing-library/react';
import { createEditor, Node, Point } from 'slate';
import { withHistory } from 'slate-history';
import { Slate, withReact } from 'slate-react';
import { Decorate, SlatePlugin } from '../..';
import { EditablePlugins } from '../../components';
import { pipe } from '../../utils/pipe';

const EditorWithDecorateDeps = ({
  decorate,
  decorateDeps,
  plugins,
}: {
  decorate: UseEditablePluginsOptions['decorate'];
  decorateDeps: UseEditablePluginsOptions['decorateDeps'];
  plugins: UseEditablePluginsOptions['plugins'];
}) => {
  const [value, setValue] = useState<Node[]>([]);

  const editor = useMemo(() => {
    const withPlugins = [withReact, withHistory] as const;

    return pipe(createEditor(), ...withPlugins);
  }, []);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => {
        setValue(newValue);
      }}
    >
      <EditablePlugins
        data-testid="DecorateDeps"
        decorate={decorate}
        decorateDeps={decorateDeps}
        plugins={plugins}
      />
    </Slate>
  );
};

it('should decorate with deps', () => {
  const point: Point = { path: [0, 0], offset: 0 };
  const range = { anchor: point, focus: point };
  const decorate: Decorate = jest.fn(() => [range]);

  const plugins: SlatePlugin[] = [
    {
      decorateDeps: [1],
    },
  ];

  const { getAllByTestId } = render(
    <EditorWithDecorateDeps
      decorate={[decorate]}
      decorateDeps={[1]}
      plugins={plugins}
    />
  );
  // make sure everything rendered
  expect(getAllByTestId('DecorateDeps').length).toBeGreaterThan(0);
  expect(decorate).toHaveBeenCalledTimes(1);
});
