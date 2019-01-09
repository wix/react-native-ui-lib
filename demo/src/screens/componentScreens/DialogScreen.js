import React, {Component} from 'react';
import {Colors, View, Dialog, Button, Text} from 'react-native-ui-lib'; // eslint-disable-line
class DialogScreen extends Component {
  state = {
    showDialog1: false,
    showDialog2: false,
    showDialog3: false,
    showDialog4: false,
    showDialog5: false,
  };

  renderDialogContent(dialogIndex, extraProps) {
    return (
      <View bg-white flex br20 padding-18 spread {...extraProps}>
        <View height={100}>
          <Text text50>This is Dialog</Text>
        </View>
        <View right>
          <Button text60 label='Done' link onPress={() => this.setState({[`showDialog${dialogIndex}`]: false})} />
        </View>
      </View>
    );
  }

  render() {
    const {showDialog1, showDialog2, showDialog3, showDialog4, showDialog5} = this.state;
    return (
      <View flex bg-dark80 padding-12 center>
        <Button size={'small'} label='show default dialog in center' onPress={() => this.setState({showDialog1: true})} />
        <Button marginT-20 size={'small'} label='show bottom dialog' onPress={() => this.setState({showDialog2: true})} />
        <Button
          marginT-20
          size={'small'}
          label='show bottom dialog with padding'
          onPress={() => this.setState({showDialog3: true})}
        />
        <Button
          marginT-20
          size={'small'}
          label='show top dialog different animation'
          onPress={() => this.setState({showDialog4: true})}
        />
        <Button
          marginT-20
          size={'small'}
          label='show dialog with height based on content '
          onPress={() => this.setState({showDialog5: true})}
        />
        <Dialog visible={showDialog1} width='90%' height='60%' onDismiss={() => this.setState({showDialog1: false})}>
          {this.renderDialogContent(1)}
        </Dialog>
        <Dialog
          visible={showDialog2}
          width='100%'
          height='35%'
          bottom
          centerH
          onDismiss={() => this.setState({showDialog2: false})}
          style={{backgroundColor: Colors.white}}
        >
          {this.renderDialogContent(2, {br0: true})}
        </Dialog>
        <Dialog
          visible={showDialog3}
          width='90%'
          height='60%'
          bottom
          centerH
          onDismiss={() => this.setState({showDialog3: false})}
        >
          {this.renderDialogContent(3, {'marginV-20': true})}
        </Dialog>
        <Dialog
          visible={showDialog4}
          height='40%'
          width='100%'
          top
          centerH
          onDismiss={() => this.setState({showDialog4: false})}
          // dismissSwipeDirection={Dialog.swipeDirections.UP}
          style={{backgroundColor: Colors.white}}
        >
          {this.renderDialogContent(4, {br0: true})}
        </Dialog>

        <Dialog
          visible={showDialog5}
          width='100%'
          height={null}
          bottom
          centerH
          onDismiss={() => this.setState({showDialog5: false})}
          animationConfig={{duration: 1000}}
        >
          {this.renderDialogContent(5, {flex: false})}
        </Dialog>
      </View>
    );
  }
}

export default DialogScreen;
