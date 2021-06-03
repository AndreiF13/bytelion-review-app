// eslint-disable-next-line @typescript-eslint/no-var-requires
const screenUtils = require('../../helpers/ScreenUtils');

test(`Should return WIDTH as a number not as %`, () => {
    const w = screenUtils.widthPercentToDP('20%');
    expect(w).toEqual(150);
});

test(`Should return HEIGHT as a number not as %`, () => {
    const h = screenUtils.heightPercentToDP('20%');
    expect(h).toEqual(267);
});
