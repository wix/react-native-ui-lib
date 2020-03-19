import { ActionBar, ActionSheet, Avatar, Badge, Button, Card, Carousel, ConnectionStatusBar, Dialog, Drawer, FloatingButton, FeatureHighlight, Hint, Image, BaseInput, TextArea, TextField, MaskedInput, ListItem, PageControl, PanningProvider, PanGestureView, PanListenerView, PanDismissibleView, PanResponderView, Picker, ProgressBar, Slider, GradientSlider, ColorSliderGroup, Stepper, TabBar, TagsInput, RadioButton, RadioGroup, SharedTransition, StackAggregator, Text, Toast, View, WheelPickerDialog, Assets, BaseComponent, PureBaseComponent, UIComponent, forwardRef, AvatarHelper, Constants, DocsGenerator, LogService, LoaderScreen, Modal, StateScreen, WheelPicker, Incubator } from '../typings';
import ColorPicker from '../typings/components/ColorPicker';
import TouchableOpacity from '../typings/components/TouchableOpacity';
declare const _default: {
    readonly ActionBar: ActionBar;
    readonly ActionSheet: ActionSheet;
    readonly AnimatedImage: any;
    readonly AnimatedScanner: any;
    readonly Avatar: Avatar;
    readonly Badge: Badge;
    readonly Button: Button;
    readonly Card: Card;
    readonly Carousel: Carousel;
    readonly Checkbox: any;
    readonly ColorPalette: any;
    readonly ColorPicker: ColorPicker;
    readonly ColorSwatch: any;
    readonly ConnectionStatusBar: ConnectionStatusBar;
    readonly Dialog: Dialog;
    readonly Drawer: Drawer;
    readonly FloatingButton: FloatingButton;
    readonly FeatureHighlight: FeatureHighlight;
    readonly Hint: Hint;
    readonly Image: Image;
    readonly KeyboardAwareScrollView: any;
    readonly KeyboardAwareListView: any;
    readonly BaseInput: BaseInput<import("../typings").BaseInputProps, {}>;
    readonly TextArea: TextArea;
    readonly TextField: TextField;
    readonly MaskedInput: MaskedInput;
    readonly ListItem: ListItem;
    readonly PageControl: PageControl;
    readonly PanningProvider: PanningProvider;
    readonly PanGestureView: PanGestureView;
    readonly PanListenerView: PanListenerView;
    readonly PanDismissibleView: PanDismissibleView;
    readonly PanResponderView: PanResponderView;
    readonly Picker: Picker;
    readonly DateTimePicker: any;
    readonly ProgressBar: ProgressBar;
    readonly Slider: Slider;
    readonly GradientSlider: GradientSlider;
    readonly ColorSliderGroup: ColorSliderGroup;
    readonly Stepper: Stepper;
    readonly TabController: any;
    readonly TabBar: TabBar;
    readonly TagsInput: TagsInput;
    readonly RadioButton: RadioButton;
    readonly RadioGroup: RadioGroup;
    readonly ScrollBar: any;
    readonly SharedTransition: typeof SharedTransition;
    readonly StackAggregator: StackAggregator;
    readonly Switch: any;
    readonly Text: Text;
    readonly Toast: Toast;
    readonly TouchableOpacity: TouchableOpacity;
    readonly View: View;
    readonly Wizard: any;
    readonly WheelPickerDialog: WheelPickerDialog;
    readonly Assets: typeof Assets;
    readonly BaseComponent: BaseComponent<{}, {}, any>;
    readonly PureBaseComponent: PureBaseComponent<{}, {}, any>;
    readonly SelectableComponent: any;
    readonly UIComponent: UIComponent;
    readonly forwardRef: typeof forwardRef;
    readonly AvatarHelper: typeof AvatarHelper;
    readonly Constants: typeof Constants;
    readonly DocsGenerator: typeof DocsGenerator;
    readonly LogService: typeof LogService;
    readonly LoaderScreen: LoaderScreen;
    readonly Modal: Modal;
    readonly StateScreen: StateScreen;
    readonly HighlighterOverlayView: any;
    readonly SafeAreaSpacerView: any;
    readonly WheelPicker: WheelPicker;
    readonly SafeAreaInsetsManager: any;
    readonly Keyboard: any;
    Colors: import("./style/colors").Colors & {
        dark10: string;
        dark20: string;
        dark30: string;
        dark40: string;
        dark50: string;
        dark60: string;
        dark70: string;
        dark80: string;
        grey10: string;
        grey20: string;
        grey30: string;
        grey40: string;
        grey50: string;
        grey60: string;
        grey70: string;
        grey80: string;
        blue10: string;
        blue20: string;
        blue30: string;
        blue40: string;
        blue50: string;
        blue60: string;
        blue70: string;
        blue80: string;
        cyan10: string;
        cyan20: string;
        cyan30: string;
        cyan40: string;
        cyan50: string;
        cyan60: string;
        cyan70: string;
        cyan80: string;
        green10: string;
        green20: string;
        green30: string;
        green40: string;
        green50: string;
        green60: string;
        green70: string;
        green80: string;
        yellow10: string;
        yellow20: string;
        yellow30: string;
        yellow40: string;
        yellow50: string;
        yellow60: string;
        yellow70: string;
        yellow80: string;
        orange10: string;
        orange20: string;
        orange30: string;
        orange40: string;
        orange50: string;
        orange60: string;
        orange70: string;
        orange80: string;
        red10: string;
        red20: string;
        red30: string;
        red40: string;
        red50: string;
        red60: string;
        red70: string;
        red80: string;
        purple10: string;
        purple20: string;
        purple30: string;
        purple40: string;
        purple50: string;
        purple60: string;
        purple70: string;
        purple80: string;
        violet10: string;
        violet20: string;
        violet30: string;
        violet40: string;
        violet50: string;
        violet60: string;
        violet70: string;
        violet80: string;
        white: string;
        black: string;
    };
    Spacings: import("./style/spacings").Spacings & {
        s1: number;
        s2: number;
        s3: number;
        s4: number;
        s5: number;
        s6: number;
        s7: number;
        s8: number;
        s9: number;
        s10: number;
    };
    Shadows: {
        white10: {
            top: {
                shadowColor: string;
                shadowOpacity: number;
                shadowRadius: number;
            };
            bottom: {
                shadowColor: string;
                shadowOpacity: number;
                shadowRadius: number;
                shadowOffset: {
                    height: number;
                    width: number;
                };
            };
        };
        white20: {
            top: {
                shadowColor: string;
                shadowOpacity: number;
                shadowRadius: number;
            };
            bottom: {
                shadowColor: string;
                shadowOpacity: number;
                shadowRadius: number;
                shadowOffset: {
                    height: number;
                    width: number;
                };
            };
        };
        white30: {
            top: {
                shadowColor: string;
                shadowOpacity: number;
                shadowRadius: number;
            };
            bottom: {
                shadowColor: string;
                shadowOpacity: number;
                shadowRadius: number;
                shadowOffset: {
                    height: number;
                    width: number;
                };
            };
        };
        white40: {
            top: {
                shadowColor: string;
                shadowOpacity: number;
                shadowRadius: number;
            };
            bottom: {
                shadowColor: string;
                shadowOpacity: number;
                shadowRadius: number;
                shadowOffset: {
                    height: number;
                    width: number;
                };
            };
        };
        dark10: {
            top: {
                shadowColor: string;
                shadowOpacity: number;
                shadowRadius: number;
            };
            bottom: {
                shadowColor: string;
                shadowOpacity: number;
                shadowRadius: number;
                shadowOffset: {
                    height: number;
                    width: number;
                };
            };
        };
        dark20: {
            top: {
                shadowColor: string;
                shadowOpacity: number;
                shadowRadius: number;
            };
            bottom: {
                shadowColor: string;
                shadowOpacity: number;
                shadowRadius: number;
                shadowOffset: {
                    height: number;
                    width: number;
                };
            };
        };
        dark30: {
            top: {
                shadowColor: string;
                shadowOpacity: number;
                shadowRadius: number;
                shadowOffset: {
                    height: number;
                    width: number;
                };
            };
            bottom: {
                shadowColor: string;
                shadowOpacity: number;
                shadowRadius: number;
                shadowOffset: {
                    height: number;
                    width: number;
                };
            };
        };
        dark40: {
            top: {
                shadowColor: string;
                shadowOpacity: number;
                shadowRadius: number;
                shadowOffset: {
                    height: number;
                    width: number;
                };
            };
            bottom: {
                shadowColor: string;
                shadowOpacity: number;
                shadowRadius: number;
                shadowOffset: {
                    height: number;
                    width: number;
                };
            };
        };
        loadShadows(shadows: Dictionary<string>): void;
    };
    ThemeManager: import("./style/themeManager").ThemeManager;
    AnimatableManager: import("./style/animatableManager").AnimatableManager;
    ColorName: import("./style/colorName").ColorName;
    Components: {
        accessoryIndicator: import("react-native").RegisteredStyle<{
            width: number;
            height: number;
            marginLeft: number;
            backgroundColor: string;
            borderTopWidth: number;
            borderRightWidth: number;
            borderColor: string;
            transform: {
                rotate: string;
            }[];
        }>;
    };
    ComponentsColors: {
        CTA: string;
        disabledText: string;
    };
    BorderRadiuses: import("./style/borderRadiuses").BorderRadiuses & {
        br0: number;
        br10: number;
        br20: number;
        br30: number;
        br40: number;
        br50: number;
        br60: number;
        br100: number;
    };
    Typography: import("./style/typography").Typography & {
        text10: {
            fontSize: number;
            fontWeight: string | undefined;
            lineHeight: number;
            fontFamily: string;
        };
        text10T: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text10L: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text10R: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text10M: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text10BO: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text10H: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text10BL: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text20: {
            fontSize: number;
            fontWeight: string | undefined;
            lineHeight: number;
            fontFamily: string;
        };
        text20T: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text20L: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text20R: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text20M: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text20BO: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text20H: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text20BL: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text20B: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text30: {
            fontSize: number;
            fontWeight: string | undefined;
            lineHeight: number;
            fontFamily: string;
        };
        text30T: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text30L: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text30R: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text30M: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text30BO: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text30H: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text30BL: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text40: {
            fontSize: number;
            fontWeight: string | undefined;
            lineHeight: number;
            fontFamily: string;
        };
        text40T: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text40L: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text40R: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text40M: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text40BO: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text40H: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text40BL: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text50: {
            fontSize: number;
            fontWeight: string | undefined;
            lineHeight: number;
            fontFamily: string;
        };
        text50T: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text50L: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text50R: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text50M: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text50BO: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text50H: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text50BL: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text60: {
            fontSize: number;
            fontWeight: string | undefined;
            lineHeight: number;
            fontFamily: string;
        };
        text60T: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text60L: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text60R: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text60M: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text60BO: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text60H: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text60BL: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text60B: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text65: {
            fontSize: number;
            fontWeight: string | undefined;
            lineHeight: number;
            fontFamily: string;
        };
        text65T: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text65L: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text65R: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text65M: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text65BO: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text65H: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text65BL: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text70: {
            fontSize: number;
            fontWeight: string | undefined;
            lineHeight: number;
            fontFamily: string;
        };
        text70T: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text70L: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text70R: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text70M: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text70BO: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text70H: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text70BL: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text80: {
            fontSize: number;
            fontWeight: string | undefined;
            lineHeight: number;
            fontFamily: string;
        };
        text80T: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text80L: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text80R: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text80M: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text80BO: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text80H: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text80BL: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text90: {
            fontSize: number;
            fontWeight: string | undefined;
            lineHeight: number;
            fontFamily: string;
        };
        text90T: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text90L: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text90R: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text90M: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text90BO: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text90H: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text90BL: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text100: {
            fontSize: number;
            fontWeight: string | undefined;
            lineHeight: number;
            fontFamily: string;
        };
        text100T: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text100L: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text100R: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text100M: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text100BO: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text100H: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
        text100BL: {
            fontWeight: string | undefined;
            fontSize: number;
            lineHeight: number;
            fontFamily: string;
        };
    };
    readonly Incubator: typeof Incubator;
};
export default _default;
