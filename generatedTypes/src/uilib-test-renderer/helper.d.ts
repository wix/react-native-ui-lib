interface Props {
    style: any;
}
interface Component {
    props: Props;
}
declare const findStyle: <T>(key: string, component: Component) => T;
export { findStyle };
