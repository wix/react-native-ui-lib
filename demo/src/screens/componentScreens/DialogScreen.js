import React, {Component} from 'react';
import {View, Dialog, Button, Text} from 'react-native-ui-lib'; // eslint-disable-line

const dialogProps = {
  width: '90%',
  height: '60%',
};

class DialogScreen extends Component {
  state = {
    showDialog1: false,
    showDialog2: false,
    showDialog3: false,
    showDialog4: false,
  };

  renderDialogContent(dialogIndex, extraProps) {
    return (
      <View bg-white flex br20 padding-18 spread {...extraProps}>
        <Text text50>This is Dialog</Text>
        <View right>
          <Button text60 label="Done" link onPress={() => this.setState({[`showDialog${dialogIndex}`]: false})} />
        </View>
      </View>
    );
  }

  render() {
    const {showDialog1, showDialog2, showDialog3, showDialog4} = this.state;
    return (
      <View flex bg-dark80 padding-12 center>
        <Button size={'small'} label="show default dialog" onPress={() => this.setState({showDialog1: true})} />
        <Button
          marginT-20
          size={'small'}
          label="show bottom dialog"
          onPress={() => this.setState({showDialog2: true})}
        />
        <Button
          marginT-20
          size={'small'}
          label="show bottom dialog with padding"
          onPress={() => this.setState({showDialog3: true})}
        />
        <Button
          marginT-20
          size={'small'}
          label="show top dialog different animation"
          onPress={() => this.setState({showDialog4: true})}
        />
        <Dialog visible={showDialog1} {...dialogProps} onBackgroundPress={() => this.setState({showDialog1: false})}>
          {this.renderDialogContent(1)}
        </Dialog>
        <Dialog
          visible={showDialog2}
          {...dialogProps}
          bottom
          centerH
          onBackgroundPress={() => this.setState({showDialog2: false})}
        >
          {this.renderDialogContent(2)}
        </Dialog>
        <Dialog
          visible={showDialog3}
          {...dialogProps}
          bottom
          centerH
          onBackgroundPress={() => this.setState({showDialog3: false})}
        >
          {this.renderDialogContent(3, {'marginV-20': true})}
        </Dialog>
        <Dialog
          visible={showDialog4}
          height="40%"
          width="100%"
          top
          centerH
          onBackgroundPress={() => this.setState({showDialog4: false})}
          animationConfig={{animation: 'slideInDown', duration: 250}}
        >
          {this.renderDialogContent(4, {br0: true})}
        </Dialog>
      </View>
    );
  }
}

export default DialogScreen;
