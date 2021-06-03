import * as React from 'react';
import renderer from 'react-test-renderer';
import RatingStar from '../RatingStar';

it(`RatingStar component should render correctly`, () => {
    const tree = renderer.create(<RatingStar rating={3.5} starSize={28} />).toJSON();
    expect(tree).toMatchSnapshot();
});
