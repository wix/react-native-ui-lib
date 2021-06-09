module.exports = {
get View() {
return require('./src/components/view').default;},
get Text() {
return require('./src/components/text').default;},
get Image() {
return require('./src/components/image').default;},
get TouchableOpacity() {
return require('./src/components/touchableOpacity').default;},
get Button() {
return require('./src/components/button').default;},
get Colors() {
return require('./src/style/colors').default;},
get Typography() {
return require('./src/style/typography').default;},
get Spacings() {
return require('./src/style/spacings').default;},
get BorderRadiuses() {
return require('./src/style/borderRadiuses').default;},
get Shadows() {
return require('./src/style/shadows').default;},
get ThemeManager() {
return require('./src/style/themeManager').default;},
};
