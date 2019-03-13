import React, {Component} from 'react';
import {Navigation} from 'react-native-navigation';
import {Colors, View, Dialog, Button, Text} from 'react-native-ui-lib'; // eslint-disable-line


class DialogScreen extends Component {
  constructor(props) {
    super(props);

    Navigation.events().bindComponent(this);

    this.state = {
      showDialog1: false,
      showDialog2: false,
      showDialog3: false,
      showDialog4: false,
      showDialog5: false,
      showDialog6: false,
      showDialog7: false,
      showDialog8: false
    };
  }

  showOverlay = async () => {
    this.overlay = await Navigation.showOverlay({
      component: {
        name: 'unicorn.CustomScreen',
        passProps: {
          onDismiss: this.dismissOverlay
        },
        options: {
          layout: {
            backgroundColor: 'transparent'
          },
          overlay: {
            interceptTouchOutside: false
          }
        }
      }
    });
  }

  dismissOverlay = () => {
    Navigation.dismissOverlay(this.overlay);
  };

  renderDialogContent(dialogIndex, extraProps) {
    return (
      <View flex br20 padding-18 spread {...extraProps}>
        <View height={100}>
          <Text text50>This is Dialog</Text>
        </View>
        <View right>
          <Button text60 label="Done" link onPress={() => this.setState({[`showDialog${dialogIndex}`]: false})}/>
        </View>
      </View>
    );
  }

  render() {
    const {showDialog1, showDialog2, showDialog3, showDialog4, showDialog5, showDialog6, showDialog7, showDialog8} = this.state;
    
    return (
      <View flex bg-dark80 padding-12 center>
        <Button
          size={'small'}
          label="show default dialog in center"
          onPress={() => this.setState({showDialog1: true})}
        />
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
        <Button
          marginT-20
          size={'small'}
          label="show dialog with height based on content "
          onPress={() => this.setState({showDialog5: true})}
        />
        <Button
          marginT-20
          size={'small'}
          label="show dialog with animation configuration"
          onPress={() => this.setState({showDialog6: true})}
        />
        <Button
          marginT-20
          size={'small'}
          label="show dialog with disabled pan gesture"
          onPress={() => this.setState({showDialog7: true})}
        />
        <Button
          marginT-20
          size={'small'}
          label="show dialog without a modal"
          onPress={() => this.setState({showDialog8: true})}
        />
        <Button
          marginT-20
          size={'small'}
          label="show dialog in RNN overlay"
          onPress={(this.showOverlay)}
        />

        <Dialog
          visible={showDialog1}
          width="90%"
          height="60%"
          onDismiss={() => this.setState({showDialog1: false})}
          style={{backgroundColor: Colors.white}}
        >
          {this.renderDialogContent(1)}
        </Dialog>
        <Dialog
          visible={showDialog2}
          width="100%"
          height="35%"
          bottom
          centerH
          onDismiss={() => this.setState({showDialog2: false})}
          style={{backgroundColor: Colors.white}}
        >
          {this.renderDialogContent(2, {br0: true})}
        </Dialog>
        <Dialog
          visible={showDialog3}
          width="90%"
          height="60%"
          bottom
          centerH
          onDismiss={() => this.setState({showDialog3: false})}
        >
          {this.renderDialogContent(3, {'marginV-20': true, 'bg-white': true})}
        </Dialog>
        <Dialog
          visible={showDialog4}
          height="40%"
          width="100%"
          top
          centerH
          onDismiss={() => this.setState({showDialog4: false})}
          style={{backgroundColor: Colors.white}}
        >
          {this.renderDialogContent(4, {br0: true})}
        </Dialog>
        <Dialog
          visible={showDialog5}
          width="100%"
          height={null}
          bottom
          centerH
          onDismiss={() => this.setState({showDialog5: false})}
          style={{backgroundColor: Colors.white}}
        >
          {this.renderDialogContent(5, {flex: false})}
        </Dialog>
        <Dialog
          visible={showDialog6}
          width="80%"
          height="40%"
          bottom
          centerH
          onDismiss={() => this.setState({showDialog6: false})}
          animationConfig={{animation: 'slideInLeft', duration: 1000}}
        >
          {this.renderDialogContent(6, {'marginV-20': true, 'bg-yellow60': true})}
        </Dialog>
        <Dialog
          visible={showDialog7}
          width="80%"
          height="40%"
          onDismiss={() => this.setState({showDialog7: false})}
          style={{backgroundColor: Colors.white}}
          disablePan
        >
          {this.renderDialogContent(7)}
        </Dialog>
        {showDialog8 && 
        <Dialog
          visible={showDialog8}
          height="40%"
          width="100%"
          top
          centerH
          onDismiss={() => this.setState({showDialog8: false})}
          style={{backgroundColor: Colors.white}}
          useModal={false}
        >
          {this.renderDialogContent(8)}
        </Dialog>}
      </View>
    );
  }
}

export default DialogScreen;
