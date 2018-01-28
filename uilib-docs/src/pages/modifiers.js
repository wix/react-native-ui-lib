import React, {Component} from 'react';
import './modifiers.scss';

class Modifiers extends Component {

  render() {
    return (
      <div className="modifiers-page">
        <h1>Modifiers</h1>
        <div style={{flex: 1, flexDirection: 'row'}}>
          <div style={{width: '60%', paddingRight: '50'}}>
            Modifiers are essentially shortcuts used to layout and style RNUILIB's components.<br />
            They can be helpful when facing a new design or a complex layout by simplify the style prop composition.
            <br />For example, when you want to align sub-components horizontally,
            instead of writing:
            <b>{this.renderHTML('<View style={{flexDirection: \'row\'}}>')}</b> you will use this ALIGNMENT modifier:
            <b>{this.renderHTML('<View row>')}</b>
            The ‘row’ modifier will simply change the view direction from its default direction (column) to a row,
            horizontal, direction.<br />
            Another example is using this TYPOGRAPHY modifier:
            <b>{this.renderHTML('<Text text10>Some text</Text>')}</b>
            instead of writing this:
            <b>{this.renderHTML('<Text style={{fontFamily: \'Helvetica\', fontSize: \'64\'}}>Some text</Text>')}</b>
            <br />
            For closer look at the presets run the demo project on a mobile device or simulator.<br />
            <span> See <a href="https://medium.com/the-react-native-log/easy-layouting-with-react-native-b96c4c6fae7/">this</a> blog post for an elaborate discussion.</span>
            <h2>Style</h2>
            <div>
              The base foundation of each UI component is its style. We use basic style presets to define the rules and the style guide we follow.
              Our style presetes includes: Colors, Typography, Shadows, Border Radius and more..
              You can easily use them anywhere in your code as you would have used any other constant value, or as a component modifier.
              You can also define your own presets and use them as you would the ui lib ones.<br />
              <b>{this.renderHTML(
                'Colors.loadColors({\n' +
                '  pink: \'#FF69B4\',\n' +
                '  gold: \'#FFD700\',\n' +
                '});')}
              </b>
              <b>{this.renderHTML('Typography.loadTypographies({ h1: {fontSize: 26, fontWeight: \'300\', lineHeight: 80}, });')}</b>
              <span>
                To generate this text: <h1 style={{color: '#FF69B4', fontSize: '26', display: 'inline'}}>Hello World</h1> use this line: <b>{this.renderHTML('<Text h1 pink>Hello World</Text>')}</b><br />
                It will use the h1 typography preset and the pink color preset to style the Text element.<br /><br />
                Our style presets are translated into modifiers that will help you create a stunning UI easily and quickly.
              </span>
            </div>
          </div>
          <div>
            <table>
              <tr>
                <th>Modifier</th>
                <th>Description</th>
                <th>Presets</th>
              </tr>
              <tr>
                <td>Alignment</td>
                <td>Aligns the component's content</td>
                <td>row, column, spread, centerH, centerV, left, right, top, bottom</td>
              </tr>
              <tr>
                <td>Flex</td>
                <td>The way the component is stretches inside its parent</td>
                <td>flex, flexGrow, flexShrink, flex-[value]</td>
              </tr>
              <tr>
                <td>Margin</td>
                <td>Component's margins</td>
                <td>margin-[value], marginL-[value], marginR-[value], marginT-[value], marginB-[value]</td>
              </tr>
              <tr>
                <td>Padding</td>
                <td>Component's padding</td>
                <td>padding-[value], paddingL-[value], paddingR-[value], paddingT-[value], paddingB-[value]</td>
              </tr>
              <tr>
                <td>Colors</td>
                <td>Can be used to specify a color anywhere needed, like for the component's text color.<br />
                  For example: green10 = #00A65F
                </td>
                <td>dark[10-80], blue[10-80], cyan[10-80], green[10-80], yellow[10-80],
                  orange[10-80], red[10-80], purple[10-80], violet[10-80]</td>
              </tr>
              <tr>
                <td>Background</td>
                <td>Component's background color.<br />Use with a color value. For example: bg-red30</td>
                <td>background-[color-value], bg-[color-value]</td>
              </tr>
              <tr>
                <td>Typography</td>
                <td>Component's font size. <br />For example, text10 = 64 font size while text100 = 11 font size</td>
                <td>text[10-100]</td>
              </tr>
              <tr>
                <td>Border Radius</td>
                <td>Component's border radius.</td>
                <td>br[0-100]</td>
              </tr>
              <tr>
                <td>Spacing</td>
                <td>Component's spacing.</td>
                <td>s[1-10]</td>
              </tr>
              <tr>
                <td>Shadows (for iOS)</td>
                <td>Component's shadow, for dark or light backgrounds.</td>
                <td>dark[10-40], white[10-40]</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    );
  }

  renderHTML(text) {
    return (`${text}`);
  }
}

export default Modifiers;
