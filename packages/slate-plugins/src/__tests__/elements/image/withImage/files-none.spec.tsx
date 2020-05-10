/** @jsx jsx */

import { jsx } from '__test-utils__/jsx';
import { withImage } from 'elements';
import { withReact } from 'slate-react';

const input = (
  <editor>
    <p>test</p>
  </editor>
) as any;

const output = (
  <editor>
    <p>test</p>
  </editor>
) as any;

it('should run default insertData', () => {
  jest.spyOn(JSON, 'parse').mockReturnValue(<fragment>image.png</fragment>);

  const editor = withImage()(withReact(input));

  const data = {
    getData: () => 'test',
  };
  editor.insertData(data as any);

  expect(input.children).toEqual(output.children);
});
