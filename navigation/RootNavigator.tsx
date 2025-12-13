import { createStaticNavigation, Theme } from "@react-navigation/native";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";

type RootNavigatorProps = {
    theme: Theme;
}

const RootNavigator = ({ theme }: RootNavigatorProps) => {
    const Navigation = createStaticNavigation(false ? AuthStack : AppStack)
    return <Navigation theme={theme} />
}

export default RootNavigator
